import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: "1. Virtual Inquiry",
    desc: "Complete our online inquiry form to receive our latest digital prospectus and admission packet."
  },
  {
    title: "2. Personal Tour",
    desc: "Schedule a one-on-one virtual or physical tour of our modern campus and facilities."
  },
  {
    title: "3. Assessment",
    desc: "A baseline academic assessment and personal interview with the head of the year group."
  },
  {
    title: "4. Enrollment",
    desc: "Finalize registration by submitting required documents and formalizing student placement."
  }
];

export default function Admissions() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="relative h-[65vh] flex items-center px-10 overflow-hidden bg-brand-slate-900 mx-6 mt-6 rounded-[48px]">
        <div className="absolute inset-0 opacity-40">
          <img src="https://picsum.photos/seed/admissions/1920/1080" alt="Admission" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-900 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 w-full text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block bg-brand-amber px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 text-brand-slate-900">
              JOIN THE ACADEMY
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9]">Start Your <br/> <span className="text-brand-amber">Journey.</span></h1>
            <p className="text-brand-indigo-50/70 text-xl max-w-2xl font-medium leading-relaxed opacity-90">
              We look for students who are curious, motivated, and eager to contribute to our vibrant global community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-12">The Path to Enrollment.</h2>
            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-10 relative group">
                  <div className="w-16 h-16 rounded-[24px] bg-brand-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 z-10 group-hover:border-brand-indigo transition-all group-hover:bg-brand-indigo group-hover:text-white">
                    <span className="font-black text-xl">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-brand-indigo transition-colors">{step.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg opacity-80">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 flex flex-wrap gap-6">
              <button className="bg-brand-indigo text-white px-12 py-5 rounded-[24px] font-black text-lg shadow-xl transition-transform hover:scale-105 active:scale-95">
                Apply Online
              </button>
              <button className="flex items-center gap-3 border-2 border-slate-100 px-12 py-5 rounded-[24px] font-black text-slate-600 hover:border-brand-indigo transition-all">
                <Download size={20} /> Digital Prospectus
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-16 rounded-[56px] border-2 border-slate-50 shadow-2xl">
              <h3 className="text-3xl font-black text-slate-900 mb-10">Checklist</h3>
              <ul className="space-y-6">
                {[
                  "Academic Transcript (Last 2 Years)",
                  "Personal Discovery Essay",
                  "Letter of Inquiry",
                  "Birth Verification Documents",
                  "Global Health Records",
                ].map((doc, i) => (
                  <li key={i} className="flex items-center gap-5 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-lg">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-amber p-16 rounded-[56px] shadow-2xl shadow-brand-amber/10">
              <div className="flex gap-5 items-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-slate-900/10 flex items-center justify-center">
                  <Calendar size={32} className="text-brand-slate-900" />
                </div>
                <h3 className="text-3xl font-black text-brand-slate-900">Key Dates</h3>
              </div>
              <div className="space-y-6 font-black text-brand-slate-900/80">
                <div className="flex justify-between border-b-2 border-brand-slate-900/5 pb-5">
                  <span>Open House</span>
                  <span>MAY 25</span>
                </div>
                <div className="flex justify-between border-b-2 border-brand-slate-900/5 pb-5">
                  <span>Discovery Grant Deadline</span>
                  <span>JUN 15</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>New Intake</span>
                  <span>SEP 01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
