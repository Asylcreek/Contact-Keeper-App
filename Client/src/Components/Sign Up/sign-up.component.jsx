import { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../Redux/app/app.actions';
import { emailSignUpStart } from '../../Redux/user/user.actions';

const SignUp = ({ emailSignUpStart }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = newUser;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUser((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm)
      return setAlert({ message: 'Passwords do not match', type: 'danger' });

    emailSignUpStart(newUser);
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            minLength="8"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            required
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailSignUpStart: (registerObj) => dispatch(emailSignUpStart(registerObj)),
  setAlert: ({ message, type }) => dispatch(setAlert({ message, type })),
});

export default connect(null, mapDispatchToProps)(SignUp);