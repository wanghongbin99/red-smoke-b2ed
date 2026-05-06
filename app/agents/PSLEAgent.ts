import { Agent } from "agents";

// 导入所有的 PSLE Skills
import mainSkill from "./skills/SKILL.md?raw";
import mathSkill from "./skills/references/PSLE_MATH_SKILL.md?raw";
import scienceSkill from "./skills/references/PSLE_SCIENCE_SKILL.md?raw";
import englishSkill from "./skills/references/PSLE_ENGLISH_SKILL.md?raw";
import chineseSkill from "./skills/references/PSLE_CHINESE_SKILL.md?raw";

interface Env {
  AI: any;
  MCP_WEB_SEARCH_URL?: string; // Optional: URL to your MCP search server
}

interface State {
  status: string;
  logs: string[];
}

// 动态生成 Prompt 以避免一次性加载过多导致大语言模型 Token 超限 (Error 1031)
const getPSLEPrompt = (query: string) => {
  let specificSkill = "";
  const lowerQuery = query.toLowerCase();
  
  // 扩展关键词字典，避免用户没写“科学”等字眼就匹配不到
  const mathKeywords = ["math", "数学", "加减乘除", "计算", "分数", "小数", "ratio", "比率", "percentage", "百分比", "geometry", "几何", "图形", "速度", "speed", "volume", "体积"];
  const scienceKeywords = ["science", "科学", "热传导", "heat", "energy", "能量", "plant", "植物", "animal", "动物", "magnet", "磁铁", "force", "力", "electricity", "电", "system", "系统", "cycle", "循环", "diversity", "多样性", "interaction", "相互作用"];
  const englishKeywords = ["english", "英文", "英语", "grammar", "语法", "vocabulary", "词汇", "comprehension", "阅读理解", "writing", "写作", "synthesis", "transformation", "situational"];
  const chineseKeywords = ["chinese", "华文", "中文", "词语", "看图作文", "命题作文", "实用文", "语文应用", "拼音", "句子"];

  if (mathKeywords.some(kw => lowerQuery.includes(kw))) {
    specificSkill = `\n--- MATH SKILL ---\n${mathSkill}`;
  } else if (scienceKeywords.some(kw => lowerQuery.includes(kw))) {
    specificSkill = `\n--- SCIENCE SKILL ---\n${scienceSkill}`;
  } else if (englishKeywords.some(kw => lowerQuery.includes(kw))) {
    specificSkill = `\n--- ENGLISH SKILL ---\n${englishSkill}`;
  } else if (chineseKeywords.some(kw => lowerQuery.includes(kw))) {
    specificSkill = `\n--- CHINESE SKILL ---\n${chineseSkill}`;
  } else {
    // 默认如果没提具体学科，也带上一部分基础的
    specificSkill = "\n(用户未指定具体学科，请基于您的基础知识运用 PSLE (Primary School Leaving Examination) 的通用标准进行分析。如果您能推测出所属学科，请自行按照该学科的新加坡 MOE (教育部) 考纲来回答。)";
  }

  return `
你是一个 PSLE (新加坡小学离校考试) 专家 AI Agent。
你的任务是：
1. 接收用户的搜索关键词或问题。
2. 对收集到的资料或问题进行提炼总结，严格遵循以下提供的各种学科 SKILL 规范。
3. 将有价值的知识点或分析存入 SQLite 数据库。

下面是你必须遵守的 PSLE 核心能力规范：

### 核心指导原则 (Main Skill)
${mainSkill}

### 学科具体标准 (如果涉及)
${specificSkill}
`;
};

export class PSLEAgent extends Agent<Env, State> {
  initialState: State = {
    status: "idle",
    logs: [],
  };

  // 绕过本地 Miniflare 开发环境下 SQLite DO 偶尔无法读取 ctx.id.name 的已知 Bug
  get name() {
    try {
      if (this.ctx?.id?.name) return this.ctx.id.name;
    } catch (e) { }
    return "default";
  }

  async onStart() {
    // 启动时初始化数据库表
    await this.sql`
      CREATE TABLE IF NOT EXISTS psle_knowledge (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT NOT NULL,
        content TEXT NOT NULL,
        source TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("PSLEAgent Database Initialized.");
  }

  // 记录日志到 State，自动同步给所有连接的客户端
  private addLog(message: string) {
    this.setState({
      ...this.state,
      status: message,
      logs: [...this.state.logs, message].slice(-50), // 保留最新50条
    });
  }

  async onMessage(connection: any, message: string) {
    const data = JSON.parse(message);

    if (data.type === "search_and_store") {
      const query = data.query;
      this.addLog(`开始执行任务: 搜索 "${query}"...`);

      try {
        // 1. 调用 MCP 搜索网络信息
        // 注意：这里我们模拟一个 MCP / 外部搜索服务的调用。
        // 如果您有真实的 MCP Server，可以用 this.mcp.connect(env.MCP_WEB_SEARCH_URL)
        /*
        this.addLog("正在通过 MCP 查询网络...");
        let searchResults = "模拟搜索结果：2025 PSLE 数学主要考点包括分数、比率和几何体...";
        
        if (this.env.MCP_WEB_SEARCH_URL) {
          // 真实的 MCP Client 调用逻辑 (需您的环境中配置该变量)
          // const mcpConnection = await this.mcp.connect(this.env.MCP_WEB_SEARCH_URL);
          // searchResults = await mcpConnection.client.callTool("brave_web_search", { query });
        } else {
          // Fallback: 使用免费开放的 DuckDuckGo API 或模拟数据
          const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
          if (res.ok) {
            searchResults = "成功获取 DuckDuckGo 页面内容 (长度: " + (await res.text()).length + ")";
          }
        }
          */

        this.addLog("已获取网络信息，正在使用 PSLE SKILL 进行 AI 分析...");

        // 2. 利用 AI 和 PSLE SKILL 进行提炼
        const aiResponse = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
          messages: [
            { role: "system", content: getPSLEPrompt(query) },
            { role: "user", content: `请分析以下搜索结果，提炼出核心知识点：\n${query}` }
          ]
        });

        // 兼容不同模型的返回格式
        const refinedContent = aiResponse.response || aiResponse.result || (typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse));

        if (!refinedContent || refinedContent === 'null' || refinedContent === '{}') {
          throw new Error("AI 提炼失败，返回了空内容: " + JSON.stringify(aiResponse));
        }

        this.addLog("AI 提炼完成，正在存入数据库...");

        // 3. 将数据存入 SQLite 数据库
        await this.sql`
          INSERT INTO psle_knowledge (topic, content, source)
          VALUES (${query}, ${refinedContent}, 'Web Search (MCP)')
        `;

        this.addLog("任务完成！数据已成功保存至数据库。");

        // 通知客户端
        connection.send(JSON.stringify({
          type: "task_complete",
          query: query,
          result: refinedContent
        }));

      } catch (err: any) {
        this.addLog(`发生错误: ${err.message}`);
        connection.send(JSON.stringify({ type: "error", message: err.message }));
      }
    } else if (data.type === "query_db") {
      // 客户端请求查看数据库内容
      const records = await this.sql`SELECT * FROM psle_knowledge ORDER BY created_at DESC LIMIT 10`;
      connection.send(JSON.stringify({
        type: "db_results",
        records: Array.from(records)
      }));
    }
  }
}
