import { getEnvSafe } from '../utils';

export const TELEGRAM_TOKEN = getEnvSafe('TELEGRAM_TOKEN');
export const WEBHOOK = getEnvSafe('WEBHOOK');
