require("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34";
process.env.TOKEN;
const bot = new Telegram_Bot(token, { polling: true });
const User = require("./modules/user.module");
const user = {};

// 1-qadam
console.log(bot);
bot.getMe().then((me) =>{
    console.log(me);
});

// 2-qadam
bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, `Assalomu alaykum ${message.chat.first_name}`)
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  bot.sendMessage(chatId, "Assalomu alaykum ! Ismingizni kiriting:");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!user[userId]) return;
  if (!user[userId].username) {
    user[userId].username = msg.text;
    bot.sendMessage(
      chatId,
      "Ismingizni qabul qildik. Telefon raqamingizni kiriting:",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Telefon raqamni yuborish",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
    return;
  }
  if (msg.contact) {
    user[userId].phonenumber = msg.contact.phone_number;
    bot.sendMessage(chatId, "Telefon raqamingiz qabul qilindi.", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    bot.sendMessage(
      chatId,
      "Ma'lumotlar saqlanishi uchun ruxsat bering. Sizning ma'lumotlaringiz : Ism: " +
        user[userId].username +
        "Telefon raqami: " +
        user[userId].phonenumber,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Ruxsat berish",
                callback_data: `save_${userId}`,
              },
              {
                text: "Rad etish",
                callback_data: `cancel_${userId}`,
              },
            ],
          ],
        },
      }
    );
    return;
  }
});

// Ma'lumotlarni saqlash yoki rad etish

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;
  if (!user[userId]) {
    bot.answerCallbackQuery(query.id, {
      text: "Iltimos, /start buyrig'ini bering. Ma'lumot topilmadi shu sababli amalni bajarib bo'lmaydi.",
      show_alert: true,
    });
    return;
  }
  if (data === `save_${userId}`) {
    try {
      const newUser = new User(
        user[userId].userid,
        user[userId].username,
        user[userId].phonenumber
      );
      await newUser.save();
      bot.sendMessage(chatId, "Ma'lumotlar saqlandi.");
      delete user[userId];
    } catch (err) {
      bot.sendMessage(
        chatId,
        "Ma'lumotlar saqlanmadi. Iltimos, qaytadan urinib ko'ring."
      );
      console.error("Saqlanishdagi muammmo: ", err);
    }
  } else if (data === `cancel_${userId}`) {
    bot.sendMessage(chatId, "Ma'lumotlar saqlanmadi.");
    delete user[userId];
  }
});
