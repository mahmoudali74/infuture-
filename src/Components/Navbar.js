// CustomNavbar.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import "./navbar.css";

export default function CustomNavbar() {
  const phoneNumber = "201108293956";
  const message = "مرحبا! أريد التواصل معكم.";

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="social-icons d-flex gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://www.facebook.com/InFutureDigitalSolutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={18} />
            </a>
          </div>

          <div className="contact-info">
            <a href="mailto:infuturedigitall@gmail.com">infuturedigitall@gmail.com</a>
            <span className="mx-3">|</span>
            <a href="tel:201108293956">201108293956</a>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" className="main-navbar">
        <Container className="nav-container d-flex align-items-center justify-content-between">
          

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto nav-links">
              <Nav.Link href="#services">خدماتنا</Nav.Link>
              <Nav.Link href="#projects">أعمالنا</Nav.Link>
              <Nav.Link href="#testimonials">آراء العملاء</Nav.Link>
              <Nav.Link href="tel:201108293956">اتصل بنا</Nav.Link>
              <Nav.Link href="#about">من نحن</Nav.Link>
              <Nav.Link href="#home">الرئيسية</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="logo">
            <img
              src="/assets/photo_5807827848113360265_y.jpg"
              alt="InFuture Logo"
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
}
