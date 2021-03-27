'use strict';

import { years, YearConfig } from './config.ts';

function main() {
    Object.keys(years).map(y => parseInt(y)).forEach((year) => {
        console.log('Year', year);
        const config = years[year];

        const days = getDaysOfYear(config, year);
        const workHours = countWorkHours(days);
        const vacationHours = getVacationHours(config);
        const expectedWorkHours = config.expectedWorkHours;

        const effectiveWorkHours = workHours - vacationHours;
        const workHoursDiff = effectiveWorkHours - expectedWorkHours;

        console.log('Work hours', workHours);
        console.log('Vacation hours', vacationHours);
        console.log('Expected work hours', config.expectedWorkHours)
        console.log('Effective work hours', effectiveWorkHours, `(${workHoursDiff > 0 ? '+' : ''}${workHoursDiff})`);
        console.log();
    });
}



interface Day {
    date: Date;
    holiday: string | null;
    workHours: number;
}

function getDaysOfYear(config: YearConfig, year: number): Day[] {
    const firstDayTimestamp = Date.UTC(year, 0, 1);
    const currentDate = new Date(firstDayTimestamp);

    const result = new Array<Day>();
    while(currentDate.getUTCFullYear() === year) {
        const holiday = getHoliday(config, currentDate);
        const workHours = getWorkHours(config, currentDate);
        result.push({
            date: new Date(currentDate.valueOf()),
            holiday,
            workHours: !holiday ? workHours : 0,
        })

        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return result;
}

function getWorkHours(config: YearConfig, date: Date): number {
    const workDay = date.getUTCDay();
    return config.workdays[workDay] || 0;
}

function getHoliday(config: YearConfig, date: Date): string | null {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth()+1).toString().padStart(2, '0');
    return config.holidays[`${day}/${month}`] || null;
}

function countWorkHours(days: Day[]) {
    return days.reduce((c, day) => c + day.workHours, 0)
}

function getVacationHours(config: YearConfig): number {
    return config.vacations.days * config.vacations.hoursPerDay;
}

main();
