import { expect, test } from 'vitest';
import { simpleUUID } from './lib';


test('should generate simple uuid', () =>
{
    const uuid = simpleUUID();
    expect(uuid).toBeTypeOf('string');
    expect(uuid).toMatch(/^[a-zA-Z0-9]+$/);
});
