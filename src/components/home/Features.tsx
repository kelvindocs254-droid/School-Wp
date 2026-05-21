import { motion } from 'motion/react';
import { BookOpen, Palette, Microscope, HeartPulse, Terminal, Users2 } from 'lucide-react';

const features = [
  {
    title: 'Advanced Academics',
    description: 'International Baccalaureate curriculum combined with technology-rich learning environments.',
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Visual & Performing Arts',
    description: 'Nurturing creativity through world-class studios, theater programs, and music conservatories.',
    icon: Palette,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'STEM Innovation',
    description: 'Dedicated robotics labs and advanced science facilities to prepare students for the future.',
    icon: Terminal,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Holistic Wellness',
    description: 'Focusing on physical and mental well-being through sports and mindfulness programs.',
    icon: HeartPulse,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Scientific Inquiry',
    description: 'Encouraging deep research and experimentation across all scientific disciplines.',
    icon: Microscope,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Global Community',
    description: 'A diverse environment that fosters cross-cultural understanding and lifelong friendships.',
    icon: Users2,
    color: 'bg-cyan-50 text-cyan-600',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-brand-slate-50">
      <div className="max-w-7xl mx-auto px-10 text-center mb-16">
        <h2 className="text-sm uppercase tracking-[0.4em] font-black text-brand-indigo mb-4 text-center">WHY ST. FRANCIS</h2>
        <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">Nurturing Human Potential</h3>
        <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed opacity-80">
          We provide a comprehensive educational experience that balances academic rigor with personal growth and creative exploration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-10 rounded-[40px] bg-white border-2 border-slate-100 hover:border-brand-indigo transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${feature.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}>
              <feature.icon size={32} />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-5">{feature.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
