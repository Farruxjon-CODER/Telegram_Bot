require("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34";
const bot = new Telegram_Bot(token, { polling: true });

bot.on(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Iltimos 'Location'ingizni yuboring", {
        reply_markup: {
            keyboard: [[{ text: "location", request_location: true}]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
});
bot.on("location", (msg) => {
    const { latitude, longitude } = msg.location;
    bot.sendMessage(msg.chat.id, `latitude: ${latitude}, longitude: ${longitude}`);
});