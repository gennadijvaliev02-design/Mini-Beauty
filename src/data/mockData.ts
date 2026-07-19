import type { Service, Master, Appointment, RevenueData, AdminAppointment } from '@/types';
import { publicAsset } from '@/lib/assets';

export const services: Service[] = [
  {
    id: '1',
    name: 'Women's haircut',
    description: 'A stylish haircut tailored to your face shape and hair type. Includes a wash, styling and care consultation.',
    price: 45,
    duration: 60,
    image: publicAsset('assets/service-haircut.jpg'),
    category: 'Hair'
  },
  {
    id: '2',
    name: 'Hair coloring',
    description: 'Full hair coloring with premium products. Includes color consultation and aftercare guidance.',
    price: 95,
    duration: 150,
    image: publicAsset('assets/service-coloring.jpg'),
    category: 'Hair'
  },
  {
    id: '3',
    name: 'Manicure + gel polish',
    description: 'Classic manicure with long-lasting polish or gel polish. Includes cuticle care and nail plate leveling.',
    price: 35,
    duration: 75,
    image: publicAsset('assets/service-manicure.jpg'),
    category: 'Nails'
  },
  {
    id: '4',
    name: 'SPA pedicure',
    description: 'A complete spa pedicure with exfoliation, a mask and foot massage. Ideal care for healthy, beautiful nails.',
    price: 40,
    duration: 90,
    image: publicAsset('assets/service-pedicure.jpg'),
    category: 'Nails'
  },
  {
    id: '5',
    name: 'Hair styling',
    description: 'A professional blowout or styling for any occasion. Choose from waves, sleek looks or added volume.',
    price: 30,
    duration: 45,
    image: publicAsset('assets/service-styling.jpg'),
    category: 'Hair'
  },
  {
    id: '6',
    name: 'Lash lift',
    description: 'A treatment that creates longer, fuller-looking lashes without extensions. Results last up to 8 weeks.',
    price: 22,
    duration: 60,
    image: publicAsset('assets/service-lashes.jpg'),
    category: 'Brows & lashes'
  },
  {
    id: '7',
    name: 'Brow shaping',
    description: 'A brow shape tailored to your face. Includes tinting with henna or color and styling with brow wax.',
    price: 18,
    duration: 40,
    image: publicAsset('assets/service-brows.jpg'),
    category: 'Brows & lashes'
  },
  {
    id: '8',
    name: 'Facial spa treatment',
    description: 'Deep cleansing, exfoliation and hydration with professional skincare products. A relaxing facial massage is included.',
    price: 60,
    duration: 75,
    image: publicAsset('assets/service-facial.jpg'),
    category: 'Skincare'
  }
];

export const masters: Master[] = [
  {
    id: 'm1',
    name: 'Anna Kozlova',
    avatar: publicAsset('assets/master-anna.jpg'),
    specialization: 'Hair stylist',
    rating: 4.9,
    reviewsCount: 127,
    serviceIds: ['1', '5'],
    schedule: {
      mon: { start: '10:00', end: '20:00' },
      tue: { start: '10:00', end: '20:00' },
      wed: { start: '10:00', end: '20:00' },
      thu: { start: '10:00', end: '20:00' },
      fri: { start: '10:00', end: '21:00' },
      sat: { start: '09:00', end: '18:00' },
      sun: null
    }
  },
  {
    id: 'm2',
    name: 'Maria Sokolova',
    avatar: publicAsset('assets/master-maria.jpg'),
    specialization: 'Colorist',
    rating: 4.8,
    reviewsCount: 98,
    serviceIds: ['1', '2', '5'],
    schedule: {
      mon: { start: '10:00', end: '20:00' },
      tue: { start: '10:00', end: '20:00' },
      wed: { start: '10:00', end: '20:00' },
      thu: { start: '10:00', end: '20:00' },
      fri: { start: '10:00', end: '21:00' },
      sat: { start: '09:00', end: '18:00' },
      sun: null
    }
  },
  {
    id: 'm3',
    name: 'Elena Petrova',
    avatar: publicAsset('assets/master-elena.jpg'),
    specialization: 'Nail artist',
    rating: 4.9,
    reviewsCount: 156,
    serviceIds: ['3', '4'],
    schedule: {
      mon: { start: '09:00', end: '19:00' },
      tue: { start: '09:00', end: '19:00' },
      wed: { start: '09:00', end: '19:00' },
      thu: { start: '09:00', end: '19:00' },
      fri: { start: '09:00', end: '20:00' },
      sat: { start: '10:00', end: '16:00' },
      sun: null
    }
  },
  {
    id: 'm4',
    name: 'Daria Morozova',
    avatar: publicAsset('assets/master-daria.jpg'),
    specialization: 'Brow & lash artist',
    rating: 4.7,
    reviewsCount: 84,
    serviceIds: ['6', '7'],
    schedule: {
      mon: { start: '11:00', end: '21:00' },
      tue: { start: '11:00', end: '21:00' },
      wed: { start: '11:00', end: '21:00' },
      thu: { start: '11:00', end: '21:00' },
      fri: { start: '11:00', end: '21:00' },
      sat: { start: '10:00', end: '18:00' },
      sun: null
    }
  },
  {
    id: 'm5',
    name: 'Sofia Volkova',
    avatar: publicAsset('assets/master-sofia.jpg'),
    specialization: 'Esthetician',
    rating: 4.8,
    reviewsCount: 112,
    serviceIds: ['8'],
    schedule: {
      mon: { start: '10:00', end: '20:00' },
      tue: { start: '10:00', end: '20:00' },
      wed: { start: '10:00', end: '20:00' },
      thu: { start: '10:00', end: '20:00' },
      fri: { start: '10:00', end: '20:00' },
      sat: { start: '09:00', end: '17:00' },
      sun: null
    }
  }
];

export const myAppointments: Appointment[] = [
  {
    id: 'a1',
    serviceId: '1',
    serviceName: 'Women's haircut',
    serviceImage: publicAsset('assets/service-haircut.jpg'),
    masterId: 'm1',
    masterName: 'Anna Kozlova',
    masterAvatar: publicAsset('assets/master-anna.jpg'),
    date: '2026-06-28',
    time: '14:00',
    price: 45,
    status: 'confirmed',
  },
  {
    id: 'a2',
    serviceId: '3',
    serviceName: 'Manicure + gel polish',
    serviceImage: publicAsset('assets/service-manicure.jpg'),
    masterId: 'm3',
    masterName: 'Elena Petrova',
    masterAvatar: publicAsset('assets/master-elena.jpg'),
    date: '2026-06-15',
    time: '11:00',
    price: 35,
    status: 'completed',
    rating: 5,
    review: 'Excellent professional! I am very happy with the result — my manicure has lasted three weeks already.'
  },
  {
    id: 'a3',
    serviceId: '6',
    serviceName: 'Lash lift',
    serviceImage: publicAsset('assets/service-lashes.jpg'),
    masterId: 'm4',
    masterName: 'Daria Morozova',
    masterAvatar: publicAsset('assets/master-daria.jpg'),
    date: '2026-06-10',
    time: '16:30',
    price: 22,
    status: 'cancelled',
  },
  {
    id: 'a4',
    serviceId: '8',
    serviceName: 'Facial spa treatment',
    serviceImage: publicAsset('assets/service-facial.jpg'),
    masterId: 'm5',
    masterName: 'Sofia Volkova',
    masterAvatar: publicAsset('assets/master-sofia.jpg'),
    date: '2026-06-05',
    time: '13:00',
    price: 60,
    status: 'completed',
    rating: 4,
    review: 'Great treatment — my skin feels noticeably more hydrated.'
  }
];

export const promoBanners = [
  {
    id: 'b1',
    title: '20% off hair coloring',
    subtitle: 'Through the end of June',
    color: 'from-emerald-600/90 to-teal-700/90',
    textColor: 'text-white'
  },
  {
    id: 'b2',
    title: 'Spa day for two',
    subtitle: 'Complete care with 15% off',
    color: 'from-emerald-700/90 to-green-800/90',
    textColor: 'text-white'
  },
  {
    id: 'b3',
    title: 'Your first lash lift',
    subtitle: '$10 off for new clients',
    color: 'from-teal-600/90 to-emerald-700/90',
    textColor: 'text-white'
  }
];

export const weekDays = [
  { short: 'Mon', full: 'Monday', date: '23.06' },
  { short: 'Tue', full: 'Tuesday', date: '24.06' },
  { short: 'Wed', full: 'Wednesday', date: '25.06' },
  { short: 'Thu', full: 'Thursday', date: '26.06' },
  { short: 'Fri', full: 'Friday', date: '27.06' },
  { short: 'Sat', full: 'Saturday', date: '28.06' },
  { short: 'Sun', full: 'Sunday', date: '29.06' },
];

export const generateTimeSlots = (): { time: string; available: boolean }[] => {
  const slots: { time: string; available: boolean }[] = [];
  const startHour = 9;
  const endHour = 21;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const slotIndex = slots.length;
      const available = ![2, 5, 9, 14, 18, 21].includes(slotIndex);
      slots.push({ time, available });
    }
  }
  return slots;
};

// ==================== ADMIN DATA ====================

export const revenueData: RevenueData[] = [
  { day: 'Mon', revenue: 12500, appointments: 8 },
  { day: 'Tue', revenue: 15800, appointments: 11 },
  { day: 'Wed', revenue: 11200, appointments: 7 },
  { day: 'Thu', revenue: 18900, appointments: 13 },
  { day: 'Fri', revenue: 22100, appointments: 15 },
  { day: 'Sat', revenue: 26400, appointments: 18 },
  { day: 'Sun', revenue: 8900, appointments: 6 },
];

export const adminAppointments: AdminAppointment[] = [
  { id: 'r1', clientName: 'Irina K.', clientPhone: '+7 (999) 123-45-67', service: 'Women's haircut', master: 'Anna K.', date: '25.06.2026', time: '10:00', status: 'confirmed', price: 45 },
  { id: 'r2', clientName: 'Olga M.', clientPhone: '+7 (999) 234-56-78', service: 'Hair coloring', master: 'Maria S.', date: '25.06.2026', time: '11:00', status: 'confirmed', price: 95 },
  { id: 'r3', clientName: 'Natalia P.', clientPhone: '+7 (999) 345-67-89', service: 'Manicure + gel polish', master: 'Elena P.', date: '25.06.2026', time: '12:30', status: 'confirmed', price: 35 },
  { id: 'r4', clientName: 'Ekaterina V.', clientPhone: '+7 (999) 456-78-90', service: 'Hair styling', master: 'Anna K.', date: '25.06.2026', time: '14:00', status: 'completed', price: 30 },
  { id: 'r5', clientName: 'Anna S.', clientPhone: '+7 (999) 567-89-01', service: 'SPA pedicure', master: 'Elena P.', date: '25.06.2026', time: '15:30', status: 'confirmed', price: 40 },
  { id: 'r6', clientName: 'Marina D.', clientPhone: '+7 (999) 678-90-12', service: 'Lash lift', master: 'Daria M.', date: '25.06.2026', time: '16:00', status: 'cancelled', price: 22 },
  { id: 'r7', clientName: 'Tatiana L.', clientPhone: '+7 (999) 789-01-23', service: 'Facial spa treatment', master: 'Sofia V.', date: '26.06.2026', time: '10:00', status: 'confirmed', price: 60 },
  { id: 'r8', clientName: 'Svetlana R.', clientPhone: '+7 (999) 890-12-34', service: 'Brow shaping', master: 'Daria M.', date: '26.06.2026', time: '11:30', status: 'confirmed', price: 18 },
];

export const dashboardStats = {
  todayRevenue: 12500,
  todayAppointments: 8,
  activeMasters: 5,
  averageRating: 4.8,
};

export const serviceCategories = ['All', 'Hair', 'Nails', 'Brows & lashes', 'Skincare'];
