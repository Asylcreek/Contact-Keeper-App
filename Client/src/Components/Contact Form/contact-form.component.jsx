import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../Redux/app/app.actions';

import {
  addContactStart,
  clearCurrentContact,
  updateContactStart,
} from '../../Redux/contact/contact.actions';

const ContactForm = ({
  addContact,
  currentContact,
  clearCurrentContact,
  updateContact,
  setAlert,
}) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    type: 'personal',
  });

  const [number, setNumber] = useState(0);

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
    setNumber((prev) => prev + 1);
    //Prevent submit if name || phoneNumber field is empty
    if (!name || !phoneNumber)
      return setAlert({
        message: `Name or Phone number cannot be empty ${number}`,
        type: 'danger',
      });

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
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={handleChange}
      />{' '}
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={handleChange}
      />{' '}
      Professional
      <div>
        {!currentContact ? (
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Add Contact
          </button>
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
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(addContactStart(contact)),
  clearCurrentContact: () => dispatch(clearCurrentContact()),
  updateContact: (contact) => dispatch(updateContactStart(contact)),
  setAlert: ({ message, type }) => dispatch(setAlert({ message, type })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
