import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import contactReducer from './contact/contact.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    app: appReducer,
    contacts: contactReducer,
    user: userReducer,
});

export default rootReducer;