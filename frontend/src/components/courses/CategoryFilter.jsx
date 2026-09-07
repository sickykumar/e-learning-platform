const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Full Stack",
  "Design",
  "Business",
  "Marketing",
];

const CategoryFilter = ({ selected, setSelected }) => {
  return (
    <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none no-scrollbar">
      {categories.map((category) => {
        const isSelected = selected.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 border cursor-pointer ${
              isSelected
                ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-850"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
