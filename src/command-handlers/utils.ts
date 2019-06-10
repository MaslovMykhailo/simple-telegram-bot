import { Scraper, ScraperFactory, evalFormSubmit } from '../scraper';
import { ContextMessageUpdate } from 'telegraf';
import { Commands } from './types';
import {
    siteBaseUrl,
    formSelector,
    searchInputSelector,
    secretFormParams,
    closestPairCellSelector
} from '../constants';
import {
    getGroupFromCommandMessage,
    createErrorMessage,
    isGroupScheduleExist,
    getScheduleRecordsByDay,
    formatSchedule
} from '../schedule-site';

export const createGroupPageScraper = async (
    group: string
): Promise<Scraper> => {
    const scraper = await ScraperFactory(siteBaseUrl);

    const form = scraper.select<HTMLFormElement>(formSelector)!;
    const input = scraper.select<HTMLInputElement>(searchInputSelector)!;
    input.setAttribute('value', group);

    const groupScheduleSiteUrl = (await evalFormSubmit(form, secretFormParams))
        .url;
    return ScraperFactory(groupScheduleSiteUrl);
};

export const oneDayCommandHandler = async (
    command: Commands,
    day: number,
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

    const scheduleRecord = getScheduleRecordsByDay(day, scraper
        .select<HTMLTableCellElement>(closestPairCellSelector)!
        .closest('table') as HTMLTableElement);

    return ctx.reply(formatSchedule(scheduleRecord));
};
