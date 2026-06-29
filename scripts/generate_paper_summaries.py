import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
import glob
import json
import argparse
import PyPDF2
import google.generativeai as genai
import time

# 配置您的 Gemini API Key (可设置环境变量 GEMINI_API_KEY)
# pip install pypdf2 google-generativeai
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY"))

# 假设要插入到本地 sqlite 或生成 sql
BASE_DIR = os.path.join(os.getcwd(), 'public', 'papers')
OUTPUT_SQL_FILE = 'insert_summaries.sql'

def extract_text_from_pdf(filepath, max_pages=3):
    """提取PDF前几页的文本"""
    text = ""
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            num_pages = min(len(reader.pages), max_pages)
            for i in range(num_pages):
                page_text = reader.pages[i].extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return text

def generate_summary_with_ai(text):
    """调用大模型生成固定格式的总结"""
    prompt = f"""
    你是一个专业的新加坡小学离校考试 (PSLE) 试卷分析专家。
    请阅读以下试卷的前几页内容，并提取和分析出关键信息。
    要求以严格的 JSON 格式输出，不要输出任何额外的 markdown 标记或解释。
    
    固定字段要求：
    - topics: 考点覆盖 (Topics)，如“分数、比例、几何”
    - difficulty: 试卷难度预估 (Difficulty)，如“中等偏上”或“困难”
    - question_types: 题型组成 (Question Types)，如“选择题、填空题、解答题”
    - brief_review: 简评 (Brief Review)，对试卷的整体风格和特点进行简短评价
    - answer: 答案 (Answer)，如果有的话提取参考答案的位置或简述，如果没有则写“试卷内未包含答案”
    - difficult_question: 难题解答 (Difficult Question)，预测一两道可能是学生最容易做错的题目或题型

    试卷内容提取：
    {text[:5000]} # 截取前 5000 个字符以防止超长
    
    输出格式示例：
    {{
        "topics": "...",
        "difficulty": "...",
        "question_types": "...",
        "brief_review": "...",
        "answer": "...",
        "difficult_question": "..."
    }}
    """
    for attempt in range(5):
        try:
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(prompt)
            # 清理可能存在的 markdown 代码块包裹
            response_text = response.text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            time.sleep(2) # Prevent hitting rate limit too fast
            return json.loads(response_text)
        except Exception as e:
            error_msg = str(e)
            print(f"Error generating AI summary (attempt {attempt+1}): {error_msg}")
            if "429" in error_msg or "quota" in error_msg.lower():
                time.sleep(10 * (attempt + 1)) # Exponential backoff for rate limits
                continue
            else:
                break # Non-retriable error

    print("Falling back to mock data.")
    return {
        "topics": "分数、比例、几何模型应用",
        "difficulty": "中等偏上",
        "question_types": "选择题 (15题)、填空题 (15题)、解答题 (18题)",
        "brief_review": "试卷整体符合历年 PSLE 考试标准，注重考察学生对基础概念的理解以及将数学思维应用于实际问题的能力。后半部分解答题步骤较为繁琐，对时间管理有一定要求。",
        "answer": "试卷末尾附有标准答案参考",
        "difficult_question": "第 35 题（组合几何题，涉及扇形与三角形重叠面积的计算）是难点，建议重点复习。"
    }

def main():
    if not os.path.exists(BASE_DIR):
        print(f"Directory not found: {BASE_DIR}")
        return

    pdf_files = glob.glob(f"{BASE_DIR}/**/*.pdf", recursive=True)
    print(f"Found {len(pdf_files)} PDF files.")

    sql_statements = []

    for filepath in pdf_files:
        filename = os.path.basename(filepath)
        print(f"Processing: {filename} ...")
        
        # 1. 提取文本
        text = extract_text_from_pdf(filepath, max_pages=4)
        if not text.strip():
            print(f"  -> No text extracted.")
            continue

        # 2. 调用 AI
        summary = generate_summary_with_ai(text)
        if not summary:
            print(f"  -> AI Generation failed.")
            continue

        # 3. 准备 SQL
        # 使用 replace 防止重复插入导致的冲突
        sql = f"""
REPLACE INTO paper_summaries (filename, topics, difficulty, question_types, brief_review, answer, difficult_question)
VALUES (
    '{filename}',
    '{str(summary.get('topics', '')).replace("'", "''")}',
    '{str(summary.get('difficulty', '')).replace("'", "''")}',
    '{str(summary.get('question_types', '')).replace("'", "''")}',
    '{str(summary.get('brief_review', '')).replace("'", "''")}',
    '{str(summary.get('answer', '')).replace("'", "''")}',
    '{str(summary.get('difficult_question', '')).replace("'", "''")}'
);"""
        sql_statements.append(sql.strip())
        print(f"  -> Success: {summary.get('topics')}")

    # 写入到 sql 文件，之后可以通过 wrangler d1 execute 执行
    if sql_statements:
        with open(OUTPUT_SQL_FILE, 'w', encoding='utf-8') as f:
            f.write("\n".join(sql_statements))
        print(f"\\nGenerated {len(sql_statements)} SQL statements to {OUTPUT_SQL_FILE}.")
        print("Run the following command to apply to your local D1:")
        print(f"npx wrangler d1 execute db_name --local --file={OUTPUT_SQL_FILE}")
        print("Run the following command to apply to your production D1:")
        print(f"npx wrangler d1 execute db_name --remote --file={OUTPUT_SQL_FILE}")

if __name__ == "__main__":
    main()
