import { useState, useEffect } from "react";
import { useAgent } from "agents/react";
import type { Route } from "./+types/agent";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PSLE Agent Interface" },
    { name: "description", content: "Query PSLE AI Agent with SKILLS" },
  ];
}

export default function AgentPage() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [papersIndex, setPapersIndex] = useState<any>(null);

  // Fetch papers index on mount
  useEffect(() => {
    fetch('/papers_index.json')
      .then(res => res.json())
      .then(data => setPapersIndex(data))
      .catch(err => console.error("Failed to load papers index:", err));
  }, []);

  // 连接到后端的 PSLEAgent Durable Object
  // agent 的名字必须与 wrangler.json 中声明的 class 名字一致
  const agent = useAgent({ agent: "PSLEAgent", name: "default" });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "log") {
          setLogs((prev) => [...prev, data.message]);
        } else if (data.type === "task_complete") {
          setResults((prev) => [...prev, data.result]);
          setIsLoading(false);
          setLogs((prev) => [...prev, "✨ 任务已完成并存储。"]);
        } else if (data.type === "error") {
          setLogs((prev) => [...prev, `❌ 错误: ${data.message}`]);
          setIsLoading(false);
        } else if (data.type === "db_results") {
          setHistoryRecords(data.records);
          setLogs((prev) => [...prev, `📚 成功加载了 ${data.records.length} 条历史记录`]);
        }
      } catch (e) {
        console.error("Failed to parse message", event.data);
      }
    };

    agent.addEventListener("message", handleMessage);
    return () => {
      agent.removeEventListener("message", handleMessage);
    };
  }, [agent]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLogs([]); // 清空旧日志
    setIsLoading(true);

    // 向后端 Agent 发送搜索指令
    agent.send(
      JSON.stringify({
        type: "search_and_store",
        query: query.trim(),
      })
    );
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-[#e5e5e0] font-sans pt-20 px-6">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#e60023] flex items-center justify-center text-white font-bold text-xl">K</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">KeEn</span>
        </a>
        <div className="flex gap-4">
          <a href="/" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">Home</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 mt-12 mb-20 border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">PSLE 专家助手 (AI Agent)</h1>
        <p className="text-gray-500 mb-8">
          输入您想查询的 PSLE 知识点或试题（例如 "PSLE Science 热传导" ），Agent 会自动为您检索、按照 SKILL 标准提炼，并将其存入您的个人题库。
        </p>

        <form onSubmit={handleSearch} className="mb-8 flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="询问任何与 PSLE 相关的问题..."
            className="flex-1 px-6 py-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#e60023] focus:bg-white transition-all text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-8 py-4 bg-[#e60023] hover:bg-[#ad081b] disabled:bg-gray-300 text-white font-bold rounded-full transition-colors text-lg whitespace-nowrap shadow-sm hover:shadow-md"
          >
            {isLoading ? "处理中..." : "咨询 Agent"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Agent 处理日志 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 overflow-y-auto h-96">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">实时运行日志</h2>
            <div className="flex flex-col gap-2">
              {logs.length === 0 ? (
                <span className="text-gray-400 text-sm">等待输入...</span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-sm text-gray-700 font-mono bg-white p-3 rounded-lg shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI 结果提炼 */}
          <div className="bg-[#fcfcfc] rounded-2xl p-6 border border-gray-200 overflow-y-auto h-96 shadow-inner">
            <h2 className="text-sm font-bold text-[#e60023] uppercase tracking-wider mb-4">专家级分析结果 (实时)</h2>
            <div className="flex flex-col gap-6">
              {results.length === 0 ? (
                <span className="text-gray-400 text-sm text-center mt-10">暂无结果</span>
              ) : (
                results.map((res, i) => (
                  <div key={i} className="prose prose-sm max-w-none text-gray-800 border-b border-gray-100 pb-6 last:border-0 whitespace-pre-wrap">
                    {res}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 历史记录查询区 */}
        <div className="mt-12 bg-white rounded-3xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">历史知识库</h2>
              <p className="text-sm text-gray-500 mt-1">查看 Agent 分析并存入的 PSLE 知识点数据表</p>
            </div>
            <button
              onClick={() => agent.send(JSON.stringify({ type: "query_db" }))}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors font-medium shadow-sm flex items-center gap-2"
            >
              <span>加载最新记录</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold w-1/5">主题 (Topic)</th>
                  <th className="py-4 px-6 font-semibold w-2/5">内容 (Content)</th>
                  <th className="py-4 px-6 font-semibold w-1/5">来源 (Source)</th>
                  <th className="py-4 px-6 font-semibold w-1/5">时间 (Time)</th>
                </tr>
              </thead>
              <tbody>
                {historyRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400 bg-white">暂无数据，请点击上方按钮加载</td>
                  </tr>
                ) : (
                  historyRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                      <td className="py-4 px-6 font-medium text-gray-900 align-top">{record.topic}</td>
                      <td className="py-4 px-6 text-gray-600 align-top text-sm">
                        <div className="max-h-40 overflow-y-auto whitespace-pre-wrap pr-2 custom-scrollbar">
                          {record.content}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm align-top">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200">{record.source || 'Unknown'}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm align-top whitespace-nowrap">
                        {new Date(record.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
}
