import Telegraf from 'telegraf';

import { TELEGRAM_TOKEN, WEBHOOK, manual } from './constants';

import { commandHandlerMapper } from './command-handlers';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply(manual));
bot.help(ctx => ctx.reply(manual));

Object.entries(commandHandlerMapper).forEach(([command, handler]) =>
    bot.command(command, handler)
);

bot.telegram.setWebhook(WEBHOOK);

module.exports = bot.webhookCallback('/');
