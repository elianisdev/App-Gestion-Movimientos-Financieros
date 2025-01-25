import { BASE_URL } from "../constants/constants.ts";
import fetchClient from './FetchClient.ts';

const API_URL = `${BASE_URL}/movements`;

export const getCapital = async () => {
    const response = await fetchClient(`${API_URL}/capital`, {
        method: 'GET'
    });
    return response.json();
}

export const getMovements = async () => {
    const response = await fetchClient(`${API_URL}`, {
        method: 'GET'
    });
    return response.json();
}

export const createMovement = async (data: {
    type: "Ingreso" | "Egreso";
    amount: number;
    description: string;
}) => {
    const response = await fetchClient(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
}

export const deleteMovement = async (id: string) => {
    const response = await fetchClient(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}