import Contacts from '../../Components/Contacts/contacts.component';
import ContactForm from '../../Components/Contact Form/contact-form.component';

const HomePage = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default HomePage;
