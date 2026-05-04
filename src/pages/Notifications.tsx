import { Info, AlertTriangle, XCircle, CheckCircle2, Trash2, Bell, BellOff, CheckCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { notifications as defaultNotifications, Notification } from '../data/mockData';
import { toast } from 'sonner';

export default function Notifications() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', defaultNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    toast.success('Notification marquée comme lue');
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('Toutes les notifications sont marquées comme lues');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notification supprimée');
  };

  const deleteAll = () => {
    setNotifications([]);
    toast.success('Toutes les notifications ont été supprimées');
  };

  const typeConfig = {
    info: { icon: Info, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-l-sky-500', badge: 'bg-sky-100 text-sky-700' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700' },
    error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500', badge: 'bg-red-100 text-red-700' },
    success: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-l-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const typeLabel = (type: Notification['type']) => {
    const labels = { info: 'Information', warning: 'Attention', error: 'Alerte', success: 'Succès' };
    return labels[type];
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {unreadCount > 0 
              ? `${unreadCount} notification(s) non lue(s) sur ${totalCount}` 
              : 'Toutes les notifications sont lues'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck size={14} /> Tout lire
            </Button>
          )}
          {totalCount > 0 && (
            <Button variant="ghost" size="sm" onClick={deleteAll}>
              <Trash2 size={14} className="text-red-500" /> Vider
            </Button>
          )}
        </div>
      </div>

      {/* Résumé */}
      {totalCount > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {Object.entries(typeConfig).map(([key, config]) => {
            const count = notifications.filter((n) => n.type === key).length;
            if (count === 0) return null;
            const Icon = config.icon;
            return (
              <div key={key} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
                <div className={`p-2 rounded-lg ${config.bg} inline-flex mb-2`}>
                  <Icon size={18} className={config.color} />
                </div>
                <p className="text-lg font-bold text-gray-900">{count}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{typeLabel(key as Notification['type'])}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Liste des notifications */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-50 inline-flex mb-4">
                <BellOff size={40} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Aucune notification</p>
              <p className="text-sm text-gray-400 mt-1">Vous êtes à jour</p>
            </div>
          </Card>
        ) : (
          notifications.map((notif) => {
            const config = typeConfig[notif.type];
            const Icon = config.icon;

            return (
              <Card 
                key={notif.id} 
                className={`border-l-4 ${config.border} transition-all ${!notif.read ? 'shadow-md' : 'opacity-70'}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icône type */}
                  <div className={`p-3 rounded-xl ${config.bg} flex-shrink-0 relative`}>
                    <Icon size={20} className={config.color} />
                    {!notif.read && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badge}`}>
                            {typeLabel(notif.type)}
                          </span>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className={`text-sm font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium">
                        {formatDate(notif.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-2 rounded-lg hover:bg-emerald-50 transition-colors group"
                        title="Marquer comme lu"
                      >
                        <CheckCircle2 size={16} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
                      title="Supprimer"
                    >
                      <Trash2 size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}