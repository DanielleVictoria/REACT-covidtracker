import {VisitedPlace} from "../models/VisitedPlace";
import {getDateNDaysAgo, getDateWithoutTimestamp} from "../services/DateHelperService";

export const getAllPlaces = (visitedPlaces: VisitedPlace[]): string[] => {
    const places = visitedPlaces.map(place => place.place);
    return Array.from(new Set(places));
}

export const getVisitedPlacesChartData = (
    visitedPlaces: VisitedPlace[],
): { x: number, y: number }[] => {

    const daysInterval = 6;
    const dateToday = new Date();
    const initialDate = getDateNDaysAgo(daysInterval, dateToday);

    let dateMap: { [date: string]: number } = {};
    let results: { x: number, y: number }[] = [];
    let counter = 0;

    let filteredVisitedPlaces = visitedPlaces.filter((visitedPlace) => {
        const currentValueDate = visitedPlace.date;
        return initialDate < currentValueDate && currentValueDate <= dateToday
    });

    filteredVisitedPlaces.forEach(value => {
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
