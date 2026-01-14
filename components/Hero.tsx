import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Palette, ArrowRight, TrendingUp, Trophy, Briefcase, Sprout, Sparkles, MonitorPlay, ChevronRight, Scan, Aperture, BarChart3, Wind, Droplets, Zap, Search, PenTool, Rocket, Award, CheckCircle2, PieChart, Activity, Layers, ArrowUpRight } from 'lucide-react';
import { ViewState } from '../types';
import aarushiImage from '../images/Aarushi_hero.jpg';

interface HeroProps {
    setView: (view: ViewState) => void;
}

// --- Scroll Animation Helper ---
const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger once
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${className} ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-rotate steps every 5 seconds if user hasn't interacted recently (optional, maybe just manual for better UX)
  // Let's keep it manual for "elite" feel - users like control.

  const steps = [
    { 
        id: 0, 
        title: 'Diagnostic', 
        subtitle: 'Financial & Carbon Baselining', 
        icon: Search,
        description: "We begin with a forensic audit of your value chain. Leveraging my background as a Chartered Accountant, I identify carbon hotspots that double as financial inefficiencies.",
        stat: "Avg. 15% OpEx Savings Identified"
    },
    { 
        id: 1, 
        title: 'Strategy', 
        subtitle: 'Circular Business Modeling', 
        icon: PenTool, 
        description: "Designing the roadmap. We move from linear 'take-make-waste' models to regenerative loops, ensuring your supply chain is resilient against future climate risks.",
        stat: "New Revenue Streams Unlocked"
    },
    { 
        id: 2, 
        title: 'Execution', 
        subtitle: 'High-Performance Delivery', 
        icon: Rocket,
        description: "Strategy without discipline is hallucination. I apply elite sports psychology principles to change management, ensuring your teams are aligned and agile.",
        stat: "3x Faster Implementation"
    },
    { 
        id: 3, 
        title: 'Reporting', 
        subtitle: 'ISO 20121 & Net Zero', 
        icon: Award,
        description: "Transparency builds trust. We deliver audit-ready non-financial reports that satisfy investors, regulators, and eco-conscious consumers.",
        stat: "100% Compliance Rate"
    }
  ];

  return (
    <div className="bg-deep-green min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500">
      
      {/* --- Playful Diagram Layer (Background) --- */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        
        {/* Top Right: The Earth (The Client) - Large Diagram style */}
        <div className="absolute -top-20 -right-20 md:-top-32 md:-right-32 w-[300px] h-[300px] md:w-[600px] md:h-[600px] text-earth-50/5 animate-spin-slow z-0">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
             </svg>
        </div>

        {/* Circular Economy Diagram (Top Left/Center) - Made Bigger & Shifted Right */}
        <div className="absolute top-24 left-1/3 md:left-[32%] w-32 h-32 text-eco-light/20 animate-spin-slow z-0 hidden md:block">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
        </div>

        {/* ANIMATED WINDMILL (Top Center) */}
        <div className="absolute top-16 right-[45%] md:right-[42%] w-32 h-32 text-eco-light/20 z-0 opacity-80">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                 {/* Tower Base */}
                 <path d="M45 95 L55 95 L52 50 L48 50 Z" />
                 
                 {/* Rotating Blades - Perfectly Equidistant */}
                 <g className="animate-spin-windmill" style={{transformOrigin: '50px 50px'}}>
                    <circle cx="50" cy="50" r="4" />
                    {/* Blade 1 (Up) */}
                    <path d="M50 50 L42 12 L50 5 L58 12 Z" />
                    {/* Blade 2 (Rotate 120deg) */}
                    <path d="M50 50 L42 12 L50 5 L58 12 Z" transform="rotate(120 50 50)" />
                    {/* Blade 3 (Rotate 240deg) */}
                    <path d="M50 50 L42 12 L50 5 L58 12 Z" transform="rotate(240 50 50)" />
                 </g>
            </svg>
        </div>

        {/* Top Left: Factory Industry Diagram */}
        <div className="absolute top-12 left-6 md:left-20 opacity-20 animate-float-slow z-0">
            <div className="relative">
                {/* Factory Icon */}
                <svg className="w-24 h-24 md:w-32 md:h-32 text-earth-50" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 22H2V10l4-4v4h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v8h2V6l4-4v12h2v8zM12 12.5V8.8L10 10.5v2h2zm6 0V6.8l-2 1.7v4h2z" />
                </svg>
                {/* Smoke Footprints */}
                <div className="absolute -top-10 left-12 text-earth-50/60 animate-bounce" style={{ animationDuration: '3s' }}>
                    <svg className="w-10 h-10 rotate-12" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M14.56,6.65C13.88,8.23 11.23,10.23 10,12.5C9.4,13.63 9.77,14.63 10.5,15.2C11.5,15.96 13.5,15.3 14.5,14C15.68,12.53 16.5,10.61 16.5,9C16.5,7.5 15.56,6.5 14.56,6.65M10.94,5.5C10.5,6.5 8.77,8.2 8,9.5C7.5,10.3 7.7,11 8.25,11.5C9,12.1 10.5,11.5 11,10.5C11.6,9.5 12.1,8 12.1,7C12.1,6 11.5,5.2 10.94,5.5M16.9,8C17.4,8.6 18.5,10 18.5,11.5C18.5,12.6 18,13 17.5,13C17,13 16,12 16,11C16,10.3 16.5,9.5 16.9,8M8,8.5C7.5,9.2 6.5,10.5 6.5,11.5C6.5,12.2 7,12.5 7.5,12.5C8,12.5 8.7,11.8 8.7,11C8.7,10.5 8.3,9.5 8,8.5Z" />
                    </svg>
                </div>
            </div>
        </div>

        {/* ANIMATED SOLAR POWER (Bottom Left-ish) */}
        <div className="absolute bottom-1/2 left-2 md:left-8 w-28 h-28 text-eco-light/20 animate-float-medium z-0 hidden md:block">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full overflow-visible">
                {/* Sun */}
                <circle cx="4" cy="4" r="3" className="text-mustard-500/50 animate-pulse" />
                <g className="animate-spin-slow" style={{transformOrigin: '4px 4px'}}>
                   <line x1="4" y1="0" x2="4" y2="-1" stroke="currentColor" strokeWidth="0.5" className="text-mustard-500/30" />
                   <line x1="4" y1="8" x2="4" y2="9" stroke="currentColor" strokeWidth="0.5" className="text-mustard-500/30" />
                   <line x1="0" y1="4" x2="-1" y2="4" stroke="currentColor" strokeWidth="0.5" className="text-mustard-500/30" />
                   <line x1="8" y1="4" x2="9" y2="4" stroke="currentColor" strokeWidth="0.5" className="text-mustard-500/30" />
                </g>
                
                {/* Panel Stand */}
                <path d="M11 19 L13 19 L13 22 L11 22 Z" />
                <path d="M7 19 L17 19" stroke="currentColor" strokeWidth="1" />
                
                {/* Panel Surface (Trapezoid for perspective) */}
                <path d="M5 12 L19 12 L17 19 L7 19 Z" fill="currentColor" opacity="0.8" />
                
                {/* Panel Grid Lines */}
                <path d="M9.5 12 L9 19" stroke="currentColor" strokeWidth="0.5" className="text-deep-green" />
                <path d="M14.5 12 L15 19" stroke="currentColor" strokeWidth="0.5" className="text-deep-green" />
                <path d="M6 15.5 L18 15.5" stroke="currentColor" strokeWidth="0.5" className="text-deep-green" />
                
                {/* Falling Sun Rays - Dashed lines moving towards panel */}
                <line x1="5" y1="6" x2="8" y2="13" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="animate-ray-flow text-mustard-500/80" />
                <line x1="7" y1="5" x2="12" y2="13" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="animate-ray-flow text-mustard-500/80" style={{animationDelay: '0.7s'}} />
                <line x1="9" y1="5" x2="16" y2="13" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="animate-ray-flow text-mustard-500/80" style={{animationDelay: '1.4s'}} />
            </svg>
        </div>

        {/* Bottom Left: Supply Chain Diagram */}
        <div className="absolute bottom-32 left-8 md:bottom-20 md:left-32 opacity-20 flex items-end space-x-2 animate-float-medium z-0 scale-75 md:scale-100">
             <svg className="w-24 h-24 text-earth-50" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
             </svg>
             <svg className="w-20 h-20 text-mustard-500 mb-6" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
                 <path d="M0 15 Q 25 0 50 15" />
                 <path d="M45 10 L50 15 L45 20" strokeDasharray="0" />
             </svg>
             <svg className="w-20 h-20 text-mustard-500" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.21v6.7zM13 12.58v6.71l6-3.38v-6.7l-6 3.37z"/>
             </svg>
        </div>

        {/* CARBON SEQUESTRATION (Bottom Right) - REPOSITIONED HIGHER to avoid being covered by footer */}
        <div className="absolute top-[65%] right-4 md:top-[60%] md:right-24 w-40 h-40 md:w-48 md:h-48 z-0">
            <div className="relative w-full h-full">
                {/* Trees - Increased opacity */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-eco-light/30">
                    <path d="M10 21h4v-2h-4v2zm1-18L6 8h3v3h-3l5 6 5-6h-3V8h3l-5-5z" />
                    <path d="M18 21h-2v-2h2v2zm-1-10l-3 3h2v2h-2l3.5 4 3.5-4h-2v-2h2l-3-3z" opacity="0.8" transform="translate(1,0)"/>
                    {/* Roots Visualization */}
                    <path d="M12 21 L12 23 M11 23 L13 23" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                </svg>
                
                {/* Floating CO2 Molecules - Increased Visibility & Contrast */}
                <div className="absolute -top-6 left-12 text-earth-50/70 text-sm font-bold animate-sequester">CO₂</div>
                <div className="absolute -top-2 left-24 text-earth-50/60 text-xs font-bold animate-sequester" style={{animationDelay: '1.5s'}}>CO₂</div>
                <div className="absolute top-4 left-8 text-earth-50/50 text-xs font-bold animate-sequester" style={{animationDelay: '3s'}}>C</div>
            </div>
        </div>

        {/* Waves (Bottom Center) - Moved up slightly as well */}
        <div className="absolute bottom-16 left-1/4 md:left-1/2 w-48 h-12 text-eco-light/30 animate-pulse z-0 hidden md:block">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-full h-full">
                 <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" />
                 <path d="M2 16c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" opacity="0.6" />
            </svg>
        </div>

        {/* Floating Leaves & Lightbulbs (Ideas) - Scattered */}
         <div className="absolute top-1/4 right-1/3 text-earth-50/20 w-16 h-16 animate-spin-slow hidden md:block">
            <Leaf size={64} />
         </div>
         <div className="absolute bottom-1/3 right-1/4 text-mustard-500/20 w-16 h-16 animate-float-fast hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V17h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
            </svg>
         </div>

      </div>

      {/* Main Hero Content */}
      <div className="min-h-[calc(100vh-6rem)] flex items-center z-10 relative">
        <div className="max-w-7xl mx-auto px-6 w-full py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Text */}
            <ScrollReveal>
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-earth-50 leading-[1.1] tracking-tight relative">
                  <span className="relative z-10">Strategies for a</span> <br/>
                  {/* Changed to Script font to match 'living' in the reference image */}
                  <span className="font-script text-mustard-500 relative z-10 text-6xl lg:text-8xl ml-4">Regenerative</span> <br/>
                  <span className="relative z-10">Future</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-earth-50/80 leading-relaxed font-sans font-light max-w-2xl mx-auto lg:mx-0 relative">
                  I advise businesses on reducing carbon footprints, optimizing supply chains, and enhancing social impact. Designed to protect both your profit and the planet.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  {/* Mustard Button */}
                  <button 
                    onClick={() => setView(ViewState.ABOUT)}
                    className="px-8 py-3.5 bg-mustard-500 text-white font-sans font-bold tracking-wide rounded-full shadow-lg hover:bg-yellow-600 transition-all hover:scale-105 flex items-center space-x-2 z-20"
                  >
                    <Palette size={20} />
                    <span>MY IMPACT</span>
                  </button>

                  {/* Outline Button - Updated for Dark Theme */}
                  <button 
                     onClick={() => setView(ViewState.BLOG)}
                     className="px-8 py-3.5 bg-transparent border border-earth-50 text-earth-50 font-sans font-bold tracking-wide rounded-full hover:bg-earth-50 hover:text-deep-green transition-all flex items-center space-x-2 z-20"
                  >
                     <Leaf size={20} />
                     <span>READ JOURNAL</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Imagery */}
            <ScrollReveal delay={200} className="relative flex justify-center lg:justify-end">
               {/* Main Circular Image Mask */}
               <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl z-10 bg-white group">
                  <img 
                    src={aarushiImage}
                    alt="Aarushi Asawa" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
                      e.currentTarget.onerror = null;
                    }}
                  />
               </div>

               {/* Decorative Floating Elements attached to the image */}
               <div className="absolute top-0 right-10 bg-white p-4 rounded-2xl shadow-lg animate-float-slow z-20 hidden sm:block rotate-6">
                  <Leaf size={32} className="text-eco-green" />
               </div>
               
               <div className="absolute bottom-10 left-10 bg-mustard-500 p-4 rounded-2xl shadow-lg animate-float-medium z-20 hidden sm:block -rotate-6">
                  <Palette size={32} className="text-white" />
               </div>

               {/* Background Circle Element behind image */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-white/10 rounded-full -z-0"></div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* NEW FOOTER SECTION: Multidisciplinary Edge */}
      <div className="bg-earth-800 text-earth-50 py-20 px-6 relative z-10 overflow-hidden border-t border-white/10">
         {/* Footer decoration */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-eco-green/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-mustard-500/10 rounded-full blur-[80px]"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-serif font-medium">The Multidisciplinary Advantage</h2>
                  <p className="text-earth-200/80 max-w-2xl mx-auto text-lg font-light">
                      A unique convergence of financial rigour, strategic management, and high-performance discipline driving real sustainable impact.
                  </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Finance */}
                <ScrollReveal delay={100} className="h-full">
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 h-full">
                      <div className="mb-6 flex justify-between items-start">
                          <div className="p-3 bg-white/10 rounded-xl text-mustard-500 group-hover:scale-110 transition-transform duration-300">
                               <TrendingUp size={28} />
                          </div>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">ACA</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Financial Rigour</h3>
                      <p className="text-sm text-earth-200/70 leading-relaxed">
                          Top 1% Chartered Accountant. Translating environmental metrics into audited financial value and risk mitigation.
                      </p>
                  </div>
                </ScrollReveal>

                {/* 2. Management */}
                <ScrollReveal delay={200} className="h-full">
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 h-full">
                      <div className="mb-6 flex justify-between items-start">
                          <div className="p-3 bg-white/10 rounded-xl text-blue-300 group-hover:scale-110 transition-transform duration-300">
                               <Briefcase size={28} />
                          </div>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">MBA</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Strategic Vision</h3>
                      <p className="text-sm text-earth-200/70 leading-relaxed">
                          Distinction holder from Imperial College. Driving organizational change and business transformation strategies.
                      </p>
                  </div>
                </ScrollReveal>

                {/* 3. Sports */}
                <ScrollReveal delay={300} className="h-full">
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 h-full">
                      <div className="mb-6 flex justify-between items-start">
                          <div className="p-3 bg-white/10 rounded-xl text-orange-400 group-hover:scale-110 transition-transform duration-300">
                               <Trophy size={28} />
                          </div>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">Athlete</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">High Performance</h3>
                      <p className="text-sm text-earth-200/70 leading-relaxed">
                          National Table Tennis Champion. Applying elite sports discipline, resilience, and agility to corporate challenges.
                      </p>
                  </div>
                </ScrollReveal>

                {/* 4. Sustainability - ANIMATED */}
                <ScrollReveal delay={400} className="h-full">
                  <div className="group bg-eco-green/20 backdrop-blur-sm border border-eco-green/30 rounded-2xl p-6 hover:bg-eco-green/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full">
                      
                      {/* Animated Growth Background */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                           <svg viewBox="0 0 100 100" className="w-full h-full text-eco-green fill-current">
                                {/* Central Tree: Stem & Leaves */}
                                <g className="origin-bottom" style={{transformOrigin: '50% 100%'}}>
                                    {/* Stem - Grows First */}
                                    <path d="M48 100 L48 50 C48 50 50 40 52 50 L52 100 Z" className="animate-cycle-plant" />
                                    {/* Canopy - Blooms Second */}
                                    <path d="M50 80 Q30 80 30 60 Q30 30 50 30 Q70 30 70 60 Q70 80 50 80" className="animate-cycle-leaf" style={{transformOrigin: '50% 60%'}} />
                                </g>

                                {/* Left Tree - Forest Expansion */}
                                <g className="origin-bottom" style={{transformOrigin: '25% 100%'}}>
                                    <path d="M23 100 L23 60 C23 60 25 55 27 60 L27 100 Z" className="animate-cycle-forest" />
                                    <path d="M25 75 Q15 75 15 65 Q15 50 25 50 Q35 50 35 65 Q35 75 25 75" className="animate-cycle-forest" style={{transformOrigin: '25% 65%'}} />
                                </g>

                                {/* Right Tree - Forest Expansion */}
                                <g className="origin-bottom" style={{transformOrigin: '75% 100%'}}>
                                    <path d="M73 100 L73 65 C73 65 75 60 77 65 L77 100 Z" className="animate-cycle-forest" style={{animationDelay: '0.5s'}} />
                                    <path d="M75 80 Q65 80 65 70 Q65 55 75 55 Q85 55 85 70 Q85 80 75 80" className="animate-cycle-forest" style={{transformOrigin: '75% 70%', animationDelay: '0.5s'}} />
                                </g>

                                {/* Far Left - Forest Expansion */}
                                <g className="origin-bottom" style={{transformOrigin: '10% 100%'}}>
                                    <circle cx="10" cy="85" r="8" className="animate-cycle-forest" style={{animationDelay: '1s'}} />
                                    <rect x="9" y="85" width="2" height="15" className="animate-cycle-forest" style={{animationDelay: '1s'}} />
                                </g>

                                 {/* Far Right - Forest Expansion */}
                                <g className="origin-bottom" style={{transformOrigin: '90% 100%'}}>
                                    <circle cx="90" cy="80" r="10" className="animate-cycle-forest" style={{animationDelay: '1.2s'}} />
                                    <rect x="89" y="80" width="2" height="20" className="animate-cycle-forest" style={{animationDelay: '1.2s'}} />
                                </g>
                           </svg>
                      </div>

                      <div className="mb-6 flex justify-between items-start relative z-10">
                          <div className="p-3 bg-eco-green text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-eco-green/20">
                               <Sprout size={28} />
                          </div>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm relative z-10">Impact</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white relative z-10">Sustainability</h3>
                      <p className="text-sm text-earth-200/70 leading-relaxed relative z-10">
                          Expert in Circular Economy & Net Zero. ISO 20121 specialist transforming operations for a regenerative future.
                      </p>
                  </div>
                </ScrollReveal>

            </div>
         </div>
      </div>

      {/* FOOTER SECTION 2: THE STRATEGIC BLUEPRINT (High-End UX) */}
      <div className="relative bg-[#05100a] text-white py-24 overflow-hidden">
        
        {/* Background Mesh (Subtle) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-eco-green rounded-full blur-[200px] opacity-30"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900 rounded-full blur-[200px] opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div className="space-y-4 max-w-2xl">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
                          <Layers size={14} className="text-mustard-500" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">Proprietary Framework</span>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                          The Transformation <br/> Roadmap
                      </h2>
                  </div>
                  <div className="md:text-right max-w-sm">
                      <p className="text-white/50 font-light leading-relaxed text-sm">
                          A structured, data-driven methodology designed to move organizations from compliance to competitive advantage.
                      </p>
                  </div>
              </div>
            </ScrollReveal>

            {/* Interactive Component Area */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[500px]">
                  
                  {/* Left: Navigation Steps */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                      {steps.map((step, index) => (
                          <button
                              key={step.id}
                              onClick={() => setActiveStep(index)}
                              className={`group relative p-6 text-left rounded-2xl border transition-all duration-500 flex items-start gap-4 overflow-hidden ${
                                  activeStep === index 
                                  ? 'bg-white/10 border-eco-green/50 shadow-lg shadow-eco-green/10' 
                                  : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20 opacity-60 hover:opacity-100'
                              }`}
                          >
                              {/* Progress Bar Background for Active Step */}
                              {activeStep === index && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-eco-green"></div>
                              )}

                              <div className={`p-3 rounded-xl transition-colors ${activeStep === index ? 'bg-eco-green text-white' : 'bg-white/10 text-white/50 group-hover:text-white'}`}>
                                  <step.icon size={20} />
                              </div>
                              <div>
                                  <h3 className={`text-lg font-bold mb-1 transition-colors ${activeStep === index ? 'text-white' : 'text-white/80'}`}>{step.title}</h3>
                                  <p className="text-xs text-white/50 uppercase tracking-wider">{step.subtitle}</p>
                              </div>
                              
                              {/* Arrow Indicator */}
                              <ArrowRight 
                                  size={16} 
                                  className={`absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                                      activeStep === index ? 'opacity-100 translate-x-0 text-eco-green' : 'opacity-0 -translate-x-4'
                                  }`} 
                              />
                          </button>
                      ))}
                  </div>

                  {/* Right: Active Content Visualization (The "Screen") */}
                  <div className="lg:col-span-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 animate-fade-in group">
                       {/* Decorative Elements */}
                       <div className="absolute top-0 right-0 p-6 opacity-20">
                           <Scan size={128} className="text-white animate-spin-slow" strokeWidth={0.5} />
                       </div>
                       <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-eco-green to-transparent opacity-30"></div>

                       {/* Main Content Area */}
                       <div className="flex-1 flex flex-col justify-center relative z-10 space-y-6">
                           
                           {/* Dynamic Icon & Title */}
                           <div className="flex items-center space-x-4 mb-4">
                               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                                  {React.createElement(steps[activeStep].icon, { size: 32, className: "text-mustard-500" })}
                               </div>
                               <div>
                                   <h3 className="text-3xl font-serif text-white mb-1">{steps[activeStep].title} Phase</h3>
                                   <div className="flex items-center space-x-2 text-eco-green text-xs font-mono uppercase tracking-widest">
                                       <Activity size={12} className="animate-pulse" />
                                       <span>System Active</span>
                                   </div>
                               </div>
                           </div>

                           <p className="text-lg text-white/70 leading-relaxed font-light border-l-2 border-white/10 pl-6">
                               {steps[activeStep].description}
                           </p>

                           {/* Action Button */}
                           <div className="pt-4">
                               <button className="flex items-center space-x-2 text-white font-bold border-b border-mustard-500 pb-1 hover:text-mustard-500 transition-colors">
                                   <span>Explore Case Studies</span>
                                   <ArrowUpRight size={16} />
                               </button>
                           </div>
                       </div>

                       {/* Dynamic Data Widget / Visualizer */}
                       <div className="w-full md:w-64 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-white/20 transition-colors">
                           
                           {/* Visual Representation based on Active Step */}
                           <div className="flex-1 flex items-center justify-center mb-6">
                               {activeStep === 0 && (
                                   <div className="relative w-24 h-24">
                                       <PieChart size={96} className="text-white/20 absolute inset-0" strokeWidth={1} />
                                       <PieChart size={96} className="text-mustard-500 absolute inset-0 animate-pulse" strokeWidth={1} strokeDasharray="50 100" />
                                       <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">AUDIT</div>
                                   </div>
                               )}
                               {activeStep === 1 && (
                                   <div className="flex items-center space-x-2">
                                       <div className="w-8 h-24 bg-white/10 rounded-full overflow-hidden relative">
                                           <div className="absolute bottom-0 w-full h-1/3 bg-eco-green animate-slide-up"></div>
                                       </div>
                                       <div className="w-8 h-24 bg-white/10 rounded-full overflow-hidden relative">
                                           <div className="absolute bottom-0 w-full h-2/3 bg-mustard-500 animate-slide-up" style={{animationDelay: '0.2s'}}></div>
                                       </div>
                                       <div className="w-8 h-24 bg-white/10 rounded-full overflow-hidden relative">
                                           <div className="absolute bottom-0 w-full h-1/2 bg-blue-500 animate-slide-up" style={{animationDelay: '0.4s'}}></div>
                                       </div>
                                   </div>
                               )}
                               {activeStep === 2 && (
                                   <Rocket size={64} className="text-white/80 animate-bounce" strokeWidth={1} />
                               )}
                               {activeStep === 3 && (
                                   <div className="text-center">
                                       <Award size={64} className="text-mustard-500 mx-auto mb-2" strokeWidth={1.5} />
                                       <div className="flex items-center justify-center space-x-1 text-eco-green text-xs font-bold">
                                           <CheckCircle2 size={12} />
                                           <span>VERIFIED</span>
                                       </div>
                                   </div>
                               )}
                           </div>

                           {/* Stat Counter */}
                           <div>
                               <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Key Outcome</p>
                               <p className="text-xl font-bold text-white leading-tight">{steps[activeStep].stat}</p>
                           </div>
                       </div>

                  </div>
              </div>
            </ScrollReveal>
            
        </div>
      </div>
    </div>
  );
};

export default Hero;