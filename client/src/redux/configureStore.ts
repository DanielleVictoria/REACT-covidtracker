import { createStore } from "redux";
import reducer from "./reducers/Reducer";

export default function configureState() {
    return createStore(reducer);
}
