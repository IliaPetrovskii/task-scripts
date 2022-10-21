import puppeteer, { Page, Browser } from 'puppeteer';
import path from 'path';
import { format as prettyFormat } from 'pretty-format';

let browser: Browser;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
    });
});

afterAll(async () => {
    await browser.close();
});

expect.extend({
    toHaveScriptWithParams(
        received: jest.IScriptParams[],
        expected: jest.IScriptParams,
    ) {
        const hasScript = received.some((item) => {
            const correctSrc =
                expected.src.length === 0
                    ? item.src.length === 0
                    : item.src.endsWith(expected.src);
            return (
                correctSrc &&
                item.defer === expected.defer &&
                item.async === expected.async
            );
        });

        return {
            pass: hasScript,
            message: () =>
                hasScript
                    ? ''
                    : `expected ${prettyFormat(
                          received,
                      )} to contain script with the following parameters: ${prettyFormat(
                          expected,
                      )}`,
        };
    },
});

describe('Scripts', () => {
    let page: Page;

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(`file:${path.join(__dirname, 'index.html')}`);
    });

    it('Все скрипты исполнились', async () => {
        const normalizedTextElements = await page.evaluate(() =>
            Array.from(document.body.childNodes)
                .filter((item) => item.nodeType === Node.TEXT_NODE)
                .map((item) => item.nodeValue?.trim())
                .filter((item) => item),
        );

        expect(normalizedTextElements.length).toBe(4);
        expect(normalizedTextElements).toEqual(
            expect.arrayContaining(['inline', 'sync', 'defer', 'async']),
        );
    });

    it('Подключены скрипты с нужными параметрами', async () => {
        const normalizedScripts = await page.evaluate(() =>
            Array.from(document.body.getElementsByTagName('script')).map(
                (item) => {
                    return {
                        src: item.src,
                        async: item.async,
                        defer: item.defer,
                    };
                },
            ),
        );

        expect(normalizedScripts.length).toBe(4);

        expect(normalizedScripts).toHaveScriptWithParams({
            src: '',
            async: false,
            defer: false,
        });

        expect(normalizedScripts).toHaveScriptWithParams({
            src: 'scripts/sync.js',
            async: false,
            defer: false,
        });

        expect(normalizedScripts).toHaveScriptWithParams({
            src: 'scripts/async.js',
            async: true,
            defer: false,
        });

        expect(normalizedScripts).toHaveScriptWithParams({
            src: 'scripts/defer.js',
            async: false,
            defer: true,
        });
    });
});
