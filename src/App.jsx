import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TrickCard from './components/TrickCard';
import TrickModal from './components/TrickModal';
import EmptyState from './components/EmptyState';
import { tricksData } from './data/tricksData';

export default function App() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyRange, setDifficultyRange] = useState([1, 10]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // Modal state
  const [selectedTrick, setSelectedTrick] = useState(null);

  // Filter and sort tricks
  const filteredTricks = useMemo(() => {
    let result = [...tricksData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        trick =>
          trick.name.toLowerCase().includes(query) ||
          trick.description.toLowerCase().includes(query)
      );
    }

    // Difficulty filter
    result = result.filter(
      trick =>
        trick.difficulty >= difficultyRange[0] &&
        trick.difficulty <= difficultyRange[1]
    );

    // Position filter
    if (selectedPositions.length > 0) {
      result = result.filter(trick =>
        selectedPositions.includes(trick.position)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'hardest':
        result.sort((a, b) => b.difficulty - a.difficulty);
        break;
      case 'easiest':
        result.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case 'az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        // Keep original order (newest first - assuming data is already ordered)
        break;
    }

    return result;
  }, [searchQuery, difficultyRange, selectedPositions, sortBy]);

  return (
    <div className="min-h-screen">
      <Header />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        difficultyRange={difficultyRange}
        setDifficultyRange={setDifficultyRange}
        selectedPositions={selectedPositions}
        setSelectedPositions={setSelectedPositions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <motion.p
          key={filteredTricks.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-400 text-sm mb-6"
        >
          Showing {filteredTricks.length} {filteredTricks.length === 1 ? 'trick' : 'tricks'}
        </motion.p>

        {/* Tricks Grid */}
        {filteredTricks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredTricks.map((trick) => (
                <TrickCard
                  key={trick.id}
                  trick={trick}
                  onClick={setSelectedTrick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </main>

      {/* Modal */}
      {selectedTrick && (
        <TrickModal
          trick={selectedTrick}
          onClose={() => setSelectedTrick(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-500 text-sm">
            Stiga Table Hockey Combination Database is an open-source project.
            <a
              href="https://github.com/amundfylling/stiga-table-hockey-combination-database"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 ml-1"
            >
              Contribute on GitHub →
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
