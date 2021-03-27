'use strict';

import { yellow, cyan, bold, gray, brightRed, brightGreen } from 'https://deno.land/std@0.91.0/fmt/colors.ts';
import { years, YearConfig } from './config.ts';

const MARGIN = ''.padStart(2, ' ');

function main() {
    console.log();
    Object.keys(years).map(y => parseInt(y)).forEach((year) => {
        printYearTitle(year);
        const config = years[year];

        const days = getDaysOfYear(config, year);
        const workHours = countWorkHours(days);
        const vacationHours = getVacationHours(config);
        const expectedWorkHours = config.expectedWorkHours;

        const effectiveWorkHours = workHours - vacationHours;
        const workHoursDiff = effectiveWorkHours - expectedWorkHours;

        printTable([
            ['Work hours', fmtNum(workHours)],
            ['Vacation hours', fmtNum(vacationHours)],
            ['Expected work hours', fmtNum(expectedWorkHours)],
            ['Effective work hours', `${fmtNum(effectiveWorkHours)} ${fmtDiff(workHoursDiff)}`]
        ])
        console.log();
    });
}

function fmtNum(n: number) {
    return yellow(n.toString());
}

function fmtDiff(n: number) {
    if (n > 0) {
        return `(${brightRed('+' + n.toString())})`
    }
    return `(${brightGreen(n.toString())})`
}

function printYearTitle(year: number) {
    console.log(`${MARGIN}${bold('Year')} ${bold(cyan(year.toString()))}`);
}

function printTable(data: any[][]) {
    const longestDescriptionLength = Math.max.apply(null, data.map(line => (line[0].toString() as string).length)) + 3;
    data.forEach(line => {
        const description = (line[0].toString() as string);
        const value = (line[1].toString() as string);
        const spacing = gray(''.padEnd(longestDescriptionLength - description.length, '.'));
        console.log(`${MARGIN}${description} ${spacing} ${value}`);
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
