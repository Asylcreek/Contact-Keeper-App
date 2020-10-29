import { Fragment } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactItem from '../Contact Item/contact-item.component';

const Contacts = ({ contacts, filteredContacts }) => {
  return (
    <Fragment>
      <TransitionGroup>
        {(filteredContacts ? filteredContacts : contacts).length ? (
          (filteredContacts ? filteredContacts : contacts).map((contact) => (
            <CSSTransition key={contact.id} timeout={200} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        ) : (
          <h4>
            {filteredContacts
              ? 'No contacts with that name. Please try again'
              : 'Please add a contact'}
          </h4>
        )}
      </TransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filteredContacts: state.contacts.filteredContacts,
});

export default connect(mapStateToProps)(Contacts);
