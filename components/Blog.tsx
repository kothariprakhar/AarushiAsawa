import React, { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '../types';
import { generateBlogContent, generatePaintedImage } from '../services/geminiService';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';
import { Plus, Loader2, Calendar, Sparkles, X, ArrowRight, Trash2 } from 'lucide-react';

type DbBlogPost = {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url: string | null;
  tags: string[];
  created_at: string;
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  
  // Creation form state
  const [newTopic, setNewTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL?.toLowerCase();

  const isOwner = useMemo(() => {
    if (!session) return false;
    if (!ownerEmail) return true;
    return session.user.email?.toLowerCase() === ownerEmail;
  }, [ownerEmail, session]);

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id,title,content,date,image_url,tags,created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load blog posts', error);
      setIsLoadingPosts(false);
      return;
    }

    const mappedPosts = (data as DbBlogPost[]).map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date,
      tags: post.tags,
      imageUrl: post.image_url || undefined,
    }));

    setPosts(mappedPosts);
    setIsLoadingPosts(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
      await loadPosts();
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setAuthError('');
    setIsLoggingIn(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setAuthError(error.message);
      setIsLoggingIn(false);
      return;
    }

    if (ownerEmail && data.user?.email?.toLowerCase() !== ownerEmail) {
      setAuthError('This account is not authorized as the blog owner.');
      await supabase.auth.signOut();
      setIsLoggingIn(false);
      return;
    }

    setEmail('');
    setPassword('');
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    setIsCreating(false);
    await supabase.auth.signOut();
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !isOwner) return;

    setIsGenerating(true);
    try {
        // 1. Generate Content
        const contentData = await generateBlogContent(newTopic);
        
        // 2. Generate an "Artistic" Cover Image
        const image = await generatePaintedImage(newTopic);

        if (contentData) {
          const postDate = new Date().toLocaleDateString();
          const { error } = await supabase.from('blog_posts').insert({
            title: contentData.title,
            content: contentData.content,
            date: postDate,
            tags: ['Thoughts', 'Eco'],
            image_url: image || `https://picsum.photos/400/300?random=${Date.now()}`,
          });

          if (error) {
            throw error;
          }

          await loadPosts();
          setNewTopic('');
          setIsCreating(false);
        }
    } catch (error) {
        console.error("Failed to create post", error);
        alert("Could not generate post. Check API key and Supabase setup.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!isOwner) return;

    setDeletingPostId(postId);
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
      if (error) {
        throw error;
      }
      await loadPosts();
    } catch (error) {
      console.error('Failed to delete post', error);
      alert('Could not delete post. Check Supabase policy setup.');
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      <div className="flex justify-between items-center mb-12">
        <div>
           <h2 className="text-3xl font-serif font-bold text-earth-800">Journal</h2>
           <p className="text-earth-800/60 mt-1">Thoughts on the environment, art, and the future.</p>
        </div>

        {isOwner ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-earth-300 rounded-full text-sm font-medium text-earth-800 hover:bg-earth-100 transition-colors"
            >
              Logout
            </button>

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
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Owner email"
              className="px-4 py-2 border border-earth-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-eco-green"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-2 border border-earth-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-eco-green"
            />
            <button
              type="submit"
              disabled={isLoggingIn}
              className="px-4 py-2 bg-earth-800 text-white rounded-xl text-sm font-medium hover:bg-earth-900 disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing in...' : 'Owner Login'}
            </button>
            {authError && <p className="text-xs text-red-600 sm:col-span-3">{authError}</p>}
          </form>
        )}
      </div>

      {!session && (
        <p className="text-sm text-earth-800/60 mb-8">Public can read posts. Owner login is required to add new entries.</p>
      )}

      {session && !isOwner && (
        <p className="text-sm text-red-600 mb-8">Signed-in user is not authorized as the owner.</p>
      )}

      {isCreating && isOwner && (
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
        {isLoadingPosts && (
          <div className="col-span-full flex items-center justify-center py-20 text-earth-800/70">
            <Loader2 className="animate-spin mr-2" size={18} />
            Loading journal entries...
          </div>
        )}

        {!isLoadingPosts && posts.length === 0 && (
          <div className="col-span-full text-center py-20 text-earth-800/60">
            No journal entries yet.
          </div>
        )}

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
                <div className="flex items-center justify-between gap-3">
                    <button className="text-eco-green font-bold text-sm flex items-center group/btn">
                      Read Full Story 
                      <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    {isOwner && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        disabled={deletingPostId === post.id}
                        className="text-red-600 hover:text-red-700 disabled:opacity-60 transition-colors"
                        aria-label="Delete post"
                        title="Delete post"
                      >
                        {deletingPostId === post.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;