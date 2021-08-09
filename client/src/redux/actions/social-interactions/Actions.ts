import {Dispatch} from "react";
import * as service from "../../../services/SocialInteractionService";
import * as types from "./ActionTypes";
import {SocialInteraction} from "../../../models/SocialInteraction";

export function getAllSocialInteractions(dispatch: Dispatch<any>) {
    service
        .getAllSocialInteractions()
        .then((socialInteractions) => dispatch(getAllSocialInteractionsSuccess(socialInteractions)))
}

export function getAllSocialInteractionsSuccess(socialInteractions: SocialInteraction[]) {
    return {
        type: types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS,
        payload: {
            socialInteractions
        },
    };
}

export function addSocialInteraction(dispatch: Dispatch<any>, payload: SocialInteraction) {
    service
        .addSocialInteraction(payload)
        .then(socialInteraction => dispatch(addSocialInteractionSuccess(socialInteraction)))
}

export function addSocialInteractionSuccess(socialInteraction: SocialInteraction) {
    return {
        type: types.ADD_SOCIAL_INTERACTION_SUCCESS,
        payload: {
            socialInteraction
        },
    };
}


