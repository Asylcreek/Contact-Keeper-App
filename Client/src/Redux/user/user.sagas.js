import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from './user.types';

import {
    emailSignUpFailure,
    emailSignUpSuccess,
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
} from './user.actions';
import { setAlert } from '../app/app.actions';

export function* emailSignUp({ payload }) {
    try {
        const response = yield axios.post('/api/users/signup', payload);

        yield put(emailSignUpSuccess({...response.data.data.user }));
        yield put(
            setAlert({
                message: 'Sign up successful.',
                type: 'success',
            })
        );
    } catch (err) {
        yield put(emailSignUpFailure());
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
    }
}

export function* checkUserSession() {
    try {
        const response = yield axios.get('/api/users/my-account');

        yield put(signInSuccess({...response.data.data.data }));
    } catch (err) {
        yield put(signInFailure());
    }
}

export function* logInStart({ payload }) {
    const { email, password } = payload;
    try {
        const response = yield axios.post('/api/users/login', { email, password });
        yield put(signInSuccess(response.data.data.user));
    } catch (err) {
        yield put(signInFailure());
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
    }
}

export function* signOut() {
    try {
        yield axios.get('/api/users/logout');
        yield put(signOutSuccess());
        window.setTimeout(() => window.location.assign('/'), 1500);
    } catch (err) {
        yield put(signOutFailure());
    }
}

export function* onEmailSignUpStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, emailSignUp);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession);
}

export function* onEmailLogInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, logInStart);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onEmailSignUpStart),
        call(onCheckUserSession),
        call(onEmailLogInStart),
        call(onSignOutStart),
    ]);
}