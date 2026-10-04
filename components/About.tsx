import React from 'react';
import { Project } from '../types';
import { Download, Briefcase, Award, MapPin, GraduationCap, Trophy, Building2, Calendar, BadgeCheck } from 'lucide-react';
import aarushiImage from '../images/Aaru_prof.jpg';
import cvFile from '../docs/Aarushi_Asawa_CV.pdf';

const projects: Project[] = [
  {
    id: '1',
    title: 'ISO 14001/20121 Event Sustainability',
    client: 'Premier League, Motorsport & EFC',
    description: 'Implemented ISO 14001/20121 event sustainability frameworks across global events, embedding circular operations and stakeholder engagement to achieve 28% waste reduction, 90% water recycling and 96% renewable energy adoption.',
    impact: '96% Renewable Energy',
  },
  {
    id: '2',
    title: 'Global Finance & Supply Chain Transformation',
    client: 'FTSE 50 Clients',
    description: 'Managed 15+ AI-enabled strategic transformations, redesigning operating models and processes to strengthen supply chain resilience, improving operational efficiency by 40% and unlocking £4bn+ in working capital.',
    impact: '£4bn+ Capital Unlocked',
  },
  {
    id: '3',
    title: 'Net Zero & Climate Transition Strategy',
    client: 'Fortune 500 Clients',
    description: 'Developed 5+ Net Zero strategies and climate transition plans aligned with SBTi and TPT, using decarbonisation scenario analysis and GHG Protocol-aligned carbon accounting across Scopes 1-3 to prioritise emissions abatement.',
    impact: '30% Emissions Cut',
  },
];

const experience = [
  {
      role: "Manager – Sustainability Strategy & Transformation",
      company: "Think Beyond",
      location: "London, UK",
      period: "Mar 2024 – Present",
      description: "Spearheading 15+ sustainability transformations for Fortune 500 clients across 7+ industries. Delivering SBTi-aligned Net Zero pathways, ISSB/CSRD reporting, Scope 1-3 carbon accounting, ISO 20121/14001 frameworks, and circular economy strategies."
  },
  {
      role: "Management Consultant – Finance Transformation",
      company: "KPMG Global Services",
      location: "London, UK",
      period: "Nov 2019 – Jun 2022",
      description: "Managed 15+ AI-enabled transformations for FTSE 50 clients, improving efficiency by 40% and unlocking £4bn+ in working capital. Led circular, low-carbon operating model design across £6bn revenue portfolios."
  },
  {
      role: "Assistant Manager - Risk Advisory",
      company: "AMP & Co.",
      location: "Jaipur, India",
      period: "Aug 2018 – Nov 2019",
      description: "Delivered £400k+ savings through resource optimisation and sustainable supply chain initiatives across 10 geographies. Conducted enterprise risk and double materiality assessments enhancing operational resilience."
  },
  {
      role: "Audit Executive, Assurance Services",
      company: "Ernst & Young",
      location: "New Delhi, India",
      period: "Jun 2014 – Jun 2017",
      description: "Managed 20+ audits and performance improvement projects for multinationals across 7 industries. Identified process inefficiencies driving £1mn+ in cost savings and improved working capital efficiency by 15%."
  }
];

const certifications = [
  { name: "REnvP", detail: "Registered Environmental Practitioner · Dec 2024" },
  { name: "Impact Investing", detail: "Diploma, IE Business School · Jun 2023" },
  { name: "Lean Six Sigma", detail: "Green Belt · Dec 2021" },
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
              I am a <strong>Sustainability Consultant</strong> and <strong>Chartered Accountant</strong> with a unique blend of financial acumen and environmental expertise. Currently, I serve as a Manager for Sustainability Strategy and Transformation at <em>Think Beyond</em>, where I help Fortune 500 organizations across sport, retail, entertainment and beyond navigate the transition to a regenerative future.
            </p>
            <p>
              My journey spans from rigorous financial auditing at <strong>EY</strong> and management consulting at <strong>KPMG</strong> to leading circularity transformations. I hold an MBA with specialization in Sustainability from <strong>Imperial College London</strong> and ranked in the top 1% nationally in my Chartered Accountancy exams.
            </p>
            <p>
              Beyond the boardroom, I am a former <strong>National Table Tennis Champion</strong> and the founder of <em>Club Khel</em>, a social enterprise impacting thousands of children in India. I believe in high performance, whether on the court, in the spreadsheet, or for the planet.
            </p>
          </div>
          
          <div className="pt-6">
             <a href={cvFile} download="Aarushi_Asawa_CV.pdf" className="group inline-flex items-center pl-1.5 pr-6 py-1.5 bg-earth-800 text-white rounded-full transition-all hover:bg-earth-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
               <div className="bg-white/10 p-2.5 rounded-full mr-3 group-hover:bg-white/20 transition-colors">
                 <Download size={20} />
               </div>
               <span className="font-medium tracking-wide">Download CV</span>
             </a>
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
                    <p className="text-xs text-eco-green font-medium mt-1">Distinction, First-Class Honours</p>
                </li>
                <li className="relative pl-6 border-l-2 border-earth-200 group hover:border-eco-green transition-colors">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-earth-300 border-4 border-earth-50 group-hover:scale-125 group-hover:bg-eco-green transition-all"></div>
                    <h4 className="font-bold text-earth-800">FIFA / CIES</h4>
                    <p className="text-sm text-earth-600">Executive Masters in Sports Management</p>
                </li>
            </ul>

            {/* Certifications — tucked beneath education, details revealed on hover/tap */}
            <div className="pl-6 pt-2">
                <p className="text-[11px] uppercase tracking-widest font-bold text-earth-600/70 mb-3">Also certified in</p>
                <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                        <div key={cert.name} tabIndex={0} className="group/cert relative outline-none">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-earth-800/80 px-3 py-1 rounded-full border border-dashed border-earth-800/20 cursor-default transition-colors duration-300 group-hover/cert:border-eco-green group-hover/cert:text-eco-green group-focus/cert:border-eco-green group-focus/cert:text-eco-green">
                                <BadgeCheck size={14} />
                                {cert.name}
                            </span>
                            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-lg bg-earth-800 text-white text-[11px] px-3 py-1.5 shadow-lg opacity-0 translate-y-1 transition-all duration-300 group-hover/cert:opacity-100 group-hover/cert:translate-y-0 group-focus/cert:opacity-100 group-focus/cert:translate-y-0 z-10">
                                {cert.detail}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
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
                        <p className="text-xs text-earth-600 mt-1">Social enterprise aligned with SDG3 & SDG4, impacting 4,000+ students across 40+ cities in India through play-based education and improving learning outcomes by 30%.</p>
                    </div>
                </div>
                 <div className="bg-earth-100/50 p-4 rounded-xl flex items-start gap-3 hover:bg-earth-100 transition-colors group">
                    <div className="bg-white p-2 rounded-full text-mustard-500 shrink-0 group-hover:rotate-12 transition-transform">
                        <Award size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-800 text-sm">National Sports Champion</h4>
                        <p className="text-xs text-earth-600 mt-1">Table Tennis U-16 National Champion, ranked Top 10 All-India women players, and recipient of the ‘Chacha Nehru Sports Award’.</p>
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