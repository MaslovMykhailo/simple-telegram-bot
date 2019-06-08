"use strict";

const TelegramBot = require("node-telegram-bot-api"),
    TOKEN = process.env.TELEGRAM_TOKEN,
    URL = process.env.NOW_URL,
    options = {
        "webHook": {
            "port": 443
        }
    },
    bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${URL}/bot${TOKEN}`);

bot.on("message", (msg) => {

    bot.sendMessage(msg.chat.id, "I am alive on Zeit Now!");

});
