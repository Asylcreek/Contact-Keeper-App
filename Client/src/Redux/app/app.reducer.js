import AppActionTypes from '../app/app.types';

const INITIAL_STATE = {
    alerts: [],
};

const appReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionTypes.SET_ALERT:
            return {
                ...currentState,
                alerts: [...currentState.alerts, {...action.payload }],
            };
        case AppActionTypes.REMOVE_FIRST_ALERT:
            return {
                alerts: currentState.alerts.filter((alert, i) => i !== 0),
            };
        default:
            return currentState;
    }
};

export default appReducer;