import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, Phone, Info, Home as HomeIcon, Users, Calendar, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Academics', path: '/academics', icon: GraduationCap },
  { name: 'Staff', path: '/staff', icon: Users },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Admissions', path: '/admissions', icon: BookOpen },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
  { name: 'Admin', path: '/admin', icon: ShieldCheck },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent text-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
            SF
          </div>
          <div className="leading-tight">
            <span className={cn(
              "block text-2xl font-black tracking-tight",
              scrolled ? "text-slate-900" : "text-white"
            )}>
              ST. FRANCIS <span className="text-brand-indigo underline decoration-brand-amber underline-offset-4">SCHOOL</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-bold tracking-wide transition-all hover:scale-105',
                location.pathname === item.path 
                  ? 'text-brand-indigo scale-110' 
                  : scrolled ? 'text-slate-600 hover:text-brand-indigo' : 'text-white/80 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admissions"
            className="bg-brand-amber hover:bg-brand-amber-dark text-brand-slate-900 px-7 py-2.5 rounded-full font-black shadow-lg shadow-brand-amber/20 transition-all hover:scale-105 active:scale-95"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-4 text-slate-900 border-b border-slate-50 font-bold"
                >
                  <item.icon size={22} className="text-brand-indigo" />
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-brand-indigo text-white py-5 rounded-2xl text-center font-black shadow-lg"
              >
                Start Application
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
