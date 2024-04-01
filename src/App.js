import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Locked from "./Locked";
import Profile from "./Profile";
import { oktaConfig } from "./lib/oktaConfig";
import Home from "./Home";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useNavigate();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path={CALLBACK_PATH} exact element={<LoginCallback />} />
        <Route path="/locked" exact element={<Locked />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Security>
  );
};

export default App;

/* secure route on entire application
const App = () => { 
  return (
    <Router>
      <Security {...config} >
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/" />
        </Switch>
      </Security>
    </Router>
  );
};
*/