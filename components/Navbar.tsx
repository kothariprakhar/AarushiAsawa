import React from 'react';
import { ViewState } from '../types';
import { Leaf, Palette, User, BookOpen, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: Leaf },
    { id: ViewState.ABOUT, label: 'About Me', icon: User },
    { id: ViewState.BLOG, label: 'Journal', icon: BookOpen },
  ];

  // Static Styles (Light Theme)
  const bgColor = 'bg-earth-50/90 border-earth-200';
  const textColor = 'text-earth-800';
  const subTextColor = 'text-eco-green';
  const iconBgActive = 'bg-eco-green text-white';
  const iconBgInactive = 'bg-earth-200 text-earth-600';
  const buttonActive = 'bg-white shadow-md ring-1 ring-earth-100';
  const buttonHover = 'hover:bg-white/60';

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Main Brand / Logo */}
          <div className="group flex items-center space-x-3 cursor-pointer select-none" onClick={() => setView(ViewState.HOME)}>
            <div className={`p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 bg-eco-green text-white`}>
              <Globe size={24} className="opacity-90" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={`text-3xl font-script font-bold leading-none tracking-wide transition-colors ${textColor}`}>
                Aarushi Asawa
              </h1>
              <p className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity ${subTextColor} pl-1`}>
                Sustainability Consultant
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`group flex items-center pl-1 pr-5 py-1.5 rounded-full transition-all duration-300 ${isActive ? `${buttonActive} scale-105` : `${buttonHover} hover:shadow-sm`}`}
                >
                  <div className={`p-2 rounded-full transition-all duration-300 shadow-sm ${
                    isActive 
                      ? `${iconBgActive} rotate-0` 
                      : `${iconBgInactive} group-hover:bg-eco-light/20 group-hover:text-eco-green group-hover:rotate-12`
                  }`}>
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className={`ml-3 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? `${textColor} font-bold` : `text-earth-600 group-hover:${textColor}`
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Icon */}
          <div className={`md:hidden p-2 ${textColor}`}>
             <div className="space-y-1.5 cursor-pointer">
                <div className="w-6 h-0.5 bg-current rounded-full"></div>
                <div className="w-6 h-0.5 bg-current rounded-full"></div>
                <div className="w-6 h-0.5 bg-current rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;