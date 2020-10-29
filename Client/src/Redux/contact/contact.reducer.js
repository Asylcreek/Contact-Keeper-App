import ContactActionTypes from './contact.types';

const INITIAL_STATE = {
    contacts: [{
            id: 1,
            name: 'Jill Johnson',
            email: 'jill@gmail.com',
            phoneNumber: '111-111-1111',
            type: 'personal',
        },
        {
            id: 2,
            name: 'Sara Watson',
            email: 'sara@gmail.com',
            phoneNumber: '222-222-2222',
            type: 'personal',
        },
        {
            id: 3,
            name: 'Harry White',
            email: 'harry@gmail.com',
            phoneNumber: '333-333-3333',
            type: 'professional',
        },
    ],
    current: null,
};

const contactReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactActionTypes.ADD_CONTACT:
            return {
                ...currentState,
                contacts: [...currentState.contacts, action.payload],
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
        default:
            return currentState;
    }
};

export default contactReducer;