import {
  Users,
  BookOpen,
  Briefcase,
  Award,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Indian Students & Pros",
    subtext: "Across 28 states & tech hubs",
  },
  {
    icon: BookOpen,
    value: "100+",
    label: "Job-Ready Courses",
    subtext: "Updated for 2026 industry demand",
  },
  {
    icon: Briefcase,
    value: "₹12 LPA",
    label: "Highest Alumni Package",
    subtext: "At top startups & MNCs",
  },
  {
    icon: Award,
    value: "10,000+",
    label: "Verified Certificates",
    subtext: "Sharable on LinkedIn & Resumes",
  },
];

const Stats = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 overflow-hidden border-y border-slate-800/80 bg-slate-950/40">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 sm:p-6 text-center hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {item.value}
                </h3>

                <p className="text-slate-200 font-semibold text-xs sm:text-sm mt-1">
                  {item.label}
                </p>

                <p className="text-slate-500 text-[11px] mt-0.5 hidden sm:block">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
