import {
  Users2,
  CodeXml,
  Briefcase,
  IndianRupee,
  Sparkles
} from "lucide-react";

const reasons = [
  {
    icon: Users2,
    title: "Top Indian Tech Mentors",
    desc: "Learn directly from senior engineers and architects working at leading product companies and high-growth startups.",
  },
  {
    icon: CodeXml,
    title: "Production Capstones",
    desc: "Build real-world full-stack and AI applications with live deployment, database indexing, and CI/CD pipelines.",
  },
  {
    icon: Briefcase,
    title: "Placement & Interview Prep",
    desc: "Master Data Structures, System Design, and behavioral rounds with dedicated resume reviews and mock interviews.",
  },
  {
    icon: IndianRupee,
    title: "Affordable in ₹ INR",
    desc: "Transparent, student-friendly pricing without debt or exorbitant bootcamps. Premium tech education for all.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The E-Learn Advantage</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Why Indian Students & Developers{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Us
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-center text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          We combine real engineering practices, senior mentorship, interview readiness, and community support to help you break into top software roles.
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 hover:border-indigo-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/30"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* Icon */}
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="relative text-white text-lg font-bold mt-5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Accent Line */}
                <div className="relative mt-5">
                  <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
