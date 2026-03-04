// CustomNavbar.js - FIXED VERSION
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube,
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
  const message = "مرحبا! أريد التواصل معكم.";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
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

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaTiktok />, href: "#", label: "TikTok" },
  ];

  return (
    <>
      <style>{`
        /* ===== TOP BAR ===== */
        .top-bar {
          background: ${darkMode 
            ? 'linear-gradient(90deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(90deg, #1E367E, #3A5BA9)'};
          color: #fff;
          font-size: 0.85rem;
          padding: 8px 0;
          position: relative;
          z-index: 1001;
        }
        
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .contact-info {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .contact-info a {
          color: rgba(255,255,255,0.95);
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .contact-info a:hover {
          color: #4FA9E2;
          transform: translateY(-2px);
        }
        
        .social-links-top {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .social-link-top {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .social-link-top:hover {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(79,169,226,0.4);
        }
        
        /* ===== MAIN NAVBAR ===== */
        .main-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 12px 0 !important;
          background: ${darkMode 
            ? 'rgba(10,10,10,0.95)' 
            : 'rgba(255,255,255,0.95)'} !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .main-navbar.scrolled {
          padding: 8px 0 !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          direction: rtl;
        }
        
        /* ===== LOGO ===== */
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.3s ease;
          text-decoration: none;
        }
        
        .logo-wrapper:hover {
          transform: scale(1.02);
        }
        
        .logo-img {
          height: 55px;
          width: 55px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #4FA9E2;
          box-shadow: 0 5px 15px rgba(79,169,226,0.3);
          transition: all 0.3s ease;
        }
        
        .logo-wrapper:hover .logo-img {
          transform: scale(1.08);
          box-shadow: 0 8px 25px rgba(79,169,226,0.5);
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        
        .logo-brand {
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1E367E, #4FA9E2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .logo-tagline {
          font-size: 0.75rem;
          color: ${darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(30,54,126,0.6)'};
          font-weight: 500;
        }
        
        /* ===== DESKTOP NAV ===== */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .nav-link-custom {
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(30,54,126,0.85)'} !important;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 10px 20px !important;
          border-radius: 25px;
          position: relative;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 3px;
          background: linear-gradient(90deg, #4FA9E2, #3A5BA9);
          border-radius: 2px;
          transition: transform 0.3s ease;
        }
        
        .nav-link-custom:hover,
        .nav-link-custom.active {
          color: #4FA9E2 !important;
          background: ${darkMode 
            ? 'rgba(79,169,226,0.15)' 
            : 'rgba(79,169,226,0.1)'} !important;
        }
        
        .nav-link-custom:hover::after,
        .nav-link-custom.active::after {
          transform: translateX(-50%) scaleX(1);
        }
        
        .whatsapp-btn-desktop {
          background: linear-gradient(135deg, #25D366, #128C7E) !important;
          border: none !important;
          border-radius: 30px !important;
          padding: 10px 25px !important;
          font-weight: 700 !important;
          color: #fff !important;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease !important;
          box-shadow: 0 5px 20px rgba(37,211,102,0.4) !important;
          text-decoration: none !important;
          margin-right: 15px;
        }
        
        .whatsapp-btn-desktop:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(37,211,102,0.6) !important;
        }
        
        /* ===== MOBILE MENU TOGGLE ===== */
        .mobile-toggle {
          border: 2px solid ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(30,54,126,0.3)'} !important;
          border-radius: 10px !important;
          padding: 8px 12px !important;
          background: transparent !important;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .mobile-toggle:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,54,126,0.1)'} !important;
          border-color: #4FA9E2 !important;
        }
        
        /* ===== MOBILE MENU ===== */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1002;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-overlay.show {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 350px;
          height: 100vh;
          background: ${darkMode 
            ? 'linear-gradient(145deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(145deg, #ffffff, #f8fbff)'};
          z-index: 1003;
          padding: 80px 30px 30px;
          transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: -10px 0 40px rgba(0,0,0,0.2);
          overflow-y: auto;
        }
        
        .mobile-menu.show {
          right: 0;
        }
        
        .mobile-menu-close {
          position: absolute;
          top: 20px;
          left: 20px;
          background: none;
          border: none;
          font-size: 1.8rem;
          color: ${darkMode ? '#fff' : '#1E367E'};
          cursor: pointer;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-close:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,54,126,0.1)'};
          transform: rotate(90deg);
        }
        
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 30px;
        }
        
        .mobile-nav-link {
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(30,54,126,0.9)'};
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 15px 20px;
          border-radius: 15px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff;
          transform: translateX(-5px);
          box-shadow: 0 8px 25px rgba(79,169,226,0.3);
        }
        
        .mobile-whatsapp-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          border: none;
          border-radius: 30px;
          padding: 15px 30px;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(37,211,102,0.4);
          font-size: 1.05rem;
        }
        
        .mobile-whatsapp-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(37,211,102,0.6);
        }
        
        /* ===== FLOATING WHATSAPP MOBILE ===== */
        .whatsapp-float-mobile {
          position: fixed;
          bottom: 25px;
          left: 25px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.8rem;
          box-shadow: 0 8px 30px rgba(37,211,102,0.5);
          cursor: pointer;
          z-index: 999;
          transition: all 0.3s ease;
          animation: pulse-whatsapp 2s infinite;
        }
        
        .whatsapp-float-mobile:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(37,211,102,0.7);
        }
        
        @keyframes pulse-whatsapp {
          0%, 100% { box-shadow: 0 8px 30px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 8px 40px rgba(37,211,102,0.8); }
        }
        
        /* ===== RESPONSIVE ===== */
        @media (min-width: 992px) {
          .mobile-toggle,
          .whatsapp-float-mobile {
            display: none !important;
          }
        }
        
        @media (max-width: 991px) {
          .desktop-nav,
          .whatsapp-btn-desktop {
            display: none !important;
          }
          
          .logo-brand {
            font-size: 1.2rem;
          }
          
          .logo-tagline {
            display: none;
          }
          
          .logo-img {
            height: 50px;
            width: 50px;
          }
        }
        
        @media (max-width: 768px) {
          .top-bar {
            font-size: 0.8rem;
            padding: 6px 0;
          }
          
          .contact-info {
            gap: 10px;
            justify-content: center;
            width: 100%;
            order: 2;
          }
          
          .social-links-top {
            width: 100%;
            justify-content: center;
            order: 1;
          }
          
          .social-link-top {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
          }
          
          .contact-info a {
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-menu {
            width: 100%;
            max-width: 100%;
          }
          
          .logo-text {
            display: none;
          }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <Container>
          <div className="top-bar-content">
            {/* Social Links */}
            <div className="social-links-top">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="social-link-top"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <a href="mailto:infuturedigitall@gmail.com">
                <FaEnvelope />
                <span className="d-none d-sm-inline">infuturedigitall@gmail.com</span>
                <span className="d-sm-none">Email</span>
              </a>
              <a href="tel:+201108293956">
                <FaPhone />
                <span>+20 110 829 3956</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
        <Container className="navbar-container">
          
          {/* Logo */}
          <a 
            href="#home" 
            className="logo-wrapper"
            onClick={(e) => handleNavClick("#home", e)}
          >
            <img
              src="/assets/photo_5807827848113360265_y.jpg"
              alt="InFuture Logo"
              className="logo-img"
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
                className={`nav-link-custom ${activeLink === link.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </a>
            ))}
            
            <Button 
              className="whatsapp-btn-desktop"
              onClick={openWhatsApp}
            >
              <FaWhatsapp /> تواصل واتساب
            </Button>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="mobile-toggle d-lg-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </Container>
      </Navbar>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
        <button 
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="إغلاق القائمة"
        >
          <FaTimes />
        </button>
        
        <div className="mobile-nav-links">
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

      {/* Floating WhatsApp Button - Mobile Only */}
      <div 
        className="whatsapp-float-mobile d-lg-none"
        onClick={openWhatsApp}
        title="تواصل عبر واتساب"
      >
        <FaWhatsapp />
      </div>
    </>
  );
}
