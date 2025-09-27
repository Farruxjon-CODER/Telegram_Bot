require ("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34"
const bot = new Telegram_Bot(token, {polling: true});

// 1-qadam
console.log(bot)
bot.getMe().then((me) =>{
    console.log(me);
});

// 2-qadam
bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, `Assalomu alaykum ${message.chat.first_name}`)
});
