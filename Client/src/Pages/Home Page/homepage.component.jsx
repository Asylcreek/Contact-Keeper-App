import Contacts from '../../Components/Contacts/contacts.component';

const HomePage = () => {
  return (
    <div className="grid-2">
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default HomePage;
