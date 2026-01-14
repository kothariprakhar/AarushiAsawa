import React from 'react';
import { Project } from '../types';
import { Download, Briefcase, Award, MapPin, GraduationCap, Trophy, Building2, Calendar } from 'lucide-react';
import aarushiImage from '../images/Aaru_prof.jpg';

const projects: Project[] = [
  {
    id: '1',
    title: 'ISO 20121 Sustainability Leadership',
    client: 'Major Sports Organization',
    description: 'Implemented ISO 20121 framework driving 35% emissions reduction. Established sustainable fan travel, circular waste processing, and solar energy efficiency, earning 7 international sustainability awards.',
    impact: '35% Emissions Cut',
  },
  {
    id: '2',
    title: 'Global Supply Chain Transformation',
    client: 'Beverage Giant (Fortune 500)',
    description: 'Led performance improvement across 10+ countries. Streamlined Order-to-Cash workstream using S/4 HANA, achieving £1bn in working capital savings and 40% reduction in manual inefficiencies.',
    impact: '£1bn+ Capital Saved',
  },
  {
    id: '3',
    title: 'Net Zero Carbon Strategy',
    client: 'Global Sports Governance',
    description: 'Pioneered first-ever carbon accounting and reporting systems aligned with Net Zero 2050. Facilitated workshops for carbon hotspot analysis to meet science-based targets.',
    impact: 'Net Zero Roadmap',
  },
];

const experience = [
  {
      role: "Manager – Sustainable Operations",
      company: "Think Beyond",
      location: "London, UK",
      period: "Mar 2024 – Present",
      description: "Spearheading sustainability transformation for Fortune 500s and Premier League clubs. Delivering Scope 1-3 Net Zero pathways, ISO 20121/14001 frameworks, and circular economy strategies."
  },
  {
      role: "Management Consultant",
      company: "KPMG Global Services",
      location: "London, UK",
      period: "Nov 2019 – Jun 2022",
      description: "Managed 15+ finance transformation projects cutting inefficiencies by 40%. Led circular operating model design and cross-functional programs for $7bn revenue portfolios."
  },
  {
      role: "Assistant Manager - Risk Advisory",
      company: "AMP & Co.",
      location: "Jaipur, India",
      period: "Aug 2018 – Nov 2019",
      description: "Delivered £3mn+ savings through resource optimization and governance structures. Conducted enterprise risk assessments enhancing operational resilience."
  },
  {
      role: "Audit Executive, Assurance Services",
      company: "Ernst & Young",
      location: "New Delhi, India",
      period: "Jun 2014 – Jun 2017",
      description: "Managed statutory audits for S&P 500 firms. Identified process inefficiencies driving £1mn+ in cost savings and improved working capital efficiency by 15%."
  }
];

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/3 shrink-0 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
           <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden shadow-xl relative group">
             <div className="absolute inset-0 bg-eco-green/10 group-hover:bg-transparent transition-colors duration-300"></div>
             <img
               src={aarushiImage}
               alt="Aarushi Asawa"
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
               onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
                  e.currentTarget.onerror = null;
               }}
             />
           </div>
           
           {/* Credentials Badges */}
           <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
              <span className="bg-earth-200/50 text-earth-800 text-xs font-bold px-3 py-1 rounded-full border border-earth-800/10 hover:bg-eco-green hover:text-white transition-colors duration-300 cursor-default">MBA (Distinction)</span>
              <span className="bg-earth-200/50 text-earth-800 text-xs font-bold px-3 py-1 rounded-full border border-earth-800/10 hover:bg-eco-green hover:text-white transition-colors duration-300 cursor-default">CA (Top 1%)</span>
              <span className="bg-earth-200/50 text-earth-800 text-xs font-bold px-3 py-1 rounded-full border border-earth-800/10 hover:bg-eco-green hover:text-white transition-colors duration-300 cursor-default">REnvP</span>
           </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-serif font-bold text-earth-800">Hello, I'm Aarushi.</h2>
          <div className="flex items-center space-x-2 text-eco-green font-medium">
            <MapPin size={18} />
            <span>London, United Kingdom</span>
          </div>
          
          <div className="space-y-4 text-earth-800/80 leading-relaxed text-lg font-light">
            <p>
              I am a <strong>Sustainability Consultant</strong> and <strong>Chartered Accountant</strong> with a unique blend of financial acumen and environmental expertise. Currently, I serve as a Manager for Sustainable Operations at <em>Think Beyond</em>, where I help global organizations in sport, retail, and entertainment navigate the transition to a regenerative future.
            </p>
            <p>
              My journey spans from rigorous financial auditing at <strong>EY</strong> and management consulting at <strong>KPMG</strong> to leading circularity transformations. I hold an MBA with specialization in Sustainability from <strong>Imperial College London</strong> and was a national topper in my Chartered Accountancy exams.
            </p>
            <p>
              Beyond the boardroom, I am a former <strong>National Table Tennis Champion</strong> and the founder of <em>Club Khel</em>, a social enterprise impacting thousands of children in India. I believe in high performance, whether on the court, in the spreadsheet, or for the planet.
            </p>
          </div>
          
          <div className="pt-6">
             <button className="group flex items-center pl-1.5 pr-6 py-1.5 bg-earth-800 text-white rounded-full transition-all hover:bg-earth-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
               <div className="bg-white/10 p-2.5 rounded-full mr-3 group-hover:bg-white/20 transition-colors">
                 <Download size={20} />
               </div>
               <span className="font-medium tracking-wide">Download CV</span>
             </button>
          </div>
        </div>
      </div>

      {/* Professional Experience Section */}
      <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center space-x-3 mb-8 border-b border-earth-200 pb-4">
            <Building2 className="text-eco-green" size={28} />
            <h3 className="text-2xl font-serif font-bold text-earth-800">Professional Experience</h3>
        </div>

        <div className="space-y-8 border-l-2 border-earth-200 ml-3 pl-8 relative">
            {experience.map((job, index) => (
                <div key={index} className="relative group opacity-0 animate-slide-up" style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}>
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-earth-50 border-4 border-eco-green group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <h4 className="text-xl font-bold text-earth-800 group-hover:text-eco-green transition-colors">{job.role}</h4>
                        <div className="flex items-center text-sm font-medium text-mustard-500 mt-1 sm:mt-0">
                            <Calendar size={14} className="mr-1.5" />
                            {job.period}
                        </div>
                    </div>
                    <div className="text-eco-green font-medium mb-3 text-sm">{job.company} • {job.location}</div>
                    <p className="text-earth-800/70 text-sm leading-relaxed">{job.description}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Key Projects Section */}
      <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="flex items-center space-x-3 mb-8 border-b border-earth-200 pb-4">
            <Briefcase className="text-eco-green" size={28} />
            <h3 className="text-2xl font-serif font-bold text-earth-800">Key Projects & Impact</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200 hover:shadow-lg transition-all duration-300 group flex flex-col hover:-translate-y-1 opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.9 + (index * 0.1)}s` }}
            >
              <div className="mb-4">
                <span className="text-xs font-bold tracking-wider text-eco-green uppercase mb-2 block">
                  {project.client}
                </span>
                <h4 className="text-xl font-bold text-earth-800 group-hover:text-eco-green transition-colors leading-tight">
                    {project.title}
                </h4>
              </div>
              <p className="text-earth-800/70 mb-6 text-sm leading-relaxed flex-grow">{project.description}</p>
              <div className="mt-auto pt-4 border-t border-earth-50">
                <div className="flex items-center space-x-2 text-mustard-500 font-bold text-sm">
                    <Award size={18} />
                    <span>{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Achievements Split */}
      <div className="grid md:grid-cols-2 gap-12 opacity-0 animate-slide-up" style={{ animationDelay: '1.2s' }}>
        {/* Education */}
        <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-earth-200 pb-4">
                <GraduationCap className="text-eco-green" size={28} />
                <h3 className="text-2xl font-serif font-bold text-earth-800">Education</h3>
            </div>
            <ul className="space-y-6">
                <li className="relative pl-6 border-l-2 border-earth-200 group hover:border-eco-green transition-colors">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-eco-green border-4 border-earth-50 group-hover:scale-125 transition-transform"></div>
                    <h4 className="font-bold text-earth-800">Imperial College Business School</h4>
                    <p className="text-sm text-earth-600">MBA in Sustainability & Entrepreneurship</p>
                    <p className="text-xs text-eco-green font-medium mt-1">Distinction (Top 15%)</p>
                </li>
                <li className="relative pl-6 border-l-2 border-earth-200 group hover:border-eco-green transition-colors">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-earth-300 border-4 border-earth-50 group-hover:scale-125 group-hover:bg-eco-green transition-all"></div>
                    <h4 className="font-bold text-earth-800">Institute of Chartered Accountants of India</h4>
                    <p className="text-sm text-earth-600">Chartered Accountant (CA)</p>
                    <p className="text-xs text-eco-green font-medium mt-1">Top 1% Rank Nationally</p>
                </li>
                <li className="relative pl-6 border-l-2 border-earth-200 group hover:border-eco-green transition-colors">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-earth-300 border-4 border-earth-50 group-hover:scale-125 group-hover:bg-eco-green transition-all"></div>
                    <h4 className="font-bold text-earth-800">Shri Ram College of Commerce (SRCC)</h4>
                    <p className="text-sm text-earth-600">Bachelor of Commerce (Hons)</p>
                </li>
                <li className="relative pl-6 border-l-2 border-earth-200 group hover:border-eco-green transition-colors">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-earth-300 border-4 border-earth-50 group-hover:scale-125 group-hover:bg-eco-green transition-all"></div>
                    <h4 className="font-bold text-earth-800">FIFA / CIES</h4>
                    <p className="text-sm text-earth-600">Executive Masters in Sports Management</p>
                </li>
            </ul>
        </div>

        {/* Leadership & Awards */}
        <div className="space-y-6">
             <div className="flex items-center space-x-3 border-b border-earth-200 pb-4">
                <Trophy className="text-eco-green" size={28} />
                <h3 className="text-2xl font-serif font-bold text-earth-800">Leadership</h3>
            </div>
            <div className="grid gap-4">
                <div className="bg-earth-100/50 p-4 rounded-xl flex items-start gap-3 hover:bg-earth-100 transition-colors group">
                    <div className="bg-white p-2 rounded-full text-mustard-500 shrink-0 group-hover:rotate-12 transition-transform">
                        <Award size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-800 text-sm">Founder, Club Khel</h4>
                        <p className="text-xs text-earth-600 mt-1">Social enterprise impacting 4,000+ students across 40+ cities in India through play-based education.</p>
                    </div>
                </div>
                 <div className="bg-earth-100/50 p-4 rounded-xl flex items-start gap-3 hover:bg-earth-100 transition-colors group">
                    <div className="bg-white p-2 rounded-full text-mustard-500 shrink-0 group-hover:rotate-12 transition-transform">
                        <Award size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-800 text-sm">National Sports Champion</h4>
                        <p className="text-xs text-earth-600 mt-1">Table Tennis U-16 National Champion and ranked Top 10 All-India women players.</p>
                    </div>
                </div>
                <div className="bg-earth-100/50 p-4 rounded-xl flex items-start gap-3 hover:bg-earth-100 transition-colors group">
                    <div className="bg-white p-2 rounded-full text-mustard-500 shrink-0 group-hover:rotate-12 transition-transform">
                        <Award size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-800 text-sm">World Govt Summit 2023</h4>
                        <p className="text-xs text-earth-600 mt-1">Presenter regarding the first digital charter to protect human rights.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default About;