import { LOGIN_URL, SIGNUP_URL } from '../constants';

export async function authenticateUser(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    console.log(response);
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function registerUser(email, password) {
    const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}
