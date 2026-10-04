import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Blog from './components/Blog';
import { ViewState } from './types';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import BlogPostDetail from './components/BlogPostDetail';

type AppRoute = {
  view: ViewState;
  postId?: string;
};

const getPathForRoute = (route: AppRoute) => {
  if (route.view === ViewState.ABOUT) return '/about';
  if (route.view === ViewState.BLOG && route.postId) return `/journal/${route.postId}`;
  if (route.view === ViewState.BLOG) return '/journal';
  return '/';
};

const getRouteFromPath = (pathname: string): AppRoute => {
  if (pathname === '/about') return { view: ViewState.ABOUT };
  if (pathname === '/journal') return { view: ViewState.BLOG };

  const journalPostMatch = pathname.match(/^\/journal\/([^/]+)$/);
  if (journalPostMatch) {
    return { view: ViewState.BLOG, postId: decodeURIComponent(journalPostMatch[1]) };
  }

  return { view: ViewState.HOME };
};

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToRoute = (nextRoute: AppRoute, shouldPushState = true) => {
    setRoute(nextRoute);
    if (shouldPushState) {
      const nextPath = getPathForRoute(nextRoute);
      window.history.pushState(nextRoute, '', nextPath);
    }
  };

  const setView = (view: ViewState) => {
    navigateToRoute({ view });
  };

  const openPost = (postId: string) => {
    navigateToRoute({ view: ViewState.BLOG, postId });
  };

  const handleBackFromPost = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigateToRoute({ view: ViewState.BLOG });
  };

  const currentView = useMemo(() => route.view, [route.view]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Hero setView={setView} />;
      case ViewState.ABOUT:
        return <About />;
      case ViewState.BLOG:
        if (route.postId) {
          return <BlogPostDetail postId={route.postId} onBack={handleBackFromPost} />;
        }
        return <Blog onOpenPost={openPost} />;
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-earth-800 bg-earth-50">
      <Navbar currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-earth-200 border-t border-earth-800/10 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-bold text-lg">Aarushi Asawa</h4>
            <p className="text-sm opacity-70">Sustainability Consultant</p>
            <p className="text-xs opacity-50 mt-1">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          
          <div className="flex space-x-6">
             <a href="https://www.linkedin.com/in/aarushi-asawa/?originalSubdomain=uk" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-earth-800 hover:text-eco-green transition-colors shadow-sm">
                <Linkedin size={20} />
             </a>
             <a href="#" className="p-2 bg-white rounded-full text-earth-800 hover:text-eco-green transition-colors shadow-sm">
                <Twitter size={20} />
             </a>
             <a href="mailto:hello@aarushiasawa.com" className="p-2 bg-white rounded-full text-earth-800 hover:text-eco-green transition-colors shadow-sm">
                <Mail size={20} />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;