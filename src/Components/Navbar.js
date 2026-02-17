// CustomNavbar.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import {
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa6";
import "./navbar.css";

export default function CustomNavbar() {
  // رقم الواتساب مع رسالة افتراضية
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
      {/* 🔹 Top Bar */}
      <div
        className="top-bar"
        style={{ backgroundColor: "#05103a", color: "#fff", padding: "5px 0" }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          
          <div className="social-icons d-flex gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://www.facebook.com/InFutureDigitalSolutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              <FaFacebookF size={18} />
            </a>
          </div>

          <div className="contact-info">
            <a
              href="mailto:infuturedigitall@gmail.com"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              infuturedigitall@gmail.com
            </a>

            <span className="mx-3">|</span>

            <a
              href="tel:201108293956"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              201108293956
            </a>
          </div>

        </Container>
      </div>

      {/* 🔹 Main Navbar */}
      <Navbar
        expand="lg"
        className="main-navbar"
        style={{ backgroundColor: "#0a1f4d" }}
      >
        <Container className="nav-container d-flex align-items-center justify-content-between">
          
          {/* زرار واتساب */}
          <Button
            className="price-btn"
            style={{ backgroundColor: "#ff6600", border: "none" }}
            onClick={openWhatsApp}
          >
            تواصل معانا
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto nav-links">

              <Nav.Link href="#services" style={{ color: "#fff" }}>
                خدماتنا
              </Nav.Link>

              <Nav.Link href="#projects" style={{ color: "#fff" }}>
                أعمالنا
              </Nav.Link>

              <Nav.Link href="#testimonials" style={{ color: "#fff" }}>
                آراء العملاء
              </Nav.Link>

              <Nav.Link href="tel:201108293956" style={{ color: "#fff" }}>
                اتصل بنا
              </Nav.Link>

              <Nav.Link href="#about" style={{ color: "#fff" }}>
                من نحن
              </Nav.Link>

              <Nav.Link href="#home" style={{ color: "#fff" }}>
                الرئيسية
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

          {/* اللوجو */}
          <div className="logo">
            <img
              src="/asset/photo_5809677419944807700_y.jpg"
              alt="InFuture Logo"
              style={{ height: "60px", objectFit: "contain" }}
            />
          </div>

        </Container>
      </Navbar>
    </>
  );
}
