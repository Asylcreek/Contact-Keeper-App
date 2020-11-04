import { put, call, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

import ContactActionTypes from './contact.types';
import { addContactFailure, addContactSuccess } from './contact.actions';
import { setAlert } from '../app/app.actions';

export function* getAllContacts() {
    try {
        const response = axios.get('/api/contacts');
        yield put(addContact(response.data.data));
    } catch (err) {
        console.log(err.message);
    }
}

export function* addContact({ payload }) {
    try {
        const response = yield axios.post('/api/contacts', payload);
        yield put(addContactSuccess(response.data.data.data));
    } catch (err) {
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
        yield put(addContactFailure());
    }
}

export function* onGetContactsStart() {
    yield takeLatest(ContactActionTypes.GET_CONTACTS, getAllContacts);
}

export function* onAddContactStart() {
    yield takeLatest(ContactActionTypes.ADD_CONTACT_START, addContact);
}

export function* contactSagas() {
    yield all([call(onGetContactsStart), call(onAddContactStart)]);
}