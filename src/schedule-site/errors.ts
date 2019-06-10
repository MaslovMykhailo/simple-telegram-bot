import { ErrorTypes } from './types';

const errorText: Record<ErrorTypes, string> = {
    'incorrect-group': 'Номер групи вказано невірно',
    'unexisted-group': 'Групи з таким номером не існує',
    'no-schedule': 'Розклад відсутній',
    'no-pairs': 'Пари відсутні'
};

export const createErrorMessage = (error: ErrorTypes) => errorText[error];
