import { all, call } from 'redux-saga/effects';

import { contactSagas } from './contact/contact.sagas';

export default function* rootSaga() {
    yield all([call(contactSagas)]);
}