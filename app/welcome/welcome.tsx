import { useState, useEffect } from "react";

export function Welcome({ message }: { message: string }) {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// PSLE 2026 Written Papers usually start around Oct 1st
	const psleDate = new Date("2026-10-01T08:00:00").getTime();

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = psleDate - now;

			setTimeLeft({
				days: Math.floor(distance / (1000 * 60 * 60 * 24)),
				hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((distance % (1000 * 60)) / 1000),
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [psleDate]);

	return (
		<main className="min-h-screen premium-bg p-4 md:p-8 font-sans">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header Section */}
				<header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
							P6 Excellence Hub
						</h1>
						<p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
							Your path to PSLE success starts here.
						</p>
					</div>

					{/* PSLE Countdown Card */}
					<div className="glass-card p-6 rounded-3xl flex items-center gap-6 animate-in fade-in slide-in-from-top duration-700">
						<div className="bg-[var(--color-brand-primary)]/10 p-4 rounded-2xl">
							<svg className="w-8 h-8 text-[var(--color-brand-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">PSLE Countdown</p>
							<div className="flex gap-4 mt-1 font-mono text-2xl font-bold">
								<div className="flex flex-col items-center">
									<span>{timeLeft.days}</span>
									<span className="text-[10px] uppercase text-slate-400 font-sans">Days</span>
								</div>
								<span className="text-slate-300">:</span>
								<div className="flex flex-col items-center">
									<span>{timeLeft.hours}</span>
									<span className="text-[10px] uppercase text-slate-400 font-sans">Hrs</span>
								</div>
								<span className="text-slate-300">:</span>
								<div className="flex flex-col items-center">
									<span>{timeLeft.minutes}</span>
									<span className="text-[10px] uppercase text-slate-400 font-sans">Min</span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: Schedule & Subjects */}
					<div className="lg:col-span-2 space-y-8">
						{/* Timetable Card */}
						<section className="glass-card rounded-3xl overflow-hidden">
							<div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50">
								<h2 className="text-xl font-bold flex items-center gap-2">
									<svg className="w-5 h-5 text-[var(--color-brand-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									Daily Schedule
								</h2>
								<span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold dark:bg-emerald-900/30 dark:text-emerald-400">
									Active
								</span>
							</div>
							<div className="p-0 overflow-x-auto">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="bg-slate-50/50 dark:bg-slate-800/50">
											<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Time</th>
											<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Activity</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
										{timetable.map((item, i) => (
											<tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
												<td className="px-6 py-4 font-mono text-sm">{item.time}</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-3">
														<div className={`w-2 h-2 rounded-full ${item.color}`} />
														<span className="font-medium">{item.subject}</span>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>

						{/* Course Content Grid */}
						<section className="space-y-4">
							<h2 className="text-2xl font-bold px-2">Core Subjects</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{subjects.map((subject, i) => (
									<div key={i} className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer group">
										<div className={`w-12 h-12 rounded-2xl ${subject.bgColor} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
											{subject.icon}
										</div>
										<h3 className="text-lg font-bold mb-2">{subject.title}</h3>
										<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
											{subject.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-2">
											{subject.tags.map((tag, j) => (
												<span key={j} className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold uppercase tracking-tighter">
													{tag}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</section>
					</div>

					{/* Right Column: Calendar & Quick Links */}
					<div className="space-y-8">
						{/* Monthly Calendar View */}
						<section className="glass-card p-6 rounded-3xl">
							<div className="flex items-center justify-between mb-6">
								<h2 className="font-bold">April 2026</h2>
								<div className="flex gap-2">
									<button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
										<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
									</button>
									<button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
										<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
									</button>
								</div>
							</div>
							<div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-4">
								<span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
							</div>
							<div className="grid grid-cols-7 gap-1">
								{Array.from({ length: 30 }).map((_, i) => {
									const day = i + 1;
									const isToday = day === 15;
									const hasEvent = [2, 10, 22].includes(day);
									return (
										<div 
											key={i} 
											className={`aspect-square flex items-center justify-center rounded-xl text-sm cursor-pointer transition-all
												${isToday ? 'bg-[var(--color-brand-primary)] text-white font-bold shadow-lg shadow-blue-500/30 ring-2 ring-white/50' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
												${hasEvent ? 'border-b-2 border-[var(--color-brand-accent)]' : ''}
											`}
										>
											{day}
										</div>
									);
								})}
							</div>
							<div className="mt-6 space-y-3">
								<p className="text-xs font-bold text-slate-400 uppercase">Upcoming Events</p>
								<div className="flex gap-3 items-center p-3 rounded-2xl bg-orange-100/50 dark:bg-orange-950/30">
									<div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
									<div className="text-xs">
										<p className="font-bold text-orange-700 dark:text-orange-400">Mock Exam Part 1</p>
										<p className="text-orange-600/70 dark:text-orange-400/50">Tomorrow at 8:00 AM</p>
									</div>
								</div>
							</div>
						</section>

						{/* Study Resources */}
						<section className="glass-card p-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
							<h2 className="text-xl font-bold mb-2">Practice Papers</h2>
							<p className="text-indigo-100 text-sm mb-6">Access the latest top-school papers and past year series.</p>
							<button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">
								Browse Repository
							</button>
						</section>
					</div>
				</div>

				<footer className="text-center py-12 text-slate-400 text-sm">
					<p>© 2026 P6 Learning Excellence Platform. All rights reserved.</p>
					<p className="mt-1">Dedicated to the Singapore Primary 6 Class of 2026.</p>
				</footer>
			</div>
		</main>
	);
}

const timetable = [
	{ time: "07:30 - 08:00", subject: "Assembly & Character Dev", color: "bg-blue-400" },
	{ time: "08:00 - 09:30", subject: "Mathematics (Geometry)", color: "bg-indigo-500" },
	{ time: "09:30 - 10:00", subject: "Recess Break", color: "bg-orange-400" },
	{ time: "10:00 - 11:30", subject: "Science (Forces & Energy)", color: "bg-emerald-500" },
	{ time: "11:30 - 13:00", subject: "English Language (Synthesis)", color: "bg-purple-500" },
	{ time: "13:00 - 14:00", subject: "Mother Tongue", color: "bg-pink-500" },
	{ time: "14:00 - 15:30", subject: "CCA / Remedial Sessions", color: "bg-slate-400" },
];

const subjects = [
	{
		title: "Mathematics",
		description: "Mastering Algebra, Fractions, Ratio, Percentage, and complex Word Problems.",
		icon: (
			<svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
			</svg>
		),
		bgColor: "bg-indigo-100",
		tags: ["Numbers", "Operations", "Shape & Measurement"],
	},
	{
		title: "Science",
		description: "Exploring Life Sciences (Diversity, Cycles) and Physical Sciences (Systems, Interactions, Energy).",
		icon: (
			<svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.12l-2.731-.455a2 2 0 00-1.981 1.058l-.428.856a2 2 0 01-1.625 1.013H4a2 2 0 00-2 2v1a2 2 0 002 2h16a2 2 0 002-2v-1.113a2 2 0 00-1.572-1.956l-1.000-.200z" />
			</svg>
		),
		bgColor: "bg-emerald-100",
		tags: ["Matter", "Energy", "Systems"],
	},
	{
		title: "English",
		description: "Focus on Situational Writing, Continuous Writing, Comprehension, and Oral Communication.",
		icon: (
			<svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
		bgColor: "bg-purple-100",
		tags: ["Grammar", "Vocab", "Writing"],
	},
	{
		title: "Mother Tongue",
		description: "Enhancing listening, speaking, reading, and writing skills in the respective mother tongue.",
		icon: (
			<svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
			</svg>
		),
		bgColor: "bg-pink-100",
		tags: ["Oral", "Composition", "Culture"],
	},
];
