import {Dispatch} from "react";
import * as service from "../../services/SocialInteractionService";
import * as types from "./ActionTypes";
import {SocialInteraction} from "../../models/SocialInteraction";

export async function getAllSocialInteractions(dispatch: Dispatch<any>) {
    try {
        const data = await service.getAllSocialInteractions();
        dispatch(getAllSocialInteractionsSuccess(data));
    } catch (e) {
        alert(e);
    }
}

export function getAllSocialInteractionsSuccess(socialInteractions: SocialInteraction[]) {
    return {
        type: types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS,
        payload: {
            socialInteractions
        },
    };
}

export async function addSocialInteraction(dispatch: Dispatch<any>, payload: SocialInteraction) {
    try {
        const data = await service.addSocialInteraction(payload);
        dispatch(addSocialInteractionSuccess(data));
    } catch (e) {
        alert(e);
    }
}

export function addSocialInteractionSuccess(socialInteraction: SocialInteraction) {
    return {
        type: types.ADD_SOCIAL_INTERACTION_SUCCESS,
        payload: {
            socialInteraction
        },
    };
}

export async function updateSocialInteraction(dispatch: Dispatch<any>, _id: string, payload: SocialInteraction) {
    try {
        const data = await service.updateSocialInteraction(_id, payload);
        dispatch(updateSocialInteractionSuccess(_id, data));
    } catch (e) {
        alert(e);
    }
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

export async function deleteSocialInteraction(dispatch: Dispatch<any>, _id: string) {
    try {
        const data = await service.deleteSocialInteraction(_id);
        dispatch(deleteSocialInteractionSuccess(_id));
    } catch (e) {
        alert(e);
    }
}

export function deleteSocialInteractionSuccess(_id: string) {
    return {
        type: types.DELETE_SOCIAL_INTERACTION_SUCCESS,
        payload: {
            _id,
        },
    };
}



