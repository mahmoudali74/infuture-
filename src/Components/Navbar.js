// CustomNavbar.js - FIXED MOBILE VERSION
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaChevronDown
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
        /* ===== TOP BAR ===== */
        .top-bar {
          background: linear-gradient(90deg, #1E367E, #3A5BA9);
          color: #fff;
          padding: 8px 0;
          font-size: 0.85rem;
        }
        
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .social-links {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .social-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        
        .contact-info {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #fff;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          color: #4FA9E2;
        }
        
        /* ===== MAIN NAVBAR ===== */
        .main-navbar {
          background: ${darkMode ? '#0a0a0a' : '#ffffff'} !important;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          padding: 12px 0 !important;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .navbar-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          direction: rtl;
        }
        
        /* ===== LOGO - FIXED ===== */
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        
        .logo-img {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #4FA9E2;
          flex-shrink: 0;
        }
        
        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          white-space: nowrap;
        }
        
        .logo-main-text {
          font-size: 1.1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1E367E, #4FA9E2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.3;
        }
        
        .logo-sub-text {
          font-size: 0.7rem;
          color: ${darkMode ? '#888' : '#666'};
          font-weight: 500;
        }
        
        /* ===== DESKTOP NAV ===== */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .nav-link-item {
          color: ${darkMode ? '#fff' : '#1E367E'} !important;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .nav-link-item:hover,
        .nav-link-item.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff !important;
        }
        
        .whatsapp-btn-nav {
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
          white-space: nowrap;
          font-size: 0.85rem;
        }
        
        .whatsapp-btn-nav:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37,211,102,0.4);
        }
        
        /* ===== MOBILE MENU BUTTON ===== */
        .mobile-menu-btn {
          background: none;
          border: 2px solid ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(30,54,126,0.3)'};
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: ${darkMode ? '#fff' : '#1E367E'};
          margin-right: 10px;
        }
        
        .mobile-menu-btn:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,54,126,0.1)'};
          border-color: #4FA9E2;
        }
        
        /* ===== MOBILE MENU ===== */
        .mobile-menu-backdrop {
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
        
        .mobile-menu-backdrop.show {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 300px;
          height: 100vh;
          background: ${darkMode 
            ? 'linear-gradient(145deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(145deg, #ffffff, #f0f8ff)'};
          z-index: 1002;
          padding: 70px 20px 30px;
          transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: -10px 0 40px rgba(0,0,0,0.3);
          overflow-y: auto;
        }
        
        .mobile-menu-panel.show {
          right: 0;
        }
        
        .mobile-menu-close {
          position: absolute;
          top: 15px;
          left: 15px;
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,54,126,0.1)'};
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.3rem;
          color: ${darkMode ? '#fff' : '#1E367E'};
          transition: all 0.3s ease;
        }
        
        .mobile-menu-close:hover {
          transform: rotate(90deg);
          background: ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(30,54,126,0.2)'};
        }
        
        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 30px;
        }
        
        .mobile-nav-item {
          color: ${darkMode ? '#fff' : '#1E367E'};
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          padding: 14px 18px;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-nav-item:hover,
        .mobile-nav-item.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff;
          transform: translateX(-5px);
        }
        
        .mobile-whatsapp {
          background: linear-gradient(135deg, #25D366, #128C7E);
          border: none;
          border-radius: 25px;
          padding: 14px 25px;
          color: #fff;
          font-weight: 700;
          width: 100%;
          margin-top: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 1rem;
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
        
        /* ===== RESPONSIVE FIXES ===== */
        
        /* Hide on mobile */
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
        }
        
        /* Tablet & Mobile */
        @media (max-width: 768px) {
          .top-bar {
            padding: 6px 0;
          }
          
          .top-bar-content {
            justify-content: center;
            flex-direction: column;
            gap: 8px;
          }
          
          .contact-info {
            gap: 12px;
          }
          
          .contact-item span {
            display: none; /* Hide text, show only icons */
          }
          
          .logo-img {
            height: 42px;
            width: 42px;
          }
          
          .logo-main-text {
            font-size: 1rem;
          }
          
          .logo-sub-text {
            font-size: 0.65rem;
          }
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
          .top-bar {
            padding: 5px 0;
            font-size: 0.8rem;
          }
          
          .social-link {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }
          
          .contact-item {
            font-size: 0.8rem;
          }
          
          .logo-container {
            gap: 8px;
          }
          
          .logo-img {
            height: 40px;
            width: 40px;
          }
          
          .logo-main-text {
            font-size: 0.95rem;
          }
          
          .logo-sub-text {
            display: none; /* Hide subtitle on small screens */
          }
          
          .mobile-menu-btn {
            padding: 5px 8px;
            margin-right: 8px;
          }
          
          .mobile-menu-panel {
            width: 100%;
            max-width: 100%;
            padding: 65px 15px 20px;
          }
          
          .mobile-nav-item {
            font-size: 1rem;
            padding: 12px 16px;
          }
          
          .whatsapp-float {
            width: 50px;
            height: 50px;
            bottom: 15px;
            left: 15px;
            font-size: 1.4rem;
          }
        }
        
        /* Very Small Screens */
        @media (max-width: 360px) {
          .logo-main-text {
            font-size: 0.85rem;
          }
          
          .logo-img {
            height: 38px;
            width: 38px;
          }
          
          .social-link {
            width: 26px;
            height: 26px;
          }
        }
        
        /* Desktop - Show everything */
        @media (min-width: 992px) {
          .mobile-menu-btn,
          .whatsapp-float {
            display: none !important;
          }
          
          .logo-sub-text {
            display: block;
          }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <Container fluid className="px-3">
          <div className="top-bar-content">
            {/* Social Links */}
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

            {/* Contact Info */}
            <div className="contact-info">
              <a href={`mailto:${email}`} className="contact-item">
                <FaEnvelope />
                <span>infuturedigitall@gmail.com</span>
              </a>
              <a href={`tel:+${phoneNumber}`} className="contact-item">
                <FaPhone />
                <span>+20 110 829 3956</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <Container fluid className="px-3 navbar-wrapper">
          
          {/* Logo - FIXED */}
          <a 
            href="#home" 
            className="logo-container"
            onClick={(e) => handleNavClick("#home", e)}
          >
            <img
              src="/assets/photo_5807827848113360265_y.jpg"
              alt="InFuture Logo"
              className="logo-img"
            />
            <div className="logo-text-wrapper">
              <span className="logo-main-text">InFuture</span>
              <span className="logo-sub-text">Digital Solutions</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link-item ${activeLink === link.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </a>
            ))}
            
            <button 
              className="whatsapp-btn-nav"
              onClick={openWhatsApp}
            >
              <FaWhatsapp /> تواصل
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </Container>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu-panel ${mobileMenuOpen ? 'show' : ''}`}>
        <button 
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="إغلاق القائمة"
        >
          <FaTimes />
        </button>
        
        <div className="mobile-nav-list">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-item ${activeLink === link.href ? 'active' : ''}`}
              onClick={(e) => handleNavClick(link.href, e)}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <button 
          className="mobile-whatsapp"
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
