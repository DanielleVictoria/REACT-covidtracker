import {Dispatch} from "react";
import * as service from "../../services/SocialInteractionService";
import * as types from "./ActionTypes";
import {SocialInteraction} from "../../models/SocialInteraction";

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

export function updateSocialInteraction(dispatch: Dispatch<any>, _id: string, payload: SocialInteraction) {
    service
        .updateSocialInteraction(_id, payload)
        .then(result => dispatch(updateSocialInteractionSuccess(_id, result)))
}

export function updateSocialInteractionSuccess(_id: string, socialInteraction: SocialInteraction) {
    return {
        type: types.UPDATE_SOCIAL_INTERACTION_SUCCESS,
        payload: {
            _id,
            socialInteraction
        },
    };
}

export function deleteSocialInteraction(dispatch: Dispatch<any>, _id: string) {
    service
        .deleteSocialInteraction(_id)
        .then(() => dispatch(deleteSocialInteractionSuccess(_id)))
}

export function deleteSocialInteractionSuccess(_id: string) {
    return {
        type: types.DELETE_SOCIAL_INTERACTION_SUCCESS,
        payload: {
            _id,
        },
    };
}



