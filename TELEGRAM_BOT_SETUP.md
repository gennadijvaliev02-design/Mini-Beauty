# Telegram Bot API setup

This example does not store a real bot token in the repository. Pass the token through `BOT_TOKEN`.

Mini App URL:

```text
https://gennadijvaliev02-design.github.io/Mini-Beauty/
```

## Run the bot locally

```bash
BOT_TOKEN=1234567890:your_real_token npm run bot:start
```

Then open the bot in Telegram and send:

```text
/start
```

The bot replies with a message and an inline WebApp button:

```json
{
  "reply_markup": {
    "inline_keyboard": [
      [
        {
          "text": "Открыть ServicePro",
          "web_app": {
            "url": "https://gennadijvaliev02-design.github.io/Mini-Beauty/"
          }
        }
      ]
    ]
  }
}
```

## Optional persistent menu button

Telegram also supports a persistent chat menu WebApp button:

```bash
BOT_TOKEN=1234567890:your_real_token npm run bot:setup-menu
```

Verify the configured `/start` command and persistent menu button:

```bash
BOT_TOKEN=1234567890:your_real_token npm run bot:verify
```

This calls `setChatMenuButton` with:

```json
{
  "menu_button": {
    "type": "web_app",
    "text": "Открыть ServicePro",
    "web_app": {
      "url": "https://gennadijvaliev02-design.github.io/Mini-Beauty/"
    }
  }
}
```
