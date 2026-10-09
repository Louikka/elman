/**
 * Defines timeframe with start and end timestamps.
 */
export interface Timeframe {
    /**
     * Non-negative timestamp (in seconds). Omitting (or setting to invalid
     * value) defaults to `0`.
     */
    start?: number;
    /**
     * Non-negative timestamp (in seconds) that is greater than or equal to
     * {@link Timeframe.start}. Omitting (or setting to invalid value)
     * defaults to `Infinity`.
     */
    end?: number;
}

/**
 * Normalised {@link Timeframe}.
 */
export type TimeframeNormalised = Required<Timeframe>;

export function normaliseTimeframe(frame: Timeframe): TimeframeNormalised
{
    if (frame.start === undefined || Number.isNaN(frame.start) || frame.start < 0)
    {
        frame.start = 0;
    }

    if (frame.end === undefined || Number.isNaN(frame.end))
    {
        frame.end = Infinity;
    }

    if (frame.end < frame.start)
    {
        frame.end = frame.start;
    }

    return frame as TimeframeNormalised;
}

export function isTimeInTimeframe(t: number, frame: Timeframe): boolean
{
    const f = normaliseTimeframe(frame);
    return t >= f.start && t < f.end;
}
