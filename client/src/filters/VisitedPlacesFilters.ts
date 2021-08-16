import {VisitedPlace} from "../models/VisitedPlace";
import {getAcceptableDates, getDateNDaysAgo, getDateWithoutTimestamp} from "../services/DateHelperService";

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

export const getAllPlaces = (visitedPlaces: VisitedPlace[]): string[] => {
    const places = visitedPlaces.map(place => place.place);
    return Array.from(new Set(places));
}

export const formatResultsVisitedPlaces = (visitedPlaces: VisitedPlace[]): VisitedPlace[] => {
    return visitedPlaces.map((place) => ({
        ...place,
        date: new Date(place.date)
    }));
}

export const filterLastNDaysVisitedPlaces = (daysToGoBack: number, data: VisitedPlace[]): VisitedPlace[] => {
    const acceptableDates = getAcceptableDates(daysToGoBack);
    let results = data.filter(place => (
        acceptableDates.includes(getDateWithoutTimestamp(place.date).toString()))
    );
    return results.length !== 0 ? results : [];
}
