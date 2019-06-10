import qs from 'querystring';
import fetch from 'node-fetch';

import { FormSubmitParams } from './types';

export const evalFormSubmit = async (
    form: HTMLFormElement,
    additionalParams?: FormSubmitParams
) => {
    const actionUrl = form.action;

    const formParams = Array.from(form.elements).reduce<{
        [key: string]: string;
    }>((accumulator, elem: any) => {
        accumulator[elem.name] = elem.value;
        return accumulator;
    }, {});

    const params = qs.stringify({ ...formParams, ...additionalParams });

    return fetch(actionUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: params
    });
};
