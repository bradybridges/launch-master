import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";

export default function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/login" render={() => <h1>Login page</h1>} />
          <Route path="/create" render={() => <h1>Create Account page</h1>} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}
