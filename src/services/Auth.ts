import { BASE_URL } from "../constants/constants.ts";
import fetchClient from './FetchClient.ts';

const API_URL = `${BASE_URL}/authorization`;

export const userRegister = async (
  email: string,
  password: string,
  name: string,
  lastName: string,
  avatarUrl: string
) => {
    const response = await fetchClient(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password, name, lastName, avatarUrl })
    });
    return response.json();
}

export const login = async (email: string, password: string) => {
    const response = await fetchClient(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

export const getUser = async () => {
    const response = await fetchClient(`${API_URL}`, {
        method: 'GET'
    });
    return response.json();
}