import { JSDOM, Options } from 'jsdom';
import { SelectMethod, SelectAllMethod } from './types';

const defaultJSDOMOptions: Partial<Options> = {
    runScripts: 'dangerously',
    resources: 'usable'
};

export const ScraperFactory = async (
    url: string,
    JSDOMOptions: Partial<Options> = defaultJSDOMOptions
) => {
    const dom = await JSDOM.fromURL(url, JSDOMOptions);

    const getJSDOM = () => dom;

    const getHTML = () => dom.serialize();

    const select: SelectMethod = selector =>
        dom.window.document.querySelector(selector);

    const selectAll: SelectAllMethod = selector =>
        Array.from(dom.window.document.querySelectorAll(selector)) as any;

    const closeSite = () => dom.window.close();

    return {
        getJSDOM,
        getHTML,
        select,
        selectAll,
        closeSite
    };
};
