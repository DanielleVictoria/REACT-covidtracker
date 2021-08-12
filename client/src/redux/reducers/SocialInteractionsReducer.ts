import {initialState, StoreState} from "../StoreState";
import {AnyAction, Reducer} from "redux";
import * as types from "../actions/social-interactions/ActionTypes";

const socialInteractionsReducer: Reducer<StoreState, AnyAction> = (
    state: StoreState = initialState,
    action: AnyAction
) => {
    switch (action.type) {

        case types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS:
            return {...state, socialInteractions: action["payload"].socialInteractions};

        case types.ADD_SOCIAL_INTERACTION_SUCCESS:
            return {...state, socialInteractions: [...state.socialInteractions, action["payload"].socialInteraction]};

        case types.UPDATE_SOCIAL_INTERACTION_SUCCESS:
            return {
                ...state, socialInteractions: state.socialInteractions.map((interaction) => {
                    if (interaction._id === action["payload"]._id) {
                        return action["payload"].socialInteraction;
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

        default:
            return state;
    }
};

export default socialInteractionsReducer;
