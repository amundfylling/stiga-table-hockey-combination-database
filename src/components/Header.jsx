import { Github, Sparkles, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onSubmitClick }) {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-2 rounded-xl">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">
                                Stiga Combinations
                            </h1>
                            <p className="text-xs text-slate-400 hidden sm:block">
                                Table Hockey Combination Database
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Submit Button */}
                        <motion.button
                            onClick={onSubmitClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Submit</span>
                        </motion.button>

                        {/* GitHub Button */}
                        <motion.a
                            href="https://github.com/amundfylling/stiga-table-hockey-combination-database"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors duration-200"
                        >
                            <Github className="w-5 h-5" />
                            <span className="hidden sm:inline font-medium">GitHub</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
