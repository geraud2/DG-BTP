// ============================================================
// TYPES
// ============================================================

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
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
  department: string;
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
  departmentPerformance: { department: string; score: number }[];
  kpis: {
    tauxProductivite: number;
    tauxAbsenteeisme: number;
    incidentsSecurite: number;
    objectifAtteint: number;
    budgetUtilise: number;
    departmentsActifs: number;
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

const firstNames = ['Sophie', 'Marc', 'Isabelle', 'Pierre', 'Nathalie', 'Jean', 'Marie', 'Laurent', 'Catherine', 'Thomas', 'Julie', 'Philippe', 'Anne', 'David', 'Emilie'];
const lastNames = ['Dubois', 'Martin', 'Bernard', 'Durand', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Garcia', 'Leroy', 'Roux', 'Fournier', 'Girard', 'Bonnet', 'Lambert'];
const roles = ['Développeur', 'Designer', 'Commercial', 'Comptable', 'RH', 'Chef de projet', 'Assistant', 'Data Analyst'];
const departments = ['IT', 'Marketing', 'RH', 'Finance', 'Commercial', 'Design', 'Support'];

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
  status: (['present', 'present', 'present', 'absent', 'conge'] as const)[Math.floor(Math.random() * 5)],
  email: `${randomItem(firstNames).toLowerCase()}.${randomItem(lastNames).toLowerCase()}@entreprise.fr`,
  avatar: '',
  joinDate: `${2018 + Math.floor(Math.random() * 7)}-0${1 + Math.floor(Math.random() * 9)}-0${1 + Math.floor(Math.random() * 28)}`,
}));

export const demandes: Demande[] = [
  { id: 'dem-1', employeeId: 'emp-1', employeeName: 'Sophie Dubois', type: 'conge', status: 'en_attente', priority: 'normale', dateDebut: '2026-05-10', dateFin: '2026-05-15', motif: 'Vacances familiales', createdAt: '2026-05-01' },
  { id: 'dem-2', employeeId: 'emp-5', employeeName: 'Nathalie Moreau', type: 'permission', status: 'en_attente', priority: 'urgente', dateDebut: '2026-05-08', dateFin: '2026-05-08', motif: 'Rendez-vous médical', createdAt: '2026-05-02' },
  { id: 'dem-3', employeeId: 'emp-8', employeeName: 'Catherine Garcia', type: 'formation', status: 'en_attente', priority: 'normale', dateDebut: '2026-06-01', dateFin: '2026-06-03', motif: 'Formation React', createdAt: '2026-04-28' },
  { id: 'dem-4', employeeId: 'emp-3', employeeName: 'Isabelle Bernard', type: 'conge', status: 'validee', priority: 'normale', dateDebut: '2026-05-20', dateFin: '2026-05-25', motif: 'Congé annuel', createdAt: '2026-04-25' },
  { id: 'dem-5', employeeId: 'emp-7', employeeName: 'Marie Simon', type: 'permission', status: 'refusee', priority: 'normale', dateDebut: '2026-05-12', dateFin: '2026-05-12', motif: 'Déménagement', createdAt: '2026-04-30' },
  { id: 'dem-6', employeeId: 'emp-12', employeeName: 'Philippe Leroy', type: 'conge', status: 'en_attente', priority: 'urgente', dateDebut: '2026-05-18', dateFin: '2026-05-22', motif: 'Voyage familial urgent', createdAt: '2026-05-03' },
  { id: 'dem-7', employeeId: 'emp-10', employeeName: 'Thomas Roux', type: 'formation', status: 'en_attente', priority: 'normale', dateDebut: '2026-06-10', dateFin: '2026-06-12', motif: 'Certification AWS', createdAt: '2026-05-01' },
  { id: 'dem-8', employeeId: 'emp-4', employeeName: 'Pierre Durand', type: 'conge', status: 'en_attente', priority: 'normale', dateDebut: '2026-05-25', dateFin: '2026-05-30', motif: 'Mariage', createdAt: '2026-05-02' },
];

export const taches: Tache[] = [
  { id: 'task-1', title: 'Mise à jour du CRM', department: 'IT', assignee: 'Sophie Dubois', status: 'en_cours', priority: 'haute', dueDate: '2026-05-10', description: 'Migrer les données clients' },
  { id: 'task-2', title: 'Rapport trimestriel', department: 'Finance', assignee: 'Pierre Durand', status: 'en_retard', priority: 'haute', dueDate: '2026-05-01', description: 'Rédiger le rapport Q1' },
  { id: 'task-3', title: 'Refonte site web', department: 'Marketing', assignee: 'Isabelle Bernard', status: 'en_cours', priority: 'haute', dueDate: '2026-05-20', description: 'Nouveau design corporate' },
  { id: 'task-4', title: 'Formation équipe', department: 'RH', assignee: 'Nathalie Moreau', status: 'termine', priority: 'moyenne', dueDate: '2026-04-30', description: 'Formation produit' },
  { id: 'task-5', title: 'Audit sécurité', department: 'IT', assignee: 'Marc Martin', status: 'en_cours', priority: 'haute', dueDate: '2026-05-15', description: 'Audit des systèmes' },
  { id: 'task-6', title: 'Budget annuel', department: 'Finance', assignee: 'Jean Laurent', status: 'en_retard', priority: 'haute', dueDate: '2026-04-28', description: 'Budget 2027' },
  { id: 'task-7', title: 'Campagne marketing', department: 'Marketing', assignee: 'Marie Simon', status: 'en_cours', priority: 'moyenne', dueDate: '2026-05-25', description: 'Campagne printemps' },
  { id: 'task-8', title: 'Onboarding', department: 'RH', assignee: 'Catherine Garcia', status: 'termine', priority: 'basse', dueDate: '2026-05-05', description: 'Nouveau développeur' },
];

export const conges: Conge[] = [
  { id: 'conge-1', employeeId: 'emp-1', employeeName: 'Sophie Dubois', type: 'Congé annuel', dateDebut: '2026-05-10', dateFin: '2026-05-15', status: 'approuve' },
  { id: 'conge-2', employeeId: 'emp-3', employeeName: 'Isabelle Bernard', type: 'Congé annuel', dateDebut: '2026-05-20', dateFin: '2026-05-25', status: 'approuve' },
  { id: 'conge-3', employeeId: 'emp-5', employeeName: 'Nathalie Moreau', type: 'Permission', dateDebut: '2026-05-08', dateFin: '2026-05-08', status: 'en_attente' },
  { id: 'conge-4', employeeId: 'emp-12', employeeName: 'Philippe Leroy', type: 'Congé annuel', dateDebut: '2026-05-18', dateFin: '2026-05-22', status: 'en_attente' },
  { id: 'conge-5', employeeId: 'emp-4', employeeName: 'Pierre Durand', type: 'Congé annuel', dateDebut: '2026-05-25', dateFin: '2026-05-30', status: 'en_attente' },
  { id: 'conge-6', employeeId: 'emp-15', employeeName: 'Emilie Lambert', type: 'Maladie', dateDebut: '2026-05-02', dateFin: '2026-05-04', status: 'approuve' },
  { id: 'conge-7', employeeId: 'emp-7', employeeName: 'Marie Simon', type: 'Congé annuel', dateDebut: '2026-05-12', dateFin: '2026-05-16', status: 'refuse' },
  { id: 'conge-8', employeeId: 'emp-14', employeeName: 'David Bonnet', type: 'Permission', dateDebut: '2026-05-06', dateFin: '2026-05-06', status: 'approuve' },
];

export const notifications: Notification[] = [
  { id: 'notif-1', title: 'Retard projet', message: 'Le rapport trimestriel accuse 5 jours de retard.', type: 'error', read: false, createdAt: '2026-05-03T09:00:00' },
  { id: 'notif-2', title: 'Incident sécurité', message: 'Tentative d\'intrusion détectée sur le réseau.', type: 'error', read: false, createdAt: '2026-05-02T14:30:00' },
  { id: 'notif-3', title: 'Demande matériel', message: 'Le département IT demande 5 nouveaux laptops.', type: 'info', read: false, createdAt: '2026-05-02T11:00:00' },
  { id: 'notif-4', title: 'Formation validée', message: 'La formation React de Catherine Garcia a été approuvée.', type: 'success', read: true, createdAt: '2026-05-01T16:00:00' },
  { id: 'notif-5', title: 'Absences du jour', message: '4 employés sont absents aujourd\'hui.', type: 'warning', read: false, createdAt: '2026-05-03T08:00:00' },
  { id: 'notif-6', title: 'Budget dépassé', message: 'Le département Marketing a dépassé son budget de 8%.', type: 'warning', read: true, createdAt: '2026-04-30T10:00:00' },
  { id: 'notif-7', title: 'Tâche terminée', message: 'La formation équipe est terminée.', type: 'success', read: true, createdAt: '2026-04-29T15:00:00' },
  { id: 'notif-8', title: 'Demande refusée', message: 'La demande de permission de Marie Simon a été refusée.', type: 'error', read: true, createdAt: '2026-04-28T09:30:00' },
];

export const chatConversations: ChatConversation[] = [
  {
    id: 'conv-1', participantName: 'Sophie Dubois (Lead Dev)', participantAvatar: '',
    lastMessage: 'Il me faut 2 développeurs supplémentaires pour le projet CRM.', lastTimestamp: '2026-05-03T09:30:00', unread: 2,
    messages: [
      { id: 'msg-1', senderId: 'emp-1', senderName: 'Sophie Dubois', content: 'Bonjour DG, j\'ai un souci sur le projet.', timestamp: '2026-05-03T09:00:00', avatar: '' },
      { id: 'msg-2', senderId: 'dg', senderName: 'Vous', content: 'Dites-moi, qu\'est-ce qui se passe ?', timestamp: '2026-05-03T09:05:00', avatar: '' },
      { id: 'msg-3', senderId: 'emp-1', senderName: 'Sophie Dubois', content: 'L\'équipe est en sous-effectif pour la deadline.', timestamp: '2026-05-03T09:10:00', avatar: '' },
      { id: 'msg-4', senderId: 'emp-1', senderName: 'Sophie Dubois', content: 'Il me faut 2 développeurs supplémentaires pour le projet CRM.', timestamp: '2026-05-03T09:30:00', avatar: '' },
    ],
  },
  {
    id: 'conv-2', participantName: 'Pierre Durand (Finance)', participantAvatar: '',
    lastMessage: 'Le rapport est finalisé, je vous l\'envoie demain.', lastTimestamp: '2026-05-02T16:00:00', unread: 0,
    messages: [
      { id: 'msg-5', senderId: 'dg', senderName: 'Vous', content: 'Où en est le rapport trimestriel ?', timestamp: '2026-05-02T15:30:00', avatar: '' },
      { id: 'msg-6', senderId: 'emp-4', senderName: 'Pierre Durand', content: 'Le rapport est finalisé, je vous l\'envoie demain.', timestamp: '2026-05-02T16:00:00', avatar: '' },
    ],
  },
];

export const analyticsData: AnalyticsData = {
  productivity: [
    { month: 'Jan', value: 78 }, { month: 'Fev', value: 82 }, { month: 'Mar', value: 75 },
    { month: 'Avr', value: 88 }, { month: 'Mai', value: 85 }, { month: 'Jun', value: 90 },
    { month: 'Jul', value: 87 }, { month: 'Aou', value: 72 }, { month: 'Sep', value: 91 },
    { month: 'Oct', value: 89 }, { month: 'Nov', value: 93 }, { month: 'Dec', value: 86 },
  ],
  absenteeism: [
    { month: 'Jan', value: 5 }, { month: 'Fev', value: 4 }, { month: 'Mar', value: 7 },
    { month: 'Avr', value: 3 }, { month: 'Mai', value: 6 }, { month: 'Jun', value: 8 },
    { month: 'Jul', value: 12 }, { month: 'Aou', value: 15 }, { month: 'Sep', value: 4 },
    { month: 'Oct', value: 3 }, { month: 'Nov', value: 5 }, { month: 'Dec', value: 7 },
  ],
  departmentPerformance: [
    { department: 'IT', score: 92 },
    { department: 'Marketing', score: 78 },
    { department: 'RH', score: 85 },
    { department: 'Finance', score: 88 },
    { department: 'Commercial', score: 71 },
    { department: 'Design', score: 90 },
    { department: 'Support', score: 83 },
  ],
  kpis: {
    tauxProductivite: 86, tauxAbsenteeisme: 6.2, incidentsSecurite: 2,
    objectifAtteint: 78, budgetUtilise: 72, departmentsActifs: 7,
  },
};

export const dashboardStats: DashboardStats = {
  totalEmployes: 30, employesPresents: 23, employesAbsents: 4, employesEnConge: 3,
  tachesEnCours: 5, tachesTerminees: 2, tachesEnRetard: 3,
  demandesEnAttente: 5, notificationsNonLues: 4, incidentsEnCours: 2,
};