import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import CountUp from "react-countup";
import {
  FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaBars, FaTimes, FaArrowRight, FaCheckCircle, FaStar, FaWhatsapp,
  FaLock, FaBolt, FaUserTie, FaCogs, FaHandshake, FaHeadset,
  FaGlobe, FaGraduationCap, FaBuilding, FaShieldAlt, FaClock,
  FaChartLine, FaCode, FaUsers, FaPalette, FaCamera, FaLaptopCode, FaMapMarkerAlt
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// استيراد اللوجو - حط اللوجو في مجلد public/assets
import logoImg from '../assets/photo_2026-04-07_19-56-12.jpg';

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  const services = [
    { icon: <FaChartLine/>, title: "حملات إعلانية", desc: "إدارة احترافية لحملاتك الإعلانية", details: "نقدم خدمات متكاملة لإدارة الحملات على فيسبوك، إنستجرام، جوجل.", features: ["فيسبوك وإنستجرام", "إعلانات جوجل", "تحليل البيانات", "استهداف دقيق", "تقارير أسبوعية", "تحسين العائد"] },
    { icon: <FaCode/>, title: "تحسين SEO", desc: "ظهورك في النتائج الأولى", details: "نحسن ترتيب موقعك في جوجل لزيادة الزوار العضيين بشكل مستدام.", features: ["كلمات مفتاحية", "تحسين المحتوى", "SEO تقني", "بناء روابط", "تقارير شهرية", "تحليل المنافسين"] },
    { icon: <FaUsers/>, title: "سوشيال ميديا", desc: "إدارة حسابات التواصل", details: "ندير حساباتك باحترافية ونزيد التفاعل مع جمهورك.", features: ["تخطيط المحتوى", "تصميم بوستات", "كتابة إبداعية", "تحليل المنافسين", "جدولة النشر", "تقارير أداء"] },
    { icon: <FaPalette/>, title: "تصميم جرافيك", desc: "هوية بصرية مميزة", details: "تصميم شعارات وهوية بصرية تعكس علامتك التجارية.", features: ["شعارات Logo", "هوية متكاملة", "تصاميم سوشيال", "موشن جرافيك", "مطبوعات", "تعديل صور"] },
    { icon: <FaCamera/>, title: "تصوير منتجات", desc: "صور احترافية عالية الجودة", details: "تصوير منتجاتك بإضاءة واستوديو احترافي لزيادة المبيعات.", features: ["تصوير ستوديو", "تعديل احترافي", "فيديوهات قصيرة", "تسليم سريع", "خلفيات متنوعة", "زوايا متعددة"] },
    { icon: <FaLaptopCode/>, title: "مواقع ومتاجر", desc: "حلول رقمية متكاملة", details: "تصميم وبرمجة مواقع ومتاجر إلكترونية سريعة وآمنة.", features: ["تصميم UI/UX", "برمجة خاصة", "بوابات دفع", "دعم فني", "تحسين سرعة", "حماية متقدمة"] },
  ];

  const projects = [
    { title: "مواقع الشركات", desc: "تصميم عصري واحترافي", img: "/assets/Screenshot 2026-02-17 145639.png", link: "https://ediltechis.com/", tags: ["React", "Bootstrap"] },
    { title: "متاجر إلكترونية", desc: "متجر كامل بوابات دفع", img: "/assets/Screenshot 2026-02-17 145545.png", link: "https://bluelounge4catering.com/", tags: ["E-commerce", "Payment"] },
    { title: "منصات تعليمية", desc: "نظام إدارة محتوى متقدم", img: "/assets/Screenshot 2026-02-17 145614.png", link: "https://elnbress.com/", tags: ["LMS", "Video"] },
  ];

  const stats = [
    { number: 3, suffix: "+", label: "سنوات خبرة" },
    { number: 20, suffix: "+", label: "عملاء سعداء" },
    { number: 10, suffix: "+", label: "مشروعات منتهية" },
    { number: 3, suffix: "", label: "مشاريع جارية" },
  ];

  const whyChooseUs = [
    { icon: <FaLock/>, title: "سرية وشفافية", desc: "نلتزم بأعلى معايير السرية والوضوح" },
    { icon: <FaBolt/>, title: "سرعة التنفيذ", desc: "إنجاز مهامك في وقت قياسي" },
    { icon: <FaUserTie/>, title: "فريق محترف", desc: "خبراء في التصميم والتطوير" },
    { icon: <FaCogs/>, title: "تقنيات مبتكرة", desc: "أحدث الأدوات لضمان أفضل النتائج" },
    { icon: <FaHandshake/>, title: "شراكة استراتيجية", desc: "نعتبر عملاءنا شركاء نجاح" },
    { icon: <FaHeadset/>, title: "دعم مستمر", desc: "قنوات تواصل فعالة ومتابعة دورية" },
  ];

  const testimonials = [
    { name: "أ. حسام", role: "", text: "خدمات رائعة واحترافية، أنصح بشدة!", avatar: "👨‍", rating: 5 },
    { name: "أ. علي", role: "", text: "تصميمات مذهلة وتجربة مستخدم ممتازة!", avatar: "👨‍", rating: 5 },
    { name: "أ. منى", role: "", text: "سرعة تنفيذ ودعم ممتاز طوال الوقت.", avatar: "👩‍", rating: 5 },
  ];

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => { 
      setFormData({ name: "", phone: "", email: "", service: "", message: "" }); 
      setFormSubmitted(false); 
    }, 3000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const openServiceModal = (service) => { setSelectedService(service); setModalShow(true); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
        
        :root {
          --bg-dark: #0B2447;
          --primary: #1E3A8A;
          --primary-light: #3B82F6;
          --accent: #60A5FA;
          --text-dark: #0F172A;
          --text-light: #F8FAFC;
          --gray: #64748B;
          --light-bg: #F1F5F9;
          --border: #E2E8F0;
          --radius: 16px;
          --shadow: 0 4px 20px rgba(11, 36, 71, 0.12);
          --shadow-hover: 0 8px 30px rgba(11, 36, 71, 0.18);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Cairo', sans-serif;
          background: #fff;
          color: var(--text-dark);
          line-height: 1.7;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5 { font-weight: 800; line-height: 1.3; }
        p { font-weight: 500; color: var(--gray); }
        a { text-decoration: none; color: inherit; }
        img { max-width: 100%; height: auto; display: block; }
        button { cursor: pointer; font-family: inherit; }

        .top-bar {
          background: var(--bg-dark);
          color: var(--text-light);
          padding: 8px 0;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .top-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-socials { display: flex; gap: 12px; }
        .top-socials a { color: var(--text-light); transition: 0.2s; }
        .top-socials a:hover { color: var(--accent); }
        .top-phone { display: flex; align-items: center; gap: 6px; }

        .header {
          background: #fff;
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 999;
          padding: 12px 0;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }
        .logo { height: 48px; width: auto; }
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
        }
        .nav-menu a {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-dark);
          transition: 0.2s;
          padding: 5px 0;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }
        .nav-menu a:hover, .nav-menu a.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        .cta-btn {
          background: linear-gradient(135deg, var(--primary), var(--bg-dark));
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          font-weight: 700;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
          white-space: nowrap;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(30, 58, 138, 0.4); }
        .mobile-toggle { display: none; background: none; border: none; font-size: 1.5rem; color: var(--primary); }

        .hero {
          background: linear-gradient(160deg, var(--bg-dark) 0%, var(--primary) 100%);
          color: #fff;
          padding: 60px 0 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero h1 {
          font-size: clamp(1.6rem, 5vw, 2.5rem);
          margin-bottom: 15px;
          position: relative;
        }
        .hero p {
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          color: rgba(255,255,255,0.92);
          max-width: 700px;
          margin: 0 auto 25px;
          position: relative;
        }
        .hero-btn {
          background: #fff;
          color: var(--primary);
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 800;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: 0.3s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          position: relative;
        }
        .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.25); }

        .features-overlap {
          margin-top: -45px;
          position: relative;
          z-index: 10;
          padding-bottom: 40px;
        }
        .feature-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 25px 18px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: 0.3s;
          height: 100%;
          border: 1px solid var(--border);
        }
        .feature-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
        .feature-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          margin: 0 auto 12px;
        }
        .feature-card h5 { font-size: 1rem; margin: 0 0 8px; }

        .section { padding: 60px 0; }
        .bg-light { background: var(--light-bg); }
        .section-title { text-align: center; margin-bottom: 40px; }
        .section-title h2 { font-size: clamp(1.5rem, 3.5vw, 2rem); color: var(--text-dark); margin-bottom: 12px; }
        .section-title p { font-size: clamp(0.95rem, 2vw, 1.05rem); max-width: 650px; margin: 0 auto; }

        .about-text { max-width: 850px; margin: 0 auto; text-align: center; }
        .about-text h3 { font-size: clamp(1.4rem, 3vw, 1.8rem); margin-bottom: 18px; }
        .about-text p { font-size: 1rem; margin-bottom: 15px; line-height: 1.85; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .service-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 28px 20px;
          text-align: center;
          border: 2px solid var(--border);
          transition: 0.3s;
          cursor: pointer;
        }
        .service-card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: var(--shadow-hover); }
        .service-icon {
          width: 68px; height: 68px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 16px;
          transition: 0.3s;
        }
        .service-card:hover .service-icon { transform: scale(1.05); }
        .service-card h5 { font-size: 1.15rem; margin-bottom: 10px; }
        .service-card p { font-size: 0.95rem; margin: 0; }

        .stats-section {
          background: linear-gradient(135deg, var(--bg-dark), var(--primary));
          color: #fff;
          padding: 55px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          text-align: center;
        }
        .stat-item h3 { font-size: clamp(1.8rem, 4vw, 2.4rem); margin-bottom: 6px; }
        .stat-item p { font-size: 0.95rem; font-weight: 600; opacity: 0.95; margin: 0; color: #fff; }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }
        .why-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 24px 20px;
          border: 1px solid var(--border);
          transition: 0.3s;
        }
        .why-card:hover { border-color: var(--primary); box-shadow: var(--shadow); }
        .why-icon {
          width: 46px; height: 46px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem;
          margin-bottom: 12px;
        }
        .why-card h5 { font-size: 1.05rem; margin-bottom: 8px; }
        .why-card p { font-size: 0.9rem; margin: 0; }

        .cta-section {
          background: linear-gradient(135deg, var(--primary), var(--bg-dark));
          color: #fff;
          text-align: center;
          padding: 55px 0;
        }
        .cta-section h3 { font-size: clamp(1.4rem, 3vw, 1.9rem); margin-bottom: 14px; }
        .cta-section p { font-size: 1.05rem; opacity: 0.95; max-width: 700px; margin: 0 auto 20px; color: #fff; }
        .cta-white-btn {
          background: #fff;
          color: var(--primary);
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 800;
          font-size: 0.95rem;
          display: inline-flex; align-items: center; gap: 8px;
          transition: 0.3s;
        }
        .cta-white-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .project-card {
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          transition: 0.3s;
        }
        .project-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
        .project-img { width: 100%; height: 170px; object-fit: cover; }
        .project-body { padding: 20px; }
        .project-body h5 { font-size: 1.1rem; margin-bottom: 8px; }
        .project-body p { font-size: 0.9rem; margin-bottom: 12px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .tag { font-size: 0.7rem; padding: 4px 9px; border-radius: 20px; background: rgba(30,58,138,0.08); color: var(--primary); font-weight: 700; }
        .project-btn { background: var(--primary); color: #fff; border: none; border-radius: 50px; padding: 9px 0; font-weight: 700; width: 100%; transition: 0.2s; font-size: 0.9rem; }
        .project-btn:hover { background: var(--bg-dark); }

        .testi-box {
          background: #fff;
          border-radius: var(--radius);
          padding: 35px 28px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 2px solid var(--border);
          max-width: 750px;
          margin: 0 auto;
        }
        .stars { color: #FBBF24; font-size: 1.15rem; margin-bottom: 14px; }
        .testi-text { font-size: 1.1rem; font-style: italic; color: var(--gray); line-height: 1.8; margin-bottom: 20px; }
        .testi-author { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .testi-ava { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-light)); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff; }
        .testi-info h5 { font-size: 1rem; margin: 0 0 2px; text-align: right; }
        .testi-info p { font-size: 0.85rem; margin: 0; text-align: right; }

        .contact-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }
        .contact-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 30px 25px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }
        .contact-card h4 { font-size: 1.25rem; margin-bottom: 20px; }
        .contact-item { display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; }
        .contact-icon { width: 42px; height: 42px; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0; }
        .contact-item h5 { font-size: 0.95rem; margin: 0 0 3px; }
        .contact-item p, .contact-item a { font-size: 0.9rem; margin: 0; color: var(--gray); text-decoration: none; }
        .contact-item a:hover { color: var(--primary); }
        
        .form-ctrl {
          border-radius: 12px; padding: 12px 15px;
          border: 2px solid var(--border);
          background: var(--light-bg);
          color: var(--text-dark);
          margin-bottom: 14px;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'Cairo', sans-serif;
        }
        .form-ctrl:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(30,58,138,0.12); outline: none; background: #fff; }
        .submit-btn { background: linear-gradient(135deg, var(--primary), var(--bg-dark)); border: none; border-radius: 50px; padding: 13px; font-weight: 800; font-size: 0.95rem; color: #fff; width: 100%; transition: 0.3s; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(30,58,138,0.35); }
        .success-box { text-align: center; padding: 28px; background: #10B981; border-radius: 14px; color: #fff; }
        .success-box h5 { margin: 10px 0; font-weight: 700; }

        .footer { background: var(--bg-dark); color: #fff; padding: 60px 0 0; }
        .footer-grid { margin-bottom: 40px; }
        .footer-col { margin-bottom: 30px; }
        .footer-logo-text h3 { color: "#fff"; fontSize: "1.7rem"; fontWeight: 800; margin: "0 0 12px"; }
        .footer-logo-text p { color: "rgba(255,255,255,0.8)"; fontSize: "0.85rem"; margin: 0; letterSpacing: "1px"; }
        .footer-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
        }
        .footer-socials {
          display: flex;
          gap: 10px;
        }
        .footer-socials a {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s;
        }
        .footer-socials a:hover {
          background: var(--primary-light);
          transform: translateY(-4px);
        }
        .footer-col h5 {
          font-size: 1.15rem;
          fontWeight: 700;
          marginBottom: 20px;
          color: #fff;
          position: relative;
          paddingBottom: 10px;
        }
        .footer-col h5::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 45px;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-light), var(--accent));
          borderRadius: 2px;
        }
        .footer-links {
          listStyle: none;
          padding: 0;
          margin: 0;
        }
        .footer-links li {
          marginBottom: 10px;
        }
        .footer-links a {
          color: rgba(255,255,255,0.8);
          fontSize: 0.9rem;
          transition: all 0.2s;
          display: inline-block;
          fontWeight: 500;
        }
        .footer-links a:hover {
          color: var(--accent);
          transform: translateX(-5px);
        }
        .footer-contact {
          listStyle: none;
          padding: 0;
          margin: 0;
        }
        .footer-contact li {
          display: flex;
          alignItems: flex-start;
          gap: 10px;
          marginBottom: 14px;
          fontSize: 0.9rem;
          color: rgba(255,255,255,0.8);
        }
        .footer-contact li svg {
          color: var(--primary-light);
          fontSize: 1rem;
          marginTop: 2px;
          flexShrink: 0;
        }
        .footer-contact a {
          color: rgba(255,255,255,0.8);
          transition: 0.2s;
        }
        .footer-contact a:hover {
          color: var(--accent);
        }
        .footer-bottom {
          borderTop: 1px solid rgba(255,255,255,0.1);
          padding: 20px 0;
          textAlign: center;
        }
        .footer-bottom p {
          margin: 0;
          fontSize: 0.85rem;
          color: rgba(255,255,255,0.7);
          fontWeight: 500;
        }

        .modal-content { borderRadius: var(--radius); border: none; }
        .modal-header { background: linear-gradient(135deg, var(--primary), var(--bg-dark)); color: #fff; border: none; borderRadius: "var(--radius) var(--radius) 0 0"; padding: "20px 24px"; }
        .modal-title { fontWeight: 700; }
        .modal-body { padding: 28px 24px; }
        .modal-icon { width: 70px; height: 70px; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: #fff; borderRadius: 18px; display: flex; alignItems: center; justifyContent: center; fontSize: 1.9rem; margin: "0 auto 20px"; }
        .modal-body > p { fontSize: 1rem; lineHeight: 1.85; marginBottom: 20px; textAlign: center; color: var(--gray); }
        .features-list { listStyle: none; padding: 0; margin: 18px 0; }
        .features-list li { display: flex; alignItems: center; gap: 10px; padding: 10px 0; borderBottom: 1px solid var(--border); fontSize: 0.9rem; }
        .features-list li:lastChild { borderBottom: none; }
        .features-list svg { color: #10B981; }
        .modal-btn { background: linear-gradient(135deg, var(--primary), var(--bg-dark)); border: none; borderRadius: 50px; padding: 13px; fontWeight: 700; fontSize: 1rem; color: #fff; width: 100%; marginTop: 15px; }

        @media (max-width: 991px) {
          .nav-menu { display: none; }
          .mobile-toggle { display: block; }
          .header-inner { position: relative; }
          .nav-menu.open {
            display: flex;
            flexDirection: column;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            background: #fff;
            padding: 18px;
            gap: 12px;
            boxShadow: 0 10px 30px rgba(0,0,0,0.1);
            borderRadius: "0 0 12px 12px";
            zIndex: 1000;
          }
          .nav-menu.open a { padding: 8px 0; borderBottom: none; }
          .header .cta-btn { display: none; }
        }

        @media (max-width: 768px) {
          .top-bar-inner { flexDirection: column; gap: 6px; textAlign: center; }
          .top-socials { justifyContent: center; }
          .hero { padding: 45px 0 65px; }
          .section { padding: 45px 0; }
          .features-overlap { marginTop: -30px; paddingBottom: 35px; }
          .feature-card { padding: 20px 15px; }
          .contact-wrapper { gridTemplateColumns: 1fr; }
          .footer { padding: 45px 0 0; }
        }

        @media (max-width: 480px) {
          .header { padding: 10px 0; }
          .logo { height: 40px; }
          .hero h1 { fontSize: 1.5rem; }
          .hero p { fontSize: 0.9rem; }
          .hero-btn { padding: 11px 20px; fontSize: 0.9rem; }
          .section-title { marginBottom: 30px; }
          .services-grid, .projects-grid, .why-grid, .stats-grid { gridTemplateColumns: 1fr; }
          .feature-card, .service-card, .why-card, .contact-card, .testi-box { padding: 20px 16px; }
          .testi-text { fontSize: 0.95rem; }
          .modal-body { padding: 20px 16px; }
          .footer-col { textAlign: center; }
          .footer-logo-text { margin: "0 auto 12px"; }
          .footer-socials { justifyContent: center; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <Container>
          <div className="top-bar-inner">
            <div className="top-socials">
              <a href="#" aria-label="Facebook"><FaFacebook/></a>
              <a href="#" aria-label="Twitter"><FaTwitter/></a>
              <a href="#" aria-label="Instagram"><FaInstagram/></a>
              <a href="#" aria-label="Linkedin"><FaLinkedin/></a>
            </div>
            <div className="top-phone">
              <FaPhone/> <span>+20 110 829 3956</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Header */}
      <header className="header">
        <Container>
          <div className="header-inner">
            <img src={logoImg} alt="InFuture Logo" className="logo" />
            <ul className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
              {["home", "about", "services", "projects", "contact"].map(s => (
                <li key={s}><a href={`#${s}`} onClick={() => scrollToSection(s)}>{s === "home" ? "الرئيسية" : s === "about" ? "من نحن" : s === "services" ? "خدماتنا" : s === "projects" ? "أعمالنا" : "تواصل معنا"}</a></li>
              ))}
            </ul>
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
              <Button className="cta-btn" onClick={() => window.open("https://wa.me/201108293956", "_blank")}>
                <FaWhatsapp/> واتساب
              </Button>
              <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
                {mobileMenuOpen ? <FaTimes/> : <FaBars/>}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="hero" id="home" ref={el => sectionRefs.current.home = el}>
        <Container>
          <h1>InFuture Digital Solutions</h1>
          <p>شريكك الرقمي الموثوق ✨ حلول متكاملة من الفكرة حتى التنفيذ بجودة واحترافية، نساعدك على نمو مشروعك وتحقيق أهدافك الرقمية</p>
          <Button className="hero-btn" onClick={() => scrollToSection("contact")}>
            ابدأ مشروعك الآن <FaArrowRight/>
          </Button>
        </Container>
      </section>

      {/* Features Overlap */}
      <div className="features-overlap">
        <Container>
          <Row className="justify-content-center">
            {[
              { icon: <FaLock/>, title: "سرية وشفافية" },
              { icon: <FaBolt/>, title: "سرعة التنفيذ" },
              { icon: <FaUserTie/>, title: "فريق محترف" },
              { icon: <FaShieldAlt/>, title: "دعم مستمر" }
            ].map((f, i) => (
              <Col xs={12} sm={6} lg={3} key={i}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h5>{f.title}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* About */}
      <section className="section" id="about" ref={el => sectionRefs.current.about = el}>
        <Container>
          <div className="section-title">
            <h2>من نحن</h2>
            <p>نؤمن أن كل مشروع فريد ويستحق اهتمامًا خاصًا</p>
          </div>
          <div className="about-text">
            <p>في InFuture، نعمل معك خطوة بخطوة لفهم أهدافك وتقديم الحلول الأنسب. نجمع بين الخبرة التقنية والإبداع لنقدم نتائج استثنائية تساعد مشروعك على النمو.</p>
            <p>فريقنا مكون من خبراء متخصصين يضمنون لك جودة التنفيذ، الالتزام بالمواعيد، ودعم فني مستمر حتى بعد التسليم.</p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="section bg-light" id="services" ref={el => sectionRefs.current.services = el}>
        <Container>
          <div className="section-title">
            <h2>خدماتنا</h2>
            <p>مجموعة متكاملة من الخدمات الرقمية لتنمية مشروعك</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card" onClick={() => openServiceModal(s)}>
                <div className="service-icon">{s.icon}</div>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="stats-section" id="stats" ref={el => sectionRefs.current.stats = el}>
        <Container>
          <div className="stats-grid">
            {stats.map((st, i) => (
              <div className="stat-item" key={i}>
                <h3><CountUp end={st.number} duration={2} suffix={st.suffix}/></h3>
                <p>{st.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section" id="why" ref={el => sectionRefs.current.why = el}>
        <Container>
          <div className="section-title">
            <h2>لماذا تختار InFuture؟</h2>
            <p>نوفّر لعملائنا شراكة استراتيجية حقيقية تقوم على الاحترافية والجودة</p>
          </div>
          <div className="why-grid">
            {whyChooseUs.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h5>{w.title}</h5>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <Container>
          <h3>ابدأ نمو مشروعك الرقمي الآن</h3>
          <p>مع InFuture، فريقنا من الخبراء جاهز لمساعدتك بخدمات احترافية تضمن لك سرعة الإنجاز وحماية مصالحك</p>
          <Button className="cta-white-btn" onClick={() => scrollToSection("contact")}>
            اطلب استشارة مجانية <FaArrowRight/>
          </Button>
        </Container>
      </section>

      {/* Projects */}
      <section className="section bg-light" id="projects" ref={el => sectionRefs.current.projects = el}>
        <Container>
          <div className="section-title">
            <h2>أعمالنا</h2>
            <p>نماذج من مشاريعنا التي نفخر بها</p>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card">
                <img src={p.img} alt={p.title} className="project-img" />
                <div className="project-body">
                  <h5>{p.title}</h5>
                  <p>{p.desc}</p>
                  <div className="tags">{p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
                  <Button className="project-btn" onClick={() => window.open(p.link, "_blank")}>عرض المشروع</Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials" ref={el => sectionRefs.current.testimonials = el}>
        <Container>
          <div className="section-title">
            <h2>آراء عملائنا</h2>
            <p>ثقتكم هي دافعنا للاستمرار في التميز</p>
          </div>
          <div className="testi-box">
            <div className="stars">{Array.from({length: 5}).map((_, i) => <FaStar key={i}/>)}</div>
            <p className="testi-text">"{testimonials[0].text}"</p>
            <div className="testi-author">
              <div className="testi-ava">{testimonials[0].avatar}</div>
              <div className="testi-info">
                <h5>{testimonials[0].name}</h5>
                <p>{testimonials[0].role}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section bg-light" id="contact" ref={el => sectionRefs.current.contact = el}>
        <Container>
          <div className="section-title">
            <h2>تواصل معنا</h2>
            <p>فريقنا جاهز لمساعدتك على مدار الساعة</p>
          </div>
          <div className="contact-wrapper">
            
            {/* Contact Info Card */}
            <div className="contact-card">
              <h4>معلومات التواصل</h4>
              
              <div className="contact-item">
                <div className="contact-icon"><FaMapMarkerAlt/></div>
                <div>
                  <h5>العنوان</h5>
                  <p>عمارات المروه-ارض الجولف-مصر الجديده</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon"><FaPhone/></div>
                <div>
                  <h5>رقم الهاتف</h5>
                  <a href="tel:+201108293956">+20 110 829 3956</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon"><FaEnvelope/></div>
                <div>
                  <h5>البريد الإلكتروني</h5>
                  <a href="mailto:infuturedigitall@gmail.com">infuturedigitall@gmail.com</a>
                </div>
              </div>
              
              {/* Facebook */}
              <div className="contact-item">
                <div className="contact-icon"><FaFacebook/></div>
                <div>
                  <h5>فيسبوك</h5>
                  <a href="https://www.facebook.com/share/1Hh3XpYhsS/" target="_blank" rel="noopener noreferrer">
                    InFuture Digital Solutions
                  </a>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="contact-item">
                <div className="contact-icon" style={{background: "linear-gradient(135deg, #25D366, #128C7E)"}}>
                  <FaWhatsapp/>
                </div>
                <div>
                  <h5>واتساب</h5>
                  <a href="https://wa.me/201108293956" target="_blank" rel="noopener noreferrer">
                    +20 110 829 3956
                  </a>
                </div>
              </div>
              
            </div>

            {/* Contact Form Card */}
            <div className="contact-card">
              <h4>أرسل رسالتك</h4>
              {formSubmitted ? (
                <div className="success-box">
                  <FaCheckCircle size={35}/>
                  <h5>تم الإرسال بنجاح ✓</h5>
                  <p>سنتواصل معك قريبًا</p>
                </div>
              ) : (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Control 
                    className="form-ctrl" 
                    type="text" 
                    placeholder="الاسم *" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required
                  />
                  <Form.Control 
                    className="form-ctrl" 
                    type="tel" 
                    placeholder="رقم الهاتف *" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    required
                  />
                  <Form.Control 
                    className="form-ctrl" 
                    type="email" 
                    placeholder="البريد الإلكتروني *" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required
                  />
                  <Form.Control 
                    className="form-ctrl" 
                    as="textarea" 
                    rows={4} 
                    placeholder="رسالتك *" 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    required
                  />
                  <Button type="submit" className="submit-btn">
                    إرسال الرسالة <FaArrowRight style={{marginRight: 6}}/>
                  </Button>
                </Form>
              )}
            </div>

          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row className="footer-grid">
            {/* About Column */}
            <Col xs={12} md={6} lg={3} className="footer-col">
              <div className="footer-logo-text">
                <h3 style={{color: "#fff", fontSize: "1.7rem", fontWeight: 800, margin: "0 0 12px"}}>
                  InFuture
                </h3>
                <p style={{color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", margin: 0, letterSpacing: "1px"}}>
                  DIGITAL SOLUTIONS
                </p>
              </div>
              <p className="footer-desc">
                شريكك الرقمي الموثوق لحلول متكاملة من الفكرة حتى التنفيذ بجودة واحترافية عالية. نساعدك على نمو مشروعك وتحقيق أهدافك.
              </p>
              <div className="footer-socials">
                <a href="#" aria-label="Facebook"><FaFacebook/></a>
                <a href="#" aria-label="Twitter"><FaTwitter/></a>
                <a href="#" aria-label="Instagram"><FaInstagram/></a>
                <a href="#" aria-label="Linkedin"><FaLinkedin/></a>
              </div>
            </Col>

            {/* Quick Links */}
            <Col xs={12} md={6} lg={3} className="footer-col">
              <h5>روابط سريعة</h5>
              <ul className="footer-links">
                <li><a href="#home" onClick={() => scrollToSection('home')}>الرئيسية</a></li>
                <li><a href="#about" onClick={() => scrollToSection('about')}>من نحن</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>خدماتنا</a></li>
                <li><a href="#projects" onClick={() => scrollToSection('projects')}>أعمالنا</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>تواصل معنا</a></li>
              </ul>
            </Col>

            {/* Services */}
            <Col xs={12} md={6} lg={3} className="footer-col">
              <h5>خدماتنا</h5>
              <ul className="footer-links">
                <li><a href="#services" onClick={() => scrollToSection('services')}>حملات إعلانية</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>تحسين SEO</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>سوشيال ميديا</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>تصميم جرافيك</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>مواقع ومتاجر</a></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col xs={12} md={6} lg={3} className="footer-col">
              <h5>تواصل معنا</h5>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt/>
                  <span>عمارات المروه-ارض الجولف-مصر الجديده</span>
                </li>
                <li>
                  <FaPhone/>
                  <a href="tel:+201108293956">+20 110 829 3956</a>
                </li>
                <li>
                  <FaEnvelope/>
                  <a href="mailto:infuturedigitall@gmail.com">infuturedigitall@gmail.com</a>
                </li>
              </ul>
            </Col>
          </Row>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} InFuture Digital Solutions. جميع الحقوق محفوظة.</p>
          </div>
        </Container>
      </footer>

      {/* Service Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg">
        {selectedService && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedService.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <div className="modal-icon">{selectedService.icon}</div>
              <p>{selectedService.details}</p>
              <h5 style={{fontWeight: 700, marginBottom: 12, textAlign: "center"}}>مميزات الخدمة:</h5>
              <ul className="features-list">
                {selectedService.features.map((f, i) => (
                  <li key={i}><FaCheckCircle/><span>{f}</span></li>
                ))}
              </ul>
              <Button className="modal-btn" onClick={() => {setModalShow(false); scrollToSection('contact');}}>
                طلب هذه الخدمة <FaArrowRight style={{marginRight: 6}}/>
              </Button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
