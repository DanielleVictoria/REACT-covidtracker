import {useEffect, useState} from "react";
import {getNumberOfSocialInteractions} from "../services/SocialInteractionService";
import {NumberOfSocialInteraction} from "../models/NumberOfSocialInteraction";
import {getDateNDaysAgo} from "../services/DateHelperService";

const useSocialInteractionsData = () => {

    const lastDays = 7;
    const today = new Date();

    const [socialInteractionsData, setSocialInteractionsData]
        = useState<NumberOfSocialInteraction>({});

    useEffect(
        () => {
            retrieveSocialInteractionData();
        },
        []
    )

    const retrieveSocialInteractionData = () => {
        getNumberOfSocialInteractions(lastDays, today).then(results => {
            setSocialInteractionsData(results);
        })
    }

    const getSocialInteractionChartData =
        (numberOfSocialInteractions: NumberOfSocialInteraction): { x: number, y: number }[] => {

            const results = [];
            let counter = 0;

            for (let i = lastDays; i > 0; i--) {
                const date = getDateNDaysAgo(i, today);
                results.push({
                    x: ++counter,
                    y: numberOfSocialInteractions[date.toString()] ?? 0
                });
            }

            return results;
        }

    return {
        socialInteractionsData,
        getSocialInteractionChartData,
        retrieveSocialInteractionData
    };
}

export default useSocialInteractionsData;
