import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <h1>NFLER - v2?</h1>
      <Router>
        <div>
          <span>
            <Link to="/">
              Hem igen
            </Link>
          </span>
          <span>
            <Link to="/create-argument">
              Skapa ett argument
            </Link>
          </span>
          <span>
            <Link to="/log-in">
              Logga in
            </Link>
          </span>
          <span>
            <Link to="/register">
              Registrera dig
            </Link>
          </span>
          <Switch>
            <Route path="/create-argument">
              <CreateArgument />
            </Route>
            <Route path="/log-in">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <h2>Home sweet home ..</h2>
  );
}

function CreateArgument() {
  return (
    <h2>Skapa ett argument ..</h2>
  );
}

function Login() {
  return (
    <h2>Logga in ..</h2>
  );
}

function Register() {
  return (
    <h2>Registrera dig ..</h2>
  );
}

export default App;
