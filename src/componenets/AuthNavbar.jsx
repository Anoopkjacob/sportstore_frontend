import React from "react";
import { Navbar,Nav } from "react-bootstrap";

export default function AuthNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
       <Nav.Link href="/">
        <Navbar.Brand>SportStore</Navbar.Brand></Nav.Link>
        <Nav className="mr-auto">
          <Nav.Link href="login">login</Nav.Link>
          <Nav.Link href="registration">registration</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
