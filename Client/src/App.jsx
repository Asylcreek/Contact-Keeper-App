import { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Navbar from './Components/Navbar/navbar.component';

import Home from './Pages/Home Page/homepage.component';
import About from './Pages/About Page/aboutPage.component';
import SignUp from './Components/Sign Up/sign-up.component';
import Login from './Components/Sign In/sign-in.component';
import Alerts from './Components/Alerts/alerts.component';

import { checkUserSessionStart } from './Redux/user/user.actions';

function App({ checkUserSession, user }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              user ? <Home {...props} /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/register"
            render={() => (user ? <Redirect to="/" /> : <SignUp />)}
          />
          <Route
            exact
            path="/login"
            render={() => (user ? <Redirect to="/" /> : <Login />)}
          />
        </Switch>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
