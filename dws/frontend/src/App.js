import logo from './logo.png';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./lib/contextLib";
import { onError } from "./lib/errorLib";
import { Auth } from "aws-amplify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  // const nav = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    // nav("/login");

  }

  return (
    !isAuthenticating && (
    <div className="App">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="font-weight-bold text-muted ta-header">
            <img src={logo} alt="logo"></img>&nbsp; &nbsp; Thoughtful Automation
        </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ta-navbar">
          <Nav activeKey={window.location.pathname}>
            {
              isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>

      <Navbar fixed="bottom" bg="light" expand="md" className="ta-footer">

      </Navbar>
    </div>
    )
  );
}

export default App;

