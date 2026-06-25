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

const withPublicAssets = (): ClientMockData => ({
  services: rawData.services.map(service => ({
    ...service,
    image: publicAsset(service.image),
  })),
  masters: rawData.masters.map(master => ({
    ...master,
    avatar: publicAsset(master.avatar),
  })),
  bookingDates: rawData.bookingDates,
  appointments: rawData.appointments.map(appointment => ({
    ...appointment,
    status: appointment.status as Appointment['status'],
    serviceImage: publicAsset(appointment.serviceImage),
    masterAvatar: publicAsset(appointment.masterAvatar),
  })),
  slots: rawData.slots,
});

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
