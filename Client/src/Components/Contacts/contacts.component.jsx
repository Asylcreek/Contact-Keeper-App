import { Fragment } from 'react';
import { connect } from 'react-redux';

import ContactItem from '../Contact Item/contact-item.component';

const Contacts = ({ contacts, filteredContacts }) => {
  return (
    <Fragment>
      {(filteredContacts ? filteredContacts : contacts).length ? (
        (filteredContacts ? filteredContacts : contacts).map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      ) : (
        <h4>
          {filteredContacts
            ? 'No contacts with that name. Please try again'
            : 'Please add a contact'}
        </h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filteredContacts: state.contacts.filteredContacts,
});

export default connect(mapStateToProps)(Contacts);
