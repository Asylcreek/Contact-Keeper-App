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
                alerts: [{...action.payload }, ...currentState.alerts],
            };
        case AppActionTypes.REMOVE_OLDEST_ALERT:
            return {
                alerts: currentState.alerts.filter(
                    (alert, i) => i !== currentState.alerts.length - 1
                ),
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