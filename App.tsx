import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Blog from './components/Blog';
import { ViewState } from './types';
import { Twitter, Linkedin, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Hero setView={setCurrentView} />;
      case ViewState.ABOUT:
        return <About />;
      case ViewState.BLOG:
        return <Blog />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-earth-800 bg-earth-50">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
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