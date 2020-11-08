import ContactActionTypes from './contact.types';

const INITIAL_STATE = {
    contacts: [],
    totalContacts: 0,
    current: null,
    filteredContacts: null,
    loading: true,
};

const contactReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactActionTypes.GET_CONTACTS_SUCCESS:
            return {
                ...currentState,
                contacts: [...action.payload.data.data],
                totalContacts: action.payload.totalDocuments,
                loading: false,
            };
        case ContactActionTypes.ADD_CONTACT_SUCCESS:
            return {
                ...currentState,
                contacts: [action.payload, ...currentState.contacts],
                totalContacts: currentState.totalContacts + 1,
            };
        case ContactActionTypes.UPDATE_CONTACT_SUCCESS:
            return {
                ...currentState,
                contacts: [
                    ...currentState.contacts.map((contact) =>
                        contact._id !== action.payload._id ? contact : {...action.payload }
                    ),
                ],
            };
        case ContactActionTypes.DELETE_CONTACT_SUCCESS:
            return {
                ...currentState,
                contacts: [
                    ...currentState.contacts.filter(
                        (contact) => contact._id !== action.payload
                    ),
                ],
                totalContacts: currentState.totalContacts - 1,
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
        case ContactActionTypes.CLEAR_CONTACTS:
            return {
                ...currentState,
                contacts: [],
                totalContacts: 0,
            };
        case ContactActionTypes.GET_CONTACTS_FAILURE:
        case ContactActionTypes.ADD_CONTACT_FAILURE:
        case ContactActionTypes.DELETE_CONTACT_FAILURE:
        case ContactActionTypes.UPDATE_CONTACT_FAILURE:
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