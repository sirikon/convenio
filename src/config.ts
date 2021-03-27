export interface YearConfig {
    expectedWorkHours: number;
    /**
     * 0 Sunday
     * 1 Monday
     * 2 Tuesday
     * 3 Wednesday
     * 4 Thursday
     * 5 Friday
     * 6 Saturday
     */
    workdays: { [day: number]: number };
    holidays: { [date: string]: string };
    vacations: {
        days: number;
        hoursPerDay: number;
    }
}

export type YearConfigMap = { [year: number]: YearConfig };

export const years: YearConfigMap = {
    2020: {
        expectedWorkHours: 1735,
        workdays: {
            1: 8.5,
            2: 8.5,
            3: 8.5,
            4: 8.5,
            5: 6
        },
        holidays: {
            '01/01': 'Año nuevo',
            '06/01': 'Reyes',
            '19/03': 'Festivo Regional',
            '09/04': 'Semana Santa',
            '10/04': 'Semana Santa',
            '13/04': 'Semana Santa',
            '01/05': 'Festivo nacional',
            '25/07': 'Festivo regional',
            '31/07': 'Festivo local',
            '15/08': 'Festivo local',
            '28/08': 'Festivo local',
            '12/10': 'Festivo nacional',
            '08/12': 'Festivo nacional',
            '24/12': 'Festivo Lookiero',
            '25/12': 'Festivo nacional',
            '31/12': 'Festivo Lookiero',
        },
        vacations: {
            days: 22,
            hoursPerDay: 8
        }
    },
    2021: {
        expectedWorkHours: 1735,
        workdays: {
            1: 8.5,
            2: 8.5,
            3: 8.5,
            4: 8.5,
            5: 6
        },
        holidays: {
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
        },
        vacations: {
            days: 22,
            hoursPerDay: 8
        }
    },
}
