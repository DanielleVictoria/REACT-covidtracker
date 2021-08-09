import {SocialInteraction} from "../models/SocialInteraction";

const SOCIAL_INTERACTION_URL = 'http://localhost:5000/api/social-interactions';

export const getAllSocialInteractions = (): Promise<SocialInteraction[]> => {

    const requestOptions = {
        method: 'GET'
    }

    return fetch(SOCIAL_INTERACTION_URL, requestOptions)
        .then((response) => response.json())
        .catch(error => console.error(error));
}

export const addSocialInteraction = (socialInteraction: SocialInteraction) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(socialInteraction)
    }

    return fetch(SOCIAL_INTERACTION_URL, requestOptions)
        .then((response) => response.json());
}


