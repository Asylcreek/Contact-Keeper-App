const ContactItem = ({ contact }) => {
  const { id, name, email, phoneNumber, type } = contact;

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
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
};

export default ContactItem;
