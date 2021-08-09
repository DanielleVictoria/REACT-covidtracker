import {SocialInteraction} from "../models/SocialInteraction";

export interface StoreState {
  socialInteractions: SocialInteraction[];
}

export const initialState: StoreState = {
  socialInteractions: [],
};
