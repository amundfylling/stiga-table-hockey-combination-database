import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Image, User, Gauge, Shield } from 'lucide-react';

const positions = ['Center', 'Winger', 'Defense', 'Goalie'];

const GITHUB_REPO = 'amundfylling/stiga-table-hockey-combination-database';

export default function SubmitModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        difficulty: 5,
        position: 'Center',
        mediaUrl: '',
        contributor: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'difficulty' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create GitHub issue with pre-filled data
        const issueTitle = encodeURIComponent(`[New Combination] ${formData.name}`);
        const issueBody = encodeURIComponent(`## New Combination Submission

**Name:** ${formData.name}

**Description:** 
${formData.description}

**Difficulty:** ${formData.difficulty}/10

**Position:** ${formData.position}

**Media URL:** ${formData.mediaUrl || 'Not provided'}

**Contributor:** ${formData.contributor || 'Anonymous'}

---
*Submitted via the Stiga Combinations web app*`);

        const githubUrl = `https://github.com/${GITHUB_REPO}/issues/new?title=${issueTitle}&body=${issueBody}&labels=new-combination`;

        // Open GitHub issue page
        window.open(githubUrl, '_blank');

        setIsSubmitting(false);
        onClose();

        // Reset form
        setFormData({
            name: '',
            description: '',
            difficulty: 5,
            position: 'Center',
            mediaUrl: '',
            contributor: ''
        });
    };

    // Prevent body scroll when modal is open
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="relative bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-white">Submit a Combination</h2>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="bg-slate-700 hover:bg-slate-600 p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </motion.button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Combination Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., The Zorro"
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Describe how to perform this combination..."
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <Gauge className="w-4 h-4" />
                                    Difficulty: {formData.difficulty}/10
                                </label>
                                <input
                                    type="range"
                                    name="difficulty"
                                    min="1"
                                    max="10"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>Beginner</span>
                                    <span>Master</span>
                                </div>
                            </div>

                            {/* Position */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <Shield className="w-4 h-4" />
                                    Position
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {positions.map((pos) => (
                                        <button
                                            key={pos}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, position: pos }))}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.position === pos
                                                    ? 'bg-sky-500 text-white'
                                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                }`}
                                        >
                                            {pos}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Media URL */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <Image className="w-4 h-4" />
                                    Media URL (optional)
                                </label>
                                <input
                                    type="url"
                                    name="mediaUrl"
                                    value={formData.mediaUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                            </div>

                            {/* Contributor */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <User className="w-4 h-4" />
                                    Your Name (optional)
                                </label>
                                <input
                                    type="text"
                                    name="contributor"
                                    value={formData.contributor}
                                    onChange={handleChange}
                                    placeholder="e.g., IceKing99"
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting || !formData.name || !formData.description}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                                Submit via GitHub
                            </motion.button>

                            <p className="text-xs text-slate-500 text-center">
                                This will open a GitHub issue with your submission. A maintainer will review and add it to the database.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
