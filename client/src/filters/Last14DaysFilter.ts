import {Row} from "react-table";
import {getDateNDaysAgo, getDateWithoutTimestamp} from "../services/DateHelperService";

export const filterLast14Days = (rows: Array<Row>, columnIds: Array<string>, daysToGoBack: number) => {

    const acceptableDates: string[]= [];
    for (let i = daysToGoBack - 1; i >= 0; i--) {
        const resultDate = getDateNDaysAgo(i, new Date());
        acceptableDates.push(getDateWithoutTimestamp(resultDate).toString());
    }

    return rows.filter((row) => {
        try {
            return acceptableDates.includes(getDateWithoutTimestamp(new Date((row.original as any).date)).toString());
        } catch {
            return false;
        }
    });

}
