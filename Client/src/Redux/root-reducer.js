import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import contactReducer from './contact/contact.reducer';

const rootReducer = combineReducers({
    app: appReducer,
    contacts: contactReducer,
});

export default rootReducer;