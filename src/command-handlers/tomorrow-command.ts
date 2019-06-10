import { ContextMessageUpdate } from 'telegraf';

import { oneDayCommandHandler } from './utils';
import { TomorrowCommand, CommandHandler } from './types';
import { createErrorMessage } from '../schedule-site';

const command: TomorrowCommand = '/tomorrow';

export const tomorrowCommandHandler: CommandHandler = async (
    ctx: ContextMessageUpdate
) => {
    const day = new Date().getDay() + 1;
    if (day === 7) {
        return ctx.reply(createErrorMessage('no-pairs'));
    } else {
        return oneDayCommandHandler(command, day % 7, ctx);
    }
};
