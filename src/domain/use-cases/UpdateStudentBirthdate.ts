import { isSameDay } from 'date-fns';
import { cloneDeep } from 'lodash-es';
import { periodFactory } from '../../lib/periodFactory';
import { StudentDate } from '../entities/student/student';
import { IMetadataStorageService, IPeriodStorageService, IStudentStorageService } from '../ports';

export interface IUpdateStudentBirhtdateUseCaseDependencies {
    studentStorage: IStudentStorageService;
    metadataStorage: IMetadataStorageService;
    periodStorage: IPeriodStorageService;
}

export const updateStudentBirthdateUseCase = (
    birthdate: Date | null,
    deps: IUpdateStudentBirhtdateUseCaseDependencies,
): void => {
    const { student, updateStudent } = deps.studentStorage;
    const { date } = deps.metadataStorage;
    const { updatePeriod } = deps.periodStorage;

    if (student.birthDate && birthdate && isSameDay(student.birthDate, birthdate)) {
        return;
    }

    const updatedStudent = cloneDeep(student);
    updatedStudent.birthDate = birthdate;

    updateStudent(updatedStudent);

    if (birthdate && date) {
        const period = periodFactory(date, birthdate as StudentDate);
        updatePeriod(period);
    }
};
