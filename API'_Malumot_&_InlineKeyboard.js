require("dotenv").config();
const Telegram_Bot = require("node-telegram-bot-api");
const token = "8308408829:AAG44UZ3DE_nR9Hbn8WJhC1lJO3oVVkfg34";
const bot = new Telegram_Bot(token, { polling: true });
const axios = require("axios");


bot.onText(/\/start/,  async (msg) => {
    const chatId = msg.chat.id;
    try {
        const repsonse = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        const users = response.data;
        let buttons = users.map((user) => [
            {
                text: user.name,
                callback_data: `user_${user.id}`,
            },
        ]);
        bot.sendMessage(chatId, "Foydalanuvchini tanlang", {
            reply_markup: {
                inline_keyboard: buttons,
            },
        });
    }catch(err) {
        bot.sendMessage(chatId, "Api bilan bog'lanishda xatolik yuz berdi");
    }
});

bot.on("callback_query", async(query) => {
    const chatId = query.message.chat.id;

    if (query.data.startsWith("user_")){
        const userId = query.data.split("_")[1];
        try {
            const repsonse = await axios.get(
                `https://jsonplaceholder.typicode.com/users/${userId}`
            );
            const user = response.data;

            bot.editMessageText(
                `*Ismi:* ${user.name}\n *Email:* ${user.email}\n *Kompaniya:* ${user.company.name}`,
         {
            chat_id: chatId,
            message_id: query.message.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Boshqa foydalanuvchi tanlash",
                            callback_data: "/start",
                        },
                    ],
                ],
            },
         }       
            );
        }catch(err) {
            bot.sendMessage(chatId, "Ma'lumotlar olishda xatolik yuz berdi");
        }
    }
    bot.answerCallbackQuery(query.id);
});