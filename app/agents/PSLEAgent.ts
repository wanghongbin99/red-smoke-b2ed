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

// 整合所有的 PSLE Skill 作为一个完整的专家系统 Prompt
const PSLE_SKILL_PROMPT = `
你是一个 PSLE (新加坡小学离校考试) 专家 AI Agent。
你的任务是：
1. 接收用户的搜索关键词或问题。
2. 对收集到的资料或问题进行提炼总结，严格遵循以下提供的各种学科 SKILL 规范。
3. 将有价值的知识点或分析存入 SQLite 数据库。

下面是你必须遵守的 PSLE 核心能力规范与各学科详细解题标准：

### 核心指导原则 (Main Skill)
${mainSkill}

### 各学科具体标准
--- MATH SKILL ---
${mathSkill}

--- SCIENCE SKILL ---
${scienceSkill}

--- ENGLISH SKILL ---
${englishSkill}

--- CHINESE SKILL ---
${chineseSkill}
`;

export class PSLEAgent extends Agent<Env, State> {
  initialState: State = {
    status: "idle",
    logs: [],
  };

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

        this.addLog("已获取网络信息，正在使用 PSLE SKILL 进行 AI 分析...");

        // 2. 利用 AI 和 PSLE SKILL 进行提炼
        const aiResponse = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: PSLE_SKILL_PROMPT },
            { role: "user", content: `请分析以下搜索结果，提炼出核心知识点：\n${searchResults}` }
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
