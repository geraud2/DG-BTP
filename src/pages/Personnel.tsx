import { useState } from 'react';
import { User, Mail, Calendar, MapPin, Briefcase, Search, SlidersHorizontal, Users, UserCheck, UserX, CalendarOff, Building2, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { employees as defaultEmployees, Employee } from '../data/mockData';

export default function Personnel() {
  const [employees] = useLocalStorage<Employee[]>('employees', defaultEmployees);
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deptFilter, setDeptFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [showFilters, setShowFilters] = useState(false);

  const departments = ['Tous', ...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.chantier.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'Tous' || e.department === deptFilter;
    const matchStatus = statusFilter === 'Tous' || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const statusConfig = {
    present: { label: 'Présent', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', icon: UserCheck },
    absent: { label: 'Absent', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', icon: UserX },
    conge: { label: 'En congé', color: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500', icon: CalendarOff },
  };

  const presentCount = employees.filter((e) => e.status === 'present').length;
  const absentCount = employees.filter((e) => e.status === 'absent').length;
  const congeCount = employees.filter((e) => e.status === 'conge').length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-amber-100 text-amber-700',
      'bg-sky-100 text-sky-700',
      'bg-emerald-100 text-emerald-700',
      'bg-violet-100 text-violet-700',
      'bg-rose-100 text-rose-700',
      'bg-teal-100 text-teal-700',
      'bg-orange-100 text-orange-700',
      'bg-indigo-100 text-indigo-700',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Personnel</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Suivi des employés de l'entreprise</p>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-amber-600" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">{employees.length} employés</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white border border-emerald-200 rounded-xl p-3 sm:p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-emerald-50 rounded-bl-full -mr-3 -mt-3 sm:-mr-4 sm:-mt-4" />
          <div className="relative">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-50 inline-flex mb-1 sm:mb-2">
              <UserCheck size={20} className="text-emerald-600 sm:size-24 sm:size-24" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{presentCount}</p>
            <p className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-wider">Présents</p>
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-3 sm:p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-amber-50 rounded-bl-full -mr-3 -mt-3 sm:-mr-4 sm:-mt-4" />
          <div className="relative">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-50 inline-flex mb-1 sm:mb-2">
              <UserX size={20} className="text-amber-600 sm:size-24" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{absentCount}</p>
            <p className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase tracking-wider">Absents</p>
          </div>
        </div>
        <div className="bg-white border border-sky-200 rounded-xl p-3 sm:p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-sky-50 rounded-bl-full -mr-3 -mt-3 sm:-mr-4 sm:-mt-4" />
          <div className="relative">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-sky-50 inline-flex mb-1 sm:mb-2">
              <CalendarOff size={20} className="text-sky-600 sm:size-24" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-sky-600">{congeCount}</p>
            <p className="text-[10px] sm:text-xs font-semibold text-sky-600 uppercase tracking-wider">En congé</p>
          </div>
        </div>
      </div>

      {/* Barre de recherche + toggle filtres */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100"
            >
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 sm:p-3 rounded-xl border transition-all flex-shrink-0 ${
            showFilters || deptFilter !== 'Tous' || statusFilter !== 'Tous'
              ? 'bg-amber-500 text-white border-amber-500'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Filtres - masquables sur mobile */}
      <div className={`space-y-3 ${showFilters ? 'block' : 'hidden'} sm:block`}>
        {/* Filtre département */}
        <div className="flex items-start gap-2">
          <Building2 size={14} className="text-gray-400 mt-1.5 flex-shrink-0 hidden sm:block" />
          <div className="flex gap-1.5 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all ${
                  deptFilter === dept 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {dept === 'Tous' ? 'Tous' : dept}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre statut */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 hidden sm:inline">Statut :</span>
          {['Tous', 'present', 'absent', 'conge'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all ${
                statusFilter === s 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'Tous' ? 'Tous' : s === 'present' ? '✅' : s === 'absent' ? '⚠️' : '🏖️'}
              <span className="hidden sm:inline ml-1">
                {s === 'present' ? 'Présent' : s === 'absent' ? 'Absent' : s === 'conge' ? 'Congé' : ''}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille du personnel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <div className="text-center py-10 sm:py-12">
                <Users size={40} className="text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm text-gray-500 font-medium">Aucun employé trouvé</p>
                <p className="text-xs text-gray-400 mt-1">Essayez de modifier les filtres</p>
              </div>
            </Card>
          </div>
        ) : (
          filtered.map((emp) => {
            const status = statusConfig[emp.status];
            const StatusIcon = status.icon;
            return (
              <Card 
                key={emp.id} 
                className="hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                onClick={() => { setSelectedEmployee(emp); setModalOpen(true); }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold ${getAvatarColor(emp.name)}`}>
                    {getInitials(emp.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                        {emp.name}
                      </p>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot} animate-pulse`} />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                      <Briefcase size={11} className="flex-shrink-0" />
                      <span className="truncate">{emp.role}</span>
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin size={11} className="flex-shrink-0" />
                      <span className="truncate">{emp.chantier}</span>
                    </p>
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border whitespace-nowrap ${status.color}`}>
                        <StatusIcon size={10} className="inline mr-1" />
                        <span className="hidden sm:inline">{status.label}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 truncate">
                        {emp.department}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal fiche employé */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Fiche employé">
        {selectedEmployee && (
          <div className="space-y-4 sm:space-y-5">
            {/* En-tête */}
            <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-gray-50 rounded-2xl">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0 ${getAvatarColor(selectedEmployee.name)}`}>
                {getInitials(selectedEmployee.name)}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{selectedEmployee.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                  <Briefcase size={13} className="flex-shrink-0" />
                  <span className="truncate">{selectedEmployee.role}</span>
                </p>
                <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border mt-2 ${statusConfig[selectedEmployee.status].color}`}>
                  <span className={`w-2 h-2 rounded-full ${statusConfig[selectedEmployee.status].dot} animate-pulse`} />
                  {statusConfig[selectedEmployee.status].label}
                </span>
              </div>
            </div>

            {/* Infos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Email</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedEmployee.email}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Embauche</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedEmployee.joinDate}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Building2 size={16} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Département</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedEmployee.department}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Chantier</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedEmployee.chantier}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}