import {AnyAction, Reducer} from "redux";
import * as types from "../actions/ActionTypes";
import {formatDate} from "../../filters/GeneralFilters";
import {SocialInteraction} from "../../models/SocialInteraction";

const socialInteractionsReducer: Reducer<SocialInteraction[], AnyAction> = (
    state = [],
    action: AnyAction
) => {

    switch (action.type) {

        case types.GET_ALL_SOCIAL_INTERACTIONS_SUCCESS:
            return formatDate(action["payload"].socialInteractions as SocialInteraction[]);

        case types.ADD_SOCIAL_INTERACTION_SUCCESS:
            return [...state, ...formatDate([action["payload"].socialInteraction])];

        case types.UPDATE_SOCIAL_INTERACTION_SUCCESS:
            return state.map((interaction) => {
                    if (interaction._id === action["payload"]._id) {
                        return {
                            ...action["payload"].socialInteraction,
                            date: new Date(action["payload"].socialInteraction.date)
                        };
                    } else {
                        return interaction;
                    }
                });

        case types.DELETE_SOCIAL_INTERACTION_SUCCESS:
            return state.filter((interaction) => interaction._id !== action["payload"]._id);

        default:
            return state;

    }

}

export default socialInteractionsReducer;
