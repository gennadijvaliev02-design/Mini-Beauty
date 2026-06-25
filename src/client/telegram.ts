export interface TelegramUser {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
}

interface TelegramBackButton {
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
}

interface TelegramMainButton {
  text: string;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  showProgress: (leaveActive?: boolean) => void;
  hideProgress: () => void;
  setText: (text: string) => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
}

type TelegramEventName = 'viewportChanged' | 'themeChanged' | 'mainButtonClicked' | 'backButtonClicked';

export interface TelegramWebApp {
  initData?: string;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  platform?: string;
  version?: string;
  viewportHeight?: number;
  viewportStableHeight?: number;
  BackButton?: TelegramBackButton;
  MainButton?: TelegramMainButton;
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  disableVerticalSwipes?: () => void;
  onEvent?: (eventType: TelegramEventName, eventHandler: () => void) => void;
  offEvent?: (eventType: TelegramEventName, eventHandler: () => void) => void;
}

export interface SavedTelegramUser {
  user_id: number | null;
  username: string | null;
  first_name: string | null;
}

export interface TelegramSession {
  webApp: TelegramWebApp | null;
  isTelegram: boolean;
  user: SavedTelegramUser;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export const getTelegramWebApp = (): TelegramWebApp | null =>
  window.Telegram?.WebApp ?? null;

export const isTelegramWebApp = (): boolean => {
  const webApp = getTelegramWebApp();
  return Boolean(webApp?.initData || webApp?.initDataUnsafe?.user || webApp?.platform);
};

export const normalizeTelegramUser = (user?: TelegramUser): SavedTelegramUser => ({
  user_id: user?.id ?? null,
  username: user?.username ?? null,
  first_name: user?.first_name ?? null,
});

export const saveTelegramUser = (user: SavedTelegramUser): void => {
  localStorage.setItem('servicepro.telegram_user', JSON.stringify(user));
};

export const initTelegramWebApp = (): TelegramSession => {
  const webApp = getTelegramWebApp();

  if (!webApp) {
    const user = normalizeTelegramUser();
    saveTelegramUser(user);
    console.info('ServicePro WebApp opened outside Telegram');
    return { webApp: null, isTelegram: false, user };
  }

  webApp.ready();
  webApp.expand();
  webApp.setHeaderColor?.('#0c0c0c');
  webApp.setBackgroundColor?.('#0c0c0c');
  webApp.disableVerticalSwipes?.();

  const viewportHeight = webApp.viewportStableHeight ?? webApp.viewportHeight;
  if (viewportHeight) {
    document.documentElement.style.setProperty('--tg-viewport-height', `${viewportHeight}px`);
  }

  const user = normalizeTelegramUser(webApp.initDataUnsafe?.user);
  saveTelegramUser(user);
  console.info('ServicePro WebApp opened', { isTelegram: isTelegramWebApp(), user });

  return { webApp, isTelegram: isTelegramWebApp(), user };
};

export const getTelegramUser = (): TelegramUser | null =>
  getTelegramWebApp()?.initDataUnsafe?.user ?? null;

export const getSavedTelegramUser = (): SavedTelegramUser => {
  const storedUser = localStorage.getItem('servicepro.telegram_user');

  if (!storedUser) {
    return normalizeTelegramUser(getTelegramUser() ?? undefined);
  }

  try {
    return JSON.parse(storedUser) as SavedTelegramUser;
  } catch {
    return normalizeTelegramUser(getTelegramUser() ?? undefined);
  }
};

export const bindTelegramOpenCloseHandlers = (webApp: TelegramWebApp | null): (() => void) => {
  const handleOpen = () => {
    console.info('ServicePro WebApp active');
  };

  const handleClose = () => {
    console.info('ServicePro WebApp closing or hidden');
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const handlePageHide = () => {
    handleClose();
  };

  handleOpen();
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);
  webApp?.onEvent?.('viewportChanged', handleOpen);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);
    webApp?.offEvent?.('viewportChanged', handleOpen);
  };
};
