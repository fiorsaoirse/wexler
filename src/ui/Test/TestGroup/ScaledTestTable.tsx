import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Period } from '../../../domain/entities/period';
import { isNil, formatClassNames } from '../../../lib/utils';
import { ScaledTestItem } from '../index';

type ScaledTestTableProps = {
    period: Period;
};

export const ScaledTestTable = (props: ScaledTestTableProps): JSX.Element => {
    const { t } = useTranslation();
    const { period } = props;

    const verbals = period.verbalSubtests;
    const inverbals = period.inverbalSubtests;

    const verbalScaleSum = verbals.reduce((acc, current) => acc + (current.scalePoints ?? 0), 0);
    const inverbalScaleSum = inverbals.reduce((acc, current) => acc + (current.scalePoints ?? 0), 0);

    const verbal = Period.getTruePoints(verbals, verbalScaleSum);
    const inverbal = Period.getTruePoints(inverbals, inverbalScaleSum);
    const common = Number(verbal) + Number(inverbal);

    const { verbalIQ, inverbalIQ, commonIQ } = Period.getIQPoints({ verbal, inverbal, common });

    const getResultRow = (key: string, value: number, secondValue?: number): JSX.Element => {
        const classNames = formatClassNames({
            'field': true,
            'field-cell': true,
            'field-cell__marked': true,
        });

        return (
            <TableRow key={`${key}-result`}>
                <TableCell colSpan={2} key={`${key}-label`} component="th" scope="row" className={classNames}>
                    {t(`common.tabs.results.subtests.${key}`)}
                </TableCell>
                <TableCell key="verbal-value" align="right" className={classNames}>
                    <span>{ value }</span>
                    {
                        isNil(secondValue)
                            ? null
                            : <span>/{ secondValue }</span>
                    }
                </TableCell>
            </TableRow>
        );
    };

    const verbalSumRow = getResultRow('verbal', verbalScaleSum, verbal);
    const inverbalSumRow = getResultRow('inverbal', inverbalScaleSum, inverbal);

    const commonSumRow = getResultRow('common', common);

    const iqVerbalRow = getResultRow('iq-verbal', verbalIQ);
    const iqInverbalRow = getResultRow('iq-inverbal', inverbalIQ);
    const iqCommonRow = getResultRow('iq-common', commonIQ);
   
    return (
        <React.Fragment>
            <div className="table-container">
                <TableContainer className="table-container__table">
                    <Table className="table-container__table-content" aria-label="Verbal subtest result table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-container__table-content-header">
                                    {t('subtest.table.header.name')}
                                </TableCell>
                                <TableCell className="table-container__table-content-header"
                                    width="20%" 
                                    align="right">
                                    {t('subtest.table.header.points')}
                                </TableCell>
                                <TableCell className="table-container__table-content-header"
                                    width="20%"
                                    align="right">
                                    {t('subtest.table.header.scaledPoints')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                verbals.map(subtest => <ScaledTestItem subtest={subtest}></ScaledTestItem>)
                            }
                            { verbalSumRow }
                        </TableBody>
                    
                    </Table>

                    <Table className="table-container__table-content" aria-label="Inverbal subtest result table">
                        <TableBody>
                            {
                                inverbals.map(subtest => <ScaledTestItem subtest={subtest}></ScaledTestItem>)
                            }
                            { inverbalSumRow }
                        </TableBody>
                    </Table>

                    <Table className="table-container__table-content" aria-label="Common subtest result table">
                        <TableBody>
                            { commonSumRow }
                            { iqVerbalRow }
                            { iqInverbalRow }
                            { iqCommonRow }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>
    );
};

