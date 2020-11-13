import ContactActionTypes from './contact.types';

const INITIAL_STATE = {
    contacts: [],
    totalContacts: 0,
    current: null,
    filteredContacts: null,
    loading: true,
    totalResults: 0,
    pages: 0,
    currentPage: 1,
    loadingMore: false,
    addContactLoading: false,
};

const contactReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactActionTypes.GET_CONTACTS_SUCCESS:
            return {
                ...currentState,
                contacts: [...action.payload.data.data],
                totalContacts: action.payload.totalDocuments,
                totalResults: action.payload.results,
                pages: Math.ceil(
                    action.payload.totalDocuments / action.payload.results
                ),
                loading: false,
            };
        case ContactActionTypes.ADD_CONTACT_START:
            return {
                ...currentState,
                addContactLoading: true,
            };
        case ContactActionTypes.ADD_CONTACT_SUCCESS:
            return {
                ...currentState,
                contacts: currentState.totalResults !== 5 &&
                    currentState.totalContacts === currentState.totalResults ?
                    [action.payload, ...currentState.contacts] :
                    [
                        action.payload,
                        ...currentState.contacts.filter(
                            (el, i) => i < currentState.totalResults - 1
                        ),
                    ],
                totalContacts: currentState.totalContacts + 1,
                totalResults: currentState.totalContacts !== 5 &&
                    currentState.totalContacts === currentState.totalResults ?
                    currentState.totalContacts + 1 :
                    currentState.contacts.length,
                addContactLoading: false,
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
                totalResults: currentState.totalResults - 1,
            };
        case ContactActionTypes.LOAD_MORE_START:
        case ContactActionTypes.LOAD_LESS_START:
            return {
                ...currentState,
                loadingMore: true,
                currentPage: action.payload,
            };
        case ContactActionTypes.LOAD_MORE_SUCCESS:
            const moreContacts = action.payload.data.data.filter(
                (el) => !currentState.contacts.map((c) => c._id).includes(el._id)
            );
            return {
                ...currentState,
                contacts: [...currentState.contacts, ...moreContacts],
                totalResults: currentState.totalResults + action.payload.results >
                    currentState.totalContacts ?
                    currentState.totalContacts :
                    currentState.totalResults + moreContacts.length,
                loadingMore: false,
            };
        case ContactActionTypes.LOAD_LESS_SUCCESS:
            return {
                ...currentState,
                contacts: [...action.payload.data.data],
                totalResults: action.payload.results,
                loadingMore: false,
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
                loadingMore: false,
                currentPage: currentState.currentPage,
                addContactLoading: false,
            };
        case ContactActionTypes.LOAD_MORE_FAILURE:
        case ContactActionTypes.LOAD_LESS_FAILURE:
            return {
                ...currentState,
                currentPage: action.payload,
                loadingMore: false,
            };
        default:
            return currentState;
    }
};

export default contactReducer;