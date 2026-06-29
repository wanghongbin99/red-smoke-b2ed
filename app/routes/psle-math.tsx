import type { Route } from "./+types/psle-math";
import { Calculator, Compass, PieChart, ArrowLeft, Lightbulb, CheckCircle, Shapes, Percent, Activity, FileText, Target, LineChart, BookOpen, AlertTriangle, TrendingUp, Layers } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PSLE Math Syllabus & Knowledge Points - KeEn's Hub" },
    { name: "description", content: "Master PSLE Math with our comprehensive breakdown of syllabus and knowledge points." },
  ];
}

const mathTopics = [
  {
    category: "Numbers & Algebra",
    icon: <Calculator className="w-6 h-6 text-[#435ee5]" />,
    color: "blue",
    topics: [
      { name: "Whole Numbers", desc: "Four operations, order of operations, factors, multiples, and rounding off." },
      { name: "Fractions", desc: "Four operations, fractions as part of a set, division of a proper fraction by a whole number." },
      { name: "Decimals", desc: "Four operations, rounding off, multiplying and dividing by 10, 100, 1000." },
      { name: "Percentage", desc: "Expressing fractions/decimals as percentage, percentage of a quantity, discount, GST, and interest." },
      { name: "Ratio", desc: "Equivalent ratios, ratio of three quantities, changing ratios." },
      { name: "Speed", desc: "Distance, time, speed, average speed, and journey scenarios." },
      { name: "Algebra (P6 only)", desc: "Algebraic expressions in one variable, evaluating expressions, and solving simple equations." }
    ]
  },
  {
    category: "Measurement & Geometry",
    icon: <Compass className="w-6 h-6 text-[#e60023]" />,
    color: "red",
    topics: [
      { name: "Measurement", desc: "Length, mass, volume, time. Conversions between units." },
      { name: "Area & Perimeter", desc: "Square, rectangle, triangle, parallelogram, rhombus, and trapezium." },
      { name: "Volume", desc: "Volume of cube, cuboid, and liquid. Rate of flow." },
      { name: "Angles & Geometry", desc: "Angles on a straight line, at a point, vertically opposite angles. Properties of triangles and quadrilaterals." },
      { name: "Circles (P6 only)", desc: "Radius, diameter, circumference, area, semi-circle, and quarter circle." },
      { name: "Nets (P6 only)", desc: "Nets of cubes, cuboids, prisms, and pyramids." }
    ]
  },
  {
    category: "Statistics",
    icon: <PieChart className="w-6 h-6 text-[#10b981]" />,
    color: "green",
    topics: [
      { name: "Data Analysis", desc: "Reading and interpreting tables, bar graphs, and line graphs." },
      { name: "Pie Charts (P6 only)", desc: "Reading and interpreting pie charts, calculating percentages and angles." }
    ]
  }
];

const examFormat = [
  { 
    paper: "Paper 1 (Booklet A)", 
    type: "Multiple Choice (MCQ)", 
    marks: 20, 
    time: "1 hour (Paper 1 total)", 
    desc: "15 questions (1 & 2 marks each). Calculators are NOT allowed." 
  },
  { 
    paper: "Paper 1 (Booklet B)", 
    type: "Short Answer", 
    marks: 25, 
    time: "1 hour (Paper 1 total)", 
    desc: "15 questions (1 & 2 marks each). Calculators are NOT allowed." 
  },
  { 
    paper: "Paper 2", 
    type: "Short & Long Answer", 
    marks: 55, 
    time: "1 hour 30 minutes", 
    desc: "17 questions (2 to 5 marks each). Calculators ARE allowed. Show all workings clearly." 
  }
];

export default function PsleMath() {
  const [activeTab, setActiveTab] = useState<"syllabus" | "format" | "analysis">("syllabus");

  return (
    <div className="min-h-screen bg-[#f6f6f3] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 py-8 mb-4">
          <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-[#211922] tracking-tight">PSLE Math Hub</h1>
            <p className="text-[#62625b] mt-2 text-lg">Master the Syllabus & Conquer the Exam</p>
          </div>
        </header>

        {/* Custom Tabs */}
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
          <button 
            onClick={() => setActiveTab("syllabus")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "syllabus" ? "bg-[#435ee5] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Syllabus (知识点大纲)
          </button>
          <button 
            onClick={() => setActiveTab("format")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "format" ? "bg-[#e60023] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Exam Format (考试题型)
          </button>
          <button 
            onClick={() => setActiveTab("analysis")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "analysis" ? "bg-purple-600 text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Paper Analysis (试卷深度解析)
          </button>
        </div>

        {activeTab === "syllabus" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            {mathTopics.map((section, idx) => (
              <section key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white border border-gray-100`}>
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#211922]">{section.category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className={`w-5 h-5 ${section.color === 'blue' ? 'text-blue-500' : section.color === 'red' ? 'text-red-500' : 'text-green-500'}`} />
                        <h3 className="text-xl font-bold text-gray-900">{topic.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{topic.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl mt-8 flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 text-yellow-600">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Heuristics & Problem Solving</h3>
                <p className="text-yellow-800 leading-relaxed">
                  Apart from the basic syllabus, PSLE Math heavily tests your ability to solve complex word problems using heuristics. Common methods include <strong>Model Drawing</strong>, <strong>Guess & Check</strong>, <strong>Working Backwards</strong>, <strong>Before & After</strong>, and <strong>Looking for a Pattern</strong>. Make sure you practice these techniques across different topics!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "format" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">PSLE Math Exam Structure</h2>
              </div>
              
              <div className="space-y-6">
                {examFormat.map((format, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="md:w-1/3">
                      <h3 className="text-xl font-bold text-gray-900">{format.paper}</h3>
                      <p className="text-[#e60023] font-semibold mt-1">{format.type}</p>
                    </div>
                    <div className="md:w-1/3 border-l-0 md:border-l border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 md:pl-6">
                      <p className="text-gray-900 font-bold text-lg">{format.marks} Marks</p>
                      <p className="text-gray-500 text-sm mt-1">Duration: {format.time}</p>
                    </div>
                    <div className="md:w-1/3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-gray-700 text-sm leading-relaxed">{format.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shapes className="w-6 h-6 text-[#435ee5]" /> Important Reminders
                 </h3>
                 <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                       <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">1</span>
                       <span><strong>Show all workings clearly</strong> in Paper 2. Method marks are often awarded even if the final answer is wrong.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">2</span>
                       <span><strong>Units matter.</strong> Always remember to write down your final units (e.g., cm, kg, $) in your answers. Missing units can result in a deduction of marks.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">3</span>
                       <span><strong>Time management</strong> is critical. Don't spend too much time on a single tough question in Paper 1. Skip it, move on, and come back to it later.</span>
                    </li>
                 </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
            {/* 1. 基础概念与数感 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">1. 基础概念与数感 (Paper 1 基础题)</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-4 font-medium">主要考查学生快速、准确的基本运算与数感判断：</p>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-gray-600"><span className="text-[#435ee5] font-bold shrink-0">小数数位：</span> 如第1题辨别小数点后“百分位”（hundredths place）的数字。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#435ee5] font-bold shrink-0">数量单位换算与排序：</span> 第6题要求对千克、克、带分数重量进行从轻到重排序。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#435ee5] font-bold shrink-0">约数与倍数：</span> 第14题考查利用最大公约数进行物品均分包装（Cream vs Mint cookies）。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#435ee5] font-bold shrink-0">四则混合运算：</span> 第21(a)题考查带括号的整数四则混合运算顺序。</li>
                </ul>
              </div>
            </section>

            {/* 2. 三维空间与几何图形 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white shadow-md">
                  <Shapes className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">2. 三维空间与几何图形 (Geometry & Visualisation)</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-4 font-medium">几何和空间想象力是本卷的一大亮点，多道题目极具辨识度：</p>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-gray-600"><span className="text-[#10b981] font-bold shrink-0">垂直与平行：</span> 第2题结合网格考查线段之间的垂直关系。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#10b981] font-bold shrink-0">角度计算：</span> 第10题考查直线相交的对顶角及邻角关系；Paper 2 第12题考查平行四边形与菱形结合后的复杂角度推导。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#10b981] font-bold shrink-0">立体几何：</span> 第13题考查被刷红漆后“只有2面染上红色”的小方块数量；第26题考查根据“侧视图”画出“俯视图”并计算所需方块数。</li>
                  <li className="flex gap-2 text-gray-600"><span className="text-[#10b981] font-bold shrink-0">轴对称图形：</span> Paper 2 第2题要求在网格中根据对称轴补全图形。</li>
                </ul>
              </div>
            </section>

            {/* 3. 数据分析与图表理解 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <LineChart className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">3. 数据分析与图表理解 (Data Analysis)</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-2">折线图</h3>
                  <p className="text-purple-900 text-sm">第20题考查读取植物高度；Paper 2 第11题利用折线图结合阶梯式水费计算（典型生活应用）。</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-2">扇形图</h3>
                  <p className="text-purple-900 text-sm">第11题考查根据扇形图的直角及总数比例，推导占总数 1/5 的兴趣小组。</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-2">条形图</h3>
                  <p className="text-purple-900 text-sm">Paper 2 第14题通过条形图比例反推周五借书量，以及结合百分比求周三的小说借阅量。</p>
                </div>
              </div>
            </section>

            {/* 4. 高阶应用题 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">4. 高阶应用题 (Word Problems - 核心拉分项)</h2>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-6 font-medium text-lg">Paper 2 的大题体现了经典的 PSLE 启发式解题思维 (Heuristics)：</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">不变量模型 (Unchanged Quantity)</strong>
                      <p className="text-gray-600 text-sm mt-1">第6题利用“加了红球，黄球数量保持不变”的原理，通过百分比转化为比例 (Ratio) 快速求解。</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">差量不变量模型 (Difference Unchanged)</strong>
                      <p className="text-gray-600 text-sm mt-1">第3题考查“男女/红蓝笔各增加相同数量，其差量保持不变”。</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">等分子解题法 (Equal Numerator)</strong>
                      <p className="text-gray-600 text-sm mt-1">第8题通过两人剩下的贴纸数量相等，利用分子化为相同来对齐总份数。</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">复杂速度与追及 (Speed)</strong>
                      <p className="text-gray-600 text-sm mt-1">第5题和第13(b)题考查同一路段行驶的路程差与时间关系，以及相向而行时的运动距离。</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">代数式表达 & 平均数综合</strong>
                      <p className="text-gray-600 text-sm mt-1">代数考查含有未知数 m 的最简式；平均数考查给出差值后的整体与部分加权平均计算。</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#e60023] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">最优化组合 (Optimization)</strong>
                      <p className="text-gray-600 text-sm mt-1">第16(b)题结合“Majulah Singapura 代金券”，考查如何组合使用才能使“付出的现金最少”。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. 压轴几何难题 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">5. 压轴几何难题 (Paper 2 第17题)</h2>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h3 className="font-bold text-orange-900 mb-2">(a) 割补与面积比例</h3>
                  <p className="text-orange-800 text-sm leading-relaxed">给出三个相同的长方形，已知阴影三角形面积，求阴影与非阴影部分的面积差。官方答案巧妙利用“阴影三角形占总面积的 1/6”，通过份数差（5/6 - 1/6 = 4/6）直接秒杀，避免了繁琐设未知数。</p>
                </div>
                <div className="md:w-1/2">
                  <h3 className="font-bold text-orange-900 mb-2">(b) 圆与正方形的重叠（几何怪兽）</h3>
                  <p className="text-orange-800 text-sm leading-relaxed">三个圆和三个正方形相切重叠。极高图形拆解要求：将阴影拆解为 7 个四分之一圆和 1 个正方形，将非阴影引入“回力镖形”(Boomerang)，通过两者相减抵消，转化为易求面积。</p>
                </div>
              </div>
            </section>

            {/* 特点与备考建议 */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#435ee5]" /> 试卷命题特点
                </h3>
                <ul className="space-y-4 text-gray-700 text-sm">
                  <li className="leading-relaxed"><strong>紧贴本地现实生活情境：</strong> 大量以新加坡日常生活为背景，如健步走计划、梯级水费账单、国庆代金券。考察真实世界中解决实际问题的能力。</li>
                  <li className="leading-relaxed"><strong>极度重视比例与百分比的互相转化：</strong> 在不变量模型、扇形统计图、联立题中，要求学生在百分比与比例份数模型间无缝切换，这是核心技术特点。</li>
                  <li className="leading-relaxed"><strong>防陷阱与逻辑严密性：</strong> 如求平均数时，包含“0”的数字不可漏算数量（除以4而非3），在基础题就埋下针对学习习惯的考查点。</li>
                </ul>
              </div>

              <div className="bg-[#211922] p-8 rounded-3xl text-white shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#e60023]">
                  <AlertTriangle className="w-6 h-6" /> 备考建议
                </h3>
                <ul className="space-y-4 text-gray-300 text-sm">
                  <li className="leading-relaxed"><strong className="text-white">Paper 1 追求“零失误”与高速度：</strong> 前30分基础题如果因粗心丢分会非常致命。</li>
                  <li className="leading-relaxed"><strong className="text-white">吃透 Heuristics（启发式解题五大模型）：</strong> 尤其是“差不变”、“量不变”和“等分子”，这些是 Paper 2 每年必考的拉分点。</li>
                  <li className="leading-relaxed"><strong className="text-white">强化复杂几何图形的“割补法”与“标记法”：</strong> 不要盲目代入公式死算，学会图形命名，通过区域加减法将未知转化为已知来做差。</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
