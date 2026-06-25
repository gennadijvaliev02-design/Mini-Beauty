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

export interface TelegramWebApp {
  initData?: string;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  viewportHeight?: number;
  viewportStableHeight?: number;
  BackButton?: TelegramBackButton;
  MainButton?: TelegramMainButton;
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  disableVerticalSwipes?: () => void;
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

export const initTelegramWebApp = (): TelegramWebApp | null => {
  const webApp = getTelegramWebApp();

  if (!webApp) {
    return null;
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

  return webApp;
};

export const getTelegramUser = (): TelegramUser | null =>
  getTelegramWebApp()?.initDataUnsafe?.user ?? null;
