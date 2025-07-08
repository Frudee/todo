import type { Filter } from "../App.tsx";

interface Props {
  currentFilter: string;
  onChangeFilter: (filter: Filter) => void;
}

const FILTERS: Filter[] = ["all", "active", "completed"];
const FILTER_LABELS: Record<Filter, string> = {
  all: "Все",
  active: "Активные",
  completed: "Выполненные",
};

const FilterButtons: React.FC<Props> = ({ currentFilter, onChangeFilter }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChangeFilter(filter)}
          className={`px-3 py-1 rounded ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
