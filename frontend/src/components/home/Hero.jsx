import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Star,
  CheckCircle2
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-indigo-600/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/15 blur-[160px] rounded-full" />
        <div className="absolute top-1/3 left-5 w-[350px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* National Tech Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                🇮🇳 India's Leading Tech Academy • 50K+ Learners
              </span>
            </motion.div>

            {/* High-Impact Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]"
            >
              Master The Tech Skills That Land{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Careers
              </span>
            </motion.h1>

            {/* Subheading tuned for Indian Students & Engineers */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              From zero to industry-ready. Learn Full-Stack MERN, System Design, DevOps, and Generative AI from top Indian tech leads with real projects, verified certificates & mentorship in ₹ INR.
            </motion.p>

            {/* Key Value Propositions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400"
            >
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>₹12 LPA Avg. Alumni Package</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Govt & Industry Recognized Certificates</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1:1 Mentor Support</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] transition-all duration-300"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-slate-500 text-white font-semibold text-base transition-all duration-300"
              >
                <span>Talk to Academic Advisor</span>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT VISUAL COLUMN: 2026 Tech Glass Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Outer Container with Glow */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Visual Terminal Card */}
              <div className="rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-6 shadow-2xl shadow-black/60 relative overflow-hidden">
                
                {/* Header Dots */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] text-slate-500 ml-2 font-mono">india-tech-curriculum.tsx</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Batches
                  </span>
                </div>

                {/* Interactive Tech Stacks */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                        ⚛
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs">Full-Stack MERN + Next.js</div>
                        <div className="text-[10px] text-slate-400">Microservices • Redux • REST API</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">₹499+</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                        🤖
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs">Generative AI & LLM Systems</div>
                        <div className="text-[10px] text-slate-400">LangChain • RAG • Vector DB</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">₹799+</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs">System Design & DSA (Java/C++)</div>
                        <div className="text-[10px] text-slate-400">FAANG & Startup Interview Prep</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">₹699+</span>
                  </div>
                </div>

                {/* Live Stats Row inside Card */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-black text-white">50K+</div>
                    <div className="text-[10px] text-slate-400">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Course Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-400">95%</div>
                    <div className="text-[10px] text-slate-400">Job Placement</div>
                  </div>
                </div>

              </div>

              {/* Floating Floating Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/50 flex items-center gap-2.5"
              >
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-white">ISO & MSME Certified</div>
                  <div className="text-[10px] text-slate-400">Sharable LinkedIn Credentials</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-4 sm:-right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/50 flex items-center gap-2.5"
              >
                <Briefcase className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-white">100+ Hiring Partners</div>
                  <div className="text-[10px] text-slate-400">Bengaluru • Pune • Noida • Remote</div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
