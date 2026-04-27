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
            <>
              <span className="text-sm text-[#62625b]">{user.email}</span>
              <form action="/logout" method="post">
                <button type="submit" className="btn-sand text-sm">退出</button>
              </form>
            </>
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
        <header className="mb-16">
          <h1 className="text-[70px] font-semibold leading-tight text-[#211922] mb-4">
            给未来的灵感
          </h1>
          <p className="text-xl text-[#62625b] max-w-2xl">
            在这里发现最全的 PSLE 复习资源。点击 <Lightbulb className="inline w-5 h-5 text-[#e60023]" /> 开启 AI 深度知识点总结。
          </p>
        </header>

        {/* Masonry-like Grid */}
        <section>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e60023]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredPapers.map((paper) => (
                <div key={paper.id} className="pin-card group">
                  {/* Visual Preview Placeholder */}
                  <div className="aspect-[3/4] bg-[#f6f6f3] relative flex items-center justify-center p-8 group-hover:brightness-95 transition-all">
                    <FileText className="w-16 h-16 text-[#bcbcb3]" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-[10px] font-bold rounded-full text-[#211922]">
                        {paper.year}
                      </span>
                    </div>
                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <button 
                        onClick={() => handleSummarize(paper.filename)}
                        disabled={summarizingId === paper.filename}
                        className="btn-red flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                      >
                        {summarizingId === paper.filename ? (
                          <span className="animate-pulse">识别中...</span>
                        ) : (
                          <><Lightbulb className="w-4 h-4" /> AI 总结</>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Content Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-[#211922] line-clamp-1 mb-1">{paper.name}</h3>
                    <div className="flex items-center justify-between text-[12px] text-[#62625b]">
                      <span>{paper.subject} · {paper.school}</span>
                      <a 
                        href={`/api/papers/${paper.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#e60023]"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
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
