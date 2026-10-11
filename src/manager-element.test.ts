import { expect, test } from 'vitest';
import { ManagerElement } from '.';


test('should correctly construct ManagerElement object', () =>
{
    const e = new ManagerElement(
        document.createElement('button'),
        document.createElement('div'),
        {},
    );

    expect(e).toBeInstanceOf(ManagerElement);
    expect(e.e).toBeInstanceOf(HTMLElement);
    expect(e.parent).toBeInstanceOf(HTMLElement);
    expect(e.id).toBeTypeOf('string');

    expect(e.isMounted()).toBe(false);
    expect(e.e.parentElement).toBeNull();
});


test('should correctly mount/unmount', () =>
{
    const e = new ManagerElement(
        document.createElement('button'),
        document.createElement('div'),
        {},
    );

    e.mount();

    expect(e.isMounted()).toBe(true);
    expect(e.e.parentElement).toBe(e.parent);

    e.unmount();

    expect(e.isMounted()).toBe(false);
    expect(e.e.parentElement).toBeNull();
});


test.for([
    { tf: { start: 2, end: 5 }, t: 1, expected: false },
    { tf: { start: 2, end: 5 }, t: 2, expected: true },
    { tf: { start: 2, end: 5 }, t: 3, expected: true },
    { tf: { start: 2, end: 5 }, t: 4.9999, expected: true },
    { tf: { start: 2, end: 5 }, t: 5, expected: false },
    { tf: { start: 2, end: 5 }, t: 6, expected: false },
    { tf: { start: 2 }, t: 1, expected: false },
    { tf: { start: 2 }, t: 3, expected: true },
    { tf: { end: 2 }, t: 1, expected: true },
    { tf: { end: 2 }, t: 3, expected: false },
    { tf: {}, t: /* can be any non-negative number */ 123456, expected: true },
])('', ({ tf, t, expected }) =>
{
    const e = new ManagerElement(
        document.createElement('button'),
        document.createElement('div'),
        tf,
    );

    expect(e.shouldDisplay(t)).toBe(expected);
});
