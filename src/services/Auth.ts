import {BASE_URL} from "../constants/constants.ts";

const API_URL = `${BASE_URL}/authorization`;

export const RegisterService = async (
    email: string,
    password: string,
    name: string,
    lastName: string,
    avatarUrl: string
) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, lastName, avatarUrl })
    });
    return response.json();
}

export const LoginService = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
