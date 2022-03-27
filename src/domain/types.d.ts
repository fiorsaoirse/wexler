export type Brand<T, B extends string> = T & { readonly _brand: B };

export type TestConclusion = Brand<string, 'wexler_test_conclusion'>;

export type TestDate = Brand<Date, 'wexler_test_date'>;

export type StudentName = Brand<string, 'student_name'>;

export type StudentDate = Brand<Date, 'student_date'>;

export type StudentGender = 'male' | 'female';

export type SubtestName = Brand<TestName, 'subtest'>;

export interface IStudent {
    name: StudentName | null;
    birthDate: StudentDate | null;
    gender: StudentGender;
    isMale: boolean;
}

export interface IPeriod {
    awareness: AwarenessSubtest;
    comprehensibility: ComprehensibilitySubtest;
    arithmetic: ArithmeticSubtest;
    similarity: SimilaritySubtest;
    lexical: LexicalSubtest;
    digits: DigitsRepeatSubtest;
    details: DetailsSubtest;
    images: ImagesSubtest;
    cubes: CubesSubtest;
    figures: FiguresSubtest;
    encryption: EncryptionSubtest;
    labyrinths: LabyrinthsSubtest;
}

export interface ISubtest {
    readonly name: SubtestName;
    rawPoints: number | null;
    scalePoints: number | null;
    normalPoints: number | null;
    isInvalid: boolean;
    isEmpty: boolean;
    maxAvaiableValue: number;
    update: (points: number | null) => ISubtest;
}

export interface IResultIQPoints {
    verbalIQ: number;
    inverbalIQ: number;
    commonIQ: number;
}

export interface IResultPoints {
    verbal: number;
    inverbal: number;
    common: number;
}

export type TestName = keyof IPeriod;

export type FileName = Brand<string, 'file_name'>;

export type FileContent = Brand<string, 'file_content'>;

export type FileType = 'application/json';

export type StringifiedDateType = string;

export interface IConclusionDto {
    readonly conclusion: string;
}

export interface IDateDto {
    readonly date: StringifiedDateType;
}

export interface IStudentDto {
    readonly name: string | null;
    readonly birthDate: Date | null;
    readonly gender: StudentGender;
}

export interface ISubtestDto {
    readonly name: string;
    readonly rawPoints: number | null;
}

export interface IPeriodDto {
    readonly type: string;
    readonly verbalSubtests: ReadonlyArray<ISubtestDto>;
    readonly inverbalSubtests: ReadonlyArray<ISubtestDto>;
}