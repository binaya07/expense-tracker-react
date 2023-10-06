import { LOGIN_URL, SIGNUP_URL, TRANSACTION_URL, USER_TRANSACTION_URL } from '../constants';

export async function authenticateUser(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    let data = false;
    if (response.ok) {
        data = await response.json();
    }
    return data;
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

export async function createTransaction(transaction) {
    const response = await fetch(TRANSACTION_URL, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });

    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

export async function getTransactionsForUser(userId) {
    const url = USER_TRANSACTION_URL + "/" + userId;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    });
    let data = [];
    if (response.ok) {
        data = await response.json();
    }
    return data;
}

export async function deleteTransaction(transactionId) {
    const url = TRANSACTION_URL + "/" + transactionId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}
