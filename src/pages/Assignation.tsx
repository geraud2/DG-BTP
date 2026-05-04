import { useState } from 'react';
import { 
  User, Building2, Calendar, Flag, Plus, Trash2, 
  CheckCircle2, Clock, AlertCircle, Search, X,
  Briefcase, ChevronDown, Send
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { employees as defaultEmployees } from '../data/mockData';
import { toast } from 'sonner';

interface TacheAssignee {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  title: string;
  description: string;
  priority: 'haute' | 'moyenne' | 'basse';
  dateDebut: string;
  dateEcheance: string;
  status: 'en_cours' | 'termine' | 'en_retard';
  createdAt: string;
}

const defaultTaches: TacheAssignee[] = [
  { id: 'ta-1', employeeId: 'emp-1', employeeName: 'Sophie Dubois', department: 'IT', title: 'Superviser migration CRM', description: 'Vérifier les données avant migration', priority: 'haute', dateDebut: '2026-05-05', dateEcheance: '2026-05-08', status: 'en_cours', createdAt: '2026-05-04' },
  { id: 'ta-2', employeeId: 'emp-5', employeeName: 'Nathalie Moreau', department: 'RH', title: 'Organiser séminaire', description: 'Finaliser la logistique du séminaire annuel', priority: 'haute', dateDebut: '2026-05-03', dateEcheance: '2026-05-06', status: 'en_retard', createdAt: '2026-05-02' },
];

const departments = ['IT', 'Marketing', 'RH', 'Finance', 'Commercial', 'Design', 'Support'];

const priorityConfig = {
  haute: { label: 'Haute', color: 'bg-red-100 text-red-700 border-red-200', icon: '🔴' },
  moyenne: { label: 'Moyenne', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: '🟠' },
  basse: { label: 'Basse', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '🟢' },
};

const statusConfig = {
  en_cours: { label: 'En cours', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: Clock },
  termine: { label: 'Terminé', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  en_retard: { label: 'En retard', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
};

export default function AssignationTaches() {
  const [employees] = useLocalStorage('employees', defaultEmployees);
  const [taches, setTaches] = useLocalStorage<TacheAssignee[]>('tachesAssignees', defaultTaches);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [newTache, setNewTache] = useState({ title: '', description: '', priority: 'moyenne' as 'haute' | 'moyenne' | 'basse', dateDebut: new Date().toISOString().slice(0, 10), dateEcheance: '' });

  const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(searchEmployee.toLowerCase()) || emp.role.toLowerCase().includes(searchEmployee.toLowerCase()));
  const selectedEmployeeData = employees.find((emp) => emp.id === selectedEmployee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !newTache.title || !newTache.dateEcheance) { toast.error('Veuillez remplir tous les champs obligatoires'); return; }
    const emp = employees.find((e) => e.id === selectedEmployee);
    if (!emp) return;
    const tache: TacheAssignee = { id: `ta-${Date.now()}`, employeeId: emp.id, employeeName: emp.name, department: selectedDept, title: newTache.title, description: newTache.description, priority: newTache.priority, dateDebut: newTache.dateDebut, dateEcheance: newTache.dateEcheance, status: 'en_cours', createdAt: new Date().toISOString().slice(0, 10) };
    setTaches((prev) => [tache, ...prev]);
    toast.success(`Tâche assignée à ${emp.name}`);
    setNewTache({ title: '', description: '', priority: 'moyenne', dateDebut: new Date().toISOString().slice(0, 10), dateEcheance: '' });
    setSelectedEmployee(''); setShowEmployeeList(false);
  };

  const markComplete = (id: string) => { setTaches((prev) => prev.map((t) => t.id === id ? { ...t, status: 'termine' as const } : t)); toast.success('Tâche marquée comme terminée'); };
  const deleteTache = (id: string) => { setTaches((prev) => prev.filter((t) => t.id !== id)); toast.success('Tâche supprimée'); };
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const getAvatarColor = (name: string) => { const colors = ['bg-amber-100 text-amber-700', 'bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700', 'bg-violet-100 text-violet-700', 'bg-rose-100 text-rose-700', 'bg-teal-100 text-teal-700']; return colors[name.charCodeAt(0) % colors.length]; };

  const tachesActives = taches.filter((t) => t.status !== 'termine');
  const tachesTerminees = taches.filter((t) => t.status === 'termine');
  const tachesEnRetard = taches.filter((t) => t.status === 'en_retard');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Assignation des tâches</h1><p className="text-gray-500 text-xs sm:text-sm mt-0.5">Assigner des tâches au personnel</p></div><div className="flex items-center gap-2"><Briefcase size={18} className="text-amber-600" /><span className="text-xs sm:text-sm font-semibold text-gray-700">{taches.length} tâches</span></div></div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3"><div className="bg-white border border-sky-200 rounded-xl p-3 text-center"><Clock size={18} className="text-sky-600 mx-auto mb-1" /><p className="text-xl sm:text-2xl font-bold text-sky-600">{tachesActives.length}</p><p className="text-[10px] sm:text-xs font-medium text-sky-600">En cours</p></div><div className="bg-white border border-red-200 rounded-xl p-3 text-center"><AlertCircle size={18} className="text-red-600 mx-auto mb-1" /><p className="text-xl sm:text-2xl font-bold text-red-600">{tachesEnRetard.length}</p><p className="text-[10px] sm:text-xs font-medium text-red-600">En retard</p></div><div className="bg-white border border-emerald-200 rounded-xl p-3 text-center"><CheckCircle2 size={18} className="text-emerald-600 mx-auto mb-1" /><p className="text-xl sm:text-2xl font-bold text-emerald-600">{tachesTerminees.length}</p><p className="text-[10px] sm:text-xs font-medium text-emerald-600">Terminées</p></div></div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Nouvelle assignation" icon={Plus}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block"><Building2 size={12} className="inline mr-1" /> Département</label><select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition">{departments.map((d) => (<option key={d} value={d}>{d}</option>))}</select></div>
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block"><User size={12} className="inline mr-1" /> Employé</label>
              {selectedEmployeeData ? (
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-xl"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getAvatarColor(selectedEmployeeData.name)}`}>{getInitials(selectedEmployeeData.name)}</div><div><p className="text-sm font-semibold text-gray-900">{selectedEmployeeData.name}</p><p className="text-xs text-gray-500">{selectedEmployeeData.role}</p></div></div><button type="button" onClick={() => { setSelectedEmployee(''); setSearchEmployee(''); }} className="p-1 hover:bg-red-50 rounded-lg"><X size={16} className="text-gray-400 hover:text-red-500" /></button></div>
              ) : (
                <div className="relative"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={searchEmployee} onChange={(e) => { setSearchEmployee(e.target.value); setShowEmployeeList(true); }} onFocus={() => setShowEmployeeList(true)} placeholder="Rechercher un employé..." className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" /><ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${showEmployeeList ? 'rotate-180' : ''}`} /></div>
                  {showEmployeeList && (<div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">{filteredEmployees.length === 0 ? <p className="text-xs text-gray-400 text-center py-4">Aucun employé trouvé</p> : filteredEmployees.map((emp) => (<button key={emp.id} type="button" onClick={() => { setSelectedEmployee(emp.id); setSearchEmployee(''); setShowEmployeeList(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors text-left"><div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getAvatarColor(emp.name)}`}>{getInitials(emp.name)}</div><div><p className="text-sm font-medium text-gray-900">{emp.name}</p><p className="text-xs text-gray-500">{emp.role} • {emp.department}</p></div></button>))}</div>)}
                </div>
              )}
            </div>
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Titre de la tâche *</label><input type="text" value={newTache.title} onChange={(e) => setNewTache((prev) => ({ ...prev, title: e.target.value }))} placeholder="Ex: Superviser migration CRM" className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" /></div>
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label><textarea value={newTache.description} onChange={(e) => setNewTache((prev) => ({ ...prev, description: e.target.value }))} placeholder="Détails de la tâche..." rows={3} className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition resize-none" /></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block"><Calendar size={12} className="inline mr-1" /> Date début</label><input type="date" value={newTache.dateDebut} onChange={(e) => setNewTache((prev) => ({ ...prev, dateDebut: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" /></div><div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block"><Calendar size={12} className="inline mr-1" /> Échéance *</label><input type="date" value={newTache.dateEcheance} onChange={(e) => setNewTache((prev) => ({ ...prev, dateEcheance: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" /></div></div>
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block"><Flag size={12} className="inline mr-1" /> Priorité</label><div className="flex gap-2">{(['haute', 'moyenne', 'basse'] as const).map((p) => (<button key={p} type="button" onClick={() => setNewTache((prev) => ({ ...prev, priority: p }))} className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${newTache.priority === p ? `${priorityConfig[p].color} border-2 font-bold` : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}>{priorityConfig[p].icon} {priorityConfig[p].label}</button>))}</div></div>
            <Button type="submit" variant="primary" className="w-full"><Send size={16} /> Assigner la tâche</Button>
          </form>
        </Card>

        <Card title="Tâches assignées" icon={Briefcase}>
          {taches.length === 0 ? (<div className="text-center py-10"><Briefcase size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-500">Aucune tâche assignée</p></div>) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">{taches.map((tache) => { const status = statusConfig[tache.status]; const priority = priorityConfig[tache.priority]; const StatusIcon = status.icon; return (<div key={tache.id} className={`p-3 sm:p-4 rounded-xl border transition-all hover:shadow-sm ${tache.status === 'en_retard' ? 'border-red-200 bg-red-50/30' : tache.status === 'termine' ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-200 bg-white'}`}><div className="flex items-start justify-between gap-3"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1 flex-wrap"><p className="text-sm font-bold text-gray-900">{tache.title}</p><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${priority.color}`}>{priority.icon} {priority.label}</span><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg border ${status.color}`}><StatusIcon size={10} className="inline mr-0.5" />{status.label}</span></div><div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap"><span className="flex items-center gap-1"><User size={11} /> {tache.employeeName}</span><span className="flex items-center gap-1"><Building2 size={11} /> {tache.department}</span></div>{tache.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tache.description}</p>}<div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400"><Calendar size={11} />{tache.dateDebut} → {tache.dateEcheance}</div></div><div className="flex items-center gap-1 flex-shrink-0">{tache.status !== 'termine' && (<button onClick={() => markComplete(tache.id)} className="p-1.5 rounded-lg hover:bg-emerald-50" title="Marquer terminé"><CheckCircle2 size={16} className="text-gray-400 hover:text-emerald-600" /></button>)}<button onClick={() => deleteTache(tache.id)} className="p-1.5 rounded-lg hover:bg-red-50" title="Supprimer"><Trash2 size={16} className="text-gray-400 hover:text-red-600" /></button></div></div></div>); })}</div>
          )}
        </Card>
      </div>
    </div>
  );
}