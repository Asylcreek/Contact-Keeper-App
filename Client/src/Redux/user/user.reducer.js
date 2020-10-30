import UserActionTypes from './user.types';

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
};

const userReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...currentState,
                loading: true,
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...currentState,
                user: action.payload,
                loading: false,
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...currentState,
                user: null,
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.EMAIL_SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...currentState,
                error: action.payload,
            };
        default:
            return currentState;
    }
};

export default userReducer;