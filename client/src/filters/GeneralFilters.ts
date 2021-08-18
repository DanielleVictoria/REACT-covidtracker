import {getAcceptableDates, getDateWithoutTimestamp} from "../services/DateHelperService";

export const formatDate = (dataArr: any[]): any[] => {
    return dataArr.map((data) => ({
        ...data,
        date: new Date(data.date)
    }));
}

export const filterLastNDays = (daysToGoBack: number, dataArr: any[]): any[] => {
    const acceptableDates = getAcceptableDates(daysToGoBack);
    let results = dataArr.filter(data => (
        acceptableDates.includes(getDateWithoutTimestamp(data.date).toString()))
    );
    return results.length !== 0 ? results : [];
}

