import { Link } from 'react-router-dom';
import { 
  Users, UserCheck, UserX, CalendarOff, ListTodo, 
  AlertTriangle, TrendingUp, TrendingDown, Clock, 
  DollarSign, Building2, Bell, ChevronRight, ArrowUp, ArrowDown,
  Briefcase, Sparkles, Zap, Target
} from 'lucide-react';
import Card from '../components/ui/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  dashboardStats, 
  demandes as defaultDemandes, 
  taches as defaultTaches, 
  notifications as defaultNotifs,
  analyticsData
} from '../data/mockData';

export default function Dashboard() {
  const [demandes] = useLocalStorage('demandes', defaultDemandes);
  const [taches] = useLocalStorage('taches', defaultTaches);
  const [notifs] = useLocalStorage('notifications', defaultNotifs);

  const enAttente = demandes.filter((d) => d.status === 'en_attente').length;
  const urgentes = demandes.filter((d) => d.priority === 'urgente' && d.status === 'en_attente').length;
  const enRetard = taches.filter((t) => t.status === 'en_retard').length;
  const unreadNotifs = notifs.filter((n) => !n.read).length;
  const incidents = dashboardStats.incidentsEnCours;

  const globalStatus = enRetard > 2 || incidents > 1 ? 'critical' : enRetard > 0 || incidents > 0 ? 'warning' : 'ok';

  const statusConfig = {
    ok: { label: 'Tout est opérationnel', color: 'from-emerald-400 to-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '🟢' },
    warning: { label: 'Quelques points d\'attention', color: 'from-amber-400 to-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '🟠' },
    critical: { label: 'Actions requises', color: 'from-red-400 to-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: '🔴' },
  };

  const currentStatus = statusConfig[globalStatus];

  const stats = [
    { label: 'Employés', value: dashboardStats.totalEmployes, icon: Users, bg: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-200', gradient: 'from-blue-400 to-blue-500' },
    { label: 'Présents', value: dashboardStats.employesPresents, icon: UserCheck, bg: 'bg-emerald-50', textColor: 'text-emerald-600', borderColor: 'border-emerald-200', gradient: 'from-emerald-400 to-emerald-500' },
    { label: 'Absents', value: dashboardStats.employesAbsents, icon: UserX, bg: 'bg-amber-50', textColor: 'text-amber-600', borderColor: 'border-amber-200', gradient: 'from-amber-400 to-amber-500' },
    { label: 'En congé', value: dashboardStats.employesEnConge, icon: CalendarOff, bg: 'bg-violet-50', textColor: 'text-violet-600', borderColor: 'border-violet-200', gradient: 'from-violet-400 to-violet-500' },
  ];

  const departements = analyticsData.departmentPerformance;

  const alerts = [
    ...(incidents > 0 ? [{ type: 'error' as const, msg: `${incidents} incident(s) en cours`, icon: AlertTriangle }] : []),
    ...(enRetard > 0 ? [{ type: 'warning' as const, msg: `${enRetard} tâche(s) en retard`, icon: Clock }] : []),
    ...(urgentes > 0 ? [{ type: 'urgent' as const, msg: `${urgentes} demande(s) urgente(s)`, icon: Bell }] : []),
  ];

  const alertStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    urgent: 'bg-red-100 border-red-300 text-red-900 font-semibold',
  };

  const demandesUrgentes = demandes.filter((d) => d.priority === 'urgente' && d.status === 'en_attente').slice(0, 3);
  const tachesActives = taches.filter((t) => t.status !== 'termine').slice(0, 5);
  const kpis = analyticsData.kpis;

  const produitsStats = [
    { label: 'Productivité', value: `${kpis.tauxProductivite}%`, icon: TrendingUp, bg: 'bg-emerald-50', textColor: 'text-emerald-600', trend: '+3%', up: true },
    { label: 'Absentéisme', value: `${kpis.tauxAbsenteeisme}%`, icon: TrendingDown, bg: 'bg-amber-50', textColor: 'text-amber-600', trend: '+0.5%', up: false },
    { label: 'Objectifs', value: `${kpis.objectifAtteint}%`, icon: Target, bg: 'bg-sky-50', textColor: 'text-sky-600', trend: '+5%', up: true },
    { label: 'Budget', value: `${kpis.budgetUtilise}%`, icon: DollarSign, bg: 'bg-violet-50', textColor: 'text-violet-600', trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 p-5 sm:p-7 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full -ml-12 -mb-12" />
        <div className="absolute top-12 right-24 w-2 h-2 bg-amber-300 rounded-full animate-ping" />
        <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">En ligne</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Sparkles size={12} className="text-amber-400" />
                <span className="text-xs text-amber-300 font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">Tableau de bord</h1>
            <p className="text-gray-400 text-sm mt-1">Vue d'ensemble des opérations</p>
          </div>
          <Link to="/notifications" className="relative p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
            <Bell size={22} className="text-white" />
            {unreadNotifs > 0 && (<span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-slate-900">{unreadNotifs}</span>)}
          </Link>
        </div>

        <div className="relative flex items-center gap-3 mt-5">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm"><Building2 size={16} className="text-amber-400" /><span className="text-sm font-semibold">7 départements</span></div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm"><Users size={16} className="text-amber-400" /><span className="text-sm font-semibold">{dashboardStats.totalEmployes} employés</span></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-white p-4 sm:p-5 hover:shadow-lg transition-all cursor-pointer group`}>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${stat.gradient} opacity-[0.06] rounded-bl-3xl group-hover:opacity-[0.12] transition-opacity`} />
            <div className="relative">
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} flex items-center justify-center mb-3 shadow-sm`}>
                <stat.icon size={22} className={stat.textColor} />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alertes */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${alertStyles[alert.type]} backdrop-blur-sm`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.type === 'error' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-amber-100' : 'bg-red-200'}`}>
                <alert.icon size={18} className={alert.type === 'error' ? 'text-red-600' : alert.type === 'warning' ? 'text-amber-600' : 'text-red-700'} />
              </div>
              <span className="text-sm font-semibold flex-1">{alert.msg}</span>
              <Zap size={16} className={alert.type === 'error' ? 'text-red-500' : alert.type === 'warning' ? 'text-amber-500' : 'text-red-600'} />
            </div>
          ))}
        </div>
      )}

      {/* Demandes urgentes */}
      {demandesUrgentes.length > 0 && (
        <div className="bg-white border border-red-100 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center"><Bell size={20} className="text-red-600" /></div>
            <div><h3 className="font-bold text-gray-900">Demandes urgentes</h3><p className="text-xs text-gray-500">{demandesUrgentes.length} en attente</p></div>
          </div>
          <div className="space-y-2">{demandesUrgentes.map((d) => (<div key={d.id} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl"><div><p className="text-sm font-semibold text-gray-900">{d.employeeName}</p><p className="text-xs text-gray-500">{d.type} - {d.motif}</p></div><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">⚡ Urgente</span></div>))}<Link to="/demandes" className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-semibold mt-2">Traiter les demandes <ChevronRight size={14} /></Link></div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {produitsStats.map((prod) => (
          <div key={prod.label} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl ${prod.bg} flex items-center justify-center mb-2.5`}><prod.icon size={20} className={prod.textColor} /></div>
            <p className="text-xl font-extrabold text-gray-900">{prod.value}</p>
            <div className="flex items-center gap-2 mt-1"><p className="text-xs text-gray-500">{prod.label}</p><span className={`text-[11px] font-bold flex items-center gap-0.5 ${prod.up ? 'text-emerald-600' : 'text-red-600'}`}>{prod.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{prod.trend}</span></div>
          </div>
        ))}
      </div>

      {/* Performance départements */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center"><Building2 size={20} className="text-amber-600" /></div>
          <div><h3 className="font-bold text-gray-900">Performance des départements</h3><p className="text-xs text-gray-500">Score par département</p></div>
        </div>
        <div className="space-y-4">{departements.map((dept) => (<div key={dept.department}><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">{dept.department}</span><span className={`text-sm font-extrabold ${dept.score >= 90 ? 'text-emerald-600' : dept.score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{dept.score}%</span></div><div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${dept.score >= 90 ? 'bg-emerald-500' : dept.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${dept.score}%` }} /></div></div>))}</div>
      </div>

      {/* Tâches en cours */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center"><Briefcase size={20} className="text-sky-600" /></div>
          <div><h3 className="font-bold text-gray-900">Tâches en cours</h3><p className="text-xs text-gray-500">{tachesActives.length} tâches actives</p></div>
        </div>
        <div className="space-y-2">{tachesActives.map((t) => (<div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><div className="min-w-0 flex-1 mr-3"><p className="text-sm font-semibold text-gray-900 truncate">{t.title}</p><p className="text-xs text-gray-500 truncate">{t.department || ''} • {t.assignee}</p></div><span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${t.status === 'en_cours' ? 'bg-sky-100 text-sky-700' : t.status === 'en_retard' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{t.status === 'en_cours' ? 'En cours' : t.status === 'en_retard' ? 'En retard' : 'Terminé'}</span></div>))}<Link to="/taches" className="inline-flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700 font-semibold mt-3">Voir toutes les tâches <ChevronRight size={14} /></Link></div>
      </div>

      {/* Statut */}
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${currentStatus.borderColor} ${currentStatus.bgColor}`}>
        <span className="text-2xl">{currentStatus.icon}</span>
        <div><span className={`text-sm font-bold ${currentStatus.textColor}`}>{currentStatus.label}</span>{globalStatus === 'critical' && <p className="text-xs text-red-600 mt-0.5">{enRetard} retards, {incidents} incidents</p>}</div>
      </div>
    </div>
  );
}