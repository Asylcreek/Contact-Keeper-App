import { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import './App.css';

import Navbar from './Components/Navbar/navbar.component';

import Home from './Pages/Home Page/homepage.component';
import About from './Pages/About Page/aboutPage.component';
import SignUp from './Components/Sign Up/sign-up.component';
import Login from './Components/Sign In/sign-in.component';
import Alerts from './Components/Alerts/alerts.component';

import { checkUserSessionStart } from './Redux/user/user.actions';

//This provides access to the history object created by react-router-dom
export let history;

function App({ checkUserSession, user, appLoading }) {
  history = useHistory();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  if (appLoading)
    return (
      <div
        className="u-flex-x-y-center"
        style={{
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <p style={{ marginBottom: '1rem' }}>
          Please wait while the app is loading
        </p>
        <Loader type="Oval" color="#00BFFF" height={80} width={80} />
      </div>
    );

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
  appLoading: state.app.loading,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
