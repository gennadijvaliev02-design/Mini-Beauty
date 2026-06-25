import type { Service, Master, Appointment, RevenueData, AdminAppointment } from '@/types';
import { publicAsset } from '@/lib/assets';

export const services: Service[] = [
  {
    id: '1',
    name: 'Женская стрижка',
    description: 'Стильная стрижка с учётом формы лица и типа волос. Включает мытьё головы, укладку и консультацию по уходу.',
    price: 2500,
    duration: 60,
    image: publicAsset('assets/service-haircut.jpg'),
    category: 'Волосы'
  },
  {
    id: '2',
    name: 'Окрашивание',
    description: 'Полное окрашивание волос с использованием премиальных красителей. Включает консультацию по цвету и уход после процедуры.',
    price: 5500,
    duration: 150,
    image: publicAsset('assets/service-coloring.jpg'),
    category: 'Волосы'
  },
  {
    id: '3',
    name: 'Маникюр + покрытие',
    description: 'Классический маникюр с нанесением долговременного лака или гель-лака. Включает обработку кутикулы и выравнивание ногтевой пластины.',
    price: 1800,
    duration: 75,
    image: publicAsset('assets/service-manicure.jpg'),
    category: 'Ногти'
  },
  {
    id: '4',
    name: 'Педикюр SPA',
    description: 'Комплексный SPA-педикюр с пилингом, маской и массажем стоп. Идеальный уход для красоты и здоровья ногтей.',
    price: 2200,
    duration: 90,
    image: publicAsset('assets/service-pedicure.jpg'),
    category: 'Ногти'
  },
  {
    id: '5',
    name: 'Укладка волос',
    description: 'Праздничная или повседневная укладка с использованием профессиональных стайлинговых средств. Локоны, гладкость или объём.',
    price: 1500,
    duration: 45,
    image: publicAsset('assets/service-styling.jpg'),
    category: 'Волосы'
  },
  {
    id: '6',
    name: 'Ламинирование ресниц',
    description: 'Процедура для создания эффекта длинных и густых ресниц без наращивания. Результат сохраняется до 8 недель.',
    price: 1200,
    duration: 60,
    image: publicAsset('assets/service-lashes.jpg'),
    category: 'Брови и ресницы'
  },
  {
    id: '7',
    name: 'Коррекция бровей',
    description: 'Идеальная форма бровей с учётом типа лица. Включает окрашивание хной или краской и укладку специальным воском.',
    price: 900,
    duration: 40,
    image: publicAsset('assets/service-brows.jpg'),
    category: 'Брови и ресницы'
  },
  {
    id: '8',
    name: 'Спа-уход для лица',
    description: 'Глубокое очищение, пилинг и увлажнение кожи лица с использованием профессиональной косметики. Расслабляющий массаж включён.',
    price: 3200,
    duration: 75,
    image: publicAsset('assets/service-facial.jpg'),
    category: 'Уход'
  }
];

export const masters: Master[] = [
  {
    id: 'm1',
    name: 'Анна Козлова',
    avatar: publicAsset('assets/master-anna.jpg'),
    specialization: 'Стилист-универсал',
    rating: 4.9,
    reviewsCount: 127,
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
    name: 'Мария Соколова',
    avatar: publicAsset('assets/master-maria.jpg'),
    specialization: 'Колорист',
    rating: 4.8,
    reviewsCount: 98,
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
    name: 'Елена Петрова',
    avatar: publicAsset('assets/master-elena.jpg'),
    specialization: 'Мастер маникюра',
    rating: 4.9,
    reviewsCount: 156,
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
    name: 'Дарья Морозова',
    avatar: publicAsset('assets/master-daria.jpg'),
    specialization: 'Бровист / Лэшмейкер',
    rating: 4.7,
    reviewsCount: 84,
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
    name: 'София Волкова',
    avatar: publicAsset('assets/master-sofia.jpg'),
    specialization: 'Косметолог',
    rating: 4.8,
    reviewsCount: 112,
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
    serviceName: 'Женская стрижка',
    serviceImage: publicAsset('assets/service-haircut.jpg'),
    masterId: 'm1',
    masterName: 'Анна Козлова',
    masterAvatar: publicAsset('assets/master-anna.jpg'),
    date: '2026-06-28',
    time: '14:00',
    price: 2500,
    status: 'confirmed',
  },
  {
    id: 'a2',
    serviceId: '3',
    serviceName: 'Маникюр + покрытие',
    serviceImage: publicAsset('assets/service-manicure.jpg'),
    masterId: 'm3',
    masterName: 'Елена Петрова',
    masterAvatar: publicAsset('assets/master-elena.jpg'),
    date: '2026-06-15',
    time: '11:00',
    price: 1800,
    status: 'completed',
    rating: 5,
    review: 'Отличный мастер! Очень довольна результатом, маникюр держится уже третью неделю.'
  },
  {
    id: 'a3',
    serviceId: '6',
    serviceName: 'Ламинирование ресниц',
    serviceImage: publicAsset('assets/service-lashes.jpg'),
    masterId: 'm4',
    masterName: 'Дарья Морозова',
    masterAvatar: publicAsset('assets/master-daria.jpg'),
    date: '2026-06-10',
    time: '16:30',
    price: 1200,
    status: 'cancelled',
  },
  {
    id: 'a4',
    serviceId: '8',
    serviceName: 'Спа-уход для лица',
    serviceImage: publicAsset('assets/service-facial.jpg'),
    masterId: 'm5',
    masterName: 'София Волкова',
    masterAvatar: publicAsset('assets/master-sofia.jpg'),
    date: '2026-06-05',
    time: '13:00',
    price: 3200,
    status: 'completed',
    rating: 4,
    review: 'Хорошая процедура, кожа стала заметно увлажнённой.'
  }
];

export const promoBanners = [
  {
    id: 'b1',
    title: 'Скидка 20% на окрашивание',
    subtitle: 'До конца июня',
    color: 'from-emerald-600/90 to-teal-700/90',
    textColor: 'text-white'
  },
  {
    id: 'b2',
    title: 'SPA-день для двоих',
    subtitle: 'Комплексный уход со скидкой 15%',
    color: 'from-emerald-700/90 to-green-800/90',
    textColor: 'text-white'
  },
  {
    id: 'b3',
    title: 'Первое ламинирование',
    subtitle: '-500₽ для новых клиентов',
    color: 'from-teal-600/90 to-emerald-700/90',
    textColor: 'text-white'
  }
];

export const weekDays = [
  { short: 'Пн', full: 'Понедельник', date: '23.06' },
  { short: 'Вт', full: 'Вторник', date: '24.06' },
  { short: 'Ср', full: 'Среда', date: '25.06' },
  { short: 'Чт', full: 'Четверг', date: '26.06' },
  { short: 'Пт', full: 'Пятница', date: '27.06' },
  { short: 'Сб', full: 'Суббота', date: '28.06' },
  { short: 'Вс', full: 'Воскресенье', date: '29.06' },
];

export const generateTimeSlots = (): { time: string; available: boolean }[] => {
  const slots = [];
  const startHour = 9;
  const endHour = 21;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Random availability
      const available = Math.random() > 0.35;
      slots.push({ time, available });
    }
  }
  return slots;
};

// ==================== ADMIN DATA ====================

export const revenueData: RevenueData[] = [
  { day: 'Пн', revenue: 12500, appointments: 8 },
  { day: 'Вт', revenue: 15800, appointments: 11 },
  { day: 'Ср', revenue: 11200, appointments: 7 },
  { day: 'Чт', revenue: 18900, appointments: 13 },
  { day: 'Пт', revenue: 22100, appointments: 15 },
  { day: 'Сб', revenue: 26400, appointments: 18 },
  { day: 'Вс', revenue: 8900, appointments: 6 },
];

export const adminAppointments: AdminAppointment[] = [
  { id: 'r1', clientName: 'Ирина К.', clientPhone: '+7 (999) 123-45-67', service: 'Женская стрижка', master: 'Анна К.', date: '25.06.2026', time: '10:00', status: 'confirmed', price: 2500 },
  { id: 'r2', clientName: 'Ольга М.', clientPhone: '+7 (999) 234-56-78', service: 'Окрашивание', master: 'Мария С.', date: '25.06.2026', time: '11:00', status: 'confirmed', price: 5500 },
  { id: 'r3', clientName: 'Наталья П.', clientPhone: '+7 (999) 345-67-89', service: 'Маникюр + покрытие', master: 'Елена П.', date: '25.06.2026', time: '12:30', status: 'confirmed', price: 1800 },
  { id: 'r4', clientName: 'Екатерина В.', clientPhone: '+7 (999) 456-78-90', service: 'Укладка волос', master: 'Анна К.', date: '25.06.2026', time: '14:00', status: 'completed', price: 1500 },
  { id: 'r5', clientName: 'Анна С.', clientPhone: '+7 (999) 567-89-01', service: 'Педикюр SPA', master: 'Елена П.', date: '25.06.2026', time: '15:30', status: 'confirmed', price: 2200 },
  { id: 'r6', clientName: 'Марина Д.', clientPhone: '+7 (999) 678-90-12', service: 'Ламинирование ресниц', master: 'Дарья М.', date: '25.06.2026', time: '16:00', status: 'cancelled', price: 1200 },
  { id: 'r7', clientName: 'Татьяна Л.', clientPhone: '+7 (999) 789-01-23', service: 'Спа-уход для лица', master: 'София В.', date: '26.06.2026', time: '10:00', status: 'confirmed', price: 3200 },
  { id: 'r8', clientName: 'Светлана Р.', clientPhone: '+7 (999) 890-12-34', service: 'Коррекция бровей', master: 'Дарья М.', date: '26.06.2026', time: '11:30', status: 'confirmed', price: 900 },
];

export const dashboardStats = {
  todayRevenue: 12500,
  todayAppointments: 8,
  activeMasters: 5,
  averageRating: 4.8,
};

export const serviceCategories = ['Все', 'Волосы', 'Ногти', 'Брови и ресницы', 'Уход'];
