require("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34";
const bot = new Telegram_Bot(token, { polling: true });

bot.on(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "iltimos telefon raqamingizni kiriting", {
        reply_markup: {
            keyboard: [[{text: "Telefon raqam", request_contact: true}]],
        },
    });
});
bot.on("contact", (msg) => {
    bot.sendMessage(
        msg.chat.id,
        `Sizning telefon raqamingiz: ${msg.contact.phone_number}`
    );
});