import {SocialInteraction} from "../models/SocialInteraction";
import {NumberOfSocialInteraction} from "../models/NumberOfSocialInteraction";
import {getDateNDaysAgo, getDateWithoutTimestamp} from "./DateHelperService";

const SOCIAL_INTERACTION_URL = 'http://localhost:5000/api/social-interactions';

export const getAllSocialInteractions = (): Promise<SocialInteraction[]> => {

    const requestOptions = {
        method: 'GET'
    }

    return fetch(SOCIAL_INTERACTION_URL, requestOptions)
        .then((response) => response.json())
        .catch(error => console.error(error));
}

export const getAllNames = (socialInteractions: SocialInteraction[]): Promise<string[]> => {
    return getAllSocialInteractions()
        .then((results) => results.map(result => result.name))
        .then((names) => Array.from(new Set(names)))
}

// export const getAllNames = (socialInteractions: SocialInteraction[]): string[] => {
//     const names = socialInteractions.map(socialInteraction => socialInteraction.name);
//     return Array.from(new Set(names));
// }

/**
 * Gets the number of social interactions for the last n days in any given date.
 * @param lastDays
 * @param date
 */
export const getNumberOfSocialInteractions =
    (lastDays: number, date: Date): Promise<NumberOfSocialInteraction> => {

        const lastNDaysDate = getDateNDaysAgo(lastDays, date);

        return getAllSocialInteractions()
            .then(socialInteractions => {

                let filteredSocialInteractions = socialInteractions.filter((socialInteraction) => {
                    const currentValueDate = new Date(socialInteraction.date);
                    return lastNDaysDate < currentValueDate && currentValueDate < date
                });

                let results: { [date: string]: number } = {};

                filteredSocialInteractions.forEach(value => {
                    const dateString = getDateWithoutTimestamp(new Date(value.date)).toString();
                    results[dateString] ? ++results[dateString] : results[dateString] = 1;
                });

                return results;

            })

    }

export const addSocialInteraction = (socialInteraction: SocialInteraction) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(socialInteraction)
    }

    return fetch(SOCIAL_INTERACTION_URL, requestOptions)
        .then((response) => response.json());
}


