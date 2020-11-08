import AppActionTypes from './app.types';

export const setAlert = ({ message, type }) => ({
    type: AppActionTypes.SET_ALERT,
    payload: { message, type },
});

export const removeOldestAlert = () => ({
    type: AppActionTypes.REMOVE_OLDEST_ALERT,
});

export const loadFinish = () => ({
    type: AppActionTypes.LOAD_FINISH,
});