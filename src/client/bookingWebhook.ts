import { config } from '@/config';

export interface BookingPayload {
  user_id: number | null;
  username: string | null;
  service_id: string;
  service_name: string;
  master_id: string;
  master_name: string;
  date: string;
  time: string;
  price: number;
}

const isPlaceholderWebhook = (url: string) =>
  !url || url.includes('example.com') || url.includes('placeholder');

export const sendBookingToWebhook = async (payload: BookingPayload): Promise<void> => {
  if (isPlaceholderWebhook(config.bookingWebhookUrl)) {
    console.info('ServicePro booking payload', payload);
    return;
  }

  const response = await fetch(config.bookingWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Booking webhook failed with status ${response.status}`);
  }
};
