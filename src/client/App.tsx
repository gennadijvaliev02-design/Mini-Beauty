import { useState, useCallback } from 'react';
import type { Service, Master, Appointment } from '@/types';
import ServicesScreen from './screens/ServicesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import TimeSelectionScreen from './screens/TimeSelectionScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import MyAppointmentsScreen from './screens/MyAppointmentsScreen';
import BottomNav from './components/BottomNav';

export type Screen = 'services' | 'serviceDetail' | 'timeSelection' | 'confirmation' | 'myAppointments';

export interface BookingData {
  service: Service | null;
  master: Master | null;
  date: string;
  time: string;
}

const initialBookingData: BookingData = {
  service: null,
  master: null,
  date: '',
  time: '',
};

export default function ClientApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('services');
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const navigate = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  }, []);

  const selectService = useCallback((service: Service) => {
    setBookingData(prev => ({ ...prev, service }));
    setCurrentScreen('serviceDetail');
    window.scrollTo(0, 0);
  }, []);

  const selectMaster = useCallback((master: Master) => {
    setBookingData(prev => ({ ...prev, master }));
    setCurrentScreen('timeSelection');
    window.scrollTo(0, 0);
  }, []);

  const selectDateTime = useCallback((date: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
    setCurrentScreen('confirmation');
    window.scrollTo(0, 0);
  }, []);

  const confirmBooking = useCallback(() => {
    if (bookingData.service && bookingData.master) {
      const newAppointment: Appointment = {
        id: `a${Date.now()}`,
        serviceId: bookingData.service.id,
        serviceName: bookingData.service.name,
        serviceImage: bookingData.service.image,
        masterId: bookingData.master.id,
        masterName: bookingData.master.name,
        masterAvatar: bookingData.master.avatar,
        date: bookingData.date,
        time: bookingData.time,
        price: bookingData.service.price,
        status: 'confirmed',
      };
      setAppointments(prev => [newAppointment, ...prev]);
    }
  }, [bookingData]);

  const goHome = useCallback(() => {
    setBookingData(initialBookingData);
    setCurrentScreen('services');
    window.scrollTo(0, 0);
  }, []);

  const addReview = useCallback((appointmentId: string, rating: number, review: string) => {
    setAppointments(prev =>
      prev.map(a =>
        a.id === appointmentId ? { ...a, rating, review } : a
      )
    );
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'services':
        return <ServicesScreen onServiceSelect={selectService} />;
      case 'serviceDetail':
        return bookingData.service ? (
          <ServiceDetailScreen
            service={bookingData.service}
            onBack={() => navigate('services')}
            onMasterSelect={selectMaster}
          />
        ) : null;
      case 'timeSelection':
        return bookingData.service && bookingData.master ? (
          <TimeSelectionScreen
            service={bookingData.service}
            master={bookingData.master}
            onBack={() => setCurrentScreen('serviceDetail')}
            onConfirm={selectDateTime}
          />
        ) : null;
      case 'confirmation':
        return bookingData.service && bookingData.master ? (
          <ConfirmationScreen
            booking={bookingData}
            onConfirm={confirmBooking}
            onHome={goHome}
          />
        ) : null;
      case 'myAppointments':
        return (
          <MyAppointmentsScreen
            appointments={appointments}
            onAddReview={addReview}
          />
        );
      default:
        return <ServicesScreen onServiceSelect={selectService} />;
    }
  };

  const showNav = currentScreen === 'services' || currentScreen === 'myAppointments';

  return (
    <div className="min-h-[100dvh] bg-[var(--surface-0)] flex justify-center">
      <div className="w-full max-w-[430px] relative">
        <main className="pb-20">
          {renderScreen()}
        </main>
        {showNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={navigate}
          />
        )}
      </div>
    </div>
  );
}
