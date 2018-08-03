/**
 * Normalize a date value to milliseconds from epoch.
 *
 * @param {number|string|Date|null|void} dt
 * @returns {number|null}
 * @throws {Error} if `dt` is truthy and cannot be parsed to a valid date.
 */
export function getDateTime(dt) {
    if (!dt && dt !== 0) {
        return null;
    }

    const time = new Date(dt).getTime();

    if (Number.isNaN(time)) {
        throw new Error(`Invalid date: ${dt}`);
    }

    return time;
}
