import ContactActionTypes from './contact.types';

const INITIAL_STATE = {
    contacts: [],
    current: null,
    filteredContacts: null,
};

const contactReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactActionTypes.ADD_CONTACT_SUCCESS:
            return {
                ...currentState,
                contacts: [...currentState.contacts, action.payload],
            };
        case ContactActionTypes.UPDATE_CONTACT:
            return {
                ...currentState,
                contacts: [
                    ...currentState.contacts.map((contact) =>
                        contact.id !== action.payload.id ? contact : {...action.payload }
                    ),
                ],
            };
        case ContactActionTypes.DELETE_CONTACT:
            return {
                ...currentState,
                contacts: [
                    ...currentState.contacts.filter(
                        (contact) => contact.id !== action.payload
                    ),
                ],
            };
        case ContactActionTypes.SET_CURRENT_CONTACT:
            return {
                ...currentState,
                current: action.payload,
            };
        case ContactActionTypes.CLEAR_CURRENT_CONTACT:
            return {
                ...currentState,
                current: null,
            };
        case ContactActionTypes.FILTER_CONTACTS:
            return {
                ...currentState,
                filteredContacts: currentState.contacts.filter((contact) =>
                    contact.name.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        case ContactActionTypes.CLEAR_FILTER:
            return {
                ...currentState,
                filteredContacts: null,
            };
        case ContactActionTypes.ADD_CONTACT_FAILURE:
            return {
                ...currentState,
                current: null,
                filteredContacts: null,
                contacts: [...currentState.contacts],
            };
        default:
            return currentState;
    }
};

export default contactReducer;