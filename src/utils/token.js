//存token
const setToken = (token) => {
    localStorage.setItem('token_key', token);
}

//取token
const getToken = () => {
    return localStorage.getItem('token_key');
}

//删token
const removeToken = () => {
    localStorage.removeItem('token_key');
}

export {
    setToken,
    getToken,
    removeToken
}