// src/components/DemoNavbar.js
import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import Weblogo from "../../assets/img/sound-bars.svg";

export default function DemoNavbar() {
  return (
    <header className="header-global">
      <Navbar className="navbar-main navbar-dark bg-dark" expand="lg">
        <Container>
          <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
            <div className="d-flex align-items-center" style={{ gap: "8px" }}>
              <span
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                AudioGuard
              </span>
              <img
                alt="AudioGuard Logo"
                src={Weblogo}
                style={{ height: "30px" }}
              />
            </div>
          </NavbarBrand>

          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/settings">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/" state={{ scrollToAbout: true }}>About</NavLink> {/* Updated */}
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/feedback">Feedback</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/" target="_blank">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}