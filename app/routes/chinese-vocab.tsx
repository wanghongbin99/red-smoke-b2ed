import { useState } from "react";
import type { Route } from "./+types/chinese-vocab";
import { BookOpen, ArrowLeft, Star, School, Link as LinkIcon, AlertCircle, BookMarked } from "lucide-react";
import { Link } from "react-router";
import { allGradesData } from "../data/vocabData";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "小学华文核心词汇库 (P1-P6)" },
    { name: "description", content: "新加坡小学《欢乐伙伴》各年级核心词汇与好词好句总结" },
  ];
}

export default function ChineseVocab() {
  const [activeGrade, setActiveGrade] = useState("P6");
  const grades = ["P1", "P2", "P3", "P4", "P5", "P6"];

  const currentData = allGradesData[activeGrade];

  return (
    <main className="min-h-screen bg-[#f6f6f3]">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center border-b border-[#e5e5e0]">
        <Link to="/" className="flex items-center gap-2 text-[#62625b] hover:text-[#211922] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">返回首页</span>
        </Link>
        <div className="mx-auto flex items-center gap-2 pr-24">
          <div className="w-8 h-8 bg-[#e60023] rounded-full flex items-center justify-center text-white font-bold">华</div>
          <span className="text-xl font-bold tracking-tight text-[#211922]">小学华文词库</span>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#211922] mb-4">《欢乐伙伴》/《学华语》新大纲核心词汇库</h1>
          <p className="text-lg text-[#62625b]">覆盖小学各年级必背生字与好词好句（紧贴 SEAB 最新命题趋势），助你稳拿高分！</p>
        </header>

        {/* 年级切换 Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1.5 shadow-sm border border-[#e5e5e0] inline-flex">
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => setActiveGrade(grade)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeGrade === grade 
                    ? "bg-[#e60023] text-white shadow-md" 
                    : "text-[#62625b] hover:bg-[#f6f6f3] hover:text-[#211922]"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* 动态渲染当前年级的内容 */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeGrade}">
          
          {/* 1. 欢乐伙伴课本核心词汇 */}
          {currentData.huanleHuoban && currentData.huanleHuoban.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#211922] mb-8 flex items-center gap-2">
                <BookMarked className="text-emerald-600 w-7 h-7" />
                {activeGrade} 官方课本核心词汇 (紧扣最新大纲)
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currentData.huanleHuoban.map((unit: any, idx: number) => (
                  <div key={idx} className="bg-[#f2f8f6] rounded-3xl p-8 border border-emerald-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200/50">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {unit.icon}
                      </div>
                      <h3 className="text-lg font-bold text-emerald-800">{unit.title}</h3>
                    </div>
                    <div className="space-y-5">
                      {unit.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="group flex flex-col gap-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[17px] font-bold text-[#211922] group-hover:text-emerald-700 transition-colors">{item.word}</span>
                            <span className="text-xs text-emerald-600/70 font-mono tracking-wide">{item.pinyin}</span>
                          </div>
                          <p className="text-[#62625b] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. 常考成语与词语 (Theme Vocabs / Categories) */}
          {currentData.vocabCategories && currentData.vocabCategories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#211922] mb-8 flex items-center gap-2">
                <Star className="text-yellow-400 w-7 h-7" />
                常考成语与主题词汇
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentData.vocabCategories.map((category: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-[#e5e5e0] hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#211922]">{category.title}</h3>
                    </div>
                    <div className="space-y-6">
                      {category.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="group">
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="text-lg font-bold text-[#e60023] group-hover:text-red-700 transition-colors">{item.word}</span>
                            <span className="text-sm text-[#91918c] font-mono">{item.pinyin}</span>
                          </div>
                          <p className="text-[#62625b] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. 必考关联词 */}
          {currentData.linkingWords && currentData.linkingWords.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#211922] mb-8 flex items-center gap-2">
                <LinkIcon className="text-purple-500 w-7 h-7" />
                必考关联词（造句/阅读）
              </h2>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e5e5e0]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentData.linkingWords.map((item: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#f6f6f3] border border-[#e5e5e0] hover:bg-white transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-[#e60023]">{item.word}</span>
                        <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{item.type}</span>
                      </div>
                      <p className="text-[#62625b] text-sm"><span className="font-bold text-[#4b4b46]">例句：</span>{item.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 4. 易混淆词语辨析 */}
          {currentData.confusedWords && currentData.confusedWords.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#211922] mb-8 flex items-center gap-2">
                <AlertCircle className="text-red-500 w-7 h-7" />
                易混淆词语辨析（选择题必考）
              </h2>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e5e5e0]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentData.confusedWords.map((item: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-red-50/50 border border-red-100 hover:bg-red-50 transition-colors">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.group.map((word: string, wIdx: number) => (
                          <span key={wIdx} className="text-sm font-bold bg-white text-red-700 px-3 py-1.5 rounded-lg shadow-sm border border-red-100">
                            {word}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#62625b] text-sm leading-relaxed"><span className="font-bold text-[#4b4b46]">辨析：</span>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 5. 作文加分好句 */}
          {currentData.goodSentences && currentData.goodSentences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#211922] mb-8 flex items-center gap-2">
                <BookOpen className="text-green-500 w-7 h-7" />
                作文加分好句
              </h2>
              
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {currentData.goodSentences.map((group: any, idx: number) => (
                  <div key={idx} className="break-inside-avoid bg-white rounded-3xl p-8 shadow-sm border border-[#e5e5e0]">
                    <h3 className="text-lg font-bold text-[#211922] mb-4 pb-2 border-b border-gray-100">{group.category}</h3>
                    <ul className="space-y-4">
                      {group.sentences.map((sentence: string, sIdx: number) => (
                        <li key={sIdx} className="flex gap-3">
                          <span className="text-[#e60023] font-serif font-bold text-xl leading-none">"</span>
                          <p className="text-[#4b4b46] leading-relaxed">{sentence}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
