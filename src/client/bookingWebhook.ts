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

export const stageBookingPayload = (payload: BookingPayload): BookingPayload => {
  sessionStorage.setItem('servicepro.pending_booking_payload', JSON.stringify(payload));
  console.info('ServicePro booking payload prepared for webhook', payload);

  // TODO: подключить отправку в n8n webhook на следующем этапе.
  // Здесь будет fetch(webhookUrl, { method: 'POST', body: JSON.stringify(payload) }).
  return payload;
};
