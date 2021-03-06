import ContactActionTypes from './contact.types';

export const addContactStart = (contact) => ({
    type: ContactActionTypes.ADD_CONTACT_START,
    payload: contact,
});

export const addContactSuccess = (contact) => ({
    type: ContactActionTypes.ADD_CONTACT_SUCCESS,
    payload: contact,
});

export const addContactFailure = () => ({
    type: ContactActionTypes.ADD_CONTACT_FAILURE,
});

export const getAllContactsStart = () => ({
    type: ContactActionTypes.GET_CONTACTS_START,
});

export const getAllContactsSuccess = (contacts) => ({
    type: ContactActionTypes.GET_CONTACTS_SUCCESS,
    payload: contacts,
});

export const getAllContactsFailure = () => ({
    type: ContactActionTypes.GET_CONTACTS_FAILURE,
});

export const deleteContactStart = ({ id, currentPage, filter }) => ({
    type: ContactActionTypes.DELETE_CONTACT_START,
    payload: { id, currentPage, filter },
});

export const deleteContactSuccess = (id) => ({
    type: ContactActionTypes.DELETE_CONTACT_SUCCESS,
    payload: id,
});

export const deleteContactFailure = () => ({
    type: ContactActionTypes.DELETE_CONTACT_FAILURE,
});

export const updateContactStart = (contact) => ({
    type: ContactActionTypes.UPDATE_CONTACT_START,
    payload: contact,
});

export const updateContactSuccess = (contact) => ({
    type: ContactActionTypes.UPDATE_CONTACT_SUCCESS,
    payload: contact,
});
export const updateContactFailure = () => ({
    type: ContactActionTypes.UPDATE_CONTACT_START,
});

export const setCurrentContact = (contact) => ({
    type: ContactActionTypes.SET_CURRENT_CONTACT,
    payload: contact,
});

export const clearCurrentContact = () => ({
    type: ContactActionTypes.CLEAR_CURRENT_CONTACT,
});

export const filterContactsStart = (filter) => ({
    type: ContactActionTypes.FILTER_CONTACTS_START,
    payload: filter,
});

export const filterContactsSuccess = () => ({
    type: ContactActionTypes.FILTER_CONTACTS_SUCCESS,
});

export const filterContactsFailure = () => ({
    type: ContactActionTypes.FILTER_CONTACTS_FAILURE,
});

export const clearFilter = () => ({
    type: ContactActionTypes.CLEAR_FILTER,
});

export const clearContacts = () => ({
    type: ContactActionTypes.CLEAR_CONTACTS,
});

export const loadMoreStart = ({ pageNo, filter }) => ({
    type: ContactActionTypes.LOAD_MORE_START,
    payload: { pageNo, filter },
});

export const loadMoreSuccess = (contacts) => ({
    type: ContactActionTypes.LOAD_MORE_SUCCESS,
    payload: contacts,
});

export const loadMoreFailure = (pageNo) => ({
    type: ContactActionTypes.LOAD_MORE_FAILURE,
    payload: pageNo,
});

export const loadLessStart = ({ pageNo, filter }) => ({
    type: ContactActionTypes.LOAD_LESS_START,
    payload: { pageNo, filter },
});

export const loadLessSuccess = (contacts) => ({
    type: ContactActionTypes.LOAD_LESS_SUCCESS,
    payload: contacts,
});

export const loadLessFailure = (pageNo) => ({
    type: ContactActionTypes.LOAD_LESS_FAILURE,
    payload: pageNo,
});