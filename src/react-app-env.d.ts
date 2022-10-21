/// <reference types="react-scripts" />

declare namespace jest {
    interface IScriptParams {
        src: string;
        defer: boolean;
        async: boolean;
    }

    interface Matchers<R> {
        toHaveScriptWithParams(expected: jest.IScriptParams): R;
    }
}
