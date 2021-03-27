'use strict';

const YEAR = 2021;
/**
 * 0 Sunday
 * 1 Monday
 * 2 Tuesday
 * 3 Wednesday
 * 4 Thursday
 * 5 Friday
 * 6 Saturday
 */
const WORKDAYS: { [workday: number]: number } = {
    1: 8.5,
    2: 8.5,
    3: 8.5,
    4: 8.5,
    5: 6
};
const HOLIDAYS: { [day: string]: string } = {
    '01/01': 'Año nuevo',
    '06/01': 'Reyes',
    '19/03': 'Festivo Regional',
    '01/04': 'Semana Santa',
    '02/04': 'Semana Santa',
    '05/04': 'Semana Santa',
    '01/05': 'Festivo nacional',
    '31/07': 'Festivo local',
    '27/08': 'Festivo local',
    '12/10': 'Festivo nacional',
    '01/11': 'Festivo nacional',
    '06/12': 'Festivo nacional',
    '08/12': 'Festivo nacional',
    '24/12': 'Festivo Lookiero',
    '25/12': 'Festivo nacional',
    '31/12': 'Festivo Lookiero',
};
const VACATION_DAYS = 22;
const VACATION_HOURS_PER_DAY = 8;

const EXPECTED_WORK_HOURS = 1735;

interface Day {
    date: Date;
    holiday: string | null;
    workHours: number;
}

function getDaysOfYear(): Day[] {
    const firstDayTimestamp = Date.UTC(YEAR, 0, 1);
    const currentDate = new Date(firstDayTimestamp);

    const result = new Array<Day>();
    while(true) {
        if (currentDate.getUTCFullYear() > YEAR) break;

        const holiday = getHoliday(currentDate);
        const workHours = getWorkHours(currentDate);
        result.push({
            date: new Date(currentDate.valueOf()),
            holiday,
            workHours: !holiday ? workHours : 0,
        })

        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return result;
}

function getWorkHours(date: Date): number {
    const workDay = date.getUTCDay();
    return WORKDAYS[workDay] || 0;
}

function getHoliday(date: Date): string | null {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth()+1).toString().padStart(2, '0');
    return HOLIDAYS[`${day}/${month}`] || null;
}

function countWorkHours(days: Day[]) {
    return days.reduce((c, day) => c + day.workHours, 0)
}

function getVacationHours(): number {
    return VACATION_DAYS * VACATION_HOURS_PER_DAY;
}

const days = getDaysOfYear();
const workHours = countWorkHours(days);
const vacationHours = getVacationHours();
const effectiveWorkHours = workHours - vacationHours;
const workHoursDiff = effectiveWorkHours - EXPECTED_WORK_HOURS;

console.log('Work hours', workHours);
console.log('Vacation hours', vacationHours);
console.log('Expected work hours', EXPECTED_WORK_HOURS)
console.log('Effective work hours', effectiveWorkHours, `(${workHoursDiff > 0 ? '+' : ''}${workHoursDiff})`);
