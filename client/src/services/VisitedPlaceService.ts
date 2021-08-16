import {VisitedPlace} from "../models/VisitedPlace";

const VISITED_PLACE_URL = 'http://localhost:5000/api/visited-places';

export const getAllVisitedPlaces = (): Promise<VisitedPlace[]> => {

    const requestOptions = {
        method: 'GET'
    }

    return fetch(VISITED_PLACE_URL, requestOptions)
        .then((response) => response.json())
        .catch(error => console.error(error));

}

export const addVisitedPlace = (visitedPlace: VisitedPlace) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(visitedPlace)
    }

    return fetch(VISITED_PLACE_URL, requestOptions)
        .then((response) => response.json());

}

export const updateVisitedPlace = (id: string, visitedPlace: VisitedPlace): Promise<any> => {

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(visitedPlace)
    }

    return fetch(`${VISITED_PLACE_URL}/${id}`, requestOptions)
        .then((response) => response.json())
        .catch(error => console.error(error));

}

export const deleteVisitedPlace = (id: string): Promise<any> => {

    const requestOptions = {
        method: 'DELETE',
    }

    return fetch(`${VISITED_PLACE_URL}/${id}`, requestOptions)
        .then((response) => response.json())
        .catch(error => console.error(error));

}
