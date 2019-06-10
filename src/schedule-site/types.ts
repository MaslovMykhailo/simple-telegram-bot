export type ErrorTypes =
    | 'incorrect-group'
    | 'unexisted-group'
    | 'no-schedule'
    | 'no-pairs';

export type ScheduleRecord = {
    subject?: string;
    teacher?: string;
    building?: string;
    room?: string;
    pairNumber: string;
    time: string;
};

export type Schedule = {
    [day: string]: ScheduleRecord[];
};
