import { expect, test } from 'vitest';
import {
    isTimeInTimeframe,
    normaliseTimeframe,
    type Timeframe,
    type TimeframeNormalised,
} from './lib';


test.for<{
    frame: Timeframe;
    expected: TimeframeNormalised;
}>([
    {
        frame:    { start: 1, end: 10 },
        expected: { start: 1, end: 10 },
    },
    {
        frame:    { start: 1 },
        expected: { start: 1, end: Infinity },
    },
    {
        frame:    {           end: 10 },
        expected: { start: 0, end: 10 },
    },
    {
        frame:    {},
        expected: { start: 0, end: Infinity },
    },
    {
        frame:    { start: NaN, end: NaN },
        expected: { start: 0,   end: Infinity },
    },
    {
        frame:    { start: -5, end: 2 },
        expected: { start: 0,  end: 2 },
    },
    {
        frame:    { start: 10, end: 5 },
        expected: { start: 10, end: 10 },
    },
])(`normaliseTimeframe($frame) => $expected`, ({ frame, expected }) =>
{
    expect(normaliseTimeframe(frame)).toEqual(expected);
});


test.for([
    { t: 5, frame: { start: 0, end: 10 }, expected: true },
    { t: 0, frame: { start: 0, end: 10 }, expected: true },
    { t: 10, frame: { start: 0, end: 10 }, expected: false },
    { t: 11, frame: { start: 0, end: 10 }, expected: false },
    { t: 123, frame: { start: 10 }, expected: true },
    { t: 123, frame: { end: 124 }, expected: true },
    { t: 1, frame: { start: 2 }, expected: false },
    { t: 69, frame: { end: 67 }, expected: false },
    { t: 1234567890, frame: {}, expected: true },
])(`isTimeInTimeframe($t, $frame) => $expected`, ({ t, frame, expected }) =>
{
    expect(isTimeInTimeframe(t, frame)).toBe(expected);
});
