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

export const deleteContactStart = (id) => ({
    type: ContactActionTypes.DELETE_CONTACT_START,
    payload: id,
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

export const filterContacts = (filter) => ({
    type: ContactActionTypes.FILTER_CONTACTS,
    payload: filter,
});

export const clearFilter = () => ({
    type: ContactActionTypes.CLEAR_FILTER,
});

export const clearContacts = () => ({
    type: ContactActionTypes.CLEAR_CONTACTS,
});