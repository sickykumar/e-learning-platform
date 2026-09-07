import { Search, X } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
      </div>

      <input
        type="text"
        placeholder="Search courses by title, tech stack (React, Node, Python), or mentor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 sm:h-13 pl-11 pr-10 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder:text-slate-500 text-sm focus:border-indigo-500/60 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
      />

      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
