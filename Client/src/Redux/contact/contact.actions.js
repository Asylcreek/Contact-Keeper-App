import ContactActionTypes from './contact.types';

export const addContact = (contact) => ({
    type: ContactActionTypes.ADD_CONTACT,
    payload: contact,
});

export const deleteContact = (id) => ({
    type: ContactActionTypes.DELETE_CONTACT,
    payload: id,
});

export const setCurrentContact = (contact) => ({
    type: ContactActionTypes.SET_CURRENT_CONTACT,
    payload: contact,
});

export const clearCurrentContact = () => ({
    type: ContactActionTypes.CLEAR_CURRENT_CONTACT,
});

export const updateContact = (contact) => ({
    type: ContactActionTypes.UPDATE_CONTACT,
    payload: contact,
});

export const filterContacts = (filter) => ({
    type: ContactActionTypes.FILTER_CONTACTS,
    payload: filter,
});

export const clearFilter = () => ({
    type: ContactActionTypes.CLEAR_FILTER,
});