// CustomNavbar.js - CLEAN MOBILE VERSION
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function CustomNavbar({ darkMode = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const phoneNumber = "201108293956";
  const email = "infuturedigitall@gmail.com";
  const message = "مرحبا! أريد التواصل معكم.";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setActiveLink(href);
    setMobileMenuOpen(false);
    
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("tel:")) {
      window.location.href = href;
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    }
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const navLinks = [
    { href: "#home", label: "الرئيسية" },
    { href: "#services", label: "خدماتنا" },
    { href: "#projects", label: "أعمالنا" },
    { href: "#testimonials", label: "آراء العملاء" },
    { href: "#about", label: "من نحن" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <>
      <style>{`
        /* ===== TOP BAR - DESKTOP ONLY ===== */
        .top-bar {
          background: linear-gradient(90deg, #1E367E, #3A5BA9);
          color: #fff;
          padding: 8px 0;
          display: block; /* Hidden on mobile by default */
        }
        
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }
        
        .social-links {
          display: flex;
          gap: 10px;
        }
        
        .social-link {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        
        .contact-info {
          display: flex;
          gap: 20px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        /* ===== MAIN NAVBAR ===== */
        .main-navbar {
          background: #fff !important;
          box-shadow: 0 2px 15px rgba(0,0,0,0.08);
          padding: 12px 0 !important;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          direction: rtl;
        }
        
        /* ===== LOGO - CLEAN ===== */
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        
        .logo-icon {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #4FA9E2;
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        
        .logo-brand {
          font-size: 1.3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1E367E, #4FA9E2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .logo-tagline {
          font-size: 0.7rem;
          color: #666;
          font-weight: 500;
        }
        
        /* ===== DESKTOP NAV ===== */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .nav-link {
          color: #1E367E !important;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover,
        .nav-link.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff !important;
        }
        
        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366, #128C7E) !important;
          border: none !important;
          border-radius: 25px !important;
          padding: 8px 20px !important;
          font-weight: 700 !important;
          color: #fff !important;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .whatsapp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37,211,102,0.4);
        }
        
        /* ===== MOBILE MENU BUTTON ===== */
        .menu-toggle {
          background: none;
          border: 2px solid #1E367E;
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E367E;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .menu-toggle:hover {
          background: rgba(30,54,126,0.1);
        }
        
        /* ===== MOBILE MENU ===== */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(3px);
        }
        
        .mobile-menu-overlay.show {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-container {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 320px;
          height: 100vh;
          background: linear-gradient(145deg, #ffffff, #f0f8ff);
          z-index: 1002;
          padding: 70px 25px 30px;
          transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: -10px 0 40px rgba(0,0,0,0.3);
          overflow-y: auto;
        }
        
        .mobile-menu-container.show {
          right: 0;
        }
        
        .mobile-menu-close {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(30,54,126,0.1);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.3rem;
          color: #1E367E;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-close:hover {
          transform: rotate(90deg);
          background: rgba(30,54,126,0.2);
        }
        
        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 30px;
        }
        
        .mobile-nav-link {
          color: #1E367E;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 15px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff;
          transform: translateX(-5px);
        }
        
        .mobile-whatsapp-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          border: none;
          border-radius: 25px;
          padding: 15px 25px;
          color: #fff;
          font-weight: 700;
          width: 100%;
          margin-top: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1.05rem;
          box-shadow: 0 8px 20px rgba(37,211,102,0.3);
        }
        
        /* ===== FLOATING WHATSAPP ===== */
        .whatsapp-float {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 55px;
          height: 55px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.6rem;
          box-shadow: 0 8px 25px rgba(37,211,102,0.5);
          cursor: pointer;
          z-index: 999;
          border: 3px solid #fff;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 25px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 8px 35px rgba(37,211,102,0.8); }
        }
        
        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 991px) {
          .top-bar {
            display: none !important; /* Hide top bar on mobile */
          }
          
          .desktop-nav {
            display: none !important;
          }
          
          .logo-tagline {
            display: none; /* Hide tagline on mobile */
          }
          
          .logo-brand {
            font-size: 1.1rem;
          }
          
          .logo-icon {
            height: 42px;
            width: 42px;
          }
        }
        
        @media (max-width: 480px) {
          .logo-wrapper {
            gap: 8px;
          }
          
          .logo-brand {
            font-size: 1rem;
          }
          
          .logo-icon {
            height: 40px;
            width: 40px;
          }
          
          .menu-toggle {
            padding: 6px 10px;
            font-size: 1.1rem;
          }
          
          .mobile-menu-container {
            width: 100%;
            max-width: 100%;
            padding: 65px 20px 25px;
          }
          
          .mobile-nav-link {
            font-size: 1.05rem;
            padding: 14px 18px;
          }
          
          .whatsapp-float {
            width: 50px;
            height: 50px;
            bottom: 15px;
            left: 15px;
            font-size: 1.4rem;
          }
        }
        
        /* ===== DESKTOP ===== */
        @media (min-width: 992px) {
          .menu-toggle,
          .whatsapp-float {
            display: none !important;
          }
          
          .logo-tagline {
            display: block;
          }
        }
      `}</style>

      {/* Top Bar - Desktop Only */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>

          <div className="contact-info">
            <a href={`mailto:${email}`} className="contact-item">
              <FaEnvelope />
              <span>{email}</span>
            </a>
            <a href={`tel:+${phoneNumber}`} className="contact-item">
              <FaPhone />
              <span>+20 110 829 3956</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="navbar-content">
          
          {/* Logo */}
          <a 
            href="#home" 
            className="logo-wrapper"
            onClick={(e) => handleNavClick("#home", e)}
          >
            <img
              src="/assets/photo_5807827848113360265_y.jpg"
              alt="InFuture Logo"
              className="logo-icon"
            />
            <div className="logo-text">
              <span className="logo-brand">InFuture</span>
              <span className="logo-tagline">Digital Solutions</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </a>
            ))}
            
            <button 
              className="whatsapp-btn"
              onClick={openWhatsApp}
            >
              <FaWhatsapp /> تواصل
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu-container ${mobileMenuOpen ? 'show' : ''}`}>
        <button 
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>
        
        <div className="mobile-nav-items">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${activeLink === link.href ? 'active' : ''}`}
              onClick={(e) => handleNavClick(link.href, e)}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <button 
          className="mobile-whatsapp-btn"
          onClick={() => {
            setMobileMenuOpen(false);
            openWhatsApp();
          }}
        >
          <FaWhatsapp /> تواصل واتساب
        </button>
      </div>

      {/* Floating WhatsApp */}
      <div 
        className="whatsapp-float"
        onClick={openWhatsApp}
        title="تواصل عبر واتساب"
      >
        <FaWhatsapp />
      </div>
    </>
  );
}
