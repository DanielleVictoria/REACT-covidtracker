import {VisitedPlace} from "../models/VisitedPlace";

const VISITED_PLACE_URL = 'http://localhost:5000/api/visited-places';

export const getAllVisitedPlaces = async (): Promise<VisitedPlace[]> => {

    const requestOptions = {
        method: 'GET'
    }

    const response = await fetch(VISITED_PLACE_URL, requestOptions);
    return await response.json();
}

export const addVisitedPlace = async (visitedPlace: VisitedPlace) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(visitedPlace)
    }

    const response = await fetch(VISITED_PLACE_URL, requestOptions);
    return await response.json();

}

export const updateVisitedPlace = async (id: string, visitedPlace: VisitedPlace): Promise<any> => {

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(visitedPlace)
    }

    const response = await fetch(`${VISITED_PLACE_URL}/${id}`, requestOptions);
    return await response.json();

}

export const deleteVisitedPlace = async (id: string): Promise<any> => {

    const requestOptions = {
        method: 'DELETE',
    }

    const response = await fetch(`${VISITED_PLACE_URL}/${id}`, requestOptions);
    return await response.json();

}
