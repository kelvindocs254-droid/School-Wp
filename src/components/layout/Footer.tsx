import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center text-white font-black">SF</div>
            <span className="text-xl font-black tracking-tight text-white">ST. FRANCIS</span>
          </Link>
          <p className="text-slate-400 text-sm font-medium leading-relaxed opacity-80">
            Nurturing excellence through innovative learning and community commitment. Since 1984, we have been shaping the leaders of tomorrow.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Our History</Link></li>
            <li><Link to="/academics" className="hover:text-white transition-colors">Academic Programs</Link></li>
            <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">School Calendar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6">Learn More</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li><Link to="#" className="hover:text-white transition-colors">Campus Life</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Co-curricular</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Scholarships</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-brand-indigo" />
              <span>123 Education Lane, Boston MA 02110</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-brand-indigo" />
              <span>+1 (555) ACADEMY</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-brand-indigo" />
              <span>hello@stfrancis.edu</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
        <p>© {currentYear} St Francis Primary And Junior Secondary School • ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-white">Privacy Policy</Link>
          <Link to="#" className="hover:text-white">Careers</Link>
          <Link to="#" className="hover:text-white">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
