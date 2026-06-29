import type { Route } from "./+types/psle-english";
import { BookOpen, CheckCircle, ArrowLeft, PenTool, Target, ListChecks, Lightbulb, MessageSquare, BookType, Feather, Search } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { vocabWords } from "../data/psle-vocab";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "PSLE English Vocab, Grammar & Writing - KeEn's Hub" },
		{ name: "description", content: "Master PSLE English with our curated vocabulary, grammar, and situational writing guide." },
	];
}

const grammarRules = [
  { rule: "Subject-Verb Agreement", explanation: "A singular subject takes a singular verb, and a plural subject takes a plural verb. Be careful with complex sentences, collective nouns, indefinite pronouns like 'everyone' or 'nobody' (always singular), and compound subjects.", example: "The box of chocolates is on the table. (Not 'are', because 'box' is the singular subject)." },
  { rule: "Mastering Verb Tenses", explanation: "Use tenses accurately and avoid tense inconsistency. Simple present is for habits/facts. Simple past is for completed actions. Present perfect is for past actions with present relevance.", example: "She has lived in Singapore for ten years. (Present perfect - action began in the past and is still relevant)." },
  { rule: "Punctuation Rules That Make a Difference", explanation: "Have a firm grasp of the full stop, comma, question mark, exclamation mark, apostrophe, and speech marks. Possessive pronouns like 'its', 'yours', and 'theirs' never take an apostrophe.", example: "The teacher's pen (possessive) vs. can't (contraction of cannot)." },
  { rule: "Using Pronouns Correctly", explanation: "Pronouns must match their noun in number and gender (pronoun-antecedent agreement). Do not confuse subject pronouns (I, he, she, they) with object pronouns (me, him, her, them).", example: "My friend and I went to the park. (Not 'Me and my friend went to the park')." },
  { rule: "Articles: A, An, and The", explanation: "'A' and 'an' are used for non-specific items or referring to something for the first time. 'The' is used when both speaker and listener know exactly what is being referred to. Use 'an' before words that begin with a vowel sound.", example: "an hour (silent 'h') vs. a university ('yoo' sound)." },
  { rule: "Prepositions and How to Use Them", explanation: "Prepositions show relationships of time, place, and direction. For time: 'at' for specific times, 'on' for days/dates, 'in' for longer periods. For place: 'at' for specific points, 'in' for enclosed spaces, 'on' for surfaces.", example: "at 3 o'clock, on Monday, in the morning, at the bus stop, in the room, on the table." },
  { rule: "Sentence Structure and Clarity", explanation: "Avoid sentence fragments (incomplete sentences missing a subject or verb) and run-on sentences. Vary sentence structures by using simple, compound, and complex sentences to make writing engaging.", example: "A grammatically correct sentence must contain a subject and a predicate, and it must express a complete thought." },
  { rule: "Neither/Nor and Either/Or", explanation: "When two subjects are joined by 'neither...nor' or 'either...or', the verb agrees with the subject closest to it.", example: "Neither the teacher nor the students are ready. Neither the students nor the teacher is ready." },
  { rule: "Relative Pronouns (Who vs. Whom)", explanation: "'Who' is used as a subject, while 'whom' is used as an object.", example: "The boy who won the race is my friend. The man whom I saw yesterday is my uncle." }
];

const situationalCriteria = [
  { title: "Format", desc: "Did you use the correct format for the type of writing (Formal/Informal Email, Letter, Report, Article)?" },
  { title: "Tone", desc: "Did you use a suitable formal or informal tone according to your audience?" },
  { title: "Clarity & Conciseness", desc: "Is your writing clear and concise? Avoid long or jumbled sentences." },
  { title: "Content", desc: "Are all given points in the question included? Did you generate at least one original idea not in the stimulus (2025/2026 syllabus)? " },
  { title: "Language Use", desc: "Is your writing free from grammatical and spelling errors? Is your range of vocabulary wide?" }
];

const situationalSteps = [
  { step: "Step 1: Analyse the prompt", desc: "Do not dive into writing straight away. Identify the Purpose, Audience, Context, and Sign-off." },
  { step: "Step 2: Identify key information", desc: "Highlight facts, events, and given content points in the prompt." },
  { step: "Step 3: Outline your writing", desc: "Sequence your ideas in logical order (Intro, Body, Conclusion). Stick to three main points." },
  { step: "Step 4: Write", desc: "Draft your piece in the proper format, tone and language." },
  { step: "Step 5: Proofread", desc: "Check grammar, spelling, punctuation, and clarity. Ensure all points are addressed." }
];

const continuousSteps = [
  { step: "Step 1: Understand the prompt", desc: "Highlight keywords. Ask yourself: What is the main event? Who are the characters? What is the setting?" },
  { step: "Step 2: Brainstorm & Generate Ideas", desc: "Use the 5W1H method (Who, What, When, Where, Why and How) to develop your ideas." },
  { step: "Step 3: Plan your Narrative Arc", desc: "Structure: Introduction -> Build-up -> Climax (turning point) -> Falling action -> Conclusion (reflection)." },
  { step: "Step 4: Write engagingly", desc: "Bring the story to life using the Five Senses (sight, smell, hearing, taste, touch), Dialogue, and Varied sentence types." },
  { step: "Step 5: Proofread", desc: "Read your writing aloud to catch awkward phrases, missing words, and check grammar/tenses." }
];

const continuousSample = [
  { text: "The aroma of chocolate wafted through the kitchen as I placed the final candle on the cake. It was my mother's birthday, and I had spent the whole afternoon baking her favourite chocolate fudge cake. The living room was decorated with balloons and streamers, and everything was ready, except for one important thing: she was not home yet.", tip: "Five Senses (Smell) & Setting the scene / Build-up" },
  { text: "Suddenly, the door creaked open. 'Surprise!' I shouted. But it was not my mother. A man with a scruffy beard and a worn-out coat stood in the doorway, blinking in confusion. I froze.", tip: "Climax: The unexpected turning point" },
  { text: "'I... I'm sorry,' he mumbled. 'I think I have the wrong house.'", tip: "Dialogue brings characters to life" },
  { text: "Something about the man tugged at my heart. He looked cold, tired and very hungry. After a moment's hesitation, I said, 'Would you like a slice of cake?'", tip: "Character's emotions & Falling action" },
  { text: "His eyes widened. 'Are you sure?' he asked in disbelief. I nodded. He stepped in cautiously. As we sat down, he told me his name was Uncle Roshan and he used to live in this neighbourhood years ago. He had just returned from overseas and was now jobless.", tip: "Development and description of the character" },
  { text: "My mother returned not long after and was surprised to find us chatting over cake. After hearing the story, she smiled and said, 'Perhaps this was meant to be.'", tip: "Resolution: The mother returns" },
  { text: "That birthday turned out to be unforgettable, not because of the cake but because of the unexpected guest who reminded us of the importance of being kind.", tip: "Conclusion: Reflection and key message" }
];

export default function PsleEnglish() {
  const [activeTab, setActiveTab] = useState<"vocab" | "writing" | "analysis">("vocab");
  const [writingTab, setWritingTab] = useState<"situational" | "continuous">("situational");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredVocab = vocabWords.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.chinese && item.chinese.includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-[#f6f6f3] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 py-8 mb-4">
          <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-[#211922] tracking-tight">PSLE English Mastery</h1>
            <p className="text-[#62625b] mt-2 text-lg">Essential Vocabulary, Grammar & Writing Rules</p>
          </div>
        </header>

        {/* Custom Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
          <button 
            onClick={() => setActiveTab("vocab")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "vocab" ? "bg-[#e60023] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            词汇与语法 (Vocab & Grammar)
          </button>
          <button 
            onClick={() => setActiveTab("writing")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "writing" ? "bg-[#435ee5] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            作文写作 (Writing)
          </button>
          <button 
            onClick={() => setActiveTab("analysis")}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === "analysis" ? "bg-[#10b981] text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Target className="w-5 h-5" /> 名校试卷分析 (Exam Analysis)
          </button>
        </div>

        {activeTab === "vocab" && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Vocabulary Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#211922]">Must-Know Vocabulary ({vocabWords.length})</h2>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search vocabulary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full md:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#435ee5] focus:border-[#435ee5] sm:text-sm shadow-sm transition-shadow"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVocab.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[#e60023]">{item.word}</h3>
                      {item.chinese && <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{item.chinese}</span>}
                    </div>
                    <p className="text-gray-700 font-medium mb-4 text-sm">{item.meaning}</p>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-gray-600 text-sm italic">"{item.example}"</p>
                    </div>
                  </div>
                ))}
                {filteredVocab.length === 0 && (
                  <div className="col-span-full py-8 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
                    No words found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </section>

            {/* Grammar Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">Common Grammar Rules</h2>
              </div>

              <div className="space-y-6">
                {grammarRules.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-bold text-[#211922] mb-2">{item.rule}</h3>
                      <p className="text-gray-500 text-sm">{item.explanation}</p>
                    </div>
                    <div className="md:w-2/3 bg-green-50 p-6 rounded-2xl border border-green-100 w-full">
                      <p className="text-green-800 font-medium text-sm leading-relaxed">{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "writing" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Writing Sub-tabs */}
            <div className="flex gap-6 mb-8 border-b border-gray-200">
              <button 
                onClick={() => setWritingTab("situational")}
                className={`pb-4 font-bold text-lg border-b-2 transition-colors ${writingTab === "situational" ? "border-[#435ee5] text-[#435ee5]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Situational Writing (情景作文)
              </button>
              <button 
                onClick={() => setWritingTab("continuous")}
                className={`pb-4 font-bold text-lg border-b-2 transition-colors ${writingTab === "continuous" ? "border-[#e60023] text-[#e60023]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Continuous Writing (命题作文)
              </button>
            </div>

            {/* Situational Writing Content */}
            {writingTab === "situational" && (
              <div className="space-y-12">
                {/* Scoring Criteria */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
                      <Target className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#211922]">Key Scoring Criteria (评分标准)</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {situationalCriteria.map((item, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-[#435ee5] mb-2">{item.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Step by step */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#211922]">Step-by-Step Approach (写作步骤)</h2>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                      {situationalSteps.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#435ee5] flex items-center justify-center font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{item.step}</h3>
                            <p className="text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 bg-yellow-50 border border-yellow-100 p-6 rounded-2xl">
                      <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" /> Pro Tip: Use PACS to analyse prompts!
                      </h4>
                      <ul className="text-yellow-900 text-sm space-y-2">
                        <li><strong className="font-bold">P</strong> - Purpose (Why are you writing?)</li>
                        <li><strong className="font-bold">A</strong> - Audience (Who are you writing to?)</li>
                        <li><strong className="font-bold">C</strong> - Context (Formal or Informal?)</li>
                        <li><strong className="font-bold">S</strong> - Sign-off (Who are you signing off as?)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Practice Example */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#435ee5] rounded-xl flex items-center justify-center text-white shadow-md">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#211922]">Example Practice: Drama Club Email</h2>
                  </div>
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-gray-50 p-8 border-r border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Your Task</h3>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        Imagine you are Anita. Write an email to the teacher in charge of Drama Club to use the school hall for practice.
                      </p>
                      <div className="space-y-2 mb-6">
                        <p className="text-sm font-bold text-gray-900">Include the following key information:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>what the reason for writing in is</li>
                          <li>why you need to use the school hall</li>
                          <li>how you will keep the school hall clean</li>
                          <li><span className="underline font-semibold">what you will be rehearsing</span></li>
                          <li>how this rehearsal will lead to a school performance</li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-blue-50/30">
                      <h3 className="font-bold text-blue-800 text-lg mb-4">PACS Analysis</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex">
                          <span className="font-bold text-blue-600 w-24 flex-shrink-0">P (Purpose):</span>
                          <span className="text-gray-700 text-sm">Write an email to the teacher in charge of Drama Club to use the school hall for practice.</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex">
                          <span className="font-bold text-blue-600 w-24 flex-shrink-0">A (Audience):</span>
                          <span className="text-gray-700 text-sm">Teacher in charge of Drama Club</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex">
                          <span className="font-bold text-blue-600 w-24 flex-shrink-0">C (Context):</span>
                          <span className="text-gray-700 text-sm">Formal</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex">
                          <span className="font-bold text-blue-600 w-24 flex-shrink-0">S (Sign-off):</span>
                          <span className="text-gray-700 text-sm">Anita Desai</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Good Example Email */}
                  <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-[#211922] text-xl mb-6 flex items-center gap-2">
                      <Feather className="w-6 h-6 text-[#435ee5]" /> Good Example: Email to Drama Club Teacher
                    </h3>
                    <div className="bg-gray-50 p-8 rounded-2xl font-serif text-gray-800 leading-relaxed border border-gray-100">
                      <p className="mb-2"><strong className="font-sans text-gray-500 text-sm uppercase">To:</strong> Mr Tan Kim Long (Tan_Kim_Long@schools.com)</p>
                      <p className="mb-6"><strong className="font-sans text-gray-500 text-sm uppercase">Subject:</strong> Request to Use the School Hall for Drama Practice</p>
                      
                      <p className="mb-4">Dear Mr Tan,</p>
                      
                      <p className="mb-4">
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded mr-2 align-middle">CP1: Reason</span>
                        I am writing to request permission to use the school hall for our drama rehearsal on Wednesday, 4 September, from 2 p.m. to 4 p.m.
                      </p>
                      
                      <p className="mb-4">
                        <span className="inline-block bg-green-100 text-green-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded mr-2 align-middle">CP2: Why need hall</span>
                        We need a spacious area to practise our movements and the hall is the most suitable location. We have checked the booking for the other practice rooms and they are fully booked.
                      </p>

                      <p className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded mr-2 align-middle">CP3: Keep clean</span>
                        At the same time, I assure you that we will take care of the equipment and clean up the hall after the session. We will also put back all the furniture in order, switch off the lights and ensure that the curtains are closed.
                      </p>

                      <p className="mb-4">
                        <span className="inline-block bg-purple-100 text-purple-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded mr-2 align-middle">CP4: What rehearsing</span>
                        We will be rehearsing the play <em>Romeo and Juliet</em> and would require the school hall for two hours. All Drama Club members, including the teachers in charge and instructors, will be present during the rehearsal.
                      </p>

                      <p className="mb-6">
                        <span className="inline-block bg-pink-100 text-pink-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded mr-2 align-middle">CP5: Lead to performance</span>
                        Please allow us to use the school hall and rehearse our play, as this would lead to our school performance for Teacher's Day. It is a way for us to honour our teachers, as we will put in the time and effort to make the play a good and enjoyable one.
                      </p>

                      <p className="mb-4">Please let me know if we are allowed to proceed.</p>
                      <p className="mb-6">Thank you.</p>

                      <p className="mb-0">Yours sincerely,</p>
                      <p className="mb-0">Anita Desai</p>
                      <p className="mb-0 text-gray-500">Drama Club Secretary</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Continuous Writing Content */}
            {writingTab === "continuous" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Step by step */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#211922]">Step-by-Step Approach (命题作文步骤)</h2>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                      {continuousSteps.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-red-50 text-[#e60023] flex items-center justify-center font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{item.step}</h3>
                            <p className="text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" /> The 5W1H Method
                        </h4>
                        <p className="text-blue-900 text-sm">Who, What, When, Where, Why, and How. Use this to brainstorm and expand your core storyline.</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl">
                        <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5" /> Narrative Arc
                        </h4>
                        <p className="text-purple-900 text-sm">Introduction → Build-up → Climax (most exciting part) → Falling Action → Conclusion.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sample Essay */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#e60023] rounded-xl flex items-center justify-center text-white shadow-md">
                      <BookType className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#211922]">Sample Essay: An Unexpected Guest</h2>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 bg-gray-50 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 text-center font-serif">An Unexpected Guest</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {continuousSample.map((item, idx) => (
                        <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors">
                          <div className="md:w-2/3 font-serif text-gray-800 text-lg leading-relaxed">
                            {item.text}
                          </div>
                          <div className="md:w-1/3">
                            <div className="bg-red-50 border border-red-100 px-4 py-3 rounded-xl flex items-start gap-3 h-full">
                              <MessageSquare className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-red-900 text-sm font-medium">{item.tip}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            
            {/* Header Section */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-3xl p-8 md:p-10 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-4">2025 ACS (Junior) P6 Prelim English Analysis</h2>
              <p className="text-indigo-100 leading-relaxed text-lg">
                这份由新加坡英华自主小学（JUNIOR）提供的2025年小学六年级（Primary 6）英文预考（Preliminary Examination）试卷，是极具代表性的PSLE（小六离校证书）黄金风向标。新加坡的PSLE英文科非常注重学生的语言精准度、语境理解力以及思辨能力。以下是结合PSLE核心考点，对这份试卷的深度分析：
              </p>
            </div>

            {/* Part 1: Structure */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="font-bold">1</span>
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">试卷结构与PSLE核心考点映射</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Grammar & Vocab MCQ */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 border-b border-gray-100 pb-3">语法与词汇选择题 (Grammar & Vocab MCQ)</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-lg">Q1–Q15</div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">主谓一致 (Subject-Verb Agreement):</strong> 如Q1考查 <em>Neither... nor...</em> 的就近原则，邻近主语是单数 <em>his brother</em>，且事情发生在过去（earlier），因此答案选单数过去式 <em>was</em>。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">虚拟语气与倒装 (Conditionals & Inversion):</strong> 如Q7考查 <em>Should he win...</em>，这是PSLE常考的用于代替 <em>If he wins...</em> 的高级语法结构。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">固定搭配与句式:</strong> 如Q10考查 <em>No sooner had I... than...</em>（一……就……）的固定句型。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">高阶词汇与近义词辨析:</strong> 词汇题（Q11–15）及近义词替代题（Q16–20）非常看重词汇在具体语境中的精确运用。如考查 <em>condoned</em>（宽恕/容忍不合法的行为）、<em>infested</em>（横行/蔓延）等高年级必备核心词汇。</p></li>
                  </ul>
                </div>

                {/* 2. Visual Text Comprehension */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 border-b border-gray-100 pb-3">视觉文本理解 (Visual Text Comprehension)</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-lg">Q21–Q25 (双文本跨篇章联系)</div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">多文本对比与信息整合 (2025/2026 新规):</strong> PSLE现已固定给学生提供双文本（如一份视觉海报 + 一段纯文本），明确考查跨文本连接（text-to-text connections）能力。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">作者意图与视觉元素分析:</strong> 考查提问的目的以及海报插图的作用。这要求学生不仅会读字，还要理解视觉排版和设计的底层逻辑。</p></li>
                  </ul>
                </div>

                {/* 3. Cloze */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 border-b border-gray-100 pb-3">完形填空 (Grammar & Vocab Cloze)</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-lg">Q26–Q35, Q46–Q60</div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">Grammar Cloze (有选项):</strong> 侧重介词、连词、代词和关系代词的考核。例如考查 <em>which / who</em> 引导的定语从句，以及 <em>however</em> 等逻辑过渡词。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">Comprehension Cloze (无选项填空):</strong> 题眼多且难，公认拉开差距的魔鬼题型。要求极强的语篇前后文逻辑推导能力和固定搭配储备（如 <em>Rome was not built in a day</em>、<em>put effort in</em> 等）。</p></li>
                  </ul>
                </div>

                {/* 4. Synthesis & Transformation */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 border-b border-gray-100 pb-3">句型转换与合并 (Synthesis & Transformation)</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-lg">Q61–Q65</div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">介词 + 关系代词:</strong> 如Q64的 <em>...for whom...</em> 结构。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">情感名词置前:</strong> 如Q65的 <em>Much to my annoyance, ...</em>（令我十分生气的是……）。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">间接引语 (Reported Speech):</strong> 如Q63的时态和时间副词的转换（<em>tomorrow</em> 转换为 <em>the next day</em>）。</p></li>
                  </ul>
                </div>

                {/* 5. Comprehension Open-Ended */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow lg:col-span-2">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3 border-b border-gray-100 pb-3">阅读理解问答题 (Comprehension Open-Ended)</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-lg">Q66–Q75 (前总统黄金辉回忆录节选)</div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">本土化与高难度语篇:</strong> PSLE非常青睐具有本土文化色彩或名人传记类的叙事文，这类文章往往带有深厚的情感变化和时代背景。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">代词指代 (Referencing):</strong> 如Q68考查 <em>it</em> 或 <em>one</em> 在文中具体指代什么（如指代搬家这回事、或者指代排在第一个受罚的男孩）。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">推断题 (Inference):</strong> 不再局限于在文中“抄答案”，而是考查“弦外之音”。例如Q74问：校长把藤条称为“魔术棒（magic wand）”说明了校长的什么特点？答案指向校长的幽默、威严或是用这种反差来给学生带来深刻的心理震撼。</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div><p><strong className="text-gray-900">事实与原因真伪辨析 (True/False with Reason):</strong> 要求学生精准定位原文细节，并用完整的因果逻辑写出理由。错一个字或漏掉关键限定词（如 <em>randomly</em> 随机抽查，而不是检查所有人的报告册）都会导致整题没分。</p></li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Part 2: Strategy */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="font-bold">2</span>
                </div>
                <h2 className="text-2xl font-bold text-[#211922]">备考建议（透视备战 PSLE）</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                
                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-green-500 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">攻克语法灰色地带</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    熟练掌握倒装句、主谓一致的特殊规则、以及 No sooner... than 等高级句式。这些是筛选高分段（AL1/AL2）的常用题。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-amber-500 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">强化“语境词汇”记忆</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    背单词不能只背中文释义，要放到句子中。必须搞清楚动词在政务、生活、法律场景下的精准搭配。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">长句拆解与情感推导</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    做阅读时，要能用情绪词精准概括人物历程。作答 T/F 时，理由必须高度对齐原文的核心限制性词汇。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-purple-500 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">口试口语的比重提升</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    口试比重提升至20%（40分）。朗读环节加入了PACT提示词，看图说话使用真实的独立照片并删除子提示词，要求极强临场思辨能力。
                  </p>
                </div>

              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
