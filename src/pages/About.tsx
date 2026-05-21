import { motion } from 'motion/react';
import { History, Target, ShieldCheck, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-brand-indigo py-24 px-10 overflow-hidden relative mx-6 mt-6 rounded-[48px]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 text-white text-center sm:text-left">
              ABOUT OUR ACADEMY
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9]">Experience <br/> <span className="text-brand-amber">Excellence.</span></h1>
            <p className="text-xl text-brand-indigo-50/70 max-w-2xl font-medium leading-relaxed">
              Three decades of pioneering education, nurturing tomorrow's innovators, and building a foundation for success that lasts a lifetime.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-white/5 font-black text-[300px] leading-none pointer-events-none select-none">
          1984
        </div>
      </section>

      {/* History Grid */}
      <section className="py-24 max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] font-black text-brand-indigo mb-6 block">OUR STORY</span>
            <h2 className="text-5xl font-black text-slate-900 mb-10 leading-[1.1]">Building a Legacy of Discovery.</h2>
            <div className="space-y-8 text-slate-500 font-medium text-lg leading-relaxed">
              <p>
                Founded in 1984, St Francis Primary And Junior Secondary School was established with a mission to ignite curiosity and foster discovery in every student.
              </p>
              <p>
                Over the years, we have expanded our campus and adopted the most advanced educational frameworks, becoming a beacon of quality in the academic landscape.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://picsum.photos/seed/hist1/600/600" alt="Legacy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white translate-x-6">
                <img src="https://picsum.photos/seed/hist2/600/800" alt="Legacy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white -translate-x-6">
                <img src="https://picsum.photos/seed/hist3/600/800" alt="Legacy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://picsum.photos/seed/hist4/600/600" alt="Legacy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Cards */}
      <section className="py-24 bg-brand-slate-50 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Our Mission",
              icon: Target,
              color: "bg-brand-rose",
              text: "To ignite curiosity and foster discovery, empowering students to lead with integrity in an ever-changing world."
            },
            {
              title: "Our Vision",
              icon: ShieldCheck,
              color: "bg-brand-emerald",
              text: "To be a global benchmark for innovative, creative education that transforms potential into purpose."
            },
            {
              title: "Our Values",
              icon: Users,
              color: "bg-brand-indigo",
              text: "Courage in inquiry, empathy in leadership, and an unwavering commitment to creative exploration."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${item.color} p-12 rounded-[48px] shadow-2xl text-white relative overflow-hidden`}
            >
              <div className="w-16 h-16 rounded-[24px] bg-white/20 backdrop-blur-md flex items-center justify-center mb-10 shadow-inner">
                <item.icon size={32} />
              </div>
              <h3 className="text-3xl font-black mb-5">{item.title}</h3>
              <p className="text-white/80 font-medium leading-relaxed text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
