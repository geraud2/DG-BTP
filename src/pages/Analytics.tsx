import { TrendingUp, TrendingDown, Target, DollarSign, Building2, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import { analyticsData } from '../data/mockData';

function BarChart({ data, label, color }: { data: { month: string; value: number }[]; label: string; color: string }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{label}</h3>
      <div className="flex items-end gap-1.5 h-48">
        {data.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full relative group">
              <div className={`w-full rounded-t-sm transition-all duration-500 ${color}`} style={{ height: `${(d.value / maxVal) * 160}px` }} />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{d.value}%</div>
            </div>
            <span className="text-[10px] text-gray-500">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DepartmentBarChart({ data }: { data: { department: string; score: number }[] }) {
  return (
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.department}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{d.department}</span>
            <span className="text-sm font-bold text-gray-900">{d.score}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${d.score >= 90 ? 'bg-emerald-500' : d.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const kpis = analyticsData.kpis;

  const kpiCards = [
    { label: 'Productivité', value: `${kpis.tauxProductivite}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+3%' },
    { label: 'Absentéisme', value: `${kpis.tauxAbsenteeisme}%`, icon: TrendingDown, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-1.2%' },
    { label: 'Incidents', value: kpis.incidentsSecurite, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', trend: '-2' },
    { label: 'Départements', value: kpis.departmentsActifs, icon: Building2, color: 'text-sky-600', bg: 'bg-sky-50', trend: '+1' },
    { label: 'Objectifs', value: `${kpis.objectifAtteint}%`, icon: Target, color: 'text-violet-600', bg: 'bg-violet-50', trend: '+5%' },
    { label: 'Budget', value: `${kpis.budgetUtilise}%`, icon: DollarSign, color: 'text-teal-600', bg: 'bg-teal-50', trend: '-8%' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Analytics</h1><p className="text-gray-500 mt-1">Indicateurs de performance</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><div className={`p-2.5 rounded-lg ${kpi.bg}`}><kpi.icon size={20} className={kpi.color} /></div><div><p className="text-xl font-bold text-gray-900">{kpi.value}</p><p className="text-xs text-gray-500">{kpi.label}</p></div></div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{kpi.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card><BarChart data={analyticsData.productivity} label="Productivité mensuelle (%)" color="bg-sky-500" /></Card>
        <Card><BarChart data={analyticsData.absenteeism} label="Absentéisme mensuel (%)" color="bg-amber-500" /></Card>
      </div>

      <Card title="Performance des départements" icon={Building2}>
        <DepartmentBarChart data={analyticsData.departmentPerformance} />
      </Card>
    </div>
  );
}