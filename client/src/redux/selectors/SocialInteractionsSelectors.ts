import {SocialInteraction} from "../../models/SocialInteraction";
import {getDateNDaysAgo, getDateWithoutTimestamp} from "../../services/DateHelperService";

export const getAllNames = (socialInteractions: SocialInteraction[]): string[] => {
    const names = socialInteractions.map(socialInteraction => socialInteraction.name);
    return Array.from(new Set(names));
}

export const getSocialInteractionsChartData = (socialInteractions: SocialInteraction[]): { x: number, y: number }[] => {

    const lastDays = 7;
    const dateToday = new Date();

    const last7DaysDate = getDateNDaysAgo(lastDays, dateToday);

    let filteredSocialInteractions = socialInteractions.filter((socialInteraction) => {
        const currentValueDate = new Date(socialInteraction.date);
        return last7DaysDate < currentValueDate && currentValueDate < dateToday
    });

    let dateMap: { [date: string]: number } = {};

    filteredSocialInteractions.forEach(value => {
        const dateString = getDateWithoutTimestamp(new Date(value.date)).toString();
        dateMap[dateString] ? ++dateMap[dateString] : dateMap[dateString] = 1;
    });

    let results: { x: number, y: number }[] = [];
    let counter = 0;
    for (let i = lastDays; i > 0; i--) {
        const date = getDateNDaysAgo(i, dateToday);
        results.push({
            x: ++counter,
            y: dateMap[date.toString()] ?? 0
        });
    }

    return results;

}
