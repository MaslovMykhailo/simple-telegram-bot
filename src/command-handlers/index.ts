export * from './types';
export * from './utils';

import { Commands, CommandHandler } from './types';
import { weekCommandHandler } from './week-command';
import { todayCommandHandler } from './today-command';
import { tomorrowCommandHandler } from './tomorrow-command';
import { closestPairCommandHandler } from './closest-pair-command';

export const commandHandlerMapper: Record<Commands, CommandHandler> = {
    '/week': weekCommandHandler,
    '/today': todayCommandHandler,
    '/tomorrow': tomorrowCommandHandler,
    '/closestpair': closestPairCommandHandler
};
