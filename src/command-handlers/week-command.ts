import { ContextMessageUpdate } from 'telegraf';

import { createGroupPageScraper } from './utils';
import { closestPairCellSelector } from '../constants';
import { WeekCommand, CommandHandler } from './types';
import {
    getGroupFromCommandMessage,
    createErrorMessage,
    isGroupScheduleExist,
    formatSchedule,
    getAllScheduleRecordsFromTable
} from '../schedule-site';

const command: WeekCommand = '/week';

export const weekCommandHandler: CommandHandler = async (
    ctx: ContextMessageUpdate
) => {
    const commandMessage = ctx.message!.text;

    const group = getGroupFromCommandMessage(command, commandMessage);
    if (!group) {
        return ctx.reply(createErrorMessage('incorrect-group'));
    }

    const scraper = await createGroupPageScraper(group!);
    if (!isGroupScheduleExist(scraper)) {
        return ctx.reply(createErrorMessage('unexisted-group'));
    }

    const schedule = getAllScheduleRecordsFromTable(scraper
        .select<HTMLTableCellElement>(closestPairCellSelector)!
        .closest('table') as HTMLTableElement);

    return ctx.reply(formatSchedule(schedule));
};
