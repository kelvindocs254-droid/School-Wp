import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'admissions', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our admissions team will contact you shortly.');
  };

  return (
    <div className="pt-24 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-brand-slate-900 py-24 px-10 overflow-hidden relative mx-6 mt-6 rounded-[48px]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-brand-indigo px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 text-white text-center sm:text-left">
              GET IN TOUCH
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9]">Connect <br/> <span className="text-brand-amber">With Us.</span></h1>
            <p className="text-xl text-brand-slate-400 max-w-2xl font-medium leading-relaxed">
              Whether you are a prospective parent, an alumnus, or a community member, we are here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-12">Institutional Contacts.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {[
                { icon: Phone, title: "Academy Office", contact: "+1 (555) 0123-SCHOOL" },
                { icon: Mail, title: "Admissions Hub", contact: "apply@stfrancis.edu" },
                { icon: Clock, title: "Visiting Window", contact: "Mon - Fri, 8AM - 4PM" },
                { icon: MapPin, title: "Our Campus", contact: "Education Ln, Boston MA" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-slate-50 text-brand-indigo flex items-center justify-center shrink-0 border-2 border-transparent group-hover:border-brand-indigo transition-all">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 text-lg">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-400">{item.contact}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-brand-indigo p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-3xl font-black mb-6">Virtual Visit</h3>
              <p className="text-brand-indigo-50/70 mb-10 text-lg font-medium leading-relaxed">
                Can't visit us in person? Join our upcoming webinar for prospective families to experience our campus culture.
              </p>
              <button className="flex items-center gap-3 text-brand-amber font-black text-lg hover:gap-5 transition-all">
                Register for Webinar <Globe size={24} />
              </button>
              <div className="absolute -bottom-4 -right-4 text-[120px] opacity-10 pointer-events-none">🌐</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-12 lg:p-16 rounded-[64px] shadow-2xl shadow-slate-200 border-2 border-slate-50 relative">
            <h2 className="text-4xl font-black text-slate-900 mb-10">Direct Inquiry.</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">FULL NAME</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-8 py-5 rounded-2xl bg-brand-slate-50 border-2 border-transparent focus:border-brand-indigo outline-none transition-all text-slate-900 font-bold" 
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-8 py-5 rounded-2xl bg-brand-slate-50 border-2 border-transparent focus:border-brand-indigo outline-none transition-all text-slate-900 font-bold" 
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">MESSAGE</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-8 py-5 rounded-2xl bg-brand-slate-50 border-2 border-transparent focus:border-brand-indigo outline-none transition-all text-slate-900 font-bold resize-none" 
                  placeholder="How can we help your discovery journey?"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-indigo text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-brand-indigo-dark transition-all group shadow-xl"
              >
                Send Message <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
