import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Download,
  Eye,
  Lightbulb,
  X,
  ChevronRight,
  BookOpen,
  ArrowUpRight
} from "lucide-react";

interface ExamPaper {
  id: string;
  name: string;
  year: number;
  subject: string;
  level: string;
  school: string;
  filename: string;
}

export function Welcome({ message, user }: { message?: string, user?: { id: number, email: string } | null }) {
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // AI Summary State
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetch("/api/papers")
      .then(res => res.json())
      .then(data => {
        setPapers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch papers", err);
        setLoading(false);
      });
  }, []);

  const handleSummarize = async (filename: string) => {
    setSummarizingId(filename);
    try {
      const res = await fetch(`/api/summarize/${filename}`);
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        setShowSummary(true);
      } else if (data.error) {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to reach AI service");
    } finally {
      setSummarizingId(null);
    }
  };

  const filteredPapers = papers.filter(paper =>
    paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group papers by Year -> Subject -> Files
  const papersIndex = filteredPapers.reduce((acc, paper) => {
    const year = paper.year.toString();
    const subject = paper.subject.toUpperCase();
    if (!acc[year]) acc[year] = {};
    if (!acc[year][subject]) acc[year][subject] = [];
    acc[year][subject].push({ name: paper.name, filename: paper.filename });
    return acc;
  }, {} as Record<string, Record<string, {name: string, filename: string}[]>>);

  return (
    <main className="min-h-screen bg-[#ffffff]">
      {/* Navigation - Clean Pinterest Style */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#e5e5e0]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#e60023] rounded-full flex items-center justify-center text-white font-bold">K</div>
          <span className="text-xl font-bold tracking-tight text-[#211922]">Keen PSLE</span>
        </div>

        <div className="flex-1 max-w-2xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62625b] w-4 h-4" />
          <input
            type="text"
            placeholder="搜索科目、学校或年份..."
            className="w-full pl-11 pr-4 py-3 bg-[#e5e5e0] rounded-full border-none focus:ring-2 focus:ring-[#435ee5] text-[#211922] placeholder-[#62625b]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium hidden sm:inline-block">欢迎, {user.email}</span>
              <a href="/agent" className="px-4 py-2 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-sm">
                ✨ 咨询 AI 专家
              </a>
              <form action="/logout" method="post">
                <button type="submit" className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition-colors">
                  登出
                </button>
              </form>
            </div>
          ) : (
            <>
              <a href="/register" className="btn-red text-white text-sm">注册</a>
              <a href="/login" className="btn-sand text-sm">登录</a>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="mb-12">
          <p className="text-xl text-[#62625b] max-w-2xl">
            在这里发现最全的 PSLE 复习资源。点击 <Lightbulb className="inline w-5 h-5 text-[#e60023]" /> 开启 AI 深度知识点总结。
          </p>
        </header>

        {/* 试卷库浏览区 */}
        <section className="bg-white rounded-3xl shadow-sm p-8 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">历年 PSLE 试卷库</h2>
            <p className="text-gray-500 mt-2">浏览并下载自动归档的各科试卷 (2016 - 2024)</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-gray-400 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#e60023] mb-4"></div>
              正在加载试卷目录...
            </div>
          ) : Object.keys(papersIndex).length === 0 ? (
            <div className="flex justify-center py-20 text-[#62625b]">
              没有找到符合条件的试卷
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(papersIndex).sort((a, b) => Number(b) - Number(a)).map(year => (
                <div key={year} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 px-6 py-4 font-bold text-xl text-gray-800 border-b border-gray-100 flex items-center justify-between">
                    <span>{year} 年</span>
                    <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {Object.values(papersIndex[year]).flat().length} 份试卷
                    </span>
                  </div>
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.keys(papersIndex[year]).sort().map(subject => (
                      <div key={subject} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-[#e60023] uppercase text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#e60023]"></span>
                            {subject}
                          </h3>
                        </div>
                        <ul className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                          {papersIndex[year][subject].map((fileObj, idx) => (
                            <li key={idx} className="group flex flex-col gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <a 
                                href={`/api/papers/${encodeURIComponent(fileObj.filename)}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-sm text-gray-700 font-medium hover:text-[#e60023] flex items-start gap-2 transition-colors"
                              >
                                <svg className="w-4 h-4 mt-0.5 text-gray-400 group-hover:text-[#e60023] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="line-clamp-2" title={fileObj.name}>{fileObj.name}</span>
                              </a>
                              <div className="flex justify-end pr-2">
                                <button
                                  onClick={() => handleSummarize(fileObj.filename)}
                                  disabled={summarizingId === fileObj.filename}
                                  className="text-[11px] font-medium text-gray-500 hover:text-[#e60023] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  {summarizingId === fileObj.filename ? (
                                    <span className="animate-pulse">识别中...</span>
                                  ) : (
                                    <><Lightbulb className="w-3 h-3" /> AI 总结</>
                                  )}
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Pinterest Style Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSummary(false)}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e5e0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e60023] rounded-full flex items-center justify-center text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">AI 知识点透视</h2>
              </div>
              <button
                onClick={() => setShowSummary(false)}
                className="btn-circle"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f6f6f3]/50">
              <div className="prose prose-slate max-w-none">
                <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#e5e5e0]">
                  {summary?.split("\n").map((line, i) => (
                    <p key={i} className="mb-4 text-[#211922] leading-relaxed text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-[#e5e5e0] flex justify-end gap-3">
              <button className="btn-sand" onClick={() => setShowSummary(false)}>关闭</button>
              <button className="btn-red">收藏此总结</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Dark Pinterest Style */}
      <footer className="bg-[#33332e] text-white py-16 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#e60023] rounded-full flex items-center justify-center text-white font-bold">K</div>
              <span className="text-xl font-bold tracking-tight">Keen PSLE</span>
            </div>
            <p className="text-[#91918c] max-w-sm">
              专为新加坡学生打造的 PSLE 智能复习平台。利用 AI 技术发掘知识背后的关联，让学习变得像刷 Pinterest 一样轻松有趣。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">资源</h4>
            <ul className="space-y-3 text-[#91918c] text-sm">
              <li><a href="#" className="hover:text-white">数学真题</a></li>
              <li><a href="#" className="hover:text-white">科学实验总结</a></li>
              <li><a href="#" className="hover:text-white">华文好词好句</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">关于</h4>
            <ul className="space-y-3 text-[#91918c] text-sm">
              <li><a href="#" className="hover:text-white">关于我们</a></li>
              <li><a href="#" className="hover:text-white">加入社群</a></li>
              <li><a href="#" className="hover:text-white">隐私协议</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-[#91918c] text-xs">
          © 2026 Keen PSLE. 灵感驱动学习。
        </div>
      </footer>
    </main>
  );
}
