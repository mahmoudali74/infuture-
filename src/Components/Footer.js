import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaPhone, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          {/* اللوجو والوصف */}
          <Col lg={4} md={6}>
            <div className="glass-card">
              <div className="logo-wrapper">
                <img
                  src="/assets/photo_5807827848113360265_y.jpg"
                  alt="InFuture Logo"
                  className="footer-logo"
                />
              </div>
              <p className="footer-text">
                InFuture Digital Solutions شركة متخصصة في تطوير وتصميم المواقع
                الإلكترونية، تطبيقات الموبايل، والحلول الرقمية الحديثة لمساعدة
                الشركات على النمو والتحول الرقمي.
              </p>
            </div>
          </Col>

          {/* التواصل */}
          <Col lg={4} md={6}>
            <div className="glass-card">
              <h5 className="footer-title">بيانات التواصل</h5>

              {/* أرقام الهاتف */}
              <p>
                <FaPhone /> <a href="tel:01108293956">01108293956</a>
              </p>
              <p>
                <FaPhone /> <a href="tel:01108293965">01108293965</a>
              </p>

              {/* واتساب */}
              <p>
                <a
                  href="https://wa.me/201108293956"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FaWhatsapp className="whatsapp" /> واتساب متاح على الرقم
                  الأول
                </a>
              </p>

              <p className="address">
                📍 عمارات المروة، أرض الجولف، مصر الجديدة
              </p>

              {/* فيسبوك */}
              <div className="contact-social">
                <a
                  href="https://www.facebook.com/InFutureDigitalSolutions"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FaFacebookF /> <span>تابعنا على فيسبوك</span>
                </a>
              </div>
            </div>
          </Col>

          {/* روابط سريعة */}
          <Col lg={4} md={12}>
            <div className="glass-card">
              <h5 className="footer-title">روابط سريعة</h5>
              <ul className="footer-links">
                <li>
                  <a href="#home">الرئيسية</a>
                </li>
                <li>
                  <a href="#about">من نحن</a>
                </li>
                <li>
                  <a href="#services">خدماتنا</a>
                </li>
                <li>
                  <a href="#contact">تواصل معنا</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        جميع الحقوق محفوظة © {new Date().getFullYear()} InFuture Digital
        Solutions
      </div>
    </footer>
  );
}
