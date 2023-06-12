import React from "react";
import { useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate()
  return (
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="#">Logo</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#about">About</Nav.Link>
    //         <Nav.Link href="#services">Services</Nav.Link>
    //         <Nav.Link href="#contact">Contact</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <div>
      <div className="headings">
        <img className="c-logo" src="\images\Ems Logo.png" alt="logo" />
        <img className="c-bars" src="\images\hamburger menu.svg" alt="c-bar" />
        <img className="person-imgs" src="\images\person.svg" alt="person" />
        <span className="pers-name">
          {localStorage.getItem("name")?.split(" ")[0]}
        </span>
        <img
          className="logout"
          src="\images\logout.svg"
          alt="logout"
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        />
      </div>
    </div>
  );
};

export default Header;
