// ==================== SERVICE TYPES ====================
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image: string;
  category: string;
}

export interface Master {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviewsCount: number;
  schedule: WorkSchedule;
}

export interface WorkSchedule {
  [day: string]: { start: string; end: string } | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  date: string;
  time: string;
  price: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  rating?: number;
  review?: string;
}

export interface Review {
  id: string;
  masterId: string;
  masterName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// ==================== ADMIN TYPES ====================
export interface DashboardStats {
  todayRevenue: number;
  todayAppointments: number;
  activeMasters: number;
  averageRating: number;
}

export interface RevenueData {
  day: string;
  revenue: number;
  appointments: number;
}

export interface AdminAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  master: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  price: number;
}
