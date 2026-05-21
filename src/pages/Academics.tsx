import { motion } from 'motion/react';
import { BookMarked, BrainCircuit, Globe2, Music, Dumbbell, Code, Microscope } from 'lucide-react';

const programs = [
  {
    level: "Early Years",
    age: "Ages 3-5",
    description: "A nurturing environment focused on play-based learning and social-emotional development.",
    icon: Music,
    highlights: ["Language development", "Creative arts", "Sensory play", "Social skills"]
  },
  {
    level: "Primary School",
    age: "Ages 6-11",
    description: "Building strong foundations in literacy, numeracy, and critical thinking using inquiry-based models.",
    icon: BookMarked,
    highlights: ["Literacy Excellence", "STEM foundations", "Physical Education", "Second Languages"]
  },
  {
    level: "Secondary School",
    age: "Ages 12-16",
    description: "An intensive curriculum designed to challenge students academically and foster independent research.",
    icon: BrainCircuit,
    highlights: ["Advanced Mathematics", "Science Labs", "Global Perspectives", "Digital Literacy"]
  },
  {
    level: "IB Diploma Program",
    age: "Ages 17-18",
    description: "The gold standard of international education, preparing students for the world's most elite universities.",
    icon: Globe2,
    highlights: ["Theory of Knowledge", "Extended Essay", "CAS Program", "University Counseling"]
  }
];

export default function Academics() {
  return (
    <div className="pt-24 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-brand-slate-50 py-24 px-10 mx-6 mt-6 rounded-[48px]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-brand-indigo/10 px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 text-brand-indigo">
              ACADEMIC EXCELLENCE
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9]">Empowering <br/> <span className="text-brand-indigo">The Future.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
              We provide a rigorous, balanced curriculum that equips students with the skills for lifelong learning and global leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border-2 border-slate-100 p-12 rounded-[48px] hover:shadow-2xl hover:border-brand-indigo transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="w-20 h-20 rounded-[24px] bg-brand-indigo text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <program.icon size={40} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 bg-brand-slate-50 px-5 py-2.5 rounded-full">
                  {program.age}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-5">{program.level}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg opacity-80">{program.description}</p>
              
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">KEY HIGHLIGHTS</h4>
                <div className="grid grid-cols-2 gap-y-4">
                  {program.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-brand-amber shadow-sm" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facilities Banner (Indigo Variant) */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto bg-brand-indigo rounded-[80px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          <div className="p-16 lg:p-24 flex flex-col justify-center text-white">
            <h2 className="text-5xl font-black mb-8 leading-[1]">World-Class <br/> Platforms.</h2>
            <p className="text-brand-indigo-50/70 mb-12 text-xl font-medium leading-relaxed">
              Education at St Francis Primary And Junior Secondary School is supported by modern infrastructure designed to inspire creativity and facilitate inquiry.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-amber">
                  <Microscope size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-wide">Science Labs</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-amber">
                  <Music size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-wide">Art Studios</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-amber">
                  <Dumbbell size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-wide">Sports Hub</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-amber">
                  <Code size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-wide">Digital Lab</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] lg:h-auto relative">
            <img 
              src="https://picsum.photos/seed/facilities/1200/800" 
              alt="Facilities" 
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-indigo/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
