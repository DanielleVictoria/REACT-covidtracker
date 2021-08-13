import {Row} from "react-table";
import {getAcceptableDates, getDateWithoutTimestamp} from "../services/DateHelperService";

export const filterLastNDaysFromTableObject = (rows: Array<Row>, columnIds: Array<string>, daysToGoBack: number) => {

    const acceptableDates = getAcceptableDates(daysToGoBack);

    return rows.filter((row) => {
        try {
            return acceptableDates.includes(getDateWithoutTimestamp(new Date((row.original as any).date)).toString());
        } catch {
            return false;
        }
    });

}
