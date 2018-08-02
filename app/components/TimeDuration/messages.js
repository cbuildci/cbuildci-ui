/*
 * TimeDuration Messages
 *
 * This contains all the text for the TimeDuration component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    duration: {
        id: 'app.components.TimeDuration.duration',
        defaultMessage:
            `{value, number} {unit, select,
                seconds {{value, plural, one {second} other {seconds} }}
                minutes {{value, plural, one {minute} other {minutes} }}
                hours {{value, plural, one {hour} other {hours} }}
                days {{value, plural, one {day} other {days} }}
                weeks {{value, plural, one {week} other {weeks} }}
                months {{value, plural, one {month} other {months} }}
                years {{value, plural, one {year} other {years} }}
            }`,
    },
});
