import { useState } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { addContact } from '../../Redux/contact/contact.actions';

const ContactForm = ({ addContact }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    type: 'personal',
  });

  const { name, email, phoneNumber, type } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    //Prevent default form behavior
    event.preventDefault();

    //Add the contact
    addContact({ id: uniqid(), ...contact });

    //Reset input state
    setContact({
      name: '',
      email: '',
      phoneNumber: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">Add Contact</h2>
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
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(addContact(contact)),
});

export default connect(null, mapDispatchToProps)(ContactForm);
