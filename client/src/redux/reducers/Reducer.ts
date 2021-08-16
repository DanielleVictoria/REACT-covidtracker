import {initialState, StoreState} from "../StoreState";
import {AnyAction, Reducer} from "redux";
import * as types from "../actions/social-interactions/ActionTypes";
import {SocialInteraction} from "../../models/SocialInteraction";
import {formatResultsSocialInteractions} from "../../filters/SocialInteractionsFilters";
import {VisitedPlace} from "../../models/VisitedPlace";
import {formatResultsVisitedPlaces} from "../../filters/VisitedPlacesFilters";

// TODO : Is there a way to seperate the reducers for social interactions and visited places?
const reducer: Reducer<StoreState, AnyAction> = (
    state: StoreState = initialState,
    action: AnyAction
) => {
    switch (action.type) {

        case types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS:
            return {
                ...state,
                socialInteractions: formatResultsSocialInteractions(action["payload"].socialInteractions as SocialInteraction[])
            };

        case types.ADD_SOCIAL_INTERACTION_SUCCESS:
            return {
                ...state,
                socialInteractions: [...state.socialInteractions, ...formatResultsSocialInteractions([action["payload"].socialInteraction])]
            };

        case types.UPDATE_SOCIAL_INTERACTION_SUCCESS:
            return {
                ...state, socialInteractions: state.socialInteractions.map((interaction) => {
                    if (interaction._id === action["payload"]._id) {
                        return {
                            ...action["payload"].socialInteraction,
                            date: new Date(action["payload"].socialInteraction.date)
                        };
                    } else {
                        return interaction;
                    }
                })
            };

        case types.DELETE_SOCIAL_INTERACTION_SUCCESS:
            return {
                ...state,
                socialInteractions: state.socialInteractions.filter((interaction) => interaction._id !== action["payload"]._id)
            }

        case types.GET_ALL_VISITED_PLACES_SUCCESS:
            console.log(action["payload"].visitedPlaces);
            return {
                ...state,
                visitedPlaces: formatResultsVisitedPlaces(action["payload"].visitedPlaces as VisitedPlace[])
            }

        case types.ADD_VISITED_PLACES_SUCCESS:
            return {
                ...state,
                visitedPlaces: [...state.visitedPlaces, ...formatResultsVisitedPlaces([action["payload"].visitedPlace])]
            };

        case types.UPDATE_VISITED_PLACES_SUCCESS:
            return {
                ...state, visitedPlaces: state.visitedPlaces.map((place) => {
                    if (place._id === action["payload"]._id) {
                        return {
                            ...action["payload"].visitedPlace,
                            date: new Date(action["payload"].visitedPlace.date)
                        };
                    } else {
                        return place;
                    }
                })
            };

        case types.DELETE_VISITED_PLACES_SUCCESS:
            return {
                ...state,
                visitedPlaces: state.visitedPlaces.filter((place) => place._id !== action["payload"]._id)
            }

        default:
            return state;
    }
};

export default reducer;
