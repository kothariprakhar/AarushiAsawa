import React, { useState } from 'react';
import { generatePaintedImage } from '../services/geminiService';
import { Loader2, Paintbrush, Download } from 'lucide-react';

const ArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generatePaintedImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError("Failed to generate art. Please try selecting an API Key.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-earth-200 max-w-lg w-full mx-auto my-12">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-bold text-earth-800 mb-2">My Art Studio</h3>
        <p className="text-earth-800/70 text-sm">
          Experience my creative process. Describe an environmental object, and I'll paint it for you instantly using AI.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-earth-800 mb-1">
            What should I paint?
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A lonely polar bear, a wind turbine in a flower field..."
            className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition-all"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full bg-eco-green hover:bg-green-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Painting...</span>
            </>
          ) : (
            <>
              <Paintbrush size={20} />
              <span>Create Art</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {generatedImage && (
        <div className="mt-8 animate-fade-in">
          <div className="relative group rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img src={generatedImage} alt={prompt} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                    href={generatedImage} 
                    download={`elena-art-${Date.now()}.png`}
                    className="bg-white text-earth-800 px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-earth-100 transition-colors"
                >
                    <Download size={16} />
                    <span>Download</span>
                </a>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-earth-800/60 font-serif italic">
            "A digital painting of {prompt}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ArtGenerator;