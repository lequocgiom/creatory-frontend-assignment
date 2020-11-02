import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import store from "./redux/store";
import { setAuthen } from "./redux/reducer";
import Header from "./components/Header";
function App() {
  useEffect(() => {
    if (localStorage.authenticated === "true") {
      console.log("user is already authenticated.");
      store.dispatch(setAuthen(true));
    }
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />

            <PrivateRoute exact path="/" component={Main} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
