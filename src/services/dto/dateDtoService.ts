import { IDtoService } from '../../domain/ports';
import { IDateDto, TestDate } from '../../domain/types';
import { useDateTransformService } from '../dateTransformAdapter';

const dateTransformService = useDateTransformService();

export const useDateDtoService = (): IDtoService<TestDate, IDateDto> => {
    return {
        toDto(from: TestDate): IDateDto {
            return { date: dateTransformService.toLocaleString(from as Date) };
        },
        toEntity(from: IDateDto): TestDate {
            return dateTransformService.fromLocaleString(from.date) as TestDate;
        },
    };
};