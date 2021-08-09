import {initialState, StoreState} from "../StoreState";
import { AnyAction, Reducer } from "redux";
import * as types from "../actions/social-interactions/ActionTypes";

const socialInteractionsReducer: Reducer<StoreState, AnyAction> = (
    state: StoreState = initialState,
    action: AnyAction
) => {
    switch (action.type) {

        case types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS:
            return { ...state, socialInteractions: action["payload"].socialInteractions };

        case types.ADD_SOCIAL_INTERACTION_SUCCESS:
            return { ...state, socialInteractions: [...state.socialInteractions, action["payload"].socialInteraction] };

        default:
            return state;
    }
};

export default socialInteractionsReducer;
