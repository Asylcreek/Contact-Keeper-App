import { put, call, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

import ContactActionTypes from './contact.types';
import { addContact } from './contact.actions';

export function* getAllContacts() {
    try {
        const response = axios.get('/api/contacts');
        yield put(addContact(response.data.data));
    } catch (err) {
        console.log(err.message);
    }
}

export function* onGetContactsStart() {
    yield takeLatest(ContactActionTypes.GET_CONTACTS, getAllContacts);
}

export function* contactSagas() {
    yield all([call(onGetContactsStart)]);
}