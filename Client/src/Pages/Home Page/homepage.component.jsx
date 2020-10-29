import { connect } from 'react-redux';

import Contacts from '../../Components/Contacts/contacts.component';
import ContactForm from '../../Components/Contact Form/contact-form.component';
import FilterContacts from '../../Components/Filter Contacts/filter-contacts.component';

const HomePage = ({ contacts }) => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts.length > 1 && <FilterContacts />}
        <Contacts />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
});

export default connect(mapStateToProps)(HomePage);
