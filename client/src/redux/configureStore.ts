import { createStore } from "redux";
import socialInteractionsReducer from "./reducers/SocialInteractionsReducer";

export default function configureState() {
    return createStore(socialInteractionsReducer);
}
