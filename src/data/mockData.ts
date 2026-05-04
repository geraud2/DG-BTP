// ============================================================
// TYPES
// ============================================================

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  chantier: string;
  status: 'present' | 'absent' | 'conge';
  email: string;
  avatar: string;
  joinDate: string;
}

export interface Demande {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'conge' | 'permission' | 'formation';
  status: 'en_attente' | 'validee' | 'refusee';
  priority: 'normale' | 'urgente';
  dateDebut: string;
  dateFin: string;
  motif: string;
  createdAt: string;
}

export interface Tache {
  id: string;
  title: string;
  chantier: string;
  assignee: string;
  status: 'en_cours' | 'termine' | 'en_retard';
  priority: 'haute' | 'moyenne' | 'basse';
  dueDate: string;
  description: string;
}

export interface Conge {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  status: 'approuve' | 'en_attente' | 'refuse';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export interface ChatConversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  messages: ChatMessage[];
}

export interface AnalyticsData {
  productivity: { month: string; value: number }[];
  absenteeism: { month: string; value: number }[];
  chantierPerformance: { chantier: string; avancement: number; retard: number }[];
  kpis: {
    tauxProductivite: number;
    tauxAbsenteeisme: number;
    incidentsSecurite: number;
    objectifAtteint: number;
    budgetUtilise: number;
    chantiersActifs: number;
  };
}

export interface DashboardStats {
  totalEmployes: number;
  employesPresents: number;
  employesAbsents: number;
  employesEnConge: number;
  tachesEnCours: number;
  tachesTerminees: number;
  tachesEnRetard: number;
  demandesEnAttente: number;
  notificationsNonLues: number;
  incidentsEnCours: number;
}

// ============================================================
// UTILITAIRES
// ============================================================

const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Moussa', 'Fatou', 'Ibrahim', 'Aminata', 'Koffi', 'Adama', 'Francois', 'Awa', 'Mamadou', 'Aicha', 'Seydou'];
const lastNames = ['Traore', 'Coulibaly', 'Kone', 'Diallo', 'Sawadogo', 'Ouattara', 'Bamba', 'Keita', 'Toure', 'Diop', 'Ndiaye', 'Fall', 'Sow', 'Diarra', 'Barry'];
const roles = ['Chef de chantier', 'Conducteur de travaux', 'Chef equipe', 'Macon', 'Coffreur', 'Ferailleur', 'Chauffeur', 'Topographe', 'Chef securite', 'Laborantin'];
const departments = ['Maconnerie', 'Coffrage', 'Ferraillage', 'Transport', 'Topographie', 'Securite', 'Laboratoire'];
const chantiers = ['Immeuble R+3 Cotonou', 'Route Parakou', 'Ecole Porto-Novo', 'Marche Abomey', 'Pont Natitingou'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// DONNEES
// ============================================================

export const employees: Employee[] = Array.from({ length: 30 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
  role: randomItem(roles),
  department: randomItem(departments),
  chantier: randomItem(chantiers),
  status: (['present', 'present', 'present', 'absent', 'conge'] as const)[Math.floor(Math.random() * 5)],
  email: `${randomItem(firstNames).toLowerCase()}.${randomItem(lastNames).toLowerCase()}@btp-afrique.com`,
  avatar: '',
  joinDate: `${2018 + Math.floor(Math.random() * 7)}-0${1 + Math.floor(Math.random() * 9)}-0${1 + Math.floor(Math.random() * 28)}`,
}));

export const demandes: Demande[] = [
  { id: 'dem-1', employeeId: 'emp-1', employeeName: 'Jean Traore', type: 'conge', status: 'en_attente', priority: 'normale', dateDebut: '2026-05-10', dateFin: '2026-05-15', motif: 'Vacances familiales', createdAt: '2026-05-01' },
  { id: 'dem-2', employeeId: 'emp-5', employeeName: 'Moussa Sawadogo', type: 'permission', status: 'en_attente', priority: 'urgente', dateDebut: '2026-05-08', dateFin: '2026-05-08', motif: 'Rendez-vous medical', createdAt: '2026-05-02' },
  { id: 'dem-3', employeeId: 'emp-8', employeeName: 'Aminata Keita', type: 'formation', status: 'en_attente', priority: 'normale', dateDebut: '2026-06-01', dateFin: '2026-06-03', motif: 'Formation securite chantier', createdAt: '2026-04-28' },
  { id: 'dem-4', employeeId: 'emp-3', employeeName: 'Pierre Kone', type: 'conge', status: 'validee', priority: 'normale', dateDebut: '2026-05-20', dateFin: '2026-05-25', motif: 'Conge annuel', createdAt: '2026-04-25' },
  { id: 'dem-5', employeeId: 'emp-7', employeeName: 'Ibrahim Bamba', type: 'permission', status: 'refusee', priority: 'normale', dateDebut: '2026-05-12', dateFin: '2026-05-12', motif: 'Demenagement', createdAt: '2026-04-30' },
  { id: 'dem-6', employeeId: 'emp-12', employeeName: 'Awa Fall', type: 'conge', status: 'en_attente', priority: 'urgente', dateDebut: '2026-05-18', dateFin: '2026-05-22', motif: 'Voyage familial urgent', createdAt: '2026-05-03' },
  { id: 'dem-7', employeeId: 'emp-10', employeeName: 'Adama Diop', type: 'formation', status: 'en_attente', priority: 'normale', dateDebut: '2026-06-10', dateFin: '2026-06-12', motif: 'Certification coffrage', createdAt: '2026-05-01' },
  { id: 'dem-8', employeeId: 'emp-4', employeeName: 'Sophie Diallo', type: 'conge', status: 'en_attente', priority: 'normale', dateDebut: '2026-05-25', dateFin: '2026-05-30', motif: 'Mariage', createdAt: '2026-05-02' },
];

export const taches: Tache[] = [
  { id: 'task-1', title: 'Coulage dalle R+1', chantier: 'Immeuble R+3 Cotonou', assignee: 'Jean Traore', status: 'en_cours', priority: 'haute', dueDate: '2026-05-10', description: 'Coulage beton dalle plancher R+1' },
  { id: 'task-2', title: 'Coffrage poteaux', chantier: 'Immeuble R+3 Cotonou', assignee: 'Pierre Kone', status: 'en_retard', priority: 'haute', dueDate: '2026-05-01', description: 'Coffrage poteaux RDC' },
  { id: 'task-3', title: 'Ferraillage fondations', chantier: 'Ecole Porto-Novo', assignee: 'Ibrahim Bamba', status: 'en_cours', priority: 'haute', dueDate: '2026-05-20', description: 'Pose armatures fondations' },
  { id: 'task-4', title: 'Compactage remblai', chantier: 'Route Parakou', assignee: 'Moussa Sawadogo', status: 'termine', priority: 'moyenne', dueDate: '2026-04-30', description: 'Compactage troncon A' },
  { id: 'task-5', title: 'Livraison ciment', chantier: 'Marche Abomey', assignee: 'Mamadou Barry', status: 'en_cours', priority: 'haute', dueDate: '2026-05-15', description: 'Livraison 200 sacs ciment' },
  { id: 'task-6', title: 'Leve topographique', chantier: 'Pont Natitingou', assignee: 'Koffi Toure', status: 'en_retard', priority: 'haute', dueDate: '2026-04-28', description: 'Leve terrain pour implantation' },
  { id: 'task-7', title: 'Enduit exterieur', chantier: 'Immeuble R+3 Cotonou', assignee: 'Fatou Ouattara', status: 'en_cours', priority: 'moyenne', dueDate: '2026-05-25', description: 'Enduit facade principale' },
  { id: 'task-8', title: 'Installation echafaudage', chantier: 'Ecole Porto-Novo', assignee: 'Francois Ndiaye', status: 'termine', priority: 'basse', dueDate: '2026-05-05', description: 'Montage echafaudage zone B' },
];

export const conges: Conge[] = [
  { id: 'conge-1', employeeId: 'emp-1', employeeName: 'Jean Traore', type: 'Conge annuel', dateDebut: '2026-05-10', dateFin: '2026-05-15', status: 'approuve' },
  { id: 'conge-2', employeeId: 'emp-3', employeeName: 'Pierre Kone', type: 'Conge annuel', dateDebut: '2026-05-20', dateFin: '2026-05-25', status: 'approuve' },
  { id: 'conge-3', employeeId: 'emp-5', employeeName: 'Moussa Sawadogo', type: 'Permission', dateDebut: '2026-05-08', dateFin: '2026-05-08', status: 'en_attente' },
  { id: 'conge-4', employeeId: 'emp-12', employeeName: 'Awa Fall', type: 'Conge annuel', dateDebut: '2026-05-18', dateFin: '2026-05-22', status: 'en_attente' },
  { id: 'conge-5', employeeId: 'emp-4', employeeName: 'Sophie Diallo', type: 'Conge annuel', dateDebut: '2026-05-25', dateFin: '2026-05-30', status: 'en_attente' },
  { id: 'conge-6', employeeId: 'emp-15', employeeName: 'Seydou Diarra', type: 'Maladie', dateDebut: '2026-05-02', dateFin: '2026-05-04', status: 'approuve' },
  { id: 'conge-7', employeeId: 'emp-7', employeeName: 'Ibrahim Bamba', type: 'Conge annuel', dateDebut: '2026-05-12', dateFin: '2026-05-16', status: 'refuse' },
  { id: 'conge-8', employeeId: 'emp-14', employeeName: 'Aicha Sow', type: 'Permission', dateDebut: '2026-05-06', dateFin: '2026-05-06', status: 'approuve' },
];

export const notifications: Notification[] = [
  { id: 'notif-1', title: 'Retard chantier', message: 'Le coffrage poteaux de l\'immeuble R+3 accuse 5 jours de retard.', type: 'error', read: false, createdAt: '2026-05-03T09:00:00' },
  { id: 'notif-2', title: 'Incident securite', message: 'Chute d\'un ouvrier sur le chantier de Parakou. Blessures legeres.', type: 'error', read: false, createdAt: '2026-05-02T14:30:00' },
  { id: 'notif-3', title: 'Demande materiel', message: 'Le chef du chantier Ecole Porto-Novo demande 50 sacs de ciment.', type: 'info', read: false, createdAt: '2026-05-02T11:00:00' },
  { id: 'notif-4', title: 'Formation validee', message: 'La formation securite de Aminata Keita a ete approuvee.', type: 'success', read: true, createdAt: '2026-05-01T16:00:00' },
  { id: 'notif-5', title: 'Absences du jour', message: '5 employes sont absents aujourd\'hui sur l\'ensemble des chantiers.', type: 'warning', read: false, createdAt: '2026-05-03T08:00:00' },
  { id: 'notif-6', title: 'Budget depasse', message: 'Le chantier Route Parakou a depasse son budget carburant de 8%.', type: 'warning', read: true, createdAt: '2026-04-30T10:00:00' },
  { id: 'notif-7', title: 'Tache terminee', message: 'Le compactage du troncon A (Route Parakou) est termine.', type: 'success', read: true, createdAt: '2026-04-29T15:00:00' },
  { id: 'notif-8', title: 'Demande refusee', message: 'La demande de permission de Ibrahim Bamba a ete refusee.', type: 'error', read: true, createdAt: '2026-04-28T09:30:00' },
];

export const chatConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    participantName: 'Jean Traore (Chef Chantier Cotonou)',
    participantAvatar: '',
    lastMessage: 'Il me faut 30 sacs de ciment pour le coulage de demain.',
    lastTimestamp: '2026-05-03T09:30:00',
    unread: 2,
    messages: [
      { id: 'msg-1', senderId: 'emp-1', senderName: 'Jean Traore', content: 'Bonjour DG, j\'ai un souci sur le chantier.', timestamp: '2026-05-03T09:00:00', avatar: '' },
      { id: 'msg-2', senderId: 'dg', senderName: 'Vous', content: 'Dites-moi, qu\'est-ce qui se passe ?', timestamp: '2026-05-03T09:05:00', avatar: '' },
      { id: 'msg-3', senderId: 'emp-1', senderName: 'Jean Traore', content: 'La livraison de ciment n\'est pas arrivee ce matin.', timestamp: '2026-05-03T09:10:00', avatar: '' },
      { id: 'msg-4', senderId: 'emp-1', senderName: 'Jean Traore', content: 'Il me faut 30 sacs de ciment pour le coulage de demain.', timestamp: '2026-05-03T09:30:00', avatar: '' },
    ],
  },
  {
    id: 'conv-2',
    participantName: 'Moussa Sawadogo (Chef Chantier Parakou)',
    participantAvatar: '',
    lastMessage: 'Le compactage est termine, on attaque le bitume lundi.',
    lastTimestamp: '2026-05-02T16:00:00',
    unread: 0,
    messages: [
      { id: 'msg-5', senderId: 'dg', senderName: 'Vous', content: 'Ou en est le troncon A ?', timestamp: '2026-05-02T15:30:00', avatar: '' },
      { id: 'msg-6', senderId: 'emp-5', senderName: 'Moussa Sawadogo', content: 'Le compactage est termine, on attaque le bitume lundi.', timestamp: '2026-05-02T16:00:00', avatar: '' },
    ],
  },
];

export const analyticsData: AnalyticsData = {
  productivity: [
    { month: 'Jan', value: 78 },
    { month: 'Fev', value: 82 },
    { month: 'Mar', value: 75 },
    { month: 'Avr', value: 88 },
    { month: 'Mai', value: 85 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 87 },
    { month: 'Aou', value: 72 },
    { month: 'Sep', value: 91 },
    { month: 'Oct', value: 89 },
    { month: 'Nov', value: 93 },
    { month: 'Dec', value: 86 },
  ],
  absenteeism: [
    { month: 'Jan', value: 5 },
    { month: 'Fev', value: 4 },
    { month: 'Mar', value: 7 },
    { month: 'Avr', value: 3 },
    { month: 'Mai', value: 6 },
    { month: 'Jun', value: 8 },
    { month: 'Jul', value: 12 },
    { month: 'Aou', value: 15 },
    { month: 'Sep', value: 4 },
    { month: 'Oct', value: 3 },
    { month: 'Nov', value: 5 },
    { month: 'Dec', value: 7 },
  ],
  chantierPerformance: [
    { chantier: 'Immeuble R+3 Cotonou', avancement: 65, retard: 0 },
    { chantier: 'Route Parakou', avancement: 40, retard: 5 },
    { chantier: 'Ecole Porto-Novo', avancement: 85, retard: 0 },
    { chantier: 'Marche Abomey', avancement: 20, retard: 2 },
    { chantier: 'Pont Natitingou', avancement: 55, retard: 3 },
  ],
  kpis: {
    tauxProductivite: 86,
    tauxAbsenteeisme: 6.2,
    incidentsSecurite: 2,
    objectifAtteint: 78,
    budgetUtilise: 72,
    chantiersActifs: 5,
  },
};

export const dashboardStats: DashboardStats = {
  totalEmployes: 30,
  employesPresents: 23,
  employesAbsents: 4,
  employesEnConge: 3,
  tachesEnCours: 5,
  tachesTerminees: 2,
  tachesEnRetard: 3,
  demandesEnAttente: 5,
  notificationsNonLues: 4,
  incidentsEnCours: 2,
};