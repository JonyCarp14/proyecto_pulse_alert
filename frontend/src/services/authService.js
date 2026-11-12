import { apiRequest } from './api';

export async function loginRequest(email, password) {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function getCurrentUser() {
    return apiRequest('/auth/me');
}