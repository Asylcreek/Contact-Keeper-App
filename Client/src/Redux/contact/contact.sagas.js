import { put, call, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

import ContactActionTypes from './contact.types';

import {
    addContactFailure,
    addContactSuccess,
    getAllContactsSuccess,
    getAllContactsFailure,
    deleteContactSuccess,
    deleteContactFailure,
} from './contact.actions';

import { setAlert } from '../app/app.actions';

export function* getAllContacts() {
    try {
        const response = yield axios.get('/api/contacts/my-contacts');
        yield put(getAllContactsSuccess(response.data.data.data));
    } catch (err) {
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
        yield put(getAllContactsFailure());
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

export function* deleteContact({ payload }) {
    try {
        yield axios.delete(`/api/contacts/${payload}`);
        yield put(deleteContactSuccess(payload));
    } catch (err) {
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
        yield put(deleteContactFailure());
    }
}

export function* onGetAllContactsStart() {
    yield takeLatest(ContactActionTypes.GET_CONTACTS_START, getAllContacts);
}

export function* onAddContactStart() {
    yield takeLatest(ContactActionTypes.ADD_CONTACT_START, addContact);
}

export function* onDeleteContactStart() {
    yield takeLatest(ContactActionTypes.DELETE_CONTACT_START, deleteContact);
}

export function* contactSagas() {
    yield all([
        call(onGetAllContactsStart),
        call(onAddContactStart),
        call(onDeleteContactStart),
    ]);
}