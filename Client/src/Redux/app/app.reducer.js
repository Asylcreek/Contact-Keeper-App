import AppActionTypes from '../app/app.types';

const INITIAL_STATE = {
    alert: null,
};

const appReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionTypes.SET_ALERT:
            return {...currentState };
        default:
            return currentState;
    }
};

export default appReducer;