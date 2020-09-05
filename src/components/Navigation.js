import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">DenkaTech</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="d-inline p-2 bg-dark text-white">
            Home
          </NavLink>
          <NavLink to="/new" className="d-inline p-2 bg-dark text-white">
            New Note
          </NavLink>
          <NavLink to="/moonsun" className="d-inline p-2 bg-dark text-white">
            Moon and Sun
          </NavLink>
          <NavLink to="/about" className="d-inline p-2 bg-dark text-white">
            About
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
