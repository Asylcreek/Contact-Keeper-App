import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addContactStart,
  clearCurrentContact,
  updateContact,
} from '../../Redux/contact/contact.actions';

const ContactForm = ({
  addContact,
  currentContact,
  clearCurrentContact,
  updateContact,
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

  const handleSubmit = (event) => {
    //Prevent default form behavior
    event.preventDefault();

    //Prevent submit if name || phoneNumber field is empty
    if (!name || !phoneNumber) return;

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
          <input
            type="button"
            value="Add Contact"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          />
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
  updateContact: (contact) => dispatch(updateContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
