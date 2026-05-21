import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mail, Phone, Users } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photo?: string;
  email: string;
  phone?: string;
}

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'staff'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const staffData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StaffMember[];
      setStaff(staffData);
      setLoading(loading => false);
    });
    return () => unsubscribe();
  }, []);

  const departments = ['All', ...new Set(staff.map(s => s.department))];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || member.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="pt-24 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-brand-indigo py-24 px-10 overflow-hidden relative mx-6 mt-6 rounded-[48px]">
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 text-white">
              OUR FACULTY
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9]">Meet Our <br/> <span className="text-brand-amber">Educators.</span></h1>
            <p className="text-xl text-brand-indigo-50/70 max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
              The heart of our academy lies in our dedicated team of professionals who inspire, challenge, and nurture our students every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-brand-indigo outline-none transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-2.5 rounded-full font-black text-sm whitespace-nowrap transition-all ${
                  selectedDept === dept 
                  ? 'bg-brand-indigo text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStaff.map((member) => (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={member.photo || `https://picsum.photos/seed/${member.id}/600/750`} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-indigo transition-all">
                        <Mail size={18} />
                      </a>
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-indigo transition-all">
                          <Phone size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-indigo mb-2 block">{member.department}</span>
                  <h3 className="text-xl font-black text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-tight">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredStaff.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No staff found</h3>
              <p className="text-slate-400 font-medium tracking-tight">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
