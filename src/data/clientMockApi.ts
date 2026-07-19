import rawData from './clientMockData.json';
import { publicAsset } from '@/lib/assets';
import type { Appointment, BookingDate, Master, Service, TimeSlot } from '@/types';

interface SlotRecord {
  masterId: string;
  date: string;
  times: string[];
}

export interface ClientMockData {
  services: Service[];
  masters: Master[];
  bookingDates: BookingDate[];
  appointments: Appointment[];
  slots: SlotRecord[];
}

const buildBookingDates = (): BookingDate[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const iso = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');

    return {
      id: `date_${iso}`,
      iso,
      short: date.toLocaleDateString('en-US', { weekday: 'short' }),
      day: String(date.getDate()),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });
};

const buildSlots = (masters: Master[], bookingDates: BookingDate[]): SlotRecord[] => {
  const demoTimes = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

  return masters.flatMap(master =>
    bookingDates.map(date => ({
      masterId: master.id,
      date: date.iso,
      times: demoTimes,
    })),
  );
};

const withPublicAssets = (): ClientMockData => {
  const bookingDates = buildBookingDates();

  return {
    services: rawData.services.map(service => ({
      ...service,
      image: publicAsset(service.image),
    })),
    masters: rawData.masters.map(master => ({
      ...master,
      avatar: publicAsset(master.avatar),
    })),
    bookingDates,
    appointments: rawData.appointments.map(appointment => ({
      ...appointment,
      status: appointment.status as Appointment['status'],
      serviceImage: publicAsset(appointment.serviceImage),
      masterAvatar: publicAsset(appointment.masterAvatar),
    })),
    slots: buildSlots(rawData.masters, bookingDates),
  };
};

export const loadClientMockData = async (): Promise<ClientMockData> => withPublicAssets();

export const getMastersForService = (masters: Master[], serviceId: string): Master[] =>
  masters.filter(master => master.serviceIds.includes(serviceId));

export const getAvailableSlots = (
  slots: SlotRecord[],
  appointments: Appointment[],
  masterId: string,
  date: string,
): TimeSlot[] => {
  const record = slots.find(slot => slot.masterId === masterId && slot.date === date);
  const bookedTimes = new Set(
    appointments
      .filter(appointment =>
        appointment.masterId === masterId &&
        appointment.date === date &&
        appointment.status === 'confirmed'
      )
      .map(appointment => appointment.time),
  );

  return (record?.times ?? []).map(time => ({
    time,
    available: !bookedTimes.has(time),
  }));
};
