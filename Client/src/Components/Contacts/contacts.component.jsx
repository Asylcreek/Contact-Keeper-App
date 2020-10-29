import { Fragment } from 'react';
import { connect } from 'react-redux';

import ContactItem from '../Contact Item/contact-item.component';

const Contacts = (contacts) => {
  return (
    <Fragment>
      {contacts.contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
});

export default connect(mapStateToProps)(Contacts);
