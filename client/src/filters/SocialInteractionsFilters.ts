import {SocialInteraction} from "../models/SocialInteraction";
import {getAcceptableDates, getDateNDaysAgo, getDateWithoutTimestamp} from "../services/DateHelperService";

/**
 * Gets all names of social interactions with no duplicates
 * @param socialInteractions
 */
export const getAllNames = (socialInteractions: SocialInteraction[]): string[] => {
    const names = socialInteractions.map(socialInteraction => socialInteraction.name);
    return Array.from(new Set(names));
}

export const formatResultsSocialInteractions = (socialInteractions: SocialInteraction[]): SocialInteraction[] => {
    return socialInteractions.map((socialInteraction) => ({
        ...socialInteraction,
        date: new Date(socialInteraction.date)
    }));
}


/**
 * Maps an array of social interaction into {x,y} objects that matches Victory chart library
 * @param socialInteractions
 */
export const getSocialInteractionsChartData = (
    socialInteractions: SocialInteraction[],
): { x: number, y: number }[] => {

    const daysInterval = 6;
    const dateToday = new Date();
    const initialDate = getDateNDaysAgo(daysInterval, dateToday);

    let dateMap: { [date: string]: number } = {};
    let results: { x: number, y: number }[] = [];
    let counter = 0;

    let filteredSocialInteractions = socialInteractions.filter((socialInteraction) => {
        const currentValueDate = socialInteraction.date;
        return initialDate < currentValueDate && currentValueDate <= dateToday
    });

    filteredSocialInteractions.forEach(value => {
        const dateString = getDateWithoutTimestamp(value.date).toString();
        dateMap[dateString] ? ++dateMap[dateString] : dateMap[dateString] = 1;
    });

    for (let i = daysInterval; i >= 0; i--) {
        const date = getDateNDaysAgo(i, dateToday);
        results.push({
            x: ++counter,
            y: dateMap[date.toString()] ?? 0
        });
    }

    return results;

}

export const filterLastNDays = (daysToGoBack: number, socialInteractions: SocialInteraction[]): SocialInteraction[] => {
    const acceptableDates = getAcceptableDates(daysToGoBack);
    let results = socialInteractions.filter(interaction => (
        acceptableDates.includes(getDateWithoutTimestamp(interaction.date).toString()))
    );
    return results.length !== 0 ? results : [];
}
