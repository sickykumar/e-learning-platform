import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryCount } from "../../api/CourseApi";
import categoryIcons from "../data/categoryIcons";
import { FaCode } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryCount();
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Demand Tech Tracks</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Trending In-Demand{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Domains
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-center text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          Master career-defining specializations aligned with Indian and global tech hiring requirements.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {categories?.map((item) => {
            const Icon = categoryIcons[item._id] || FaCode;

            return (
              <Link
                key={item._id}
                to={`/courses?category=${encodeURIComponent(item._id)}`}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-5 sm:p-6 hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30 cursor-pointer"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl shadow-md group-hover:scale-110 transition duration-300">
                    <Icon />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-white font-bold text-base mt-4 group-hover:text-indigo-300 transition-colors">
                    {item._id}
                  </h3>

                  {/* Course Count */}
                  <p className="text-slate-400 text-xs mt-1">
                    {item.totalCourses} {item.totalCourses === 1 ? 'Course' : 'Courses'} Available
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Browse Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
