import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-indigo-950/40">
          
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accelerate Your Career in 2026</span>
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Ready to Build Production Skills &{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get Hired?
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Join 50,000+ engineers, students, and professionals across India. Learn modern tech stacks, complete capstone projects, and unlock high-paying software careers.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent ₹ INR Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Lifetime Course Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Certificate</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] transition-all duration-300"
              >
                <span>Browse All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm sm:text-base transition-all duration-300"
              >
                <span>Create Free Account</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
