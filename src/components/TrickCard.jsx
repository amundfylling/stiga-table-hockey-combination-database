import { motion } from 'framer-motion';

const positionColors = {
    'Center': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Winger': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Defense': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Goalie': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function DifficultyBar({ difficulty }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${difficulty * 10}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${difficulty <= 3 ? 'bg-green-500' :
                            difficulty <= 6 ? 'bg-yellow-500' :
                                difficulty <= 8 ? 'bg-orange-500' :
                                    'bg-red-500'
                        }`}
                />
            </div>
            <span className="text-xs font-medium text-slate-400 w-6">{difficulty}/10</span>
        </div>
    );
}

export default function TrickCard({ trick, onClick }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            onClick={() => onClick(trick)}
            className="bg-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer group transition-shadow hover:shadow-xl hover:shadow-sky-500/10"
        >
            {/* Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
                <img
                    src={trick.mediaUrl}
                    alt={trick.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Title and Position Badge */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                        {trick.name}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border whitespace-nowrap ${positionColors[trick.position]}`}>
                        {trick.position}
                    </span>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-slate-400 line-clamp-2">
                    {trick.description}
                </p>

                {/* Difficulty Bar */}
                <DifficultyBar difficulty={trick.difficulty} />
            </div>
        </motion.article>
    );
}
