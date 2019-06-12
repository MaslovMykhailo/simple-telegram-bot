import { Commands } from '../command-handlers';
import { Scraper } from '../scraper';
import { closestPairCellSelector, cellContentSelector } from '../constants';
import { ScheduleRecord, Schedule } from './types';
import { formatString } from '../utils';

const groupPattern = /^[А-ЩЬЮЯЇІЄҐ]{2}-\d{2}$/;

export const getGroupFromCommandMessage = (
    command: Commands,
    message: string | undefined
) => {
    if (message) {
        const payload = message
            .replace(command, '')
            .replace(/\s+/, '')
            .toUpperCase();

        const group = payload.slice(0, 5);
        if (groupPattern.test(group)) {
            return group;
        }
    }
};

export const splitLocation = (location?: string): Partial<ScheduleRecord> => {
    if (location) {
        const [room, buildingAndClassType] = location.split('-');
        const [building, classType] = buildingAndClassType.split(' ');

        return Object.entries({ building, room, classType }).reduce(
            (accum, [key, entity]) => ({
                ...accum,
                [key]: formatString(entity)
            }),
            {}
        );
    } else {
        return { building: undefined, room: undefined, classType: undefined };
    }
};

export const getScheduleRecordFromTableCell = (
    cell: HTMLTableCellElement
): ScheduleRecord | undefined => {
    const cellContent = Array.from(
        cell.querySelectorAll(cellContentSelector)
    ) as HTMLAnchorElement[];
    if (cellContent.length) {
        const [subject, teacher, location] = cellContent.map(
            elem => elem.innerHTML
        );

        const row = cell.closest('tr')!;
        const [pairNumber, time] = row.children[0].innerHTML.split('<br>');

        return {
            subject,
            teacher,
            pairNumber,
            time,
            ...splitLocation(location)
        };
    }
};

export const isGroupScheduleExist = (scraper: Scraper) => {
    return Boolean(
        scraper.select<HTMLTableCellElement>(closestPairCellSelector)
    );
};

export const getDaysOfWeekFromRow = (row: HTMLTableRowElement) => {
    const cells = Array.from(row.querySelectorAll('td'));
    cells.shift();
    return cells.map(cell => cell.innerHTML);
};

export const getAllScheduleRecordsFromTable = (
    table: HTMLTableElement
): Schedule => {
    const rows = Array.from(
        table.querySelectorAll('tr')
    ) as HTMLTableRowElement[];

    const schedule: Schedule = {};
    const daysOfWeek = getDaysOfWeekFromRow(
        rows.shift() as HTMLTableRowElement
    );
    daysOfWeek.forEach(day => (schedule[day] = []));

    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        cells.shift();
        cells.forEach((cell, index) => {
            schedule[daysOfWeek[index]].push(getScheduleRecordFromTableCell(
                cell
            ) as ScheduleRecord);
        });
    });

    return schedule;
};

export const getScheduleRecordsByDay = (
    day: number,
    table: HTMLTableElement
): Schedule => {
    const rows = Array.from(
        table.querySelectorAll('tr')
    ) as HTMLTableRowElement[];

    const schedule: Schedule = {};
    const daysOfWeek = getDaysOfWeekFromRow(
        rows.shift() as HTMLTableRowElement
    );

    schedule[daysOfWeek[day - 1]] = [];

    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        cells.shift();

        schedule[daysOfWeek[day - 1]].push(getScheduleRecordFromTableCell(
            cells[day - 1]
        ) as ScheduleRecord);
    });

    return schedule;
};

export const getCurrentDayOnTable = (scraper: Scraper) => {
    const cell = scraper.select(closestPairCellSelector)!;
    const row = cell.closest('tr')!;

    return Array.from(row.children).findIndex(elem => elem === cell);
};
