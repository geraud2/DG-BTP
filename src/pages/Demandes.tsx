import { useState } from 'react';
import { Check, X, Eye, ClipboardList, Clock, CheckCircle, XCircle, FileText, User, Calendar, ChevronDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { demandes as defaultDemandes, Demande } from '../data/mockData';
import { toast } from 'sonner';

export default function Demandes() {
  const [demandes, setDemandes] = useLocalStorage<Demande[]>('demandes', defaultDemandes);
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<'toutes' | 'en_attente' | 'validee' | 'refusee'>('toutes');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = filter === 'toutes' ? demandes : demandes.filter((d) => d.status === filter);

  const handleValidate = (id: string) => {
    setDemandes((prev) => prev.map((d) => d.id === id ? { ...d, status: 'validee' as const } : d));
    toast.success('Demande validée avec succès');
  };

  const handleRefuse = (id: string) => {
    setDemandes((prev) => prev.map((d) => d.id === id ? { ...d, status: 'refusee' as const } : d));
    toast.error('Demande refusée');
  };

  const openDetail = (demande: Demande) => {
    setSelectedDemande(demande);
    setModalOpen(true);
  };

  const statusBadge = (status: Demande['status'], compact?: boolean) => {
    const styles = {
      en_attente: 'bg-amber-50 text-amber-700 border border-amber-200',
      validee: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      refusee: 'bg-red-50 text-red-700 border border-red-200',
    };
    const icons = {
      en_attente: <Clock size={12} />,
      validee: <CheckCircle size={12} />,
      refusee: <XCircle size={12} />,
    };
    const labels = { en_attente: 'En attente', validee: 'Validée', refusee: 'Refusée' };
    const compactLabels = { en_attente: 'Att.', validee: 'OK', refusee: 'Non' };
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap ${styles[status]}`}>
        {icons[status]}
        <span className={compact ? 'hidden sm:inline' : ''}>{compact ? compactLabels[status] : labels[status]}</span>
      </span>
    );
  };

  const typeBadge = (type: Demande['type'], compact?: boolean) => {
    const styles = {
      conge: 'bg-sky-50 text-sky-700 border border-sky-200',
      permission: 'bg-violet-50 text-violet-700 border border-violet-200',
      formation: 'bg-teal-50 text-teal-700 border border-teal-200',
    };
    const labels = { conge: 'Congé', permission: 'Perm.', formation: 'Form.' };
    return (
      <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap ${styles[type]}`}>
        {compact ? labels[type] : type === 'conge' ? 'Congé' : type === 'permission' ? 'Permission' : 'Formation'}
      </span>
    );
  };

  const priorityBadge = (priority: string) => {
    if (priority === 'urgente') {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
          ⚡ <span className="hidden sm:inline">Urgente</span>
        </span>
      );
    }
    return null;
  };

  // Stats
  const enAttente = demandes.filter((d) => d.status === 'en_attente').length;
  const validees = demandes.filter((d) => d.status === 'validee').length;
  const refusees = demandes.filter((d) => d.status === 'refusee').length;
  const urgentes = demandes.filter((d) => d.priority === 'urgente' && d.status === 'en_attente').length;

  const filterOptions = [
    { key: 'toutes' as const, label: 'Toutes', count: demandes.length },
    { key: 'en_attente' as const, label: 'En attente', count: enAttente },
    { key: 'validee' as const, label: 'Validées', count: validees },
    { key: 'refusee' as const, label: 'Refusées', count: refusees },
  ];

  const currentFilter = filterOptions.find(f => f.key === filter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Demandes</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Validation des demandes du personnel</p>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-50 flex-shrink-0">
            <Clock size={18} className="text-amber-600 sm:size-20" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{enAttente}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">En attente</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-emerald-50 flex-shrink-0">
            <CheckCircle size={18} className="text-emerald-600 sm:size-20" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{validees}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Validées</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-red-50 flex-shrink-0">
            <XCircle size={18} className="text-red-600 sm:size-20" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{refusees}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Refusées</p>
          </div>
        </div>
        <div className={`rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border col-span-2 sm:col-span-1 ${urgentes > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
          <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl flex-shrink-0 ${urgentes > 0 ? 'bg-red-100' : 'bg-gray-50'}`}>
            <FileText size={18} className={urgentes > 0 ? 'text-red-600' : 'text-gray-400'} />
          </div>
          <div>
            <p className={`text-xl sm:text-2xl font-bold ${urgentes > 0 ? 'text-red-700' : 'text-gray-900'}`}>{urgentes}</p>
            <p className={`text-[10px] sm:text-xs font-medium ${urgentes > 0 ? 'text-red-600' : 'text-gray-500'}`}>Urgentes</p>
          </div>
        </div>
      </div>

      {/* Filtres - Desktop visible, Mobile toggle */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          {filterOptions.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                filter === f.key 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className={`ml-1 sm:ml-1.5 text-[10px] sm:text-xs ${filter === f.key ? 'text-white/70' : 'text-gray-400'}`}>
                ({f.count})
              </span>
            </button>
          ))}
        </div>

        {/* Filtre mobile dropdown */}
        <div className="sm:hidden relative w-full">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
          >
            {currentFilter?.label}
            <span className="text-gray-400">({currentFilter?.count})</span>
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          {showFilters && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {filterOptions.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setFilter(f.key); setShowFilters(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors ${
                    filter === f.key 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                  <span className="text-xs text-gray-400">({f.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="space-y-2 sm:space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <div className="text-center py-10 sm:py-12">
              <ClipboardList size={40} className="text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm text-gray-500 font-medium">Aucune demande</p>
              <p className="text-xs text-gray-400 mt-1">Toutes les demandes ont été traitées</p>
            </div>
          </Card>
        ) : (
          filtered.map((d) => (
            <Card key={d.id} className="hover:shadow-md transition-shadow active:scale-[0.99]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Infos */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className={`p-2.5 sm:p-3 rounded-xl flex-shrink-0 ${
                    d.priority === 'urgente' ? 'bg-red-50' :
                    d.type === 'conge' ? 'bg-sky-50' :
                    d.type === 'permission' ? 'bg-violet-50' : 'bg-teal-50'
                  }`}>
                    <User size={20} className={
                      d.priority === 'urgente' ? 'text-red-600' :
                      d.type === 'conge' ? 'text-sky-600' :
                      d.type === 'permission' ? 'text-violet-600' : 'text-teal-600'
                    } />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-bold text-gray-900 truncate">{d.employeeName}</p>
                      {priorityBadge(d.priority)}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      {typeBadge(d.type, true)}
                      <span className="text-gray-300 text-xs hidden sm:inline">•</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 truncate">
                        <Calendar size={11} className="flex-shrink-0" />
                        <span className="truncate">{d.dateDebut} → {d.dateFin}</span>
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-1">{d.motif}</p>
                  </div>
                </div>

                {/* Statut + Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  {statusBadge(d.status, true)}
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button 
                      onClick={() => openDetail(d)} 
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Voir détails"
                    >
                      <Eye size={15} className="text-gray-500" />
                    </button>
                    {d.status === 'en_attente' && (
                      <>
                        <button 
                          onClick={() => handleValidate(d.id)} 
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                          title="Valider"
                        >
                          <Check size={15} className="text-emerald-600" />
                        </button>
                        <button 
                          onClick={() => handleRefuse(d.id)} 
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Refuser"
                        >
                          <X size={15} className="text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal de détail */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Détail de la demande">
        {selectedDemande && (
          <div className="space-y-4 sm:space-y-5">
            {/* En-tête employé */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-100 flex-shrink-0">
                <User size={24} className="text-amber-600 sm:size-28" />
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-bold text-gray-900 truncate">{selectedDemande.employeeName}</p>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                  {typeBadge(selectedDemande.type)}
                  {priorityBadge(selectedDemande.priority)}
                  {statusBadge(selectedDemande.status)}
                </div>
              </div>
            </div>

            {/* Détails */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Date début</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{selectedDemande.dateDebut}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Date fin</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{selectedDemande.dateFin}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Motif</p>
              <p className="text-xs sm:text-sm text-gray-900">{selectedDemande.motif}</p>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Date de création</p>
              <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedDemande.createdAt}</p>
            </div>

            {/* Actions */}
            {selectedDemande.status === 'en_attente' && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="success" 
                  onClick={() => { handleValidate(selectedDemande.id); setModalOpen(false); }}
                  className="flex-1 text-sm"
                >
                  <CheckCircle size={16} /> Valider la demande
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => { handleRefuse(selectedDemande.id); setModalOpen(false); }}
                  className="flex-1 text-sm"
                >
                  <XCircle size={16} /> Refuser la demande
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}