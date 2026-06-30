import type { Route } from "./+types/psle-math-topic";
import { Link, redirect } from "react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle, Lightbulb, HelpCircle, Eye, EyeOff } from "lucide-react";
import { mathTopicsData } from "../data/math-topics";

export function loader({ params }: Route.LoaderArgs) {
  const topicId = params.topicId;
  const topicData = mathTopicsData.find(t => t.id === topicId);
  
  if (!topicData) {
    throw redirect("/math-syllabus");
  }

  return { topic: topicData };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.topic?.title} - PSLE Math - KeEn's Hub` },
    { name: "description", content: `Learn and practice ${data?.topic?.title} for PSLE Math.` },
  ];
}

export default function MathTopic({ loaderData }: Route.ComponentProps) {
  const { topic } = loaderData;
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f6f6f3] p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 py-8 mb-4">
          <Link to="/math-syllabus" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-[#211922] tracking-tight">{topic.title}</h1>
            <p className="text-[#62625b] mt-2 text-lg">Detailed Explanation & Practice Questions</p>
          </div>
        </header>

        {/* Explanation Section */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#211922]">Concept Explanation</h2>
          </div>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <div className="text-gray-800 text-lg leading-relaxed">
              {topic.explanation}
            </div>
          </div>
        </section>

        {/* Practice Questions */}
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#211922]">Practice Questions</h2>
            <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full ml-2">
              {topic.questions.length} Questions
            </span>
          </div>

          <div className="space-y-6">
            {topic.questions.map((q, idx) => {
              const isRevealed = showAnswers[idx];
              
              return (
                <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0 mt-0.5">
                      Q{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-relaxed">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid md:grid-cols-2 gap-3 pl-12 mb-6">
                    {q.options.map((opt, optIdx) => {
                      const isCorrectAnswer = opt === q.answer;
                      let btnClass = "px-4 py-3 rounded-xl border text-left transition-colors text-gray-700 font-medium ";
                      
                      if (isRevealed) {
                        if (isCorrectAnswer) {
                          btnClass += "bg-green-50 border-green-500 text-green-900 shadow-sm";
                        } else {
                          btnClass += "bg-gray-50 border-gray-200 opacity-60";
                        }
                      } else {
                        btnClass += "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300";
                      }

                      return (
                        <div key={optIdx} className={btnClass}>
                          <span className="mr-3 font-bold text-gray-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {opt}
                          {isRevealed && isCorrectAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-500 inline float-right" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action & Explanation */}
                  <div className="pl-12 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => toggleAnswer(idx)}
                      className="flex items-center gap-2 text-sm font-bold text-[#435ee5] hover:text-blue-700 transition-colors"
                    >
                      {isRevealed ? (
                        <><EyeOff className="w-4 h-4" /> Hide Answer</>
                      ) : (
                        <><Eye className="w-4 h-4" /> Show Answer & Explanation</>
                      )}
                    </button>

                    {isRevealed && (
                      <div className="mt-4 bg-green-50 p-5 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <h4 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" /> Explanation
                        </h4>
                        <p className="text-green-900 text-sm leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
