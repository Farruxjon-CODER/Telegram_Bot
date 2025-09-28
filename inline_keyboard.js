require("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34";
const bot = new Telegram_Bot(token, { polling: true });

// 1-qadam
console.log(bot);
bot.getMe().then((me) => {
  console.log(me);
});

// 2-qadam
bot.onText(/\/start/, (message) => {
  bot.sendMessage(
    message.chat.id,
    `Assalomu alaykum ${message.chat.first_name} Pastdagi tugmalardan birini tanlang`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Google",
              url: "https://google.com",
            },
            {
                text: "Bio bot",
                callback_data: "bio_bot"
            }
          ],
        ],
      },
    }
  );
});

// callback_query
bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    if (query.data === "bio_bot") {
        bot.sendMessage(chatId, "Ushbu bot 'JavaScript'ni qisman tushunadigan dasturchi tomonidan yaratilgan");
    }
});

