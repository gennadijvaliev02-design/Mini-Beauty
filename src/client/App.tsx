import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Service, Master, Appointment, BookingDate, TimeSlot } from '@/types';
import { stageBookingPayload, type BookingPayload } from './bookingWebhook';
import {
  getAvailableSlots,
  getMastersForService,
  loadClientMockData,
  type ClientMockData,
} from '@/data/clientMockApi';
import {
  bindTelegramOpenCloseHandlers,
  initTelegramWebApp,
  type SavedTelegramUser,
  type TelegramWebApp,
} from './telegram';
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
  dateLabel: string;
  time: string;
}

const initialBookingData: BookingData = {
  service: null,
  master: null,
  date: '',
  dateLabel: '',
  time: '',
};

export default function ClientApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('services');
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [bookingDates, setBookingDates] = useState<BookingDate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [slots, setSlots] = useState<ClientMockData['slots']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramWebApp, setTelegramWebApp] = useState<TelegramWebApp | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [telegramUser, setTelegramUser] = useState<SavedTelegramUser>({
    user_id: null,
    username: null,
    first_name: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const session = initTelegramWebApp();
    setTelegramWebApp(session.webApp);
    setIsTelegram(session.isTelegram);
    setTelegramUser(session.user);

    return bindTelegramOpenCloseHandlers(session.webApp);
  }, []);

  useEffect(() => {
    let isMounted = true;

    loadClientMockData().then(data => {
      if (!isMounted) {
        return;
      }

      setServices(data.services);
      setMasters(data.masters);
      setBookingDates(data.bookingDates);
      setAppointments(data.appointments);
      setSlots(data.slots);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const navigate = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  }, []);

  const selectService = useCallback((service: Service) => {
    setBookingData({ ...initialBookingData, service });
    setCurrentScreen('serviceDetail');
    window.scrollTo(0, 0);
  }, []);

  const selectMaster = useCallback((master: Master) => {
    setBookingData(prev => ({ ...prev, master }));
    setCurrentScreen('timeSelection');
    window.scrollTo(0, 0);
  }, []);

  const selectDateTime = useCallback((date: string, time: string) => {
    const dateLabel = bookingDates.find(bookingDate => bookingDate.iso === date)?.label ?? date;
    setBookingData(prev => ({ ...prev, date, dateLabel, time }));
    setCurrentScreen('confirmation');
    window.scrollTo(0, 0);
  }, [bookingDates]);

  const goBack = useCallback(() => {
    if (currentScreen === 'serviceDetail') {
      navigate('services');
      return;
    }

    if (currentScreen === 'timeSelection') {
      navigate('serviceDetail');
      return;
    }

    if (currentScreen === 'confirmation') {
      navigate('timeSelection');
    }
  }, [currentScreen, navigate]);

  const bookingPayload = useMemo<BookingPayload | null>(() => {
    if (!bookingData.service || !bookingData.master || !bookingData.date || !bookingData.time) {
      return null;
    }

    return {
      user_id: telegramUser.user_id,
      username: telegramUser.username,
      first_name: telegramUser.first_name,
      service_id: bookingData.service.id,
      service_name: bookingData.service.name,
      master_id: bookingData.master.id,
      master_name: bookingData.master.name,
      date: bookingData.date,
      time: bookingData.time,
      price: bookingData.service.price,
      source: isTelegram ? 'telegram_webapp' : 'browser',
      created_at: new Date().toISOString(),
    };
  }, [bookingData, isTelegram, telegramUser]);

  const confirmBooking = useCallback(async () => {
    if (isSubmitting || !bookingData.service || !bookingData.master || !bookingPayload) {
      return;
    }

    setIsSubmitting(true);

    try {
      stageBookingPayload(bookingPayload);

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
      setBookingData(initialBookingData);
      setCurrentScreen('myAppointments');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  }, [bookingData, bookingPayload, isSubmitting]);

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

  const getSlots = useCallback((masterId: string, date: string): TimeSlot[] => (
    getAvailableSlots(slots, appointments, masterId, date)
  ), [appointments, slots]);

  useEffect(() => {
    const backButton = telegramWebApp?.BackButton;
    if (!backButton) {
      return;
    }

    const shouldShowBack = currentScreen === 'serviceDetail' ||
      currentScreen === 'timeSelection' ||
      currentScreen === 'confirmation';

    if (shouldShowBack) {
      backButton.show();
      backButton.onClick(goBack);
    } else {
      backButton.hide();
    }

    return () => {
      backButton.offClick(goBack);
    };
  }, [currentScreen, goBack, telegramWebApp]);

  useEffect(() => {
    const mainButton = telegramWebApp?.MainButton;
    if (!mainButton) {
      return;
    }

    if (currentScreen !== 'confirmation' || !bookingPayload) {
      mainButton.hide();
      return;
    }

    mainButton.setText(`Подтвердить · ${bookingPayload.price.toLocaleString('ru')} ₽`);
    mainButton.show();

    if (isSubmitting) {
      mainButton.disable();
      mainButton.showProgress(true);
    } else {
      mainButton.enable();
      mainButton.hideProgress();
    }

    mainButton.onClick(confirmBooking);

    return () => {
      mainButton.offClick(confirmBooking);
      mainButton.hideProgress();
    };
  }, [bookingPayload, confirmBooking, currentScreen, isSubmitting, telegramWebApp]);

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="min-h-[var(--tg-viewport-height,100dvh)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
            <p className="text-sm text-[var(--text-muted)]">Загрузка данных</p>
          </div>
        </div>
      );
    }

    switch (currentScreen) {
      case 'services':
        return <ServicesScreen services={services} onServiceSelect={selectService} />;
      case 'serviceDetail':
        return bookingData.service ? (
          <ServiceDetailScreen
            service={bookingData.service}
            masters={getMastersForService(masters, bookingData.service.id)}
            onBack={() => navigate('services')}
            onMasterSelect={selectMaster}
          />
        ) : null;
      case 'timeSelection':
        return bookingData.service && bookingData.master ? (
          <TimeSelectionScreen
            service={bookingData.service}
            master={bookingData.master}
            bookingDates={bookingDates}
            getSlots={getSlots}
            onBack={() => navigate('serviceDetail')}
            onConfirm={selectDateTime}
          />
        ) : null;
      case 'confirmation':
        return bookingData.service && bookingData.master ? (
          <ConfirmationScreen
            booking={bookingData}
            onConfirm={confirmBooking}
            onHome={goHome}
            isSubmitting={isSubmitting}
            usesTelegramMainButton={Boolean(telegramWebApp?.MainButton)}
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
        return <ServicesScreen services={services} onServiceSelect={selectService} />;
    }
  };

  const showNav = currentScreen === 'services' || currentScreen === 'myAppointments';

  return (
    <div className="min-h-[var(--tg-viewport-height,100dvh)] bg-[var(--surface-0)] flex justify-center">
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
