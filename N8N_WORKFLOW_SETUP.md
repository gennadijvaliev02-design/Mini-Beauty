# ServicePro n8n workflow setup

Workflow export:

```text
n8n/servicepro-booking-webhook.workflow.json
```

This workflow receives booking payloads from the Mini App, validates required fields, sends a Telegram notification to the admin, and returns JSON to the client.

PostgreSQL, payments, and the admin app are intentionally not connected in this stage.

## Import workflow

1. Open n8n.
2. Go to `Workflows`.
3. Choose `Import from File`.
4. Select `n8n/servicepro-booking-webhook.workflow.json`.
5. Open the `Telegram: Notify Admin` node.
6. Select or create Telegram API credentials named `ServicePro Telegram Bot`.
7. Put the bot token into that n8n credential, not into the workflow JSON.

## Set admin chat id

Set n8n environment variable:

```bash
SERVICEPRO_ADMIN_CHAT_ID=6380640298
```

Then restart n8n so expressions can read `$env.SERVICEPRO_ADMIN_CHAT_ID`.

## Activate and get webhook URL

1. Activate the workflow.
2. Open the `Webhook: Booking POST` node.
3. Copy the production POST URL. It will usually look like:

```text
https://your-n8n-domain.example/webhook/servicepro-booking
```

Current production URL:

```text
https://anxietycoach.online/webhook/servicepro-booking
```

## Put webhook URL into Mini App

Set the Mini App build env:

```bash
VITE_BOOKING_WEBHOOK_URL=https://your-n8n-domain.example/webhook/servicepro-booking
```

Then rebuild and publish the Mini App:

```bash
npm run build
```

For this repo's current GitHub Pages setup, copy built assets into root assets before committing:

```bash
cp dist/assets/main.js assets/main.js
cp dist/assets/style.css assets/style.css
```

## Test with curl

Valid payload:

```bash
curl -X POST 'https://your-n8n-domain.example/webhook/servicepro-booking' \
  -H 'Content-Type: application/json' \
  -d '{
    "user_id": 6380640298,
    "username": "test_user",
    "first_name": "Test",
    "service_id": "svc_haircut",
    "service_name": "Женская стрижка",
    "master_id": "mst_anna",
    "master_name": "Анна Козлова",
    "date": "2026-06-30",
    "time": "10:00",
    "price": 2500
  }'
```

Expected response:

```json
{ "success": true, "message": "Booking received" }
```

Invalid payload:

```bash
curl -X POST 'https://your-n8n-domain.example/webhook/servicepro-booking' \
  -H 'Content-Type: application/json' \
  -d '{ "service_id": "svc_haircut" }'
```

Expected response:

```json
{
  "success": false,
  "message": "Missing required fields",
  "missing": ["user_id", "username", "first_name", "service_name", "master_id", "master_name", "date", "time", "price"]
}
```

## Test from Mini App

1. Build the Mini App with `VITE_BOOKING_WEBHOOK_URL` set to the production webhook URL.
2. Open ServicePro from Telegram.
3. Choose service, master, date, and time.
4. Tap `Подтвердить запись`.
5. The Mini App should show `Запись создана`.
6. The admin Telegram chat should receive the new booking notification.
