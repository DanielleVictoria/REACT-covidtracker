import {SocialInteraction} from "../../models/SocialInteraction";
import {getDateNDaysAgo, getDateWithoutTimestamp} from "../../services/DateHelperService";

/**
 * Gets all names of social interactions with no duplicates
 * @param socialInteractions
 */
export const getAllNames = (socialInteractions: SocialInteraction[]): string[] => {
    const names = socialInteractions.map(socialInteraction => socialInteraction.name);
    return Array.from(new Set(names));
}

export const formatResults = (socialInteractions: SocialInteraction[]): SocialInteraction[] => {
    return socialInteractions.map((socialInteraction) => ({
        ...socialInteraction,
        date: new Date(socialInteraction.date)
    }));
}


/**
 * Maps an array of social interaction into {x,y} objects that matches Victory chart library
 * @param socialInteractions
 * @param lastDays
 * @param dateToday
 */
export const getSocialInteractionsChartData = (
    socialInteractions: SocialInteraction[],
    lastDays = 6,
    dateToday = new Date()
): { x: number, y: number }[] => {

    const last7DaysDate = getDateNDaysAgo(lastDays, dateToday);
    let dateMap: { [date: string]: number } = {};
    let results: { x: number, y: number }[] = [];
    let counter = 0;

    let filteredSocialInteractions = socialInteractions.filter((socialInteraction) => {
        const currentValueDate = new Date(socialInteraction.date);
        return last7DaysDate < currentValueDate && currentValueDate <= dateToday
    });

    filteredSocialInteractions.forEach(value => {
        const dateString = getDateWithoutTimestamp(new Date(value.date)).toString();
        dateMap[dateString] ? ++dateMap[dateString] : dateMap[dateString] = 1;
    });

    for (let i = lastDays; i >= 0; i--) {
        const date = getDateNDaysAgo(i, dateToday);
        results.push({
            x: ++counter,
            y: dateMap[date.toString()] ?? 0
        });
    }

    return results;

}
