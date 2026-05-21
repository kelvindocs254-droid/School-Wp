import Hero from '@/src/components/home/Hero';
import Stats from '@/src/components/home/Stats';
import Features from '@/src/components/home/Features';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      
      {/* Grid of Featured Sections (Matching Design Pattern) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School News (Rose Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-brand-rose rounded-[40px] p-10 text-white relative overflow-hidden group shadow-xl"
          >
            <div className="relative z-10 flex flex-col h-full min-h-[300px]">
              <h3 className="text-3xl font-black mb-6">School News</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <span className="text-2xl">🏆</span>
                  <div className="text-sm font-bold">Science Fair Winners Announced</div>
                </li>
                <li className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <span className="text-2xl">🏀</span>
                  <div className="text-sm font-bold">Varsity Tryouts: Oct 15th</div>
                </li>
              </ul>
              <div className="mt-auto font-black flex items-center gap-3 group-hover:gap-5 transition-all">
                All Stories <ArrowRight size={20} />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 text-[180px] opacity-10 pointer-events-none rotate-12">📰</div>
          </motion.div>

          {/* Admissions Portal (Emerald Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-brand-emerald rounded-[40px] p-10 text-white relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-3">Portal</h3>
              <p className="text-emerald-50/80 font-medium mb-8">Access grades, schedules, and feedback in one secure place.</p>
              <div className="space-y-4">
                <div className="bg-white h-14 rounded-2xl flex items-center px-6 text-slate-400 text-sm font-bold">Student ID Number</div>
                <div className="bg-white h-14 rounded-2xl flex items-center px-6 text-slate-400 text-sm font-bold">Password</div>
                <button className="w-full bg-brand-amber text-brand-slate-900 font-black py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events (White Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-slate-100 rounded-[40px] p-10 shadow-xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Events</h3>
              <span className="bg-brand-indigo/10 text-brand-indigo text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">MAY 2026</span>
            </div>
            <div className="space-y-6">
              {[
                { day: '12', month: 'MAY', title: 'Open House Day', sub: '9AM - 1PM | Campus' },
                { day: '25', month: 'MAY', title: 'Spring Festival', sub: '4PM - 7PM | Great Hall' }
              ].map((event, i) => (
                <div key={i} className="flex gap-5 items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-brand-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-50 group-hover:border-brand-indigo transition-colors duration-500">
                    <span className="text-brand-indigo font-black text-2xl leading-none">{event.day}</span>
                    <span className="text-[10px] whitespace-nowrap font-black text-slate-400">{event.month}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-brand-indigo transition-colors">{event.title}</h4>
                    <p className="text-sm font-bold text-slate-400">{event.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Features />

      {/* CTA Section (Brand Indigo) */}
      <section className="py-24 bg-brand-indigo overflow-hidden relative mx-6 lg:mx-20 rounded-[80px] my-20">
        <div className="max-w-7xl mx-auto px-10 text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1]">
              Start Your Journey <br className="hidden md:block" /> with St. Francis.
            </h2>
            <p className="text-brand-indigo-50/80 mb-12 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Join a vibrant community dedicated to excellence. Our 2026/27 admissions are now open for all programs.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/admissions" className="bg-brand-amber hover:bg-brand-amber-dark text-brand-slate-900 px-12 py-5 rounded-[24px] font-black text-xl shadow-2xl transition-transform hover:scale-105">
                Apply Today
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 text-white px-12 py-5 rounded-[24px] font-black text-xl transition-all">
                Book a Tour
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      </section>
    </div>
  );
}
