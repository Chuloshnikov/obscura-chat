export const HOST = import.meta.env.VITE_APP_SERVER_URL;

export const AUTH_ROUTES = "api/v1/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/sign-up`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/sign-in`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;