import {SocialInteraction} from "../models/SocialInteraction";

const SOCIAL_INTERACTION_URL = 'http://localhost:5000/api/social-interactions';

export const getAllSocialInteractions = async (): Promise<SocialInteraction[]> => {

    const requestOptions = {
        method: 'GET'
    }

    const response = await fetch(SOCIAL_INTERACTION_URL, requestOptions);
    return await response.json();

}

export const addSocialInteraction = async (socialInteraction: SocialInteraction) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(socialInteraction)
    }

    const response = await fetch(SOCIAL_INTERACTION_URL, requestOptions);
    return await response.json();

}

export const updateSocialInteraction = async (id: string, socialInteraction: SocialInteraction): Promise<any> => {

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(socialInteraction)
    }

    const response = await fetch(`${SOCIAL_INTERACTION_URL}/${id}`, requestOptions);
    return await response.json();

}

export const deleteSocialInteraction = async (id: string): Promise<any> => {

    const requestOptions = {
        method: 'DELETE',
    }

    const response = await fetch(`${SOCIAL_INTERACTION_URL}/${id}`, requestOptions);
    return await response.json();

}



