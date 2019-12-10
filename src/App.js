import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from './PrivateRoute';

import Home from './pages/Home';
import Admin from './pages/Admin';

import { AuthContext } from "./context/auth";
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [currentUser, setCurrentUser] = useState();


  const setTokens = (data) => {
    setCurrentUser(!!data);
  }



  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li className={!currentUser ? 'hidden' : ''}>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li className={currentUser ? 'hidden' : ''}>
              <Link to="/login">Login</Link>
            </li>
            <li className={currentUser ? 'hidden' : ''}>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
