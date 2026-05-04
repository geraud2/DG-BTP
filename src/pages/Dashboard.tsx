import { Link } from 'react-router-dom';
import { 
  Users, UserCheck, UserX, CalendarOff, ListTodo, 
  AlertTriangle, TrendingUp, TrendingDown, Clock, 
  DollarSign, Building2, Bell, ChevronRight, ArrowUp, ArrowDown,
  Wrench
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

  const globalStatus = enRetard > 2 || incidents > 1 
    ? 'critical' 
    : enRetard > 0 || incidents > 0 
      ? 'warning' 
      : 'ok';

  const statusConfig = {
    ok: { label: 'Tous les chantiers sont OK', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '🟢' },
    warning: { label: 'Attention sur certains chantiers', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '🟠' },
    critical: { label: 'Action requise - Incidents en cours', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: '🔴' },
  };

  const currentStatus = statusConfig[globalStatus];

  const stats = [
    { label: 'Employés', value: dashboardStats.totalEmployes, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
    { label: 'Présents', value: dashboardStats.employesPresents, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Absents', value: dashboardStats.employesAbsents, icon: UserX, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'En congé', value: dashboardStats.employesEnConge, icon: CalendarOff, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
  ];

  const chantiers = analyticsData.chantierPerformance;

  const alerts = [
    ...(incidents > 0 ? [{ type: 'error' as const, msg: `${incidents} incident(s) sécurité`, icon: AlertTriangle }] : []),
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
    { label: 'Productivité', value: `${kpis.tauxProductivite}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+3%', up: true },
    { label: 'Absentéisme', value: `${kpis.tauxAbsenteeisme}%`, icon: TrendingDown, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+0.5%', up: false },
    { label: 'Objectifs', value: `${kpis.objectifAtteint}%`, icon: ListTodo, color: 'text-sky-600', bg: 'bg-sky-50', trend: '+5%', up: true },
    { label: 'Budget', value: `${kpis.budgetUtilise}%`, icon: DollarSign, color: 'text-violet-600', bg: 'bg-violet-50', trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-8">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Vue d'ensemble des opérations</p>
        </div>
        <Link
          to="/notifications"
          className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm self-start sm:self-auto"
        >
          <Bell size={16} />
          <span className="hidden sm:inline">Notifications</span>
          {unreadNotifs > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadNotifs}
            </span>
          )}
        </Link>
      </div>

      {/* Statut global */}
      <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 rounded-2xl border ${currentStatus.borderColor} ${currentStatus.bgColor}`}>
        <span className="text-xl sm:text-2xl">{currentStatus.icon}</span>
        <div>
          <span className={`text-xs sm:text-sm font-bold ${currentStatus.textColor}`}>
            {currentStatus.label}
          </span>
          {globalStatus === 'critical' && (
            <p className="text-[10px] sm:text-xs text-red-600 mt-0.5">{enRetard} retards, {incidents} incidents</p>
          )}
        </div>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`border-l-4 ${stat.border} !p-3 sm:!p-5`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${stat.bg}`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alertes */}
      {alerts.length > 0 && (
        <div className="space-y-1.5 sm:space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border ${alertStyles[alert.type]}`}>
              <alert.icon size={16} />
              <span className="text-xs sm:text-sm font-medium">{alert.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Demandes urgentes */}
      {demandesUrgentes.length > 0 && (
        <Card title="Demandes urgentes" icon={Bell} className="!p-3 sm:!p-5">
          <div className="space-y-2 sm:space-y-3">
            {demandesUrgentes.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 sm:py-2.5 border-b border-gray-100 last:border-0 gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{d.employeeName}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate">{d.type} - {d.motif}</p>
                </div>
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-100 text-red-700 whitespace-nowrap flex-shrink-0">
                  ⚡ Urgente
                </span>
              </div>
            ))}
            <Link to="/demandes" className="inline-flex items-center gap-1 text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-semibold mt-1 sm:mt-2 transition">
              Traiter les demandes <ChevronRight size={14} />
            </Link>
          </div>
        </Card>
      )}

      {/* Avancement des chantiers */}
      <Card title="Avancement des chantiers" icon={Building2} className="!p-3 sm:!p-5">
        <div className="space-y-3 sm:space-y-4">
          {chantiers.map((chantier) => (
            <div key={chantier.chantier}>
              <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate mr-2">{chantier.chantier}</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">{chantier.avancement}%</span>
              </div>
              <div className="w-full h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    chantier.retard > 0 ? 'bg-red-500' : chantier.avancement > 70 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${chantier.avancement}%` }}
                />
              </div>
              {chantier.retard > 0 && (
                <p className="text-[10px] sm:text-xs text-red-600 mt-0.5 sm:mt-1 font-medium">⚠️ {chantier.retard} jours de retard</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {produitsStats.map((prod) => (
          <Card key={prod.label} className="!p-3 sm:!p-5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${prod.bg} flex-shrink-0`}>
                <prod.icon size={18} className={prod.color} />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-xl font-bold text-gray-900">{prod.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{prod.label}</p>
                <p className={`text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-1 flex items-center gap-0.5 ${
                  prod.up ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {prod.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {prod.trend}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tâches actives */}
      <Card title="Tâches en cours" icon={Wrench} className="!p-3 sm:!p-5">
        <div className="space-y-2 sm:space-y-3">
          {tachesActives.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2 sm:py-2.5 border-b border-gray-100 last:border-0 gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{t.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{t.chantier} • {t.assignee}</p>
              </div>
              <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                t.status === 'en_cours' ? 'bg-sky-100 text-sky-700' :
                t.status === 'en_retard' ? 'bg-red-100 text-red-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {t.status === 'en_cours' ? 'En cours' : t.status === 'en_retard' ? 'En retard' : 'Terminé'}
              </span>
            </div>
          ))}
          <Link to="/taches" className="inline-flex items-center gap-1 text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-semibold mt-1 sm:mt-2 transition">
            Voir toutes les tâches <ChevronRight size={14} />
          </Link>
        </div>
      </Card>
    </div>
  );
}