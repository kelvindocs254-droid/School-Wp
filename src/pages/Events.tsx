import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  location: string;
  createdAt: any;
}

export default function Events() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SchoolEvent[];
      setEvents(eventData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...new Set(events.map(e => e.category))];
  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonthStr = eventDate.toLocaleString('default', { month: 'long' });
    
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesMonth = selectedMonth === 'All' || eventMonthStr === selectedMonth;
    
    return matchesCategory && matchesMonth;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  return (
    <div className="pt-24 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-brand-amber py-24 px-10 overflow-hidden relative mx-6 mt-6 rounded-[48px]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/30 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 text-brand-slate-900">
              ACADEMY CALENDAR
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-brand-slate-900 mb-8 leading-[0.9]">Experience <br/> <span className="text-white">Our Spirit.</span></h1>
            <p className="text-xl text-brand-slate-700 max-w-2xl font-medium leading-relaxed">
              From athletics to academic showcases, stay up to date with the vibrant life at St Francis Primary And Junior Secondary School.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-white/10 font-black text-[300px] leading-none pointer-events-none select-none">
          EVENTS
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-10 pt-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 w-full lg:w-auto">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Filter by Month</span>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {months.map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-6 py-2 rounded-full font-black text-xs whitespace-nowrap transition-all ${
                    selectedMonth === month 
                    ? 'bg-brand-indigo text-white shadow-lg' 
                    : 'bg-white text-slate-400 border border-slate-100 hover:border-brand-indigo'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 w-full lg:w-auto">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Filter by Category</span>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-black text-xs whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                    ? 'bg-brand-amber text-brand-slate-900 shadow-lg' 
                    : 'bg-white text-slate-400 border border-slate-100 hover:border-brand-amber'
                  }`}
                >
                  {cat || 'Uncategorized'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-5xl mx-auto px-10 py-24">
        <div className="space-y-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => {
              const { day, month, full } = formatDate(event.date);
              return (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-8 md:p-10 rounded-[48px] shadow-xl shadow-slate-200/50 border border-slate-50 hover:border-brand-indigo/30 transition-all"
                >
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="w-24 h-24 rounded-[32px] bg-brand-slate-50 flex flex-col items-center justify-center border-2 border-slate-100 group-hover:bg-brand-indigo group-hover:border-brand-indigo transition-all">
                      <span className="text-sm font-black text-slate-400 group-hover:text-white/70 uppercase tracking-tighter">{month}</span>
                      <span className="text-4xl font-black text-slate-900 group-hover:text-white leading-none">{day}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2 text-brand-indigo font-black text-[10px] uppercase tracking-widest bg-brand-indigo/5 px-4 py-1.5 rounded-full">
                        {event.category || 'Event'}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                        <Clock size={14} className="text-brand-indigo" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                        <MapPin size={14} className="text-brand-indigo" />
                        {event.location}
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3 group-hover:text-brand-indigo transition-colors">{event.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">{event.description}</p>
                  </div>

                  <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <button className="w-full md:w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-amber group-hover:text-brand-slate-900 transition-all hover:scale-110 active:scale-95 shadow-lg">
                      <ArrowRight size={28} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : !loading && (
            <div className="text-center py-20 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
               <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-6 text-brand-indigo">
                <Calendar size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">The calendar is clear</h3>
              <p className="text-slate-400 font-medium tracking-tight px-10">Check back soon for upcoming academy events and milestones.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
