import Telegraf from 'telegraf';

import { TELEGRAM_TOKEN, WEBHOOK } from './env';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply('Welcome ts bot'));

bot.telegram.setWebhook(WEBHOOK);

module.exports = bot.webhookCallback('/');
