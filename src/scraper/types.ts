import { JSDOM } from 'jsdom';

export type SelectMethod = <T extends Element = Element>(
    selector: string
) => T | null;

export type SelectAllMethod = <T extends Element[] = Element[]>(
    selector: string
) => T;

export type FormSubmitParams = {
    [key: string]: string | number;
};

export type Scraper = {
    getJSDOM: () => JSDOM;
    getHTML: () => string;
    select: SelectMethod;
    selectAll: SelectAllMethod;
    closeSite: () => void;
};
