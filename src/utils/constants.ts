export const HOST = import.meta.env.VITE_APP_SERVER_URL;

export const AUTH_ROUTES = "api/v1/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/sign-up`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/sign-in`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACT_ROUTES = "api/v1/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACT_ROUTES}/search`;