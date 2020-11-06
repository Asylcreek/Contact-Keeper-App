import AppActionTypes from './app.types';

export const setAlert = ({ message, type }) => ({
    type: AppActionTypes.SET_ALERT,
    payload: { message, type },
});

export const removeFirstAlert = () => ({
    type: AppActionTypes.REMOVE_FIRST_ALERT,
});

export const loadFinish = () => ({
    type: AppActionTypes.LOAD_FINISH,
});