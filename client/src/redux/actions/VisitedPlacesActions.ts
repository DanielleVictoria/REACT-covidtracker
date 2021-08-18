import {Dispatch} from "react";
import * as service from "../../services/VisitedPlaceService";
import * as types from "./ActionTypes";
import {VisitedPlace} from "../../models/VisitedPlace";

export async function getAllVisitedPlaces(dispatch: Dispatch<any>) {
    try {
        const data = await service.getAllVisitedPlaces();
        dispatch(getAllVisitedPlacesSuccess(data));
    } catch (e) {
        alert(e);
    }
}

export function getAllVisitedPlacesSuccess(visitedPlaces: VisitedPlace[]) {
    return {
        type: types.GET_ALL_VISITED_PLACES_SUCCESS,
        payload: {
            visitedPlaces
        },
    };
}

export async function addVisitedPlace(dispatch: Dispatch<any>, payload: VisitedPlace) {
    try {
        const data = await service.addVisitedPlace(payload);
        dispatch(addVisitedPlaceSuccess(data));
    } catch (e) {
        alert(e);
    }
}

export function addVisitedPlaceSuccess(visitedPlace: VisitedPlace) {
    return {
        type: types.ADD_VISITED_PLACES_SUCCESS,
        payload: {
            visitedPlace
        },
    };
}

export async function updateVisitedPlace(dispatch: Dispatch<any>, _id: string, payload: VisitedPlace) {
    try {
        const data = await service.updateVisitedPlace(_id, payload);
        dispatch(updateVisitedPlaceSuccess(_id, data));
    } catch (e) {
        alert(e);
    }
}

export function updateVisitedPlaceSuccess(_id: string, visitedPlace: VisitedPlace) {
    return {
        type: types.UPDATE_VISITED_PLACES_SUCCESS,
        payload: {
            _id,
            visitedPlace
        },
    };
}

export async function deleteVisitedPlace(dispatch: Dispatch<any>, _id: string) {
    try {
        const data = await service.deleteVisitedPlace(_id);
        dispatch(deleteVisitedPlaceSuccess(_id));
    } catch (e) {
        alert(e);
    }
}

export function deleteVisitedPlaceSuccess(_id: string) {
    return {
        type: types.DELETE_VISITED_PLACES_SUCCESS,
        payload: {
            _id,
        },
    };
}
