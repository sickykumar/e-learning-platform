import { useEffect, useState } from 'react';
import { getCourses } from './../api/CourseApi';
import SearchBar from './../components/courses/SearchBar';
import CategoryFilter from './../components/courses/CategoryFilter';
import CoursesGrid from './../components/courses/CoursesGrid';
import toast from 'react-hot-toast';
import CourseSkeleton from '../components/Skeleton/CourseSkeleton';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, Filter } from 'lucide-react';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(categoryFromUrl || 'All');
  const [loading, setLoading] = useState(true);

  // Load courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Update selected category whenever category changes in URL
  useEffect(() => {
    if (categoryFromUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(decodeURIComponent(categoryFromUrl));
    } else {
      setSelected('All');
    }
  }, [categoryFromUrl]);

  // Search courses with matchesSearch
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      (course.category && course.category.toLowerCase().includes(search.toLowerCase())) ||
      (course.instructor && course.instructor.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selected === 'All' || course.category?.toLowerCase() === selected.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-[#020817] min-h-screen pb-20">
      
      {/* Compact Navigation-Aligned Header (Direct Content, No Space Wastage) */}
      <section className="relative pt-6 sm:pt-8 pb-6 border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Job-Ready Tech Curriculum in India</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                <span>All Courses</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  ₹ INR
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Hands-on practical projects, lifetime access, and verified certificates designed for students, developers, and career switchers.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>{filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available</span>
              </span>
            </div>
          </div>

          {/* Search & Category Controls right below header */}
          <div className="mt-6 space-y-4">
            <SearchBar search={search} setSearch={setSearch} />
            <CategoryFilter selected={selected} setSelected={setSelected} />
          </div>
        </div>
      </section>

      {/* Course Cards Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl mb-4 text-indigo-400">
              <Filter className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              No Matching Courses Found
            </h2>

            <p className="text-slate-400 mt-2 max-w-md text-sm">
              We couldn't find any courses matching your search "{search}". Try searching for another topic or reset the category filter.
            </p>

            <button
              onClick={() => {
                setSearch('');
                setSelected('All');
              }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Courses Grid */
          <CoursesGrid courses={filteredCourses} />
        )}
      </div>
    </main>
  );
};

export default Courses;
