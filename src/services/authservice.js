let accessToken = null;

export const setAccessToken = (access) => {
    accessToken = access;
};

export const getAccessToken = () => accessToken;

export const clearTokens = () => {

    accessToken = null;
};
