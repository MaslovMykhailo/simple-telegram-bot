import Telegraf from 'telegraf';

// import { TELEGRAM_TOKEN, WEBHOOK } from './env';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string;
const WEBHOOK = process.env.WEBHOOK as string;

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply('Welcome ts bot'));

bot.telegram.setWebhook(WEBHOOK);

module.exports = bot.webhookCallback('/');
