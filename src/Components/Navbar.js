// CustomNavbar.js
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube 
} from "react-icons/fa";
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
      <div className="top-bar py-2">
        <Container className="d-flex justify-content-between align-items-center flex-wrap">
   

          <div className="contact-info mt-2 mt-md-0">
            <a href="mailto:infuturedigitall@gmail.com">
              infuturedigitall@gmail.com
            </a>
            <span className="mx-2">|</span>
            <a href="tel:201108293956">201108293956</a>
          </div>

        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" className="main-navbar py-3">
        <Container className="nav-container d-flex align-items-center justify-content-between flex-row-reverse">
          
          {/* Logo على اليمين */}
          <div className="logo" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/assets/photo_5807827848113360265_y.jpg"
              alt="InFuture Logo"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto nav-links text-center">
              <Nav.Link href="#home">الرئيسية</Nav.Link>
              <Nav.Link href="#services">خدماتنا</Nav.Link>
              <Nav.Link href="#projects">أعمالنا</Nav.Link>
              <Nav.Link href="#testimonials">آراء العملاء</Nav.Link>
              <Nav.Link href="#about">من نحن</Nav.Link>
              <Nav.Link href="tel:201108293956">اتصل بنا</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
