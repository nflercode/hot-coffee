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
      <h1>NFLER (not Netflix)</h1>
      <h2>Next lvl deployment</h2>
      <h3>Super next level</h3>
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
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/log-in">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/create-argument">
              <CreateArgument />
            </Route>
            <Route>
              <RouteNotFound />
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

function RouteNotFound() {
  return (
    <h2>404 - Nu vet jag inte vad du letar efter</h2>
  );
}

export default App;
