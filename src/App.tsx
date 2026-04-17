/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Phone, Mail, MapPin, 
  Globe, GraduationCap, Users, CheckCircle, 
  ArrowRight, MessageCircle, Send,
  Facebook, Linkedin, Instagram, Youtube,
  FileText, Award, BookOpen, Compass, Lock,
  KeyRound, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType, NavItem } from './types';

// Constants
const BRAND_BLUE = "#0047AB";
const BRAND_GOLD = "#D4AF37";

const Logo = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => (
  <div className={`flex items-center gap-3 cursor-pointer group ${className}`} onClick={onClick}>
    <div className="relative">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-accent/10">
        <GraduationCap className="text-black w-full h-full" strokeWidth={2.5} />
      </div>
      <div className="absolute -inset-1 bg-accent/20 rounded-sm blur opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl md:text-2xl font-black text-white leading-none uppercase tracking-tighter">
        Trentfield <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4">Education</span>
      </h1>
      <p className="text-[9px] md:text-[10px] text-text-muted font-black tracking-[0.4em] uppercase opacity-80 mt-1">
        London Excellence
      </p>
    </div>
  </div>
);

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { 
    label: 'Courses', 
    id: 'diploma', // Base id for the group
    children: [
      { label: 'Diploma Programs', id: 'diploma' },
      { label: 'Undergraduate Programs', id: 'undergraduate' },
      { label: 'Postgraduate Programs', id: 'postgraduate' },
      { label: 'DBA / PhD Programs', id: 'dba-phd' },
    ]
  },
  { label: 'Study Abroad', id: 'study-abroad' },
  { label: 'LMS Portal', id: 'lms' },
  { label: 'Contact', id: 'contact' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use this to scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const navigate = (id: PageType) => {
    setCurrentPage(id);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20">
      {/* Navigation */}
      <nav className={`glass-nav transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Logo onClick={() => navigate('home')} />

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-48 group-hover:w-64"
              />
              <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-accent transition-colors rotate-12" />
            </div>
            
            <div className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 font-semibold text-text-muted hover:text-accent py-4 transition-colors">
                      {item.label} <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 w-64 bg-primary-dark shadow-2xl rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-2 z-50 backdrop-blur-xl">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => navigate(child.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-medium ${currentPage === child.id ? 'text-accent bg-white/5' : 'text-text-muted'}`}
                        >
                          <BookOpen className="w-4 h-4 text-accent/40" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => navigate(item.id)}
                    className={`font-semibold py-4 transition-colors relative ${currentPage === item.id ? 'text-accent' : 'text-text-muted hover:text-accent'}`}
                  >
                    {item.label}
                    {currentPage === item.id && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full"
                      />
                    )}
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={() => navigate('contact')}
              className="btn-primary"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden p-2 text-slate-700" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-primary-dark border-t border-accent/10 overflow-hidden backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div className="py-2">
                        <p className="text-[10px] font-black text-accent/50 uppercase tracking-[0.2em] px-4 mb-2">{item.label}</p>
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => navigate(child.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-bold uppercase tracking-tight ${currentPage === child.id ? 'text-accent bg-white/5' : 'text-text-muted'}`}
                          >
                            <BookOpen className="w-4 h-4 text-accent/20" />
                            {child.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(item.id)}
                        className={`w-full text-left px-4 py-4 rounded-lg flex items-center gap-4 text-base font-black uppercase tracking-tighter ${currentPage === item.id ? 'text-accent bg-white/5' : 'text-text-muted'}`}
                      >
                        {item.id === 'home' && <Globe className="w-5 h-5 opacity-40" />}
                        {item.id === 'about' && <Users className="w-5 h-5 opacity-40" />}
                        {item.id === 'study-abroad' && <Compass className="w-5 h-5 opacity-40" />}
                        {item.id === 'contact' && <Phone className="w-5 h-5 opacity-40" />}
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-white/5 mt-4">
                  <button 
                    onClick={() => navigate('contact')}
                    className="w-full btn-primary"
                  >
                    Start Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomePage navigate={navigate} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'diploma' && <ProgramsPage type="diploma" />}
            {currentPage === 'undergraduate' && <ProgramsPage type="undergraduate" />}
            {currentPage === 'postgraduate' && <ProgramsPage type="postgraduate" />}
            {currentPage === 'dba-phd' && <ProgramsPage type="dba-phd" />}
            {currentPage === 'study-abroad' && <StudyAbroadPage />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'lms' && <LMSPage navigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-dark-bg text-text-muted pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
           <Globe className="w-96 h-96 text-accent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="flex flex-col gap-8">
              <Logo />
              <p className="text-sm leading-relaxed font-medium">
                Premier international education consultancy in Bangladesh. Specializing in UK diplomas, global online degrees and study abroad solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/5 rounded-sm hover:bg-accent transition-all hover:text-black hover:scale-110 active:scale-90"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-sm hover:bg-accent transition-all hover:text-black hover:scale-110 active:scale-90"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-sm hover:bg-accent transition-all hover:text-black hover:scale-110 active:scale-90"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-sm hover:bg-accent transition-all hover:text-black hover:scale-110 active:scale-90"><Youtube className="w-5 h-5" /></a>
              </div>
              
              <div className="mt-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Mailing List</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="flex-grow bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all" 
                  />
                  <button className="bg-accent text-black p-3 rounded-sm hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-accent font-black mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                Discovery
              </h3>
              <ul className="flex flex-col gap-5 text-sm font-bold uppercase tracking-tight">
                <li><button onClick={() => navigate('home')} className="hover:text-white hover:translate-x-2 transition-all">Portal Home</button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-white hover:translate-x-2 transition-all">Our Legacy</button></li>
                <li><button onClick={() => navigate('study-abroad')} className="hover:text-white hover:translate-x-2 transition-all">Global Hubs</button></li>
                <li><button onClick={() => navigate('lms')} className="hover:text-white hover:translate-x-2 transition-all">LMS Portal</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-white hover:translate-x-2 transition-all">Get in Touch</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-accent font-black mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                Pathways
              </h3>
              <ul className="flex flex-col gap-5 text-sm font-bold uppercase tracking-tight">
                <li><button onClick={() => navigate('diploma')} className="hover:text-white hover:translate-x-2 transition-all">UK Diplomas</button></li>
                <li><button onClick={() => navigate('undergraduate')} className="hover:text-white hover:translate-x-2 transition-all">Undergraduate</button></li>
                <li><button onClick={() => navigate('postgraduate')} className="hover:text-white hover:translate-x-2 transition-all">Postgraduate</button></li>
                <li><button onClick={() => navigate('dba-phd')} className="hover:text-white hover:translate-x-2 transition-all">Doctorate / PhD</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-accent font-black mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                Contact
              </h3>
              <div className="flex flex-col gap-8 text-sm font-medium">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <p>Hera Market, #01-35, Tangail, Dhaka, Bangladesh</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <p>+880 1620-251550</p>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <p>trentfieldedu@gmail.com</p>
                </div>
                <div className="flex gap-4">
                  <Globe className="w-5 h-5 text-accent shrink-0" />
                  <a href="https://trentfieldeducation.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">trentfieldeducation.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/30">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>&copy; {new Date().getFullYear()} Trentfield Education London. Excellence Defined.</p>
              <span className="hidden md:inline opacity-20">|</span>
              <a href="https://trentfieldeducation.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors tracking-widest">trentfieldeducation.com</a>
            </div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms</a>
              <a href="#" className="hover:text-accent transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/8801620251550" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold">Chat with us</span>
        <MessageCircle className="w-8 h-8 md:w-9 md:h-9" />
      </a>
    </div>
  );
}

function LMSPage({ navigate }: { navigate: (page: PageType) => void }) {
  const [formState, setFormState] = useState({ id: '', password: '' });

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 h-full w-full bg-dark-bg">
        <div className="absolute top-0 right-0 p-48 opacity-10 pointer-events-none rotate-12">
           <Globe className="w-96 h-96 text-accent" />
        </div>
        <div className="absolute bottom-10 left-10 p-24 opacity-5 pointer-events-none -rotate-12">
           <GraduationCap className="w-64 h-64 text-accent" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card-dark border-accent/20 p-10 md:p-12 shadow-[0_0_100px_rgba(212,175,55,0.05)]">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="mb-8">
               <Logo />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">LMS Portal Authentication</h2>
            <div className="w-12 h-1 bg-accent mt-4 rounded-full" />
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Institutional Identity</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Student ID / LMS Username"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">LMS Security Key</label>
                <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-colors">Credential Recovery</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="remember" className="accent-accent w-4 h-4 rounded" />
              <label htmlFor="remember" className="text-xs font-bold text-text-muted uppercase tracking-tight cursor-pointer">Remember for 30 Days</label>
            </div>

            <button className="w-full btn-primary py-5 text-base shadow-[0_10px_30px_rgba(0,71,171,0.2)]">
              Secure LMS Login
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-xs font-bold text-text-muted uppercase tracking-tight">Need LMS Access?</p>
            <button 
              onClick={() => navigate('contact')}
              className="mt-4 text-sm font-black text-accent hover:underline decoration-2 underline-offset-4"
            >
              Request Portal Credentials
            </button>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 opacity-40">
           <Lock className="w-3 h-3" />
           <p className="text-[10px] font-bold text-white uppercase tracking-widest">Academic Data Encryption Shield</p>
        </div>
      </motion.div>
    </div>
  );
}

// --- Home Page ---
function HomePage({ navigate }: { navigate: (id: PageType) => void }) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent z-10" />
          <img 
            src="https://picsum.photos/seed/education-global/1920/1080?blur=4" 
            alt="Business Education" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          {/* Animated Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full animate-float" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="tagline">Your Gateway to Global Education</div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Excellence in <span className="text-accent underline decoration-accent/30 underline-offset-8">International</span> Admissions
              </h1>
              <p className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed max-w-xl">
                Unlock prestigious online degrees and study abroad opportunities in the UK, USA, Malaysia, and Europe. Trusted guidance for the leaders of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('contact')}
                  className="btn-primary"
                >
                  Start Application
                </button>
                <button 
                  onClick={() => navigate('diploma')}
                  className="btn-accent"
                >
                  View Programs
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="bg-primary-dark/50 py-12 border-b border-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { label: "Students Placed", value: "500+" },
              { label: "Global Partners", value: "50+" }
            ].map(stat => (
              <div key={stat.label} className="text-center group">
                <p className="text-3xl md:text-5xl font-black text-white mb-1 group-hover:text-accent transition-colors">{stat.value}</p>
                <p className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark-bg/30">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="tagline mx-auto w-fit">Excellence in Service</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Why Choose Trentfield Education</h3>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Globe, title: "Global Partners", desc: "Access to top international universities in UK, Europe, Malaysia & USA." },
            { icon: GraduationCap, title: "Online Learning", desc: "Flexible distance learning options for working professionals and students." },
            { icon: FileText, title: "Visa Support", desc: "Comprehensive guidance for student visa applications and documentation." },
            { icon: CheckCircle, title: "100% Assistance", desc: "Full support from program selection to university admission & enrollment." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card-dark card-hover text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 mx-auto text-accent">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h4>
              <p className="text-text-muted leading-relaxed text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
          <GraduationCap className="w-96 h-96 text-accent" />
        </div>
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl text-left">
            <h2 className="tagline">Academic Offerings</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Our Premium Programs</h3>
          </div>
          <button 
            onClick={() => navigate('about')}
            className="flex items-center gap-2 font-bold text-accent hover:gap-4 transition-all pb-1 border-b-2 border-accent/20"
          >
            Explore All Courses <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'diploma', title: 'Diploma Programs', desc: 'UK Diplomas & OTHM qualifications in various business and IT fields.', img: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a919?auto=format&fit=crop&q=80&w=800' },
            { id: 'undergraduate', title: 'Undergraduate', desc: 'Bachelor degree programs from top international and online universities.', img: 'https://images.unsplash.com/photo-1523050338692-7b835a07733f?auto=format&fit=crop&q=80&w=800' },
            { id: 'postgraduate', title: 'Postgraduate', desc: 'MBA, MSc options with flexible schedules and globally recognised degrees.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
            { id: 'dba-phd', title: 'DBA / PhD', desc: 'Doctoral programs with research supervision support for future leaders.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' },
          ].map((program, idx) => (
            <motion.div 
              key={idx}
              className="group cursor-pointer card-program overflow-hidden"
              onClick={() => navigate(program.id as PageType)}
            >
              <div className="h-48 overflow-hidden relative rounded-t-xl -mt-6 -mx-6 mb-6">
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors uppercase tracking-tight">{program.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium">{program.desc}</p>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest">
                  LEARN MORE <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark-bg/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 p-24 opacity-[0.02] pointer-events-none">
           <MapPin className="w-96 h-96 text-white" />
        </div>
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="tagline mx-auto w-fit">Success Stories</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Our Students' Voice</h3>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Ahmed Rezwan", role: "UK MBA Graduate", text: "Trentfield made my application process for the UK MBA so smooth. Their guidance on OTHM levels was exactly what I needed to advance my career.", avatar: "AR" },
            { name: "Sara Islam", role: "MSc in Malaysia", text: "Finding the right postgraduate program in Malaysia seemed difficult until I spoke with their team. High level of professionalism and care.", avatar: "SI" },
            { name: "Tanvir Hasan", role: "Undergraduate Student", text: "From university selection to visa guidance, Trentfield supported me every step of the way. I highly recommend them to all students.", avatar: "TH" }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-dark relative pt-16 group hover:border-accent/30 transition-all"
            >
              <div className="absolute top-0 left-12 -translate-y-1/2 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-xl group-hover:scale-110 transition-transform">
                {t.avatar}
              </div>
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="inline-block w-4 h-4 text-accent mr-1 fill-accent/20" />
                ))}
              </div>
              <p className="text-white font-bold mb-4 italic leading-relaxed">"{t.text}"</p>
              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="text-white font-black uppercase text-sm tracking-widest">{t.name}</h4>
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/80 mb-12 font-medium">Join 500+ successful students who have achieved their educational goals with Trentfield.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => navigate('contact')}
              className="btn-primary px-12 py-5 text-lg"
            >
              Apply Online Now
            </button>
            <a 
              href="https://wa.me/8801620251550"
              className="btn-accent px-12 py-5 text-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- About Page ---
function AboutPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">About Trentfield</h1>
          <div className="w-24 h-2 bg-accent mx-auto rounded-full mb-8" />
          <p className="text-2xl text-text-muted font-medium max-w-3xl mx-auto leading-relaxed">
            International education consultancy dedicated to empowering students with globally recognised academic opportunities.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full bg-white/5 rounded-[3rem] -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Team" 
              className="rounded-[3rem] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent p-8 rounded-full flex flex-col items-center justify-center text-black shadow-2xl animate-float">
              <p className="text-4xl font-black">10+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-black/80">Years Exp.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">Our Story & Commitment</h2>
            <div className="space-y-6 text-text-muted font-medium leading-relaxed">
              <p>
                Trentfield Education London is a premier education consultancy based in Bangladesh, providing expert guidance to students aspiring for higher education abroad and through online learning pathways.
              </p>
              <p>
                We specialise in connecting students with reputable academic institutions across the UK, Europe, Malaysia, and the USA. Our team ensures that every student finds a program that aligns with their career goals and financial plans.
              </p>
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="card-dark p-6">
                  <h3 className="text-accent font-black uppercase text-sm tracking-widest mb-4">Our Mission</h3>
                  <p className="text-sm">To bridge the gap between ambitious students and quality global education through transparent and expert consultancy.</p>
                </div>
                <div className="card-dark p-6">
                  <h3 className="text-accent font-black uppercase text-sm tracking-widest mb-4">Our Vision</h3>
                  <p className="text-sm">To become the most trusted platform for international education and online degree admissions in South Asia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white/5 p-16 rounded-[4rem] text-center mb-32 border border-white/10 backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tight">Our Academic Partners</h2>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
            {[
              { name: 'OTHM', url: 'https://img.icons8.com/color/96/uk.png' },
              { name: 'UAL', url: 'https://img.icons8.com/color/96/museum.png' },
              { name: 'UK University', url: 'https://img.icons8.com/color/96/university.png' },
              { name: 'European Higher Ed', url: 'https://img.icons8.com/color/96/globe--v1.png' },
              { name: 'QS Ranked', url: 'https://img.icons8.com/color/96/checked-badge.png' },
              { name: 'Global Admissions', url: 'https://img.icons8.com/color/96/safety-certificate.png' }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center p-3 border border-white/5 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
                  <img src={p.url} alt={p.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{p.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-black text-white mb-16 uppercase tracking-tight">Student Support Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "Admission Support", desc: "Expert guidance on university selection and application submission." },
              { icon: FileText, title: "Visa Assistance", desc: "Complete documentation support for student visas with 98% success rate." },
              { icon: BookOpen, title: "Career Counselling", desc: "One-on-one sessions to align your studies with future global job markets." }
            ].map((s, i) => (
              <div key={i} className="card-dark card-hover">
                <s.icon className="w-10 h-10 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-white">{s.title}</h3>
                <p className="text-text-muted text-sm font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Programs Page ---
function ProgramsPage({ type }: { type: 'diploma' | 'undergraduate' | 'postgraduate' | 'dba-phd' }) {
  const contentMap = {
    diploma: {
      title: 'Diploma Programs',
      subtitle: 'Fast-Track Your Career with UK & OTHM Qualifications',
      desc: 'Our diploma programs are designed for students and working professionals looking for skill-based qualifications that are internationally recognised.',
      programs: ['Level 3 Foundation Diploma', 'Level 4 & 5 Business Management', 'IT & Computing Diplomas', 'Hospitality & Tourism OTHM'],
      benefits: ['100% Online Options', 'Monthly Start Dates', 'Low Tuition Fees', 'University Progression']
    },
    undergraduate: {
      title: 'Undergraduate Degrees',
      subtitle: 'Bachelors Degrees from Global Universities',
      desc: 'Broaden your horizons with Bachelor programs in Business, IT, Healthcare, and Engineering from top-tier international institutions.',
      programs: ['BSc (Hons) Business Management', 'BA (Hons) International Relations', 'BSc Data Science & AI', 'BSc Nursing & Healthcare'],
      benefits: ['Study Abroad Pathways', 'Transfer Options', 'Affordable Funding', 'Research Opportunities']
    },
    postgraduate: {
      title: 'Postgraduate Studies',
      subtitle: 'Excel in Leadership with MBA & MSc Degrees',
      desc: 'Advanced degree programs for those aiming to reach top-tier management and leadership roles globally.',
      programs: ['Executive MBA', 'MSc Information Systems', 'MSc Projects Management', 'MA Global Marketing'],
      benefits: ['Flexible Weekend Classes', '1-Year Fast-Track', 'Networking Events', 'Career Acceleration']
    },
    'dba-phd': {
      title: 'DBA & PhD Programs',
      subtitle: 'Reach the Peak of Academic Achievement',
      desc: 'We provide research supervision support and admission guidance for Doctor of Business Administration and PhD programs.',
      programs: ['Doctor of Business Admin (DBA)', 'PhD in Education', 'PhD in Public Health', 'Professional Doctorates'],
      benefits: ['Experienced Supervisors', 'Part-time Research', 'Global Recognition', 'Funding Guidance'],
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200'
    }
  };

  const content = contentMap[type];

  // Map images specifically for hero if different from highlights
  const heroImage = {
    diploma: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a919?auto=format&fit=crop&q=80&w=1200',
    undergraduate: 'https://images.unsplash.com/photo-1523050338692-7b835a07733f?auto=format&fit=crop&q=80&w=1200',
    postgraduate: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    'dba-phd': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200'
  }[type];

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative h-[400px] mb-20 rounded-[3rem] overflow-hidden border border-white/10 group">
          <img 
            src={heroImage} 
            alt={content.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
          <div className="absolute bottom-12 left-12 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{content.title}</h1>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          <div className="lg:w-2/3">
            <p className="text-xl font-bold text-accent mb-8 uppercase tracking-wide">{content.subtitle}</p>
            <p className="text-lg text-text-muted font-medium mb-12 leading-relaxed">{content.desc}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {content.programs.map((p, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border border-accent/20 text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-white uppercase tracking-tight text-sm">{p}</p>
                </div>
              ))}
            </div>

            <button className="btn-primary flex items-center gap-2">Request Brochure <ArrowRight className="w-5 h-5" /></button>
          </div>
          
          <div className="lg:w-1/3 card-dark p-12 text-white border-accent/30 sticky top-32 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Award className="w-32 h-32 text-accent" />
            </div>
            <Award className="w-12 h-12 text-accent mb-8 relative z-10" />
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tight relative z-10">Key Benefits</h2>
            <ul className="space-y-6 relative z-10">
              {content.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                  <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-12 p-6 bg-accent/10 rounded-2xl border border-accent/20 relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-accent mb-2">Need Guidance?</p>
              <p className="text-sm font-medium mb-4 text-text-muted">Connect with an academic advisor today.</p>
              <a href="https://wa.me/8801620251550" className="text-sm font-black text-white underline decoration-accent underline-offset-4 hover:text-accent transition-colors">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Study Abroad Page ---
function StudyAbroadPage() {
  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800' },
    { name: 'Europe', flag: '🇪🇺', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Malaysia', flag: '🇲🇾', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=800' },
    { name: 'USA', flag: '🇺🇸', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.8]">Global <br/>Exploration</h1>
          <p className="text-xl text-text-muted font-medium max-w-2xl">
            We provide comprehensive guidance for students aspiring to study in the world's leading educational hubs. 
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {countries.map((c, i) => (
            <div key={i} className="group relative h-[500px] overflow-hidden rounded-[3rem] shadow-xl border border-white/10">
              <img 
                src={c.img} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={c.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <span className="text-4xl mb-4 block">{c.flag}</span>
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">{c.name}</h2>
                <p className="text-text-muted mb-8 font-medium max-w-xs">Top programs in business, engineering, and medical sciences available for intake.</p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-xs uppercase tracking-widest">View Universities</button>
                  <button className="px-6 py-2 border border-white/30 text-white font-bold rounded-full text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm">Admission Criteria</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="p-16 bg-white/5 rounded-[4rem] text-center border border-white/10">
          <h2 className="text-4xl font-black text-white mb-12 uppercase tracking-tight">Our Roadmap to Your Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: '01', title: 'Consultation', text: 'Define your goals' },
              { id: '02', title: 'University Selection', text: 'Find the perfect fit' },
              { id: '03', title: 'Application', text: 'Secure your place' },
              { id: '04', title: 'Visa Success', text: 'Fly to your future' },
            ].map((step, i) => (
              <div key={i} className="card-dark group hover:bg-accent transition-all duration-300">
                <span className="block text-4xl font-black text-white/5 mb-4 group-hover:text-black/10 transition-colors uppercase">{step.id}</span>
                <h3 className="text-lg font-black mb-2 group-hover:text-black transition-colors uppercase tracking-tight">{step.title}</h3>
                <p className="text-[10px] font-bold text-text-muted group-hover:text-black/60 transition-colors uppercase tracking-widest">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Contact Page ---
function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', program: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry submitted successfully! We will contact you soon.");
  };

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">Contact Us</h1>
          <p className="text-xl text-text-muted font-medium max-w-2xl mx-auto">
            Ready to take the first step towards your international career? Get in touch with our expert academic advisors today.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          <div className="bg-primary-dark text-white p-12 md:p-16 rounded-[4rem] shadow-2xl flex flex-col justify-between border border-white/10 backdrop-blur-xl">
            <div>
              <h2 className="text-3xl font-black mb-12 uppercase tracking-tight text-white/90">Office Details</h2>
              <div className="space-y-12">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <MapPin className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2 uppercase tracking-widest text-[10px]">Our Office</h3>
                    <p className="text-lg font-bold tracking-tight">Hera Market, #01-35, Tangail, Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Phone className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2 uppercase tracking-widest text-[10px]">Phone & WhatsApp</h3>
                    <p className="text-lg font-bold tracking-tight">+880 1620-251550</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Mail className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2 uppercase tracking-widest text-[10px]">Support Email</h3>
                    <p className="text-lg font-bold tracking-tight text-white/80">trentfieldedu@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Globe className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2 uppercase tracking-widest text-[10px]">Official Website</h3>
                    <a href="https://trentfieldeducation.com" target="_blank" rel="noopener noreferrer" className="text-lg font-bold tracking-tight text-white hover:text-accent transition-colors">trentfieldeducation.com</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="flex gap-6">
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-all hover:scale-110 active:scale-90 hover:text-black"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-all hover:scale-110 active:scale-90 hover:text-black"><Linkedin className="w-6 h-6" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-all hover:scale-110 active:scale-90 hover:text-black"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent transition-all hover:scale-110 active:scale-90 hover:text-black"><Youtube className="w-6 h-6" /></a>
              </div>
            </div>
          </div>

          <div className="card-dark p-12 md:p-16 border-accent/20">
            <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tight">Express Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Full Name</label>
                  <input 
                    type="text" required placeholder="John Doe" 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white placeholder:text-white/20"
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Email Address</label>
                  <input 
                    type="email" required placeholder="john@example.com" 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white placeholder:text-white/20"
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Phone Number</label>
                  <input 
                    type="tel" required placeholder="+880 1XXX-XXXXXX" 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white placeholder:text-white/20"
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Interested Program</label>
                  <select 
                    required 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-white"
                    onChange={e => setFormState({...formState, program: e.target.value})}
                  >
                    <option value="" className="bg-primary-dark">Select Program</option>
                    <option value="diploma" className="bg-primary-dark">Diploma Programs</option>
                    <option value="undergraduate" className="bg-primary-dark">Undergraduate</option>
                    <option value="postgraduate" className="bg-primary-dark">Postgraduate</option>
                    <option value="dba-phd" className="bg-primary-dark">DBA / PhD</option>
                    <option value="study-abroad" className="bg-primary-dark">Study Abroad</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent px-1">Message</label>
                <textarea 
                  rows={4} placeholder="How can we help you?" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium resize-none text-white placeholder:text-white/20"
                  onChange={e => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3"
              >
                Send Inquiry <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-32 rounded-[4rem] overflow-hidden h-[500px] shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all relative">
          <div className="absolute inset-0 bg-dark-bg flex items-center justify-center">
             <div className="text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="font-bold text-white uppercase tracking-tight">Google Map Embed Placeholder</p>
                <p className="text-text-muted text-sm font-medium">Tangail, Dhaka, Bangladesh</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

