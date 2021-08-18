import {Dispatch} from "react";
import * as service from "../../services/VisitedPlaceService";
import * as types from "./ActionTypes";
import {VisitedPlace} from "../../models/VisitedPlace";

export function getAllVisitedPlaces(dispatch: Dispatch<any>) {
    service
        .getAllVisitedPlaces()
        .then((results) => dispatch(getAllVisitedPlacesSuccess(results)))
}

export function getAllVisitedPlacesSuccess(visitedPlaces: VisitedPlace[]) {
    return {
        type: types.GET_ALL_VISITED_PLACES_SUCCESS,
        payload: {
            visitedPlaces
        },
    };
}

export function addVisitedPlace(dispatch: Dispatch<any>, payload: VisitedPlace) {
    service
        .addVisitedPlace(payload)
        .then(visitedPlace => dispatch(addVisitedPlaceSuccess(visitedPlace)))
}

export function addVisitedPlaceSuccess(visitedPlace: VisitedPlace) {
    return {
        type: types.ADD_VISITED_PLACES_SUCCESS,
        payload: {
            visitedPlace
        },
    };
}

export function updateVisitedPlace(dispatch: Dispatch<any>, _id: string, payload: VisitedPlace) {
    service
        .updateVisitedPlace(_id, payload)
        .then(result => dispatch(updateVisitedPlaceSuccess(_id, result)))
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

export function deleteVisitedPlace(dispatch: Dispatch<any>, _id: string) {
    service
        .deleteVisitedPlace(_id)
        .then(() => dispatch(deleteVisitedPlaceSuccess(_id)))
}

export function deleteVisitedPlaceSuccess(_id: string) {
    return {
        type: types.DELETE_VISITED_PLACES_SUCCESS,
        payload: {
            _id,
        },
    };
}
