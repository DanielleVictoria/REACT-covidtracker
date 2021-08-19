import {AnyAction, Reducer} from "redux";
import * as types from "../actions/ActionTypes";
import {VisitedPlace} from "../../models/VisitedPlace";
import {formatDate} from "../../filters/GeneralFilters";

const visitedPlacesReducer: Reducer<VisitedPlace[], AnyAction> = (
    state: VisitedPlace[] = [],
    action: AnyAction
) => {
    switch (action.type) {

        case types.GET_ALL_VISITED_PLACES_SUCCESS:
            return formatDate(action["payload"].visitedPlaces as VisitedPlace[])

        case types.ADD_VISITED_PLACES_SUCCESS:
            return [...state, ...formatDate([action["payload"].visitedPlace])];

        case types.UPDATE_VISITED_PLACES_SUCCESS:
            return state.map((place) => {
                    if (place._id === action["payload"]._id) {
                        return {
                            ...action["payload"].visitedPlace,
                            date: new Date(action["payload"].visitedPlace.date)
                        };
                    } else {
                        return place;
                    }
                });

        case types.DELETE_VISITED_PLACES_SUCCESS:
            return state.filter((place) => place._id !== action["payload"]._id);

        default:
            return state;
    }
};

export default visitedPlacesReducer;
