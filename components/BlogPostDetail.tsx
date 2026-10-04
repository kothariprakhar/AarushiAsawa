import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';

type DbBlogPost = {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url: string | null;
  tags: string[];
};

interface BlogPostDetailProps {
  postId: string;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ postId, onBack }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('id,title,content,date,image_url,tags')
        .eq('id', postId)
        .single();

      if (fetchError || !data) {
        setError('Could not load this journal entry.');
        setIsLoading(false);
        return;
      }

      const dbPost = data as DbBlogPost;
      setPost({
        id: dbPost.id,
        title: dbPost.title,
        content: dbPost.content,
        date: dbPost.date,
        tags: dbPost.tags,
        imageUrl: dbPost.image_url || undefined,
      });
      setIsLoading(false);
    };

    void loadPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center text-earth-800 hover:text-eco-green transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>
        <p className="text-earth-800/70">Loading entry...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center text-earth-800 hover:text-eco-green transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>
        <p className="text-red-600">{error || 'Entry not found.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center text-earth-800 hover:text-eco-green transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>

      <article className="bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-sm">
        {post.imageUrl && (
          <div className="h-72 bg-earth-100">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-8 md:p-10">
          <div className="flex items-center text-xs text-earth-800/50 mb-4 space-x-2">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-earth-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-earth-100 text-earth-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-earth-800/80 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
