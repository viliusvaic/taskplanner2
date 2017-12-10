import qs from 'qs';

export const getAccessToken = async (userData) => {
    const res = await fetch(
        'http://localhost:8080/api/oauth/token',
        {
            method: 'POST',
            headers: {
                'Authorization': 'Basic c2VjcmV0Om51bGw=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({
                grant_type: 'password',
                username: userData.username,
                password: userData.password
            })
        }
    );

    if (res.status === 200) {
        const json = await res.json();
        return json.access_token;
    }
    return false;
};

export const registerUserRequest = async (user) => {
    const res = await fetch(
        `http://localhost:8080/api/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
    return res.status === 201;
};