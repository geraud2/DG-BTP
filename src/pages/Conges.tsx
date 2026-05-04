import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { conges as defaultConges } from '../data/mockData';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { const day = new Date(year, month, 1).getDay(); return day === 0 ? 6 : day - 1; }

export default function Conges() {
  const [conges] = useLocalStorage('conges', defaultConges);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getCongesForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return conges.filter((c) => dateStr >= c.dateDebut && dateStr <= c.dateFin);
  };

  const congesMois = conges.filter((c) => {
    const start = new Date(c.dateDebut); const end = new Date(c.dateFin);
    return start.getMonth() === month || end.getMonth() === month;
  });

  const approuves = congesMois.filter((c) => c.status === 'approuve').length;
  const enAttente = congesMois.filter((c) => c.status === 'en_attente').length;
  const refuses = congesMois.filter((c) => c.status === 'refuse').length;

  const statusColor = (status: string) => {
    if (status === 'approuve') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'en_attente') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Congés</h1><p className="text-gray-500 text-xs sm:text-sm mt-0.5">Calendrier des congés du personnel</p></div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 sm:p-3 text-center"><CheckCircle size={14} className="text-emerald-600 mx-auto mb-1" /><span className="text-xl sm:text-2xl font-bold text-emerald-700 block">{approuves}</span><p className="text-[10px] sm:text-xs font-medium text-emerald-600">Approuvés</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 sm:p-3 text-center"><Clock size={14} className="text-amber-600 mx-auto mb-1" /><span className="text-xl sm:text-2xl font-bold text-amber-700 block">{enAttente}</span><p className="text-[10px] sm:text-xs font-medium text-amber-600">En attente</p></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 sm:p-3 text-center"><XCircle size={14} className="text-red-600 mx-auto mb-1" /><span className="text-xl sm:text-2xl font-bold text-red-700 block">{refuses}</span><p className="text-[10px] sm:text-xs font-medium text-red-600">Refusés</p></div>
      </div>

      <Card className="!p-3 sm:!p-5">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button onClick={prevMonth} className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-amber-50"><ChevronLeft size={18} className="text-gray-500" /></button>
          <div className="flex items-center gap-1.5 sm:gap-2"><Calendar size={16} className="text-amber-600" /><h2 className="text-base sm:text-lg font-bold text-gray-900"><span className="sm:hidden">{MONTHS[month].slice(0, 4)}.</span><span className="hidden sm:inline">{MONTHS[month]}</span> {year}</h2></div>
          <button onClick={nextMonth} className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-amber-50"><ChevronRight size={18} className="text-gray-500" /></button>
        </div>

        <div className="grid grid-cols-7 mb-1 sm:mb-2">{DAYS.map((day, i) => (<div key={day} className={`text-center text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 ${i >= 5 ? 'text-red-400' : 'text-gray-500'} uppercase tracking-wider`}><span className="sm:hidden">{DAYS_SHORT[i]}</span><span className="hidden sm:inline">{day}</span></div>))}</div>

        <div className="grid grid-cols-7 border-t border-l border-gray-100 rounded-lg overflow-hidden">
          {Array.from({ length: firstDay }, (_, i) => (<div key={`empty-${i}`} className="border-r border-b border-gray-100 bg-gray-50/30 min-h-[55px] sm:min-h-[90px] p-1 sm:p-2" />))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1; const dayConges = getCongesForDay(day);
            const isWeekend = (firstDay + i) % 7 >= 5; const isToday = day === 4 && month === 4;
            return (
              <div key={day} className={`border-r border-b border-gray-100 p-1 sm:p-2 min-h-[55px] sm:min-h-[90px] transition-colors ${isWeekend ? 'bg-gray-50/30' : 'bg-white hover:bg-amber-50/20'}`}>
                <div className="flex items-center justify-between mb-0.5 sm:mb-1"><span className={`text-xs sm:text-sm font-semibold ${isToday ? 'bg-amber-500 text-white w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center' : isWeekend ? 'text-gray-400' : 'text-gray-700'}`}>{day}</span></div>
                <div className="space-y-0.5">
                  <div className="flex gap-0.5 flex-wrap sm:hidden">{dayConges.slice(0, 3).map((c) => (<span key={c.id} className={`w-1.5 h-1.5 rounded-full ${c.status === 'approuve' ? 'bg-emerald-500' : c.status === 'en_attente' ? 'bg-amber-500' : 'bg-red-500'}`} title={`${c.employeeName} - ${c.type}`} />))}{dayConges.length > 3 && <span className="text-[9px] text-gray-400">+{dayConges.length - 3}</span>}</div>
                  <div className="hidden sm:block space-y-1">{dayConges.slice(0, 2).map((c) => (<div key={c.id} className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate ${statusColor(c.status)}`} title={`${c.employeeName} - ${c.type}`}>{c.employeeName.split(' ')[0]}</div>))}{dayConges.length > 2 && <span className="text-[10px] text-gray-400 font-medium pl-1">+{dayConges.length - 2}</span>}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Congés du mois" icon={Users}>
        <div className="flex items-center gap-3 mb-3 flex-wrap"><div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] sm:text-xs text-gray-500">Approuvé</span></div><div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="text-[10px] sm:text-xs text-gray-500">En attente</span></div><div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-[10px] sm:text-xs text-gray-500">Refusé</span></div></div>
        {congesMois.length === 0 ? (<div className="text-center py-6 sm:py-8"><Calendar size={32} className="text-gray-300 mx-auto mb-2 sm:mb-3" /><p className="text-xs sm:text-sm text-gray-500">Aucun congé ce mois</p></div>) : (
          <div className="space-y-1.5 sm:space-y-2 max-h-[250px] sm:max-h-[300px] overflow-y-auto">{congesMois.map((c) => (<div key={c.id} className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-colors ${c.status === 'approuve' ? 'bg-emerald-50/50 hover:bg-emerald-50' : c.status === 'en_attente' ? 'bg-amber-50/50 hover:bg-amber-50' : 'bg-red-50/50 hover:bg-red-50'}`}><div className="min-w-0 flex-1 mr-2"><p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{c.employeeName}</p><p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{c.type} • {c.dateDebut} → {c.dateFin}</p></div><span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 ${statusColor(c.status)}`}><span className="sm:hidden">{c.status === 'approuve' ? 'OK' : c.status === 'en_attente' ? '?' : '✕'}</span><span className="hidden sm:inline">{c.status === 'approuve' ? 'Approuvé' : c.status === 'en_attente' ? 'En attente' : 'Refusé'}</span></span></div>))}</div>
        )}
      </Card>
    </div>
  );
}