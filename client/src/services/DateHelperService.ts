export const getDateNDaysAgo = (lastDays: number, date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - lastDays);
}

/**
 * Gets the data labels of the dates n days ago. For example, 2 days ago -> Aug 11
 * @param lastDays
 * @param date
 */
export const getDayAndMonthNDaysAgo = (lastDays: number, date: Date) => {
    const result: string[] = [];
    for (let i = lastDays - 1; i >= 0; i--) {
        const resultDate = getDateNDaysAgo(i, date);
        result.push(`${resultDate.toLocaleString('default', {month: 'short'})}  ${resultDate.getDate().toString()}`);
    }
    return result;
}

export const getDateWithoutTimestamp = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const getAcceptableDates = (daysToGoBack: number): string[] => {
    const acceptableDates: string[]= [];
    for (let i = daysToGoBack - 1; i >= 0; i--) {
        const resultDate = getDateNDaysAgo(i, new Date());
        acceptableDates.push(getDateWithoutTimestamp(resultDate).toString());
    }
    return acceptableDates;
}
