import { ContextMessageUpdate } from 'telegraf';

import { createGroupPageScraper } from './utils';
import { closestPairCellSelector } from '../constants';
import { ClosestPairCommand, CommandHandler } from './types';
import {
    getGroupFromCommandMessage,
    createErrorMessage,
    isGroupScheduleExist,
    getScheduleRecordFromTableCell,
    formatScheduleRecord
} from '../schedule-site';

const command: ClosestPairCommand = '/closestpair';

export const closestPairCommandHandler: CommandHandler = async (
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

    const scheduleRecord = getScheduleRecordFromTableCell(
        scraper.select<HTMLTableCellElement>(closestPairCellSelector)!
    );

    return ctx.reply(formatScheduleRecord(scheduleRecord));
};
