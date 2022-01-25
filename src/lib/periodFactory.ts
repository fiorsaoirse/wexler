import differenceInDays from 'date-fns/differenceInDays';
import { FiveYearsFromZeroToThreeMonths, Period } from '../domain/entities/period';
import { StudentDate } from '../domain/entities/student/student';
import { TestDate } from '../domain/types';

export const periodFactory = (testDate: TestDate, studentBirthDate: StudentDate): Period | null => {
    console.log('inside period factory');

    const daysCount = differenceInDays(testDate, studentBirthDate);

    switch (true) {
        // 5 years 0 months - 5 years 3 months
        case (daysCount >= 1825 && daysCount <= 1915):
            return new FiveYearsFromZeroToThreeMonths();

        default:
            return null;
    }
};