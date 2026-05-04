import { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Eye, ListTodo, Wrench, Calendar, User, MapPin, Flag } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { taches as defaultTaches, Tache } from '../data/mockData';
import { toast } from 'sonner';

export default function Taches() {
  const [taches, setTaches] = useLocalStorage<Tache[]>('taches', defaultTaches);
  const [selectedTache, setSelectedTache] = useState<Tache | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<'toutes' | 'en_cours' | 'termine' | 'en_retard'>('toutes');

  const filtered = filter === 'toutes' ? taches : taches.filter((t) => t.status === filter);

  const markComplete = (id: string) => {
    setTaches((prev) => prev.map((t) => t.id === id ? { ...t, status: 'termine' as const } : t));
    toast.success('Tâche marquée comme terminée');
  };

  const statusConfig = {
    en_cours: { label: 'En cours', icon: Clock, color: 'bg-sky-50 text-sky-700 border-sky-200', iconColor: 'text-sky-600', bgIcon: 'bg-sky-50' },
    termine: { label: 'Terminé', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', iconColor: 'text-emerald-600', bgIcon: 'bg-emerald-50' },
    en_retard: { label: 'En retard', icon: AlertCircle, color: 'bg-red-50 text-red-700 border-red-200', iconColor: 'text-red-600', bgIcon: 'bg-red-50' },
  };

  const priorityConfig = {
    haute: { label: 'Haute', color: 'bg-red-100 text-red-700 border-red-200', icon: '🔴' },
    moyenne: { label: 'Moyenne', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: '🟠' },
    basse: { label: 'Basse', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '🟢' },
  };

  const counts = {
    en_cours: taches.filter((t) => t.status === 'en_cours').length,
    termine: taches.filter((t) => t.status === 'termine').length,
    en_retard: taches.filter((t) => t.status === 'en_retard').length,
  };

  const tauxCompletion = Math.round((counts.termine / taches.length) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestion et suivi des tâches chantiers</p>
        </div>
        <div className="flex items-center gap-2">
          <ListTodo size={20} className="text-amber-600" />
          <span className="text-sm font-semibold text-gray-700">{taches.length} tâches</span>
        </div>
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-sky-200 rounded-xl p-4 text-center">
          <div className="p-3 rounded-xl bg-sky-50 inline-flex mb-2">
            <Clock size={24} className="text-sky-600" />
          </div>
          <p className="text-3xl font-extrabold text-sky-600">{counts.en_cours}</p>
          <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider">En cours</p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-xl p-4 text-center">
          <div className="p-3 rounded-xl bg-emerald-50 inline-flex mb-2">
            <CheckCircle2 size={24} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{counts.termine}</p>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Terminées</p>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="p-3 rounded-xl bg-red-50 inline-flex mb-2">
            <AlertCircle size={24} className="text-red-600" />
          </div>
          <p className="text-3xl font-extrabold text-red-600">{counts.en_retard}</p>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">En retard</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="p-3 rounded-xl bg-amber-50 inline-flex mb-2">
            <Wrench size={24} className="text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{tauxCompletion}%</p>
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Complétion</p>
        </div>
      </div>

      {/* Barre de progression globale */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Progression globale</span>
          <span className="text-xs font-bold text-amber-600">{tauxCompletion}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              tauxCompletion >= 80 ? 'bg-emerald-500' : tauxCompletion >= 50 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${tauxCompletion}%` }}
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        {(['toutes', 'en_cours', 'termine', 'en_retard'] as const).map((f) => {
          const config = f === 'toutes' 
            ? { icon: '📋', label: 'Toutes', count: taches.length }
            : f === 'en_cours' 
              ? { icon: '⏳', label: 'En cours', count: counts.en_cours }
              : f === 'termine' 
                ? { icon: '✅', label: 'Terminées', count: counts.termine }
                : { icon: '⚠️', label: 'En retard', count: counts.en_retard };
          
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                filter === f 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {config.icon} {config.label}
              <span className={`ml-1.5 text-xs ${filter === f ? 'text-white/70' : 'text-gray-400'}`}>
                ({config.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Liste des tâches */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <ListTodo size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Aucune tâche</p>
              <p className="text-sm text-gray-400 mt-1">Toutes les tâches sont terminées</p>
            </div>
          </Card>
        ) : (
          filtered.map((tache) => {
            const status = statusConfig[tache.status];
            const priority = priorityConfig[tache.priority];
            const StatusIcon = status.icon;

            const isRetard = tache.status === 'en_retard';

            return (
              <Card 
                key={tache.id} 
                className={`border-l-4 transition-all hover:shadow-md ${
                  isRetard ? 'border-l-red-500 bg-red-50/20' : 
                  tache.status === 'en_cours' ? 'border-l-sky-500' : 
                  'border-l-emerald-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Icône statut */}
                  <div className={`p-3 rounded-xl ${status.bgIcon} flex-shrink-0`}>
                    <StatusIcon size={22} className={status.iconColor} />
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-bold ${isRetard ? 'text-red-800' : 'text-gray-900'}`}>
                        {tache.title}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border ${priority.color}`}>
                        {priority.icon} {priority.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {tache.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {tache.chantier}
                      </span>
                      <span className={`flex items-center gap-1 ${isRetard ? 'text-red-600 font-semibold' : ''}`}>
                        <Calendar size={12} />
                        {tache.dueDate}
                        {isRetard && ' (DÉPASSÉ)'}
                      </span>
                    </div>
                  </div>

                  {/* Statut + Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${status.color}`}>
                      {status.label}
                    </span>
                    <button
                      onClick={() => { setSelectedTache(tache); setModalOpen(true); }}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Voir détails"
                    >
                      <Eye size={16} className="text-gray-500" />
                    </button>
                    {tache.status !== 'termine' && (
                      <Button 
                        variant="success" 
                        size="sm" 
                        onClick={() => markComplete(tache.id)}
                        title="Marquer comme terminé"
                      >
                        <CheckCircle2 size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal détail */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Détail de la tâche">
        {selectedTache && (
          <div className="space-y-5">
            {/* En-tête */}
            <div className={`p-5 rounded-2xl ${
              selectedTache.status === 'en_retard' ? 'bg-red-50' :
              selectedTache.status === 'en_cours' ? 'bg-sky-50' : 'bg-emerald-50'
            }`}>
              <h3 className="text-lg font-bold text-gray-900">{selectedTache.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${statusConfig[selectedTache.status].color}`}>
                  {statusConfig[selectedTache.status].label}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${priorityConfig[selectedTache.priority].color}`}>
                  {priorityConfig[selectedTache.priority].icon} {priorityConfig[selectedTache.priority].label}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Description</p>
              <p className="text-sm text-gray-900">{selectedTache.description}</p>
            </div>

            {/* Détails */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <User size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Assigné à</p>
                  <p className="text-sm font-medium text-gray-900">{selectedTache.assignee}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Échéance</p>
                  <p className="text-sm font-medium text-gray-900">{selectedTache.dueDate}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Chantier</p>
                  <p className="text-sm font-medium text-gray-900">{selectedTache.chantier}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Flag size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Priorité</p>
                  <p className="text-sm font-medium text-gray-900">{priorityConfig[selectedTache.priority].icon} {priorityConfig[selectedTache.priority].label}</p>
                </div>
              </div>
            </div>

            {/* Action */}
            {selectedTache.status !== 'termine' && (
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  variant="success" 
                  onClick={() => { markComplete(selectedTache.id); setModalOpen(false); }}
                  className="w-full"
                >
                  <CheckCircle2 size={18} /> Marquer comme terminée
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}