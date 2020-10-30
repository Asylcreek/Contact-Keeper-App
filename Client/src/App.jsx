import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar/navbar.component';

import Home from './Pages/Home Page/homepage.component';
import About from './Pages/About Page/aboutPage.component';
import SignUp from './Components/Sign Up/sign-up.component';
import Login from './Components/Sign In/sign-in.component';
import Alerts from './Components/Alerts/alerts.component';

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
