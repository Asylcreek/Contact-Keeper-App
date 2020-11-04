import { all, call } from 'redux-saga/effects';

import { contactSagas } from './contact/contact.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
    yield all([call(contactSagas), call(userSagas)]);
}