import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, User, ArrowRight } from 'lucide-react';

const getCategoryBadgeClass = (category) => {
  switch (category) {
    case 'Frontend':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'Backend':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Database':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'Full Stack':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Design':
      return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    case 'Business':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'Marketing':
      return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
    default:
      return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
  }
};

const CourseCard = memo(({ course }) => {
  const mentorName = course.mentor?.name || course.instructor || 'Industry Expert';
  const numericPrice = typeof course.price === 'number' ? course.price : parseFloat(course.price) || 0;
  const numericOldPrice = course.oldPrice ? (typeof course.oldPrice === 'number' ? course.oldPrice : parseFloat(course.oldPrice)) : 0;
  
  const formattedPrice = numericPrice > 0 
    ? `₹${numericPrice.toLocaleString('en-IN')}` 
    : 'Free';

  const formattedOldPrice = numericOldPrice > numericPrice 
    ? `₹${numericOldPrice.toLocaleString('en-IN')}` 
    : null;

  const discountPercent = numericOldPrice > numericPrice
    ? Math.round(((numericOldPrice - numericPrice) / numericOldPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 hover:border-indigo-500/50 overflow-hidden shadow-xl shadow-black/40 hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Course Thumbnail Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {course.bestSeller ? (
            <span className="inline-flex items-center gap-1 bg-amber-400/90 text-black text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
              ★ Bestseller
            </span>
          ) : (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getCategoryBadgeClass(course.category)}`}>
              {course.category}
            </span>
          )}

          {discountPercent && (
            <span className="bg-emerald-500/90 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-md shadow-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Level Tag bottom right of image */}
        <div className="absolute bottom-2.5 right-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60 text-slate-300 backdrop-blur-md">
            {course.level || 'All Levels'}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex-1 flex flex-col p-5">
        
        {/* Mentor / Instructor Info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{mentorName}</span>
        </div>

        {/* Course Title */}
        <h3 className="text-white text-base font-bold line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Metadata: Rating, Duration, Lessons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{course.rating || '4.8'}</span>
            <span className="text-slate-500 font-normal">({course.students || '1.2k'})</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            {course.duration && (
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-indigo-400" />
                {course.duration}
              </span>
            )}
            {course.lessons && (
              <span className="flex items-center gap-1 text-slate-300">
                <BookOpen className="w-3 h-3 text-purple-400" />
                {course.lessons}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white tracking-tight">
                {formattedPrice}
              </span>
              {formattedOldPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formattedOldPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Inclusive of GST</span>
          </div>

          <Link
            to={`/courses/${course._id}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 shrink-0"
          >
            <span>View Course</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
});

export default CourseCard;
