import React from "react";
import ReactDOM from "react-dom";
import "./theme.css";
import "./styles.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./useAuth";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className="yellow-border" />
    <div className="container">
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </div>
  </React.StrictMode>,
  rootElement
);
