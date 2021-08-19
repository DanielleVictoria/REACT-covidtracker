import {SocialInteraction} from "../models/SocialInteraction";
import {VisitedPlace} from "../models/VisitedPlace";

export interface StoreState {
    socialInteractions: SocialInteraction[],
    visitedPlaces: VisitedPlace[],
}
