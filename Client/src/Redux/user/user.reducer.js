import UserActionTypes from './user.types';

const INITIAL_STATE = {
    user: null,
    signInLoading: false,
    signUpLoading: false,
};

const userReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...currentState,
                signInLoading: true,
            };
        case UserActionTypes.EMAIL_SIGN_UP_START:
            return {
                ...currentState,
                signUpLoading: true,
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.EMAIL_SIGN_UP_SUCCESS:
            return {
                ...currentState,
                user: action.payload,
                signInLoading: false,
                signUpLoading: false,
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
                user: null,
                signInLoading: false,
                signUpLoading: false,
            };
        default:
            return currentState;
    }
};

export default userReducer;