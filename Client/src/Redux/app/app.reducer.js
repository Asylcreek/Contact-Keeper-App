import AppActionTypes from '../app/app.types';

const INITIAL_STATE = {
    alerts: [],
    loading: true,
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
        case AppActionTypes.LOAD_FINISH:
            return {
                ...currentState,
                loading: false,
            };
        default:
            return currentState;
    }
};

export default appReducer;