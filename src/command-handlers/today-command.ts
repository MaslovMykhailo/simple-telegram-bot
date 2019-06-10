import { ContextMessageUpdate } from 'telegraf';

import { oneDayCommandHandler } from './utils';
import { TodayCommand, CommandHandler } from './types';
import { createErrorMessage } from '../schedule-site';

const command: TodayCommand = '/today';

export const todayCommandHandler: CommandHandler = async (
    ctx: ContextMessageUpdate
) => {
    const day = new Date().getDay();
    if (day === 7) {
        return ctx.reply(createErrorMessage('no-pairs'));
    } else {
        return oneDayCommandHandler(command, day, ctx);
    }
};
