import { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../Redux/app/app.actions';
import { emailSignInStart } from '../../Redux/user/user.actions';

const SignUp = ({ emailSignInStart, setAlert }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailSignInStart({ email, password });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
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
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: ({ email, password }) =>
    dispatch(emailSignInStart({ email, password })),
  setAlert: ({ message, type }) => dispatch(setAlert({ message, type })),
});

export default connect(null, mapDispatchToProps)(SignUp);