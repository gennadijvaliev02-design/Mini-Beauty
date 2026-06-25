# Booking webhook setup

The Mini App sends booking payloads as `POST` JSON to the URL from:

```bash
VITE_BOOKING_WEBHOOK_URL=https://your-n8n.example/webhook/servicepro-booking
```

Current production URL:

```bash
VITE_BOOKING_WEBHOOK_URL=https://anxietycoach.online/webhook/servicepro-booking
```

For local testing:

```bash
VITE_BOOKING_WEBHOOK_URL=https://your-n8n.example/webhook/servicepro-booking npm run build
```

The success screen is shown only after the webhook returns an HTTP 2xx response. Non-2xx responses, network errors, or a missing webhook URL show the booking error screen.

PostgreSQL persistence and payment handling are intentionally not connected in this step. The code has TODO comments at the webhook call boundary for those next integrations.
