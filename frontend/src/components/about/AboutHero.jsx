import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="pt-8 pb-6 px-4 sm:px-6 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Empowering India's Next-Gen Developers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            About E-Learn Academy
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Democratizing high-quality tech education across India with practical industry courses, senior mentorship, and affordable pricing in ₹ INR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold">
            🎓 50,000+ Students Upskilled
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
