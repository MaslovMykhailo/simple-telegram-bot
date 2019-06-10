import { ContextMessageUpdate } from 'telegraf';

export type ClosestPairCommand = '/closestpair';

export type TodayCommand = '/today';

export type TomorrowCommand = '/tomorrow';

export type WeekCommand = '/week';

export type Commands =
    | ClosestPairCommand
    | TodayCommand
    | TomorrowCommand
    | WeekCommand;

export type CommandHandler = (ctx: ContextMessageUpdate) => void;
