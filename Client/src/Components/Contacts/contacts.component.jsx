import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import ContactItem from '../Contact Item/contact-item.component';

import { getAllContactsStart } from '../../Redux/contact/contact.actions';

const Contacts = ({
  contacts,
  filteredContacts,
  getAllContacts,
  contactsLoading,
}) => {
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
      }}
    >
      {contactsLoading ? (
        <Loader
          style={{ display: 'flex', justifyContent: 'center' }}
          type="Oval"
          color="#003699"
          height={80}
          width={80}
        />
      ) : (filteredContacts ?? contacts).length ? (
        <TransitionGroup className="contacts-container">
          {(filteredContacts ?? contacts).map((contact) => (
            <CSSTransition key={contact._id} timeout={200} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <h4 style={{ alignSelf: 'center' }}>
          {filteredContacts
            ? 'No contacts with that name'
            : 'Please add a contact'}
        </h4>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filteredContacts: state.contacts.filteredContacts,
  contactsLoading: state.contacts.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllContacts: () => dispatch(getAllContactsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
