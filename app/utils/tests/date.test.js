/**
 * Date util
 */

import { getDateTime } from '../date';

describe('date util', () => {
    it('should return null if falsey and non-zero', () => {
        expect(getDateTime(undefined)).toBe(null);
        expect(getDateTime(NaN)).toBe(null);
        expect(getDateTime(false)).toBe(null);
        expect(getDateTime('')).toBe(null);
        expect(getDateTime(null)).toBe(null);
    });

    it('should return time for valid parsable dates', () => {
        expect(getDateTime(0)).toBe(0);
        expect(getDateTime(true)).toBe(1);
        expect(getDateTime(1535226512657)).toBe(1535226512657);
        expect(getDateTime('2018-08-25T19:48:32.657Z')).toBe(1535226512657);
        expect(getDateTime(new Date(1535226512657))).toBe(1535226512657);
    });

    it('should throw error if invalid date', () => {
        expect(() => getDateTime('foo'))
            .toThrow('Invalid date: foo');

        expect(() => getDateTime(Infinity))
            .toThrow('Invalid date: Infinity');
    });
});
