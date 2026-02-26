import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BlogPost } from '../types';
import { generateBlogContent, generateBlogContentFromLink, generatePaintedImage } from '../services/geminiService';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';
import { Plus, Loader2, Calendar, Sparkles, X, ArrowRight, Trash2, Bold, Italic, Underline, List } from 'lucide-react';

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
  const [createMode, setCreateMode] = useState<'ai' | 'manual' | 'link'>('ai');
  
  // Creation form state
  const [newTopic, setNewTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualContent, setManualContent] = useState('');
  const [isSavingManual, setIsSavingManual] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');
  const [isGeneratingFromLink, setIsGeneratingFromLink] = useState(false);
  const [uploadedImageDataUrl, setUploadedImageDataUrl] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const manualEditorRef = useRef<HTMLDivElement | null>(null);
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

  const getSeedImageUrl = (seedText: string) => {
    const seed = encodeURIComponent(
      seedText
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 80) || 'journal-post'
    );
    return `https://picsum.photos/seed/${seed}/400/300`;
  };

  const estimateDataUrlBytes = (dataUrl: string) => {
    const payload = dataUrl.split(',')[1] || '';
    return Math.ceil((payload.length * 3) / 4);
  };

  const compressImageDataUrl = (inputDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1200;
        const scaleRatio = Math.min(maxDimension / image.width, maxDimension / image.height, 1);
        const targetWidth = Math.max(1, Math.round(image.width * scaleRatio));
        const targetHeight = Math.max(1, Math.round(image.height * scaleRatio));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Could not create canvas context.'));
          return;
        }

        context.drawImage(image, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL('image/webp', 0.72));
      };
      image.onerror = () => reject(new Error('Could not process image.'));
      image.src = inputDataUrl;
    });
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
          return;
        }
        reject(new Error('Could not read image file.'));
      };
      reader.onerror = () => reject(new Error('Could not read image file.'));
      reader.readAsDataURL(file);
    });
  };

  const resolveCoverImage = async (seedText: string) => {
    if (uploadedImageDataUrl) return uploadedImageDataUrl;

    const aiImage = await generatePaintedImage(seedText);
    if (aiImage) {
      if (aiImage.startsWith('data:image/')) {
        try {
          return await compressImageDataUrl(aiImage);
        } catch {
          return aiImage;
        }
      }
      return aiImage;
    }

    return getSeedImageUrl(seedText);
  };

  const resetEditorState = () => {
    setNewTopic('');
    setManualTitle('');
    setManualContent('');
    setSourceUrl('');
    setUploadedImageDataUrl('');
    setImageUploadError('');
    setIsProcessingImage(false);
    if (manualEditorRef.current) {
      manualEditorRef.current.innerHTML = '';
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploadError('');

    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please upload a valid image file.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setImageUploadError('Please upload an image smaller than 4MB.');
      return;
    }

    setIsProcessingImage(true);
    try {
      const originalDataUrl = await fileToDataUrl(file);
      const compressedDataUrl = await compressImageDataUrl(originalDataUrl);
      const compressedSize = estimateDataUrlBytes(compressedDataUrl);

      if (compressedSize > 900 * 1024) {
        setImageUploadError('Compressed image is still too large. Please upload a smaller image.');
        setUploadedImageDataUrl('');
      } else {
        setUploadedImageDataUrl(compressedDataUrl);
      }
    } catch {
      setImageUploadError('Could not read image file. Please try again.');
    } finally {
      setIsProcessingImage(false);
    }

    event.target.value = '';
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !isOwner) return;

    setIsGenerating(true);
    try {
        // 1. Generate Content
        const contentData = await generateBlogContent(newTopic);
        
        if (contentData) {
          const image = await resolveCoverImage(contentData.title || newTopic);
          const postDate = new Date().toLocaleDateString();
          const { error } = await supabase.from('blog_posts').insert({
            title: contentData.title,
            content: contentData.content,
            date: postDate,
            tags: ['Thoughts', 'Eco'],
            image_url: image,
          });

          if (error) {
            throw error;
          }

          await loadPosts();
          resetEditorState();
          setIsCreating(false);
        }
    } catch (error) {
        console.error("Failed to create post", error);
        alert("Could not generate post. Check API key and Supabase setup.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSaveManualPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner || !manualTitle.trim() || !manualContent.trim()) return;

    setIsSavingManual(true);
    try {
      const image = await resolveCoverImage(`${manualTitle} ${manualContent.slice(0, 120)}`);
      const postDate = new Date().toLocaleDateString();
      const { error } = await supabase.from('blog_posts').insert({
        title: manualTitle.trim(),
        content: manualContent.trim(),
        date: postDate,
        tags: ['Manual', 'Journal'],
        image_url: image,
      });

      if (error) throw error;

      await loadPosts();
      resetEditorState();
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to save manual post', error);
      alert('Could not save manual post. Please try again.');
    } finally {
      setIsSavingManual(false);
    }
  };

  const handleCreateFromLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner || !sourceUrl.trim()) return;

    setIsGeneratingFromLink(true);
    try {
      const contentData = await generateBlogContentFromLink(sourceUrl.trim());
      if (!contentData) {
        throw new Error('Could not generate content from link');
      }

      const image = await resolveCoverImage(contentData.title);
      const postDate = new Date().toLocaleDateString();
      const { error } = await supabase.from('blog_posts').insert({
        title: contentData.title,
        content: contentData.content,
        date: postDate,
        tags: ['Imported', 'Journal'],
        image_url: image,
      });

      if (error) throw error;

      await loadPosts();
      resetEditorState();
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create post from link', error);
      alert('Could not generate from this link. Please check the URL and try again.');
    } finally {
      setIsGeneratingFromLink(false);
    }
  };

  const applyEditorFormat = (command: 'bold' | 'italic' | 'underline' | 'insertUnorderedList') => {
    document.execCommand(command);
    manualEditorRef.current?.focus();
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

           <h3 className="text-xl font-bold mb-4 flex items-center text-earth-800 relative z-10"><Sparkles size={18} className="mr-2 text-eco-green"/> Journal Editor</h3>
           <p className="text-sm text-gray-500 mb-6 relative z-10">Choose how you want to create a post: AI prompt, manual writing, or import from a link.</p>

           <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            <button
              type="button"
              onClick={() => setCreateMode('ai')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${createMode === 'ai' ? 'bg-earth-800 text-white' : 'bg-earth-100 text-earth-800 hover:bg-earth-200'}`}
            >
              AI Generator
            </button>
            <button
              type="button"
              onClick={() => setCreateMode('manual')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${createMode === 'manual' ? 'bg-earth-800 text-white' : 'bg-earth-100 text-earth-800 hover:bg-earth-200'}`}
            >
              Manual Write
            </button>
            <button
              type="button"
              onClick={() => setCreateMode('link')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${createMode === 'link' ? 'bg-earth-800 text-white' : 'bg-earth-100 text-earth-800 hover:bg-earth-200'}`}
            >
              From Link
            </button>
           </div>

           <div className="relative z-10 mb-6 p-4 rounded-2xl border border-earth-200 bg-earth-50/70">
            <p className="text-sm font-medium text-earth-800 mb-2">Cover Image (optional)</p>
            <p className="text-xs text-earth-800/60 mb-3">Upload an image to attach to this post. If not uploaded, a cover is generated from the post content.</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-earth-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-earth-800 file:text-white hover:file:bg-earth-900"
            />
            {isProcessingImage && <p className="text-xs text-earth-800/60 mt-2">Compressing image...</p>}
            {imageUploadError && <p className="text-xs text-red-600 mt-2">{imageUploadError}</p>}
            {uploadedImageDataUrl && (
              <div className="mt-3">
                <img src={uploadedImageDataUrl} alt="Uploaded cover preview" className="h-28 w-40 object-cover rounded-xl border border-earth-200" />
                <button
                  type="button"
                  onClick={() => setUploadedImageDataUrl('')}
                  className="mt-2 text-xs text-red-600 hover:text-red-700"
                >
                  Remove uploaded image
                </button>
              </div>
            )}
           </div>

           {createMode === 'ai' && (
            <form onSubmit={handleCreatePost} className="flex flex-col sm:flex-row gap-4 relative z-10">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Topic e.g., Reducing plastic in ocean freight..."
                className="flex-1 px-6 py-4 border border-earth-200 bg-earth-50 rounded-2xl focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition-shadow"
              />

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
           )}

           {createMode === 'manual' && (
            <form onSubmit={handleSaveManualPost} className="relative z-10 space-y-4">
              <input
                type="text"
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
                placeholder="Post title"
                className="w-full px-4 py-3 border border-earth-200 bg-earth-50 rounded-2xl focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none"
              />

              <div className="border border-earth-200 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-earth-200 bg-earth-50">
                  <button type="button" onClick={() => applyEditorFormat('bold')} className="p-2 rounded-lg hover:bg-earth-200" title="Bold"><Bold size={16} /></button>
                  <button type="button" onClick={() => applyEditorFormat('italic')} className="p-2 rounded-lg hover:bg-earth-200" title="Italic"><Italic size={16} /></button>
                  <button type="button" onClick={() => applyEditorFormat('underline')} className="p-2 rounded-lg hover:bg-earth-200" title="Underline"><Underline size={16} /></button>
                  <button type="button" onClick={() => applyEditorFormat('insertUnorderedList')} className="p-2 rounded-lg hover:bg-earth-200" title="Bulleted list"><List size={16} /></button>
                </div>
                <div
                  ref={manualEditorRef}
                  contentEditable
                  onInput={(e) => setManualContent(e.currentTarget.innerText)}
                  className="min-h-[220px] p-4 text-sm text-earth-800 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingManual || !manualTitle.trim() || !manualContent.trim()}
                className="px-6 py-2.5 bg-eco-green text-white rounded-full font-medium hover:bg-green-800 transition-colors disabled:opacity-50"
              >
                {isSavingManual ? 'Saving...' : 'Publish Manual Entry'}
              </button>
            </form>
           )}

           {createMode === 'link' && (
            <form onSubmit={handleCreateFromLink} className="flex flex-col sm:flex-row gap-4 relative z-10">
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="Paste LinkedIn or blog post URL"
                className="flex-1 px-6 py-4 border border-earth-200 bg-earth-50 rounded-2xl focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition-shadow"
              />

              <button
                type="submit"
                disabled={isGeneratingFromLink || !sourceUrl.trim()}
                className="group flex items-center pl-1.5 pr-6 py-1.5 bg-eco-green text-white rounded-full font-medium hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-w-[220px] justify-center"
              >
                <div className="bg-white/20 p-2.5 rounded-full mr-3 group-hover:scale-110 transition-transform">
                  {isGeneratingFromLink ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </div>
                <span>{isGeneratingFromLink ? 'Generating...' : 'Generate From Link'}</span>
              </button>
            </form>
           )}
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