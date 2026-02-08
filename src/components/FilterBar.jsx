import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const positions = ['Center', 'Winger', 'Defense', 'Goalie'];
const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'hardest', label: 'Hardest First' },
    { value: 'easiest', label: 'Easiest First' },
    { value: 'az', label: 'A → Z' },
    { value: 'za', label: 'Z → A' },
];

export default function FilterBar({
    searchQuery,
    setSearchQuery,
    difficultyRange,
    setDifficultyRange,
    selectedPositions,
    setSelectedPositions,
    sortBy,
    setSortBy
}) {
    const [showFilters, setShowFilters] = useState(false);

    const togglePosition = (position) => {
        if (selectedPositions.includes(position)) {
            setSelectedPositions(selectedPositions.filter(p => p !== position));
        } else {
            setSelectedPositions([...selectedPositions, position]);
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setDifficultyRange([1, 10]);
        setSelectedPositions([]);
        setSortBy('newest');
    };

    const hasActiveFilters = searchQuery ||
        difficultyRange[0] !== 1 ||
        difficultyRange[1] !== 10 ||
        selectedPositions.length > 0 ||
        sortBy !== 'newest';

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Main Search Row */}
                <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tricks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${showFilters || hasActiveFilters
                                ? 'bg-sky-600 border-sky-500 text-white'
                                : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="hidden sm:inline">Filters</span>
                        {hasActiveFilters && (
                            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                                Active
                            </span>
                        )}
                    </motion.button>
                </div>

                {/* Expandable Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 space-y-4">
                                {/* Difficulty Range */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Difficulty Range: {difficultyRange[0]} - {difficultyRange[1]}
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-slate-400 w-6">Min</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={difficultyRange[0]}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (val <= difficultyRange[1]) {
                                                    setDifficultyRange([val, difficultyRange[1]]);
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                        <span className="text-xs text-slate-400 w-6">Max</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={difficultyRange[1]}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (val >= difficultyRange[0]) {
                                                    setDifficultyRange([difficultyRange[0], val]);
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                {/* Position Chips */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Position
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {positions.map((position) => (
                                            <motion.button
                                                key={position}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => togglePosition(position)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedPositions.includes(position)
                                                        ? 'bg-sky-500 text-white'
                                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                    }`}
                                            >
                                                {position}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <label className="text-sm font-medium text-slate-300">
                                            Sort by:
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        >
                                            {sortOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {hasActiveFilters && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={clearFilters}
                                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            Clear all
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
