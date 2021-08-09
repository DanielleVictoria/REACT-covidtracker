export const getDateNDaysAgo = (lastDays: number, date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - lastDays);
}

export const getDayAndMonthNDaysAgo = (lastDays: number, date: Date) => {
    const result: string[] = [];
    for (let i = lastDays; i > 0; i--) {
        const resultDate = getDateNDaysAgo(i, date);
        result.push(`${resultDate.toLocaleString('default', {month: 'short'})}  ${resultDate.getDate().toString()}`);
    }
    return result;
}

export const getDateWithoutTimestamp = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
