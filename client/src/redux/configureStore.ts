import { createStore, combineReducers } from "redux";
import socialInteractionsReducer from "./reducers/SocialInteractionsReducer";
import visitedPlacesReducer from "./reducers/VisitedPlacesReducer";

export default function configureState() {
    return createStore(combineReducers({
        socialInteractions: socialInteractionsReducer,
        visitedPlaces: visitedPlacesReducer,
    }));
}
