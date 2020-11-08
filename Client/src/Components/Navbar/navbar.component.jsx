import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutStart } from '../../Redux/user/user.actions';

const Navbar = ({ user, signOutStart }) => {
  return (
    <div className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className="fas fa-id-card-alt" /> Contact Keeper
        </h1>
      </Link>
      <ul>
        {user && <li>Hello, {user.name.split(' ')[1]}</li>}
        {!user ? (
          <Fragment>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </Fragment>
        ) : (
          <li onClick={() => signOutStart()}>
            <Link to="/?action=logout">
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
