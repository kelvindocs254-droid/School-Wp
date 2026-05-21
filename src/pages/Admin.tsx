import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  setDoc,
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Users, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  ShieldCheck, 
  AtSign, 
  Image as ImageIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'staff' | 'events'>('staff');
  const [loading, setLoading] = useState(true);

  // Data
  const [staff, setStaff] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // Forms
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({ name: '', role: '', department: '', email: '', phone: '', photo: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', category: '', description: '', location: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setLoading(true);
        const adminDoc = await getDoc(doc(db, 'admins', u.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else if (u.email === 'kelvindocs254@gmail.com') {
          // Bootstrap first admin
          await setDoc(doc(db, 'admins', u.uid), {
            email: u.email,
            createdAt: serverTimestamp()
          });
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      } else {
        setIsAdmin(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const qStaff = query(collection(db, 'staff'), orderBy('name', 'asc'));
    const unsubStaff = onSnapshot(qStaff, (snapshot) => {
      setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qEvents = query(collection(db, 'events'), orderBy('date', 'desc'));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => { unsubStaff(); unsubEvents(); };
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => signOut(auth);

  const saveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'staff', isEditing), { ...staffForm, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'staff'), { ...staffForm, createdAt: serverTimestamp() });
      }
      setStaffForm({ name: '', role: '', department: '', email: '', phone: '', photo: '' });
      setIsEditing(null);
    } catch (err) { console.error(err); }
  };

  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'events', isEditing), { ...eventForm, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'events'), { ...eventForm, createdAt: serverTimestamp() });
      }
      setEventForm({ title: '', date: '', time: '', category: '', description: '', location: '' });
      setIsEditing(null);
    } catch (err) { console.error(err); }
  };

  const deleteItem = async (col: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-slate-50">
      <div className="w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user || isAdmin === false) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-6 flex items-center justify-center bg-brand-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[56px] shadow-2xl text-center border-2 border-slate-100"
        >
          <div className="w-24 h-24 bg-brand-indigo/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-brand-indigo">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Admin Portal.</h1>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            {isAdmin === false 
              ? "Your account doesn't have administrative access. Please contact the system administrator." 
              : "Welcome back. Please sign in with your authorized school account to manage the academy portal."}
          </p>
          
          {isAdmin === false ? (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-slate-100 text-slate-900 py-5 rounded-2xl font-black transition-all hover:bg-slate-200"
            >
              <LogOut size={20} /> Sign Out
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-4 bg-brand-indigo text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-brand-indigo/20 transition-all hover:scale-105 active:scale-95"
            >
              <AtSign size={24} /> Sign in with Google
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-brand-slate-50 pb-24">
      <div className="max-w-7xl mx-auto px-10">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-brand-indigo font-black uppercase tracking-[0.2em] text-xs mb-2">
              <ShieldCheck size={16} /> ADMINISTRATOR DASHBOARD
            </div>
            <h1 className="text-5xl font-black text-slate-900">Portal Manager.</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-slate-500 font-bold hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="space-y-4">
            <button 
              onClick={() => { setActiveTab('staff'); setIsEditing(null); }}
              className={`w-full flex items-center gap-4 px-8 py-5 rounded-[28px] font-black text-lg transition-all ${activeTab === 'staff' ? 'bg-brand-indigo text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-brand-slate-100'}`}
            >
              <Users size={24} /> Staff Directory
            </button>
            <button 
              onClick={() => { setActiveTab('events'); setIsEditing(null); }}
              className={`w-full flex items-center gap-4 px-8 py-5 rounded-[28px] font-black text-lg transition-all ${activeTab === 'events' ? 'bg-brand-amber text-brand-slate-900 shadow-xl' : 'bg-white text-slate-400 hover:bg-brand-slate-100'}`}
            >
              <Calendar size={24} /> Events Calendar
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Form Section */}
            <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-50">
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${activeTab === 'staff' ? 'bg-brand-indigo' : 'bg-brand-amber'}`}>
                  {isEditing ? <Edit2 size={24} /> : <Plus size={24} />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900">{isEditing ? 'Update' : 'Add New'} {activeTab === 'staff' ? 'Staff Member' : 'Event'}</h2>
                  <p className="text-slate-400 font-bold text-sm tracking-tight">Complete the details below to update the public portal.</p>
                </div>
              </div>

              {activeTab === 'staff' ? (
                <form onSubmit={saveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="Full Name" required value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} className="admin-input" />
                  <input placeholder="Professional Role" required value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} className="admin-input" />
                  <select required value={staffForm.department} onChange={e => setStaffForm({...staffForm, department: e.target.value})} className="admin-input appearance-none">
                    <option value="">Select Department</option>
                    <option value="Administration">Administration</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Arts">Arts</option>
                    <option value="Athletics">Athletics</option>
                  </select>
                  <input placeholder="Email Address" required type="email" value={staffForm.email} onChange={e => setStaffForm({...staffForm, email: e.target.value})} className="admin-input" />
                  <input placeholder="Phone Number" value={staffForm.phone} onChange={e => setStaffForm({...staffForm, phone: e.target.value})} className="admin-input" />
                  <input placeholder="Photo URL (Optional)" value={staffForm.photo} onChange={e => setStaffForm({...staffForm, photo: e.target.value})} className="admin-input" />
                  <div className="md:col-span-2 flex gap-4 mt-4">
                    <button type="submit" className="flex-1 bg-brand-indigo text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:brightness-110 transition-all">
                      {isEditing ? 'Save Changes' : 'Publish Member'}
                    </button>
                    {isEditing && (
                      <button type="button" onClick={() => setIsEditing(null)} className="px-10 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-lg">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <form onSubmit={saveEvent} className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input placeholder="Event Title" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="admin-input md:col-span-2" />
                    <input placeholder="Location" required value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="admin-input" />
                    <select required value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})} className="admin-input appearance-none">
                      <option value="">Select Category</option>
                      <option value="Academic">Academic</option>
                      <option value="Sports">Sports</option>
                      <option value="Arts">Arts</option>
                      <option value="Holiday">Holiday</option>
                      <option value="Community">Community</option>
                    </select>
                    <input type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="admin-input" />
                    <input placeholder="Time (e.g. 10:00 AM)" required value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className="admin-input" />
                  </div>
                  <textarea placeholder="Event Description" required rows={4} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="admin-input resize-none" />
                  <div className="flex gap-4 mt-4">
                    <button type="submit" className="flex-1 bg-brand-amber text-brand-slate-900 py-5 rounded-2xl font-black text-lg shadow-lg hover:brightness-110 transition-all">
                      {isEditing ? 'Save Changes' : 'Publish Event'}
                    </button>
                    {isEditing && (
                      <button type="button" onClick={() => setIsEditing(null)} className="px-10 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-lg">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* List Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 px-2 flex items-center justify-between">
                Current {activeTab === 'staff' ? 'Staff' : 'Events'}
                <span className="text-sm font-bold text-slate-400">{activeTab === 'staff' ? staff.length : events.length} Total</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {activeTab === 'staff' ? (
                  staff.map(s => (
                    <div key={s.id} className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-sm border border-slate-100 group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100">
                          <img src={s.photo || `https://picsum.photos/seed/${s.id}/100/100`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{s.name}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{s.role} • {s.department}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setIsEditing(s.id); setStaffForm(s); }}
                          className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteItem('staff', s.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  events.map(e => (
                    <div key={e.id} className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-sm border border-slate-100 group">
                      <div>
                        <h4 className="font-black text-slate-900">{e.title}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{e.date} @ {e.time} • {e.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setIsEditing(e.id); setEventForm(e); }}
                          className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteItem('events', e.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .admin-input {
          width: 100%;
          padding: 1.25rem 2rem;
          border-radius: 1.5rem;
          background-color: var(--color-slate-50);
          border: 2px solid transparent;
          font-weight: 700;
          color: var(--color-slate-900);
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: var(--color-brand-indigo);
          background-color: white;
        }
      `}</style>
    </div>
  );
}
