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
    updateContactFailure,
    updateContactSuccess,
    loadMoreFailure,
    loadMoreSuccess,
    loadLessSuccess,
    loadLessFailure,
    filterContactsFailure,
    filterContactsSuccess,
} from './contact.actions';

import { setAlert } from '../app/app.actions';

export function* getAllContacts() {
    try {
        const response = yield axios.get('/api/contacts/my-contacts');
        yield put(getAllContactsSuccess(response.data));
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
    const { id, currentPage } = payload;
    try {
        yield axios.delete(`/api/contacts/${id}`);
        yield put(deleteContactSuccess(id));

        //Refresh the totalContacts and totalResults
        yield loadMore({ payload: currentPage });
    } catch (err) {
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
        yield put(deleteContactFailure());
    }
}

export function* updateContact({ payload }) {
    try {
        const response = yield axios.patch(`api/contacts/${payload._id}`, payload);
        yield put(updateContactSuccess(response.data.data.data));
    } catch (err) {
        yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
        yield put(updateContactFailure());
    }
}

export function* loadMore({ payload }) {
        const { pageNo, filter } = payload;
        try {
            const response = yield axios.get(
                    `/api/contacts/my-contacts?page=${pageNo}${
        filter ? `&name[regex]=${filter}&name[options]=i` : ''
      }`
    );
    yield put(loadMoreSuccess(response.data));
  } catch (err) {
    yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
    yield put(loadMoreFailure(payload - 1));
  }
}

export function* loadLess({ payload }) {
  const { pageNo, filter } = payload;
  try {
    const response = yield axios.get(
      `/api/contacts/my-contacts?page=${pageNo}${
        filter ? `&name[regex]=${filter}&name[options]=i` : ''
      }`
    );
    yield put(loadLessSuccess(response.data));
  } catch (err) {
    yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
    yield put(loadLessFailure(payload));
  }
}

export function* filterContacts({ payload }) {
  try {
    const response = yield axios.get(
      `/api/contacts/my-contacts?name[regex]=${payload}&name[options]=i`
    );

    yield put(getAllContactsSuccess(response.data));
    yield put(filterContactsSuccess());
  } catch (err) {
    yield put(setAlert({ message: err.response.data.message, type: 'danger' }));
    yield put(filterContactsFailure(payload));
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

export function* onUpdateContactStart() {
  yield takeLatest(ContactActionTypes.UPDATE_CONTACT_START, updateContact);
}

export function* onLoadMoreStart() {
  yield takeLatest(ContactActionTypes.LOAD_MORE_START, loadMore);
}

export function* onLoadLessStart() {
  yield takeLatest(ContactActionTypes.LOAD_LESS_START, loadLess);
}

export function* onFilterContactsStart() {
  yield takeLatest(ContactActionTypes.FILTER_CONTACTS_START, filterContacts);
}

export function* contactSagas() {
  yield all([
    call(onGetAllContactsStart),
    call(onAddContactStart),
    call(onDeleteContactStart),
    call(onUpdateContactStart),
    call(onLoadMoreStart),
    call(onLoadLessStart),
    call(onFilterContactsStart),
  ]);
}