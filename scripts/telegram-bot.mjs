const BOT_TOKEN = process.env.BOT_TOKEN;
const MINI_APP_URL = process.env.MINI_APP_URL || 'https://gennadijvaliev02-design.github.io/Mini-Beauty/';
const API_BASE = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : '';

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!BOT_TOKEN) {
  fail('BOT_TOKEN is required. Example: BOT_TOKEN=123456:ABC npm run bot:start');
}

const telegramRequest = async (method, payload = {}) => {
  const response = await fetch(`${API_BASE}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(`${method} failed: ${JSON.stringify(result)}`);
  }

  return result.result;
};

const buildServiceProButton = () => ({
  inline_keyboard: [
    [
      {
        text: 'Открыть ServicePro',
        web_app: {
          url: MINI_APP_URL,
        },
      },
    ],
  ],
});

const sendStartMessage = async (chatId) => {
  await telegramRequest('sendMessage', {
    chat_id: chatId,
    text: 'Добро пожаловать в ServicePro. Нажмите кнопку ниже, чтобы открыть Mini App и записаться на услугу.',
    reply_markup: buildServiceProButton(),
  });
};

const setupMenuButton = async () => {
  await telegramRequest('setChatMenuButton', {
    menu_button: {
      type: 'web_app',
      text: 'Открыть ServicePro',
      web_app: {
        url: MINI_APP_URL,
      },
    },
  });

  await telegramRequest('setMyCommands', {
    commands: [
      {
        command: 'start',
        description: 'Открыть ServicePro',
      },
    ],
  });

  console.log(`Telegram WebApp menu button points to ${MINI_APP_URL}`);
};

const verifySetup = async () => {
  const commands = await telegramRequest('getMyCommands');
  const menuButton = await telegramRequest('getChatMenuButton');

  const startCommand = commands.find((command) => command.command === 'start');
  const menuUrl = menuButton.type === 'web_app' ? menuButton.web_app?.url : null;

  console.log(JSON.stringify({
    start_command_configured: Boolean(startCommand),
    start_command_description: startCommand?.description ?? null,
    menu_button_type: menuButton.type,
    menu_button_text: menuButton.text ?? null,
    menu_button_url: menuUrl,
    expected_mini_app_url: MINI_APP_URL,
    menu_button_matches_expected_url: menuUrl === MINI_APP_URL,
  }, null, 2));
};

const pollUpdates = async () => {
  let offset = 0;

  console.log(`ServicePro bot is listening. Mini App URL: ${MINI_APP_URL}`);

  while (true) {
    const updates = await telegramRequest('getUpdates', {
      offset,
      timeout: 30,
      allowed_updates: ['message'],
    });

    for (const update of updates) {
      offset = update.update_id + 1;

      const message = update.message;
      const text = message?.text?.trim();

      if (!message?.chat?.id || !text) {
        continue;
      }

      if (text === '/start' || text.startsWith('/start ')) {
        await sendStartMessage(message.chat.id);
      }
    }
  }
};

if (process.argv.includes('--set-menu-button')) {
  await setupMenuButton();
} else if (process.argv.includes('--verify-setup')) {
  await verifySetup();
} else {
  await pollUpdates();
}
