import { createStore, combineReducers } from "redux";
import socialInteractionsReducer from "./reducers/SocialInteractionsReducer";
import visitedPlacesReducer from "./reducers/VisitedPlacesReducer";

export const Store = createStore(combineReducers({
    socialInteractions: socialInteractionsReducer,
    visitedPlaces: visitedPlacesReducer,
}));
