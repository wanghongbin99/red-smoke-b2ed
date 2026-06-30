import type { Route } from "./+types/psle-science";
import { ArrowLeft, Lightbulb, FileText, Target, Microscope, Leaf, FlaskConical, Globe, Zap, Settings, Activity, Calendar, ListChecks, AlertCircle, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PSLE Science Syllabus & Knowledge Points - KeEn's Hub" },
    { name: "description", content: "Master PSLE Science with our comprehensive breakdown of syllabus and knowledge points (2026 Latest Format)." },
  ];
}

const scienceThemes = [
  {
    category: "Diversity (多样性)",
    icon: <Globe className="w-6 h-6 text-[#10b981]" />,
    color: "green",
    topics: [
      { name: "Living & Non-Living Things", desc: "Characteristics of living things. Classifying plants, animals, fungi, and bacteria." },
      { name: "Materials", desc: "Properties of materials (strength, flexibility, waterproof, transparency) and their uses." }
    ]
  },
  {
    category: "Cycles (循环)",
    icon: <Leaf className="w-6 h-6 text-[#8b5cf6]" />,
    color: "purple",
    topics: [
      { name: "Life Cycles", desc: "Life cycles of plants and animals (3-stage and 4-stage)." },
      { name: "Matter", desc: "States of matter (solid, liquid, gas) and their properties." },
      { name: "Water Cycle", desc: "Evaporation, condensation, melting, freezing, boiling. Role of the water cycle." },
      { name: "Reproduction", desc: "Reproduction in plants (pollination, fertilization, dispersal) and humans." }
    ]
  },
  {
    category: "Systems (系统)",
    icon: <Settings className="w-6 h-6 text-[#f59e0b]" />,
    color: "yellow",
    topics: [
      { name: "Plant Systems", desc: "Plant parts and their functions (roots, stems, leaves)." },
      { name: "Human Systems", desc: "Digestive, respiratory, and circulatory systems." },
      { name: "Electrical Systems", desc: "Simple circuits, conductors and insulators, circuit diagrams." },
      { name: "Note: Cells Removed", desc: "The topic of 'Cells' has been removed from the 2026 onwards primary science syllabus." }
    ]
  },
  {
    category: "Interactions (相互作用)",
    icon: <Activity className="w-6 h-6 text-[#e60023]" />,
    color: "red",
    topics: [
      { name: "Magnets", desc: "Properties of magnets, magnetic and non-magnetic materials." },
      { name: "Forces", desc: "Friction, gravity, elastic spring force, and magnetic force." },
      { name: "Environment", desc: "Adaptations, food chains and food webs, environmental impact." }
    ]
  },
  {
    category: "Energy (能量)",
    icon: <Zap className="w-6 h-6 text-[#435ee5]" />,
    color: "blue",
    topics: [
      { name: "Light", desc: "Light travelling in straight lines, reflection, shadows." },
      { name: "Heat", desc: "Heat and temperature, heat transfer (conduction, convection, radiation)." },
      { name: "Forms & Uses of Energy", desc: "Kinetic, potential, electrical, light, and heat energy. Energy conversion." },
      { name: "Photosynthesis", desc: "How plants make food using light energy." }
    ]
  }
];

const examFormat = [
  { 
    paper: "Booklet A", 
    type: "Multiple Choice (MCQ)", 
    marks: 60, 
    time: "Part of 1h 45m", 
    desc: "30 questions (2 marks each). Tests conceptual understanding and application." 
  },
  { 
    paper: "Booklet B", 
    type: "Open-Ended (OEQ)", 
    marks: 40, 
    time: "Part of 1h 45m", 
    desc: "10-11 structured questions. Requires demonstration of the '3 INs' (Inspired, Inquire, Innovate), evaluating claims, and logical argumentation." 
  },
  { 
    paper: "Total Assessment", 
    type: "Combined", 
    marks: 100, 
    time: "1 hour 45 minutes", 
    desc: "Emphasizes scientific inquiry, interpreting information, making predictions, and constructing scientific explanations." 
  }
];

export default function PsleScience() {
  const [activeTab, setActiveTab] = useState<"syllabus" | "format" | "analysis">("syllabus");

  return (
    <div className="min-h-screen bg-[#f6f6f3] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 py-8 mb-4">
          <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-[#211922] tracking-tight">PSLE Science Hub</h1>
            <p className="text-[#62625b] mt-2 text-lg">Master the Syllabus & Conquer the Exam (2026 Latest Format)</p>
          </div>
        </header>

        {/* Custom Tabs */}
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveTab("syllabus")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === "syllabus" ? "bg-[#e60023] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Syllabus (知识点大纲)
          </button>
          <button 
            onClick={() => setActiveTab("format")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === "format" ? "bg-[#e60023] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Exam Format (考试题型)
          </button>
          <button 
            onClick={() => setActiveTab("analysis")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === "analysis" ? "bg-[#e60023] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Study Strategy (备考策略)
          </button>
        </div>

        {/* Tab Contents */}
        <div className="transition-all duration-300">
          {activeTab === "syllabus" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
              {scienceThemes.map((theme, i) => (
                <div key={i} className={`bg-white rounded-3xl p-6 shadow-sm border-t-4 hover:shadow-md transition-shadow border-${theme.color}-500`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl bg-${theme.color}-50`}>
                      {theme.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{theme.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {theme.topics.map((topic, j) => (
                      <div key={j} className="flex gap-3 items-start group">
                        <div className={`w-2 h-2 mt-2 rounded-full bg-${theme.color}-400 flex-shrink-0 group-hover:scale-150 transition-transform`} />
                        <div>
                          <h4 className="font-bold text-gray-800">{topic.name}</h4>
                          <p className="text-gray-500 text-sm mt-1 leading-relaxed">{topic.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "format" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="text-[#e60023]" />
                  2026 New Assessment Format
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {examFormat.map((format, i) => (
                    <div key={i} className="border border-gray-100 p-6 rounded-2xl hover:border-[#e60023] transition-colors bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-extrabold text-xl">{format.paper}</h3>
                        <span className="bg-[#e60023] text-white text-xs px-2 py-1 rounded-full font-bold">
                          {format.marks} Marks
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <FileText className="w-4 h-4" /> {format.type}
                        </p>
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Target className="w-4 h-4" /> {format.time}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{format.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">The "3 INs" Framework & CER Technique</h3>
                    <p className="text-gray-500 text-sm">Understanding what PSLE Science really tests</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      The syllabus strongly emphasizes <b>inquiry-based learning</b> over rote memorization.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /> <span><b>Inspired by Science:</b> Show curiosity and engagement.</span></li>
                      <li className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /> <span><b>Inquire like Scientists:</b> Ask questions, analyze data, and reason logically.</span></li>
                      <li className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /> <span><b>Innovate using Science:</b> Apply concepts to new, real-world problems.</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      For Booklet B (Open-Ended Questions), master the <b>CER framework</b>:
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-[#e60023] mt-0.5">C</span>
                        <span><b>Claim:</b> Directly answer the question based on observation.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#e60023] mt-0.5">E</span>
                        <span><b>Evidence:</b> Cite specific data or observations from the given scenario.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#e60023] mt-0.5">R</span>
                        <span><b>Reasoning:</b> Link evidence back to the underlying scientific concept.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Realistic Revision Plan</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Adjust your strategy based on your timeline:</p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">Early Starters (P5 / Early P6)</h4>
                    <p className="text-gray-600 text-sm">Focus on topic mastery and concept clarity. Steady revision, short practices (10-15 Qs), and regular correction.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">Late Starters (Near Prelims)</h4>
                    <p className="text-gray-600 text-sm">Target high-frequency weak topics, review errors from school papers, and do timed practice.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Effective Topic Revision</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span><b>Group into Clusters:</b> Connect ideas by revising related chapters together (e.g., Diversity & Interactions).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span><b>Smart Notes:</b> Write key concepts, common confusion points, one example question, and a personal mistake to avoid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span><b>Review Experiments:</b> Ask 3 questions: What was changed? What was measured? What should be kept the same?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                  <ListChecks className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Practice Strategy</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span><b>MCQs:</b> Expose misconceptions quickly. Review both wrong answers and <i>guessed</i> correct answers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span><b>OEQs:</b> Test application. Ensure answers connect concept, evidence, and context exactly as asked.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span><b>Mistake Log:</b> Record topic, question type, what went wrong, and the corrected idea. Spot patterns.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Common Mistakes to Avoid</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span><b>Passive Rereading:</b> Don't just read. Close the book and explain out loud, draw it, or answer a question from memory (Retrieval Practice).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span><b>Over-Helping:</b> Parents shouldn't feed answers. Prompt instead: "What topic is this?", "What does the graph show?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span><b>Ignoring Patterns:</b> Don't just pile up completed papers. Analyze if marks are lost due to content, misreading, or experimental setup issues.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
