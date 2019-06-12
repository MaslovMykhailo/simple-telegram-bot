import { ScheduleRecord } from '../schedule-site';

export const manual = `
Доступні команди:
/closestpair group - показати найблищу пару
/today group - показати розклад на сьогодні
/tommorow group - показати розклад на завтра
/week group - показати розклад на увесь тиждень
`;

export const description: Record<keyof ScheduleRecord, string> = {
    subject: 'Предмет: ',
    teacher: 'Викладач: ',
    building: 'Корпус: ',
    room: 'Аудиторія: ',
    pairNumber: 'Пара номер: ',
    time: 'Початок у ',
    classType: 'Тип заняття: '
};
