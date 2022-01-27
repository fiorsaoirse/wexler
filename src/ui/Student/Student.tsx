import {
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup, TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useTranslation } from 'react-i18next';
import { ru } from 'date-fns/locale';
import React, { ChangeEvent } from 'react';
import { useUpdateStudent, useUpdateStudentBirthdate } from '../../services/useUpdateStudent';
import { useStudentStorage } from '../../repository/storageAdapter';
import { StudentKey } from '../../domain/use-cases';
import { Student } from '../../domain/entities/student/student';
import { Masks } from '../constants';

const FIELD_CSS_CLASS = 'student-container__field';

export const StudentSection = (): JSX.Element => {
    const { t } = useTranslation();
    const { student } = useStudentStorage();

    const updateStudent = useUpdateStudent();
    const updateStudentBirthdate = useUpdateStudentBirthdate();

    const femaleLabel = t('student.gender.female');
    const maleLabel = t('student.gender.male');

    const propertyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const property = (event.target.id || event.target.name) as StudentKey;
        const value = event.target.value as Student[StudentKey];
        updateStudent(property, value);
    };

    return (
        <React.Fragment>
            <FormControl component="fieldset" className={FIELD_CSS_CLASS}>
                <TextField
                    id="name"
                    type="text"
                    label={t('student.fio')}
                    onChange={propertyHandler}
                    value={student.name}
                />
            </FormControl>

            <FormControl component="fieldset" className={FIELD_CSS_CLASS}>
                <LocalizationProvider dateAdapter={AdapterDateFns}
                    locale={ru}>
                    <DatePicker
                        label={t('student.birthdate')}
                        value={student.birthDate}
                        mask={Masks.Date}
                        onChange={updateStudentBirthdate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl>

            <FormControl component="fieldset" className={FIELD_CSS_CLASS}>
                <FormLabel component="legend">{t('student.gender.title')}</FormLabel>
                <RadioGroup
                    id="gender"
                    aria-label="gender"
                    name="gender"
                    value={student.gender}
                    onChange={propertyHandler}
                >
                    <FormControlLabel
                        name="gender"
                        value="male"
                        control={<Radio />}
                        label={maleLabel}
                    />
                    <FormControlLabel
                        name="gender"
                        value="female"
                        control={<Radio />}
                        label={femaleLabel}
                    />
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    );
};
