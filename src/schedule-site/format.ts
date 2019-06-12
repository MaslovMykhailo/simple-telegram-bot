import { ScheduleRecord, Schedule } from './types';
import { createErrorMessage } from './errors';
import { description } from '../constants';

const infoDirection: Array<keyof ScheduleRecord> = [
    'subject',
    'teacher',
    'classType',
    'building',
    'room',
    'pairNumber',
    'time'
];

export const formatScheduleRecord = (record: ScheduleRecord | undefined) => {
    if (record) {
        const formated = infoDirection
            .map(key =>
                record[key] ? description[key] + record[key] : undefined
            )
            .filter(Boolean);

        if (formated.length <= 2) {
            // 2? => the record always have time and pair number properties
            return '';
        } else {
            return formated.join('\n');
        }
    } else {
        return createErrorMessage('no-schedule');
    }
};

const pairsSeparator = '\n-----------------------\n';
const daysSeparator = '\n=======================\n';
const captureSeparator = '\n~~~~~~~~~~~~~~~~~~~~~~~\n';

export const formatSchedule = (schedule: Schedule) => {
    return Object.entries(schedule)
        .map(([day, records]) => [
            day,
            records
                .filter(Boolean)
                .map(formatScheduleRecord)
                .filter(record => record !== '')
        ])
        .map(
            ([day, records]) =>
                '\n' +
                day +
                captureSeparator +
                (records.length
                    ? (records as string[]).join(pairsSeparator)
                    : createErrorMessage('no-pairs'))
        )
        .join(daysSeparator);
};
