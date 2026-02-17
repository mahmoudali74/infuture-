import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaPhone, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export default function ElectricCircuitFooter() {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const nodes = [];
    const nodeCount = 100;

    const resizeCanvas = () => {
      if (footerRef.current) {
        canvas.width = window.innerWidth;
        canvas.height = footerRef.current.offsetHeight;
      }
    };
    resizeCanvas();

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10,31,60,0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // رسم الخطوط بين النقاط القريبة
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00c8ff";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${1 - dist / 100})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <footer className="electric-footer" ref={footerRef}>
      <canvas ref={canvasRef} className="electric-canvas"></canvas>

      <Container className="pt-5 pb-5 content-container">
        <Row className="g-5 text-center text-lg-start">
          {/* اللوجو والوصف */}
          <Col lg={4} md={6}>
            <div className="footer-section">
              <img
                src="/assets/photo_5807827848113360265_y.jpg"
                alt="InFuture Logo"
                className="footer-logo"
              />
              <p className="footer-text">
                InFuture Digital Solutions شركة متخصصة في تطوير وتصميم المواقع
                الإلكترونية، تطبيقات الموبايل، والحلول الرقمية الحديثة لمساعدة
                الشركات على النمو والتحول الرقمي.
              </p>
            </div>
          </Col>

          {/* التواصل */}
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">بيانات التواصل</h5>

              <p>
                <FaPhone /> <a href="tel:01108293956">01108293956</a>
              </p>
              <p>
                <FaPhone /> <a href="tel:01108293965">01108293965</a>
              </p>

              <p>
                <a
                  href="https://wa.me/201108293956"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="whatsapp" /> واتساب متاح على الرقم الأول
                </a>
              </p>

              <p className="address">
                📍
                <a
                  href="https://maps.app.goo.gl/qnoTTviKD4Yjmwjc7"
                  target="_blank"
                  rel="noreferrer"
                >
                  عمران المروة، أرض الجولف، مصر الجديدة
                </a>
              </p>

              <div className="contact-social">
                <a
                  href="https://www.facebook.com/InFutureDigitalSolutions"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF /> <span>تابعنا على فيسبوك</span>
                </a>
              </div>
            </div>
          </Col>

          {/* روابط سريعة */}
          <Col lg={4} md={12}>
            <div className="footer-section">
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
