import { motion } from 'motion/react';
import { Users, GraduationCap, Globe, Trophy } from 'lucide-react';

const stats = [
  { label: 'Students', value: '1,200+', icon: Users },
  { label: 'Graduation Rate', value: '100%', icon: GraduationCap },
  { label: 'Countries Represented', value: '45+', icon: Globe },
  { label: 'Years of Excellence', value: '35+', icon: Trophy },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[24px] bg-brand-slate-50 text-brand-indigo flex items-center justify-center mb-6 group-hover:bg-brand-indigo group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-brand-indigo/20 group-hover:-translate-y-1">
                  <stat.icon size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 leading-none">{stat.value}</h3>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 group-hover:text-brand-indigo transition-colors">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
