import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { useEffect } from 'react';

const positionColors = {
    'Center': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Winger': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Defense': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Goalie': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function DifficultyMeter({ difficulty }) {
    const getDifficultyLabel = (d) => {
        if (d <= 3) return 'Beginner';
        if (d <= 5) return 'Intermediate';
        if (d <= 7) return 'Advanced';
        if (d <= 9) return 'Expert';
        return 'Master';
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Difficulty</span>
                <span className="text-sm text-slate-400">
                    {difficulty}/10 - {getDifficultyLabel(difficulty)}
                </span>
            </div>
            <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex-1 h-3 rounded-sm ${i < difficulty
                                ? difficulty <= 3 ? 'bg-green-500' :
                                    difficulty <= 6 ? 'bg-yellow-500' :
                                        difficulty <= 8 ? 'bg-orange-500' :
                                            'bg-red-500'
                                : 'bg-slate-700'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function TrickModal({ trick, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            {trick && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-700 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </motion.button>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[90vh]">
                            {/* Media */}
                            <div className="aspect-video w-full bg-slate-900">
                                <img
                                    src={trick.mediaUrl}
                                    alt={trick.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-2xl font-bold text-white">
                                        {trick.name}
                                    </h2>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${positionColors[trick.position]}`}>
                                        {trick.position}
                                    </span>
                                </div>

                                {/* Difficulty Meter */}
                                <DifficultyMeter difficulty={trick.difficulty} />

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-medium text-slate-300 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {trick.description}
                                    </p>
                                </div>

                                {/* Contributor */}
                                {trick.contributor && (
                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                                        <User className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-400">
                                            Contributed by{' '}
                                            <span className="text-sky-400 font-medium">
                                                {trick.contributor}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
