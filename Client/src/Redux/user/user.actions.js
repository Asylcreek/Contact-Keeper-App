import UserActionTypes from './user.types';

export const checkUserSessionStart = () => ({
    type: UserActionTypes.CHECK_USER_SESSION,
});

export const emailSignInStart = ({ email, password }) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: { email, password },
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = () => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
});

export const emailSignUpStart = (registerObj) => ({
    type: UserActionTypes.EMAIL_SIGN_UP_START,
    payload: registerObj,
});

export const emailSignUpSuccess = (user) => ({
    type: UserActionTypes.EMAIL_SIGN_UP_SUCCESS,
    payload: user,
});

export const emailSignUpFailure = () => ({
    type: UserActionTypes.EMAIL_SIGN_UP_FAILURE,
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
});