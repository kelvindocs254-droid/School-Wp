import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-indigo rounded-[40px] relative overflow-hidden flex flex-col lg:flex-row items-center p-12 lg:p-20 shadow-2xl"
        >
          {/* Decorative background shapes */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-brand-amber rounded-full mix-blend-screen opacity-40 blur-2xl" />
          
          <div className="relative z-10 max-w-2xl text-white">
            <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6">
              EST. 1984
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8">
              Where Curiosity <br/> 
              <span className="text-brand-amber">Meets Discovery.</span>
            </h1>
            <p className="text-brand-indigo-50 text-xl mb-10 font-medium leading-relaxed opacity-90 max-w-lg">
              Empowering the next generation of innovators, artists, and leaders through holistic education and creative exploration.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/admissions" className="bg-white text-brand-indigo px-10 py-4 rounded-2xl font-black shadow-xl transition-transform hover:scale-105 active:scale-95">
                Apply Today
              </Link>
              <button className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 rounded-2xl font-black transition-all">
                Virtual Tour
              </button>
            </div>
          </div>
          
          {/* Floating Image Area */}
          <div className="hidden lg:block relative z-10 mt-12 lg:mt-0 lg:ml-12 shrink-0">
            <div className="w-[420px] aspect-[4/3] bg-slate-200 rounded-[32px] shadow-2xl overflow-hidden border-[6px] border-white/20 rotate-3 transition-transform hover:rotate-0 duration-700">
              <img 
                src="https://picsum.photos/seed/students-learning/800/600" 
                alt="Students" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
