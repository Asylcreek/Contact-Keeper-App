import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar/navbar.component';

import Home from './Pages/Home Page/homepage.component';
import About from './Pages/About Page/aboutPage.component';

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
