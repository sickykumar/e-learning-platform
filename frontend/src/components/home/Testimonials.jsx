import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Sparkles, CheckCircle } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Aman Sharma",
    college: "Placed at Flipkart • Bengaluru",
    role: "Full-Stack MERN Specialization",
    rating: 5,
    review:
      "The full-stack curriculum with Redis, Docker, and AWS deployment helped me crack my SDE interview with a 14 LPA package. The projects you build here are miles ahead of generic tutorials.",
  },
  {
    name: "Priya Patel",
    college: "SDE-1 at Swiggy • Remote",
    role: "Backend & System Design Track",
    rating: 5,
    review:
      "Understanding database indexing, caching strategies, and concurrency patterns gave me massive confidence. The mentors answered every query promptly. Best investment in ₹ INR!",
  },
  {
    name: "Rohan Verma",
    college: "Placed at Delhivery • Gurugram",
    role: "Frontend Engineering & Next.js",
    rating: 5,
    review:
      "I was struggling to clear technical rounds as a tier-3 college graduate. E-Learn's hands-on capstones transformed my resume. Got placed within 3 months of finishing the course.",
  },
  {
    name: "Sneha Mukherjee",
    college: "Data Engineer at Tata 1mg",
    role: "AI & Modern Python Systems",
    rating: 5,
    review:
      "The course takes you step-by-step from core concepts to production LLM agents. Practical, engaging, and directly applicable to real-world engineering work.",
  },
  {
    name: "Vikram Singhania",
    college: "Software Engineer at Zomato",
    role: "MERN Stack & DevOps",
    rating: 5,
    review:
      "Affordable pricing in Indian Rupees with top-tier tech mentorship. Building and deploying 4 full-fledged microservices completely changed my engineering perspective.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Placement Stories</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          How Learners Accelerated{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Their Careers
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-center text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          Read real stories from students and working professionals across India who transformed their tech careers with our courses.
        </p>

        {/* Slider */}
        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group h-full flex flex-col justify-between rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 hover:border-indigo-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/30">
                  <div>
                    {/* Header: Quote + Stars */}
                    <div className="flex items-center justify-between">
                      <FaQuoteLeft className="text-indigo-400 text-2xl" />
                      <div className="flex gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <FaStar key={i} className="text-amber-400 text-xs" />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-300 text-sm mt-5 leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-800/80">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                      {item.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm truncate flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </h4>
                      <p className="text-emerald-400 text-xs font-medium truncate">
                        {item.college}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
