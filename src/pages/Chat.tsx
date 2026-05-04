import { useState } from 'react';
import { Send, User, ChevronLeft, MessageSquare, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { chatConversations as defaultConversations, ChatConversation, ChatMessage } from '../data/mockData';
import { toast } from 'sonner';

export default function Chat() {
  const [conversations, setConversations] = useLocalStorage<ChatConversation[]>('chatConversations', defaultConversations);
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [newMessage, setNewMessage] = useState('');
  const [showList, setShowList] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConv) return;

    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'dg',
      senderName: 'Vous',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      avatar: '',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { 
              ...c, 
              messages: [...c.messages, msg], 
              lastMessage: msg.content, 
              lastTimestamp: msg.timestamp, 
              unread: 0 
            }
          : c
      )
    );
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `${diffDays}j`;
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-amber-100 text-amber-700',
      'bg-sky-100 text-sky-700',
      'bg-emerald-100 text-emerald-700',
      'bg-violet-100 text-violet-700',
      'bg-rose-100 text-rose-700',
      'bg-teal-100 text-teal-700',
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const unreadTotal = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
          <p className="text-gray-500 text-sm mt-0.5">Messagerie interne avec les équipes</p>
        </div>
        {unreadTotal > 0 && (
          <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
            {unreadTotal} non lu{unreadTotal > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-240px)] min-h-[500px]">
        {/* Liste des conversations */}
        <Card className={`overflow-hidden flex flex-col !p-0 ${!showList && 'hidden lg:flex'}`}>
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} className="text-amber-600" />
              Conversations
            </h3>
            <div className="relative mt-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Aucune conversation</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setShowList(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                    activeConvId === conv.id ? 'bg-amber-50 border-l-2 border-l-amber-500' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${getAvatarColor(conv.participantName)}`}>
                    {getInitials(conv.participantName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {conv.participantName}
                      </p>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {formatTime(conv.lastTimestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500 truncate flex-1">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Zone de chat */}
        <Card className={`overflow-hidden flex flex-col !p-0 ${showList && 'hidden lg:flex'}`}>
          {activeConv ? (
            <>
              {/* En-tête conversation */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                <button
                  onClick={() => setShowList(true)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-200 transition-colors -ml-1"
                  aria-label="Retour"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${getAvatarColor(activeConv.participantName)}`}>
                  {getInitials(activeConv.participantName)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{activeConv.participantName}</p>
                  <p className="text-[10px] text-emerald-600 font-medium">● En ligne</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50/30">
                {activeConv.messages.map((msg) => {
                  const isMe = msg.senderId === 'dg';
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-[75%] ${isMe ? 'order-2' : ''}`}>
                        {!isMe && (
                          <p className="text-[10px] text-gray-500 mb-1 ml-1">{msg.senderName}</p>
                        )}
                        <div className={`px-3 py-2 rounded-2xl text-sm ${
                          isMe
                            ? 'bg-amber-500 text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100'
                        }`}>
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-gray-400 mt-0.5 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="px-3 sm:px-4 py-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Écrire un message..."
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-gray-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MessageSquare size={48} className="text-gray-300 mb-3" />
              <p className="text-sm">Sélectionnez une conversation</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}