import { connect } from 'react-redux';

import {
  clearCurrentContact,
  deleteContactStart,
  setCurrentContact,
} from '../../Redux/contact/contact.actions';

const ContactItem = ({
  contact,
  deleteContact,
  setCurrentContact,
  clearCurrentContact,
  contacts,
  filter,
}) => {
  const { _id, name, email, phoneNumber, type } = contact;

  const handleDelete = () => {
    const pageOfContact = Math.ceil(
      (contacts.findIndex((contact) => _id === contact._id) + 1) / 5
    );

    // Delete the contact
    deleteContact({
      id: _id,
      currentPage: pageOfContact,
      filter,
    });

    //Set current contact to null, for situations where the deleted contact is the current contact
    clearCurrentContact();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={`badge badge-${
            type === 'personal' ? 'primary' : 'success'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phoneNumber && (
          <li>
            <i className="fas fa-phone" /> {phoneNumber}
          </li>
        )}
      </ul>
      <div>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrentContact(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentContact: (contact) => dispatch(setCurrentContact(contact)),
  clearCurrentContact: () => dispatch(clearCurrentContact()),
  deleteContact: ({ id, currentPage, filter }) =>
    dispatch(deleteContactStart({ id, currentPage, filter })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
