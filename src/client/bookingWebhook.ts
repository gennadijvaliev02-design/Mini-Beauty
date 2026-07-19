import { config } from '@/config';

export interface BookingPayload {
  user_id: number | null;
  username: string | null;
  first_name: string | null;
  service_id: string;
  service_name: string;
  master_id: string;
  master_name: string;
  date: string;
  time: string;
  price: number;
  source: 'telegram_webapp' | 'browser';
  created_at: string;
}

export interface BookingWebhookResult {
  ok: boolean;
  booking_id?: string;
  message?: string;
}

export class BookingWebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingWebhookError';
  }
}

const parseWebhookResponse = async (response: Response): Promise<BookingWebhookResult> => {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return await response.json() as BookingWebhookResult;
  }

  const text = await response.text();
  return {
    ok: response.ok,
    message: text || undefined,
  };
};

export const sendBookingToWebhook = async (payload: BookingPayload): Promise<BookingWebhookResult> => {
  sessionStorage.setItem('servicepro.pending_booking_payload', JSON.stringify(payload));

  if (!config.bookingWebhookUrl) {
    throw new BookingWebhookError('Webhook URL is not configured');
  }

  // TODO: n8n will later connect PostgreSQL and appointment creation here.
  // TODO: after payments are connected, add payment status and payment_id to the payload.
  const response = await fetch(config.bookingWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await parseWebhookResponse(response);

  if (!response.ok) {
    throw new BookingWebhookError(result.message || `Webhook failed with status ${response.status}`);
  }

  sessionStorage.setItem('servicepro.last_booking_response', JSON.stringify(result));
  console.info('ServicePro booking webhook accepted payload', result);

  return result;
};
