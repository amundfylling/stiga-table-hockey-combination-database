import { motion } from 'framer-motion';
import { SearchX, Plus } from 'lucide-react';

export default function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="bg-slate-800/50 p-6 rounded-full mb-6"
            >
                <SearchX className="w-16 h-16 text-slate-500" />
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-2">
                No tricks found
            </h3>
            <p className="text-slate-400 max-w-md mb-8">
                We couldn't find any tricks matching your search criteria.
                Try adjusting your filters or be the first to add this trick to our database!
            </p>

            <motion.a
                href="https://github.com/amundfylling/stiga-table-hockey-combination-database"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
            >
                <Plus className="w-5 h-5" />
                Submit This Trick
            </motion.a>
        </motion.div>
    );
}
