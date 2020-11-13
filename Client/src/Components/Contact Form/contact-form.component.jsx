import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { setAlert } from '../../Redux/app/app.actions';

import {
  addContactStart,
  clearCurrentContact,
  clearFilter,
  getAllContactsStart,
  updateContactStart,
} from '../../Redux/contact/contact.actions';

const ContactForm = ({
  addContact,
  currentContact,
  clearCurrentContact,
  updateContact,
  setAlert,
  addContactLoading,
  clearFilter,
  filter,
  getContacts,
}) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    type: 'personal',
  });

  useEffect(() => {
    if (currentContact) return setContact(currentContact);

    setContact({ name: '', email: '', phoneNumber: '', type: 'personal' });
  }, [currentContact]);

  const { name, email, phoneNumber, type } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleClear = () => {
    clearCurrentContact();
  };

  const handleSubmit = () => {
    //Prevent submit if name || phoneNumber field is empty
    if (!name || !phoneNumber)
      return setAlert({
        message: 'Name or Phone number cannot be empty',
        type: 'danger',
      });

    if (filter) {
      //Clear filters
      clearFilter();

      //Get all contacts afresh
      getContacts();
    }

    //Add the contact
    addContact({ ...contact });

    //Reset input state
    setContact({
      name: '',
      email: '',
      phoneNumber: '',
      type: 'personal',
    });
  };

  return (
    <form>
      <h2 className="text-primary">
        {!currentContact ? 'Add Contact' : 'Update Contact'}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <label htmlFor="personal" className="mr-half">
        <input
          type="radio"
          name="type"
          id="personal"
          value="personal"
          checked={type === 'personal'}
          onChange={handleChange}
        />{' '}
        Personal
      </label>
      <label htmlFor="professional">
        <input
          type="radio"
          name="type"
          id="professional"
          value="professional"
          checked={type === 'professional'}
          onChange={handleChange}
        />{' '}
        Professional
      </label>
      <div>
        {!currentContact ? (
          !addContactLoading ? (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Add Contact
            </button>
          ) : (
            <div className="btn btn-primary btn-block u-flex-x-y-center">
              <Loader
                className="u-flex-x-y-center"
                type="Oval"
                color="#f4f4f4"
                height={20}
                width={20}
              />
            </div>
          )
        ) : (
          <Fragment>
            <input
              type="button"
              value="Update Contact"
              className="btn btn-primary btn-block"
              onClick={() => {
                updateContact(contact);
                clearCurrentContact();
              }}
            />
            <input
              type="button"
              value="Clear"
              className="btn btn-light btn-block"
              onClick={handleClear}
            />
          </Fragment>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentContact: state.contacts.current,
  addContactLoading: state.contacts.addContactLoading,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(addContactStart(contact)),
  clearCurrentContact: () => dispatch(clearCurrentContact()),
  updateContact: (contact) => dispatch(updateContactStart(contact)),
  setAlert: ({ message, type }) => dispatch(setAlert({ message, type })),
  clearFilter: () => dispatch(clearFilter()),
  getContacts: () => dispatch(getAllContactsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
