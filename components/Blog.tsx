import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { generateBlogContent, generatePaintedImage } from '../services/geminiService';
import { Plus, Loader2, Calendar, Sparkles, X, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Creation form state
  const [newTopic, setNewTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load posts from local storage on mount
  useEffect(() => {
    // Changed key to aarushi-blog-posts
    const saved = localStorage.getItem('aarushi-blog-posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
        // Default post
        setPosts([{
            id: 'init-1',
            title: 'The Art of Sustainability',
            content: 'How creative thinking can solve complex environmental supply chain issues. As I navigate the world of corporate sustainability, I often find parallels between painting on a canvas and designing a circular economy...',
            date: new Date().toLocaleDateString(),
            tags: ['Sustainability', 'Creativity'],
            imageUrl: 'https://picsum.photos/400/300?random=sustain'
        }]);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('aarushi-blog-posts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    setIsGenerating(true);
    try {
        // 1. Generate Content
        const contentData = await generateBlogContent(newTopic);
        
        // 2. Generate an "Artistic" Cover Image
        const image = await generatePaintedImage(newTopic);

        if (contentData) {
            const newPost: BlogPost = {
                id: Date.now().toString(),
                title: contentData.title,
                content: contentData.content,
                date: new Date().toLocaleDateString(),
                tags: ['Thoughts', 'Eco'],
                imageUrl: image || `https://picsum.photos/400/300?random=${Date.now()}`
            };
            setPosts([newPost, ...posts]);
            setNewTopic('');
            setIsCreating(false);
        }
    } catch (error) {
        console.error("Failed to create post", error);
        alert("Could not generate post. Check API Key.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      <div className="flex justify-between items-center mb-12">
        <div>
           <h2 className="text-3xl font-serif font-bold text-earth-800">Journal</h2>
           <p className="text-earth-800/60 mt-1">Thoughts on the environment, art, and the future.</p>
        </div>
        
        {/* Innovative New Entry Button */}
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="group flex items-center pl-1.5 pr-5 py-1.5 bg-earth-800 text-white rounded-full transition-all hover:bg-earth-900 shadow-md hover:shadow-lg"
        >
          <div className={`bg-white/10 p-2 rounded-full mr-3 transition-all duration-300 ${isCreating ? 'rotate-90 bg-red-500/20 text-red-100' : 'group-hover:rotate-90'}`}>
            {isCreating ? <X size={18} /> : <Plus size={18} />} 
          </div>
          <span className="font-medium text-sm tracking-wide">{isCreating ? 'Close Editor' : 'New Entry'}</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-eco-green/10 mb-12 animate-fade-in relative overflow-hidden">
           {/* Decorative background element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-eco-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

           <h3 className="text-xl font-bold mb-4 flex items-center text-earth-800 relative z-10"><Sparkles size={18} className="mr-2 text-eco-green"/> AI Writer Assistant</h3>
           <p className="text-sm text-gray-500 mb-6 relative z-10">Enter a topic, and I will generate a drafted blog post and a unique painting for the cover.</p>
           
           <form onSubmit={handleCreatePost} className="flex flex-col sm:flex-row gap-4 relative z-10">
              <input 
                type="text" 
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Topic e.g., Reducing plastic in ocean freight..."
                className="flex-1 px-6 py-4 border border-earth-200 bg-earth-50 rounded-2xl focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition-shadow"
              />
              
              {/* Innovative Generate Button */}
              <button 
                type="submit" 
                disabled={isGenerating || !newTopic}
                className="group flex items-center pl-1.5 pr-6 py-1.5 bg-eco-green text-white rounded-full font-medium hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-w-[160px] justify-center"
              >
                 <div className="bg-white/20 p-2.5 rounded-full mr-3 group-hover:scale-110 transition-transform">
                    {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                 </div>
                <span>{isGenerating ? 'Creating...' : 'Generate'}</span>
              </button>
           </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-earth-200 flex flex-col h-full group">
            <div className="h-56 overflow-hidden bg-gray-100 relative">
                {post.imageUrl && (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                     <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-eco-green uppercase tracking-wider shadow-sm">
                        {post.tags[0]}
                     </span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-xs text-earth-800/50 mb-3 space-x-2">
                 <Calendar size={14} />
                 <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-earth-800 mb-3 leading-tight group-hover:text-eco-green transition-colors">{post.title}</h3>
              <p className="text-earth-800/70 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                {post.content}
              </p>
              
              <div className="border-t border-earth-100 pt-4 mt-auto">
                  <button className="text-eco-green font-bold text-sm flex items-center group/btn">
                    Read Full Story 
                    <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;