// Home.js
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import CountUp from "react-countup";
import {
  FaMobileAlt,
  FaGraduationCap,
  FaPalette,
  FaLaptop,
  FaCode,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaPlay,
  FaQuoteLeft,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Home({ darkMode = false }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRefs = useRef({});
  const observerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  // Typing effect for hero
  useEffect(() => {
    const texts = ["حلول رقمية", "تصميم إبداعي", "تطوير احترافي", "نجاح مشروعك"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;
    const type = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      if (!isDeleting && charIndex === currentText.length) {
        timeout = setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(type, speed);
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs.current);
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  // Dark mode body styles
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0a0a0a" : "#f8fafc";
    document.body.style.color = darkMode ? "#fff" : "#000";
    document.body.style.transition = "all 0.3s ease";
  }, [darkMode]);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "أستاذ حسام",
      role: "",
      text: "خدمات رائعة واحترافية، أنصح بشدة! فريق عمل متعاون ونتائج ملموسة.",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      name: "أستاذ علي",
      role: "",
      text: "تصميمات مذهلة وتجربة مستخدم ممتازة. تجاوزوا توقعاتي تماماً!",
      avatar: "👨‍🔧",
      rating: 5,
    },
    {
      name: "أستاذة منى",
      role: "",
      text: "سرعة تنفيذ ودعم ممتاز طوال الوقت. شراكة حقيقية وليست مجرد خدمة.",
      avatar: "👩‍💼",
      rating: 5,
    },
  ];

  const services = [
    {
      img: "/assets/pexels-kindelmedia-7688467.jpg",
      title: "حملات إعلانية ممولة",
      desc: "إدارة احترافية لحملاتك الإعلانية على جميع المنصات",
      delay: "0s",
      details: "نقدم خدمات متكاملة لإدارة الحملات الإعلانية الممولة على فيسبوك، إنستجرام، جوجل، ولينكد إن. نبدأ بدراسة جمهورك المستهدف وتحليل السوق، ثم نصمم إعلانات جذابة تحقق أعلى معدل تحويل. نوفر تقارير دورية مفصلة عن أداء الحملات مع تحسين مستمر للنتائج.",
      features: [
        "إعلانات فيسبوك وإنستجرام",
        "إعلانات جوجل (Google Ads)",
        "إعلانات لينكد إن للمحترفين",
        "تحليل البيانات والتقارير",
        "تحسين مستمر للأداء",
        "استهداف دقيق للجمهور"
      ]
    },
    {
      img: "/assets/pexels-pixabay-270637.jpg",
      title: "تحسين محركات البحث",
      desc: "تحسين ظهور موقعك في نتائج البحث الأولى",
      delay: "0.1s",
      details: "نساعدك في تحسين ترتيب موقعك في نتائج محركات البحث (SEO) لزيادة الزوار العضيين. نعمل على تحسين المحتوى، البنية التقنية للموقع، والروابط الخلفية لضمان ظهورك في الصفحات الأولى من جوجل.",
      features: [
        "تحليل الكلمات المفتاحية",
        "تحسين المحتوى On-Page",
        "تحسين تقني Technical SEO",
        "بناء روابط خلفية",
        "تحسين سرعة الموقع",
        "تقارير شهرية مفصلة"
      ]
    },
    {
      img: "/assets/pexels-fauxels-3183183.jpg",
      title: "إدارة السوشيال ميديا",
      desc: "إدارة احترافية لحساباتك على منصات التواصل",
      delay: "0.2s",
      details: "ندير حساباتك على منصات التواصل الاجتماعي باحترافية عالية. نصمم محتوى جذاب، نرد على المتابعين، ونزيد من تفاعل جمهورك مع علامتك التجارية. نخطط استراتيجيات محتوى شهرية تناسب هويتك البصرية.",
      features: [
        "تخطيط استراتيجي للمحتوى",
        "تصميم بوستات وفيديوهات",
        "كتابة محتوى إبداعي",
        "الرد على المتابعين",
        "تحليل المنافسين",
        "تقارير أداء شهرية"
      ]
    },
    {
      img: "/assets/pexels-pixabay-247819.jpg",
      title: "تصميم جرافيك",
      desc: "تصميمات إبداعية تعكس هوية علامتك التجارية",
      delay: "0.3s",
      details: "نقدم خدمات تصميم جرافيك احترافية تشمل الشعارات، الهوية البصرية، التصاميم الإعلانية، والمحتوى البصري للسوشيال ميديا. فريقنا المبدع يحول أفكارك إلى تصاميم جذابة تعكس شخصية علامتك التجارية.",
      features: [
        "تصميم شعارات Logo",
        "هوية بصرية متكاملة",
        "تصاميم السوشيال ميديا",
        "بروشورات وفلايرات",
        "تصميم packaging",
        "موشن جرافيك"
      ]
    },
    {
      img: "/assets/pexels-marviio-1561081.jpg",
      title: "تصوير منتجات",
      desc: "تصوير احترافي لمنتجاتك بأعلى جودة",
      delay: "0.4s",
      details: "نوفر خدمات تصوير منتجات احترافية للمتاجر الإلكترونية والعلامات التجارية. نستخدم أحدث المعدات والإضاءة لإبراز مميزات منتجاتك بشكل جذاب يزيد من المبيعات.",
      features: [
        "تصوير منتجات احترافي",
        "إضاءة استوديو متطورة",
        "تعديل وتحسين الصور",
        "تصوير 360 درجة",
        "فيديوهات منتجات",
        "تسليم سريع"
      ]
    },
    {
      img: "/assets/pexels-pixabay-270404.jpg",
      title: "إنشاء موقع ومتجر",
      desc: "تصميم وتطوير مواقع ومتاجر إلكترونية احترافية",
      delay: "0.5s",
      details: "نصمم ونطور مواقع إلكترونية ومتاجر أونلاين بأحدث التقنيات. مواقع متجاوبة مع جميع الأجهزة، سريعة، وآمنة مع لوحة تحكم سهلة الإدارة. ندعمك من الفكرة حتى الإطلاق وما بعده.",
      features: [
        "تصميم UI/UX احترافي",
        "برمجة خاصة أو CMS",
        "متاجر إلكترونية متكاملة",
        "بوابات دفع إلكتروني",
        "تحسين SEO",
        "دعم فني مستمر"
      ]
    },
  ];

  const projects = [
    {
      title: "مواقع الشركات",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب، مع التركيز على حلول رقمية مبتكرة لتطوير أعمالكم.",
      img: "/assets/Screenshot 2026-02-17 145639.png",
      link: "https://ediltechis.com/",
      tags: ["React", "Bootstrap", "SEO"],
    },
    {
      title: "متاجر إلكترونية",
      desc: "متجر إلكتروني كامل مع خيارات دفع وشحن متقدمة، كحل رقمي شامل لدعم التجارة الإلكترونية.",
      img: "/assets/Screenshot 2026-02-17 145545.png",
      link: "https://bluelounge4catering.com/",
      tags: ["E-commerce", "Payment", "Admin Panel"],
    },
    {
      title: "منصات تعليمية",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب مع نظام إدارة محتوى متقدم.",
      img: "/assets/Screenshot 2026-02-17 145614.png",
      link: "https://elnbress.com/",
      tags: ["LMS", "Video", "Quizzes"],
    },
  ];

  const stats = [
    { number: 3, label: "سنوات خبرة", icon: <FaRocket /> },
    { number: 3, label: "مشروع تحت التنفيذ", icon: <FaCode /> },
    { number: 20, label: "عملاء سعداء", icon: <FaUsers /> },
    { number: 10, label: "مشروعات منتهية", icon: <FaCheckCircle /> },
  ];

  const galleryImages = [
    "/assets/photo_5809677419944807673_y.jpg",
    "/assets/photo_5809677419944807674_y.jpg",
    "/assets/photo_5809677419944807676_y.jpg",
    "/assets/photo_5809677419944807677_y.jpg",
    "/assets/photo_5809677419944807673_y.jpg",
    "/assets/photo_5809677419944807674_y.jpg",
  ];

  const processSteps = [
    { step: "01", title: "اكتشاف", desc: "نفهم احتياجاتك وأهداف مشروعك", icon: <FaChartLine /> },
    { step: "02", title: "تخطيط", desc: "نضع استراتيجية وخطة عمل واضحة", icon: <FaPalette /> },
    { step: "03", title: "تنفيذ", desc: "نحول الأفكار إلى واقع رقمي ملموس", icon: <FaCode /> },
    { step: "04", title: "إطلاق", desc: "ندعمك بعد الإطلاق لضمان النجاح", icon: <FaRocket /> },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setFormSubmitted(false);
    }, 3000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setModalShow(true);
  };

  return (
    <>
      <style>{`
        /* ===== GLOBAL ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
          scroll-behavior: smooth;
          background: ${darkMode ? "#0a0a0a" : "#f8fafc"};
          color: ${darkMode ? "#fff" : "#1a1a2e"};
        }
        
        /* ===== SIMPLE ANIMATIONS ===== */
        .animate-on-scroll { opacity: 0; transition: opacity 0.4s ease; }
        .animate-on-scroll.animate-in { opacity: 1; }
        
        /* ===== HERO ===== */
        .hero {
          min-height: 90vh;
          padding: 60px 20px;
          text-align: center;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
        }
        .hero-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 15px; }
        .hero-subtitle { font-size: 1.4rem; margin: 10px 0; color: rgba(255,255,255,0.95); min-height: 45px; }
        .typed-cursor { border-right: 2px solid #fff; animation: blink 0.7s infinite; display: inline-block; margin-left: 4px; }
        @keyframes blink { 50% { border-color: transparent; } }
        .hero-desc { font-size: 1rem; margin: 20px 0 30px; color: rgba(255,255,255,0.9); line-height: 1.6; max-width: 600px; }
        .glow-button {
          background: #fff; color: #2563eb; border: none; border-radius: 40px;
          padding: 12px 30px; font-weight: 600; font-size: 1rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: transform 0.2s;
        }
        .glow-button:hover { transform: translateY(-2px); }
        .scroll-indicator {
          position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%);
          cursor: pointer; color: rgba(255,255,255,0.8); font-size: 1.3rem;
        }
        
        /* ===== NAV DOTS ===== */
        .nav-dots {
          position: fixed; right: 15px; top: 50%; transform: translateY(-50%);
          z-index: 1000; display: flex; flex-direction: column; gap: 10px;
        }
        .nav-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(255,255,255,0.5); border: 2px solid #fff;
          cursor: pointer; transition: all 0.2s;
        }
        .nav-dot.active { background: #fff; transform: scale(1.15); }
        
        /* ===== SECTIONS ===== */
        .section-title {
          font-size: 2rem; font-weight: 700; margin-bottom: 10px;
          color: ${darkMode ? '#fff' : '#1a1a2e'}; text-align: center;
        }
        .section-subtitle {
          color: ${darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
          font-size: 1rem; margin-bottom: 35px; max-width: 550px;
          margin-left: auto; margin-right: auto; text-align: center;
        }
        
        /* ===== ABOUT SECTION - SIMPLE & CLEAN ===== */
        .about-section {
          padding: 70px 0;
          background: ${darkMode ? '#0f172a' : '#ffffff'};
        }
        .about-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 40px;
        }
        .about-text {
          flex: 1;
          min-width: 300px;
        }
        .about-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: ${darkMode ? '#fff' : '#1a1a2e'};
          position: relative;
          padding-bottom: 12px;
        }
        .about-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: #3b82f6;
          border-radius: 2px;
        }
        .about-desc {
          font-size: 1rem;
          line-height: 1.8;
          color: ${darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)'};
          margin-bottom: 15px;
        }
        .about-highlights {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 25px;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: ${darkMode ? '#fff' : '#1a1a2e'};
        }
        .highlight-icon {
          color: #3b82f6;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .about-image {
          flex: 1;
          min-width: 300px;
          display: flex;
          justify-content: center;
        }
        .about-image img {
          max-width: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        
        /* ===== SERVICES ===== */
        .service-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          transition: transform 0.2s;
          text-align: center;
          height: 100%;
          background: ${darkMode ? '#1e293b' : '#fff'};
          cursor: pointer;
        }
        .service-card:hover { transform: translateY(-4px); }
        .service-image-wrapper { height: 180px; overflow: hidden; }
        .service-card img { width: 100%; height: 100%; object-fit: cover; }
        .service-content { padding: 18px 15px; }
        .service-card h5 {
          font-weight: 600; margin-bottom: 6px; font-size: 1rem;
          color: ${darkMode ? '#fff' : '#1a1a2e'};
        }
        .service-card p {
          opacity: 0.8; line-height: 1.5; font-size: 0.85rem;
          color: ${darkMode ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)'};
          margin: 0;
        }
        
        /* ===== PROCESS ===== */
        .process-section { padding: 60px 0; background: ${darkMode ? '#0f172a' : '#f8fafc'}; }
        .process-step { text-align: center; padding: 20px 10px; }
        .step-number {
          width: 50px; height: 50px; border-radius: 50%;
          background: #3b82f6; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; font-weight: 700; margin: 0 auto 12px;
        }
        .step-icon { font-size: 1.3rem; color: #3b82f6; margin-bottom: 10px; display: block; }
        .process-step h5 { font-weight: 600; margin-bottom: 6px; font-size: 1rem; }
        .process-step p { opacity: 0.75; font-size: 0.85rem; line-height: 1.4; }
        
        /* ===== PROJECTS ===== */
        .project-card {
          border-radius: 12px; overflow: hidden; border: none;
          transition: transform 0.2s;
          background: ${darkMode ? '#1e293b' : '#fff'};
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }
        .project-card:hover { transform: translateY(-4px); }
        .project-img { height: 160px; object-fit: cover; width: 100%; }
        .project-tags { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0; justify-content: center; }
        .project-tag {
          font-size: 0.65rem; padding: 3px 9px; border-radius: 12px;
          background: #3b82f6; color: #fff; font-weight: 500;
        }
        .project-btn {
          background: #2563eb; border: none; border-radius: 18px;
          padding: 7px 18px; font-weight: 600; font-size: 0.9rem;
          transition: transform 0.2s;
        }
        .project-btn:hover { transform: translateY(-2px); }
        
        /* ===== GALLERY ===== */
        .gallery-section { padding: 50px 0; background: linear-gradient(135deg, #2563eb, #3b82f6); }
        .gallery-section h2 { font-size: 1.8rem; margin-bottom: 30px; color: #fff; text-align: center; }
        .carousel-track {
          display: flex; gap: 15px; padding: 15px 10px;
          overflow-x: auto; scroll-behavior: smooth;
          scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-item {
          min-width: 260px; flex-shrink: 0; border-radius: 12px;
          overflow: hidden; scroll-snap-align: start; background: #fff;
        }
        .carousel-item img { width: 100%; height: 170px; object-fit: cover; }
        
        /* ===== STATS ===== */
        .stats-card {
          border-radius: 16px; padding: 25px 18px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff; text-align: center; border: none;
        }
        .stats-card h3 { font-size: 2rem; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .stats-card p { font-size: 0.9rem; opacity: 0.95; font-weight: 500; }
        
        /* ===== TESTIMONIALS ===== */
        .testimonial {
          background: ${darkMode ? '#1e293b' : '#fff'};
          color: ${darkMode ? '#fff' : '#1a1a2e'};
          border-radius: 16px; padding: 30px;
          text-align: center; max-width: 600px; margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .testimonial p { font-size: 1.05rem; font-style: italic; line-height: 1.6; margin: 12px 0 18px; }
        .testimonial-author { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 12px; }
        .testimonial-avatar {
          width: 45px; height: 45px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; color: #fff;
        }
        .testimonial-info h5 { font-weight: 600; margin-bottom: 2px; font-size: 1rem; }
        .testimonial-info span { opacity: 0.7; font-size: 0.85rem; }
        .testimonial-rating { color: #fbbf24; margin: 8px 0; font-size: 0.9rem; }
        .testimonial-dots { display: flex; justify-content: center; gap: 6px; margin-top: 18px; }
        .testimonial-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'};
          cursor: pointer; transition: all 0.2s;
        }
        .testimonial-dot.active { background: #3b82f6; transform: scale(1.15); }
        
        /* ===== CONTACT ===== */
        .contact-section { padding: 60px 0; background: linear-gradient(135deg, #2563eb, #3b82f6); }
        .contact-section h2 { color: #fff; }
        .contact-section .section-subtitle { color: rgba(255,255,255,0.9); }
        .contact-card {
          background: ${darkMode ? 'rgba(30,41,59,0.98)' : 'rgba(255,255,255,0.98)'};
          border-radius: 16px; padding: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .contact-info-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 0; border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
        }
        .contact-info-item:last-child { border-bottom: none; }
        .contact-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 1rem; flex-shrink: 0;
        }
        .contact-text h5 { font-weight: 600; margin-bottom: 2px; font-size: 0.95rem; }
        .contact-text p, .contact-text a {
          opacity: 0.85; text-decoration: none;
          color: ${darkMode ? '#fff' : '#1a1a2e'}; font-size: 0.9rem;
        }
        .contact-form .form-control {
          border-radius: 10px; padding: 10px 15px;
          border: 1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'};
          background: ${darkMode ? '#0f172a' : '#f8fafc'};
          color: ${darkMode ? '#fff' : '#000'}; margin-bottom: 12px; font-size: 0.9rem;
        }
        .contact-form .form-control:focus {
          border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.15);
          background: ${darkMode ? '#1e293b' : '#fff'};
        }
        .submit-btn {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 22px; padding: 12px 30px;
          font-weight: 600; font-size: 0.95rem; color: #fff;
          transition: transform 0.2s; width: 100%;
        }
        .submit-btn:hover { transform: translateY(-2px); }
        .form-success {
          text-align: center; padding: 20px; color: #fff;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 12px;
        }
        .form-success svg { font-size: 2rem; margin-bottom: 10px; }
        
        /* ===== FOOTER ===== */
        .footer {
          background: ${darkMode ? '#0a0a0a' : '#1a1a2e'};
          color: rgba(255,255,255,0.9); padding: 40px 0 20px;
        }
        .footer-logo { font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
        .footer-desc { opacity: 0.85; line-height: 1.6; margin-bottom: 18px; font-size: 0.9rem; }
        .social-links { display: flex; gap: 8px; }
        .social-link {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.15); display: flex;
          align-items: center; justify-content: center;
          color: #fff; font-size: 1rem; text-decoration: none;
          transition: all 0.2s;
        }
        .social-link:hover { background: #3b82f6; transform: translateY(-2px); }
        .footer-links h5 { color: #fff; font-weight: 600; margin-bottom: 12px; font-size: 1rem; }
        .footer-links ul { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 8px; }
        .footer-links a {
          color: rgba(255,255,255,0.8); text-decoration: none;
          transition: all 0.2s; display: flex; align-items: center; gap: 5px; font-size: 0.9rem;
        }
        .footer-links a:hover { color: #60a5fa; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.12);
          padding-top: 18px; margin-top: 30px; text-align: center;
          opacity: 0.8; font-size: 0.85rem;
        }
        
        /* ===== MODAL ===== */
        .modal-content {
          border-radius: 16px; border: none;
          background: ${darkMode ? '#1e293b' : '#fff'};
        }
        .modal-header { border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}; padding: 18px 22px; }
        .modal-title { font-weight: 600; color: ${darkMode ? '#fff' : '#1a1a2e'}; font-size: 1.3rem; }
        .modal-body { padding: 22px; }
        .modal-body img { border-radius: 10px; margin-bottom: 12px; }
        .modal-body p { line-height: 1.6; opacity: 0.9; font-size: 0.95rem; }
        .btn-close { filter: ${darkMode ? 'brightness(0) invert(1)' : 'none'}; }
        
        /* ===== SERVICE MODAL ===== */
        .service-modal .modal-content { border-radius: 16px; overflow: hidden; border: none; background: ${darkMode ? '#1e293b' : '#fff'}; }
        .service-modal .modal-header { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; padding: 18px 22px; border: none; }
        .service-modal .modal-title { font-size: 1.4rem; font-weight: 600; color: #fff; }
        .service-modal .btn-close { filter: brightness(0) invert(1); }
        .service-modal-content { display: flex; flex-direction: column; gap: 18px; }
        .service-modal-image { border-radius: 10px; overflow: hidden; }
        .service-modal-image img { width: 100%; height: 220px; object-fit: cover; }
        .service-modal-text { padding: 0 3px; }
        .service-description { font-size: 0.95rem; line-height: 1.8; color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'}; margin-bottom: 18px; text-align: right; }
        .service-features-title { font-size: 1.15rem; font-weight: 600; color: ${darkMode ? '#fff' : '#1a1a2e'}; margin-bottom: 12px; text-align: right; }
        .service-features-list { list-style: none; padding: 0; margin: 0 0 20px 0; }
        .service-features-list li {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 0; border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          font-size: 0.9rem; color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
        }
        .service-features-list li:last-child { border-bottom: none; }
        .feature-check { color: #3b82f6; font-size: 1.1rem; flex-shrink: 0; }
        .contact-btn {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 22px; padding: 12px 30px;
          font-weight: 600; font-size: 0.95rem; color: #fff;
          transition: transform 0.2s; width: 100%; margin-top: 3px;
        }
        .contact-btn:hover { transform: translateY(-2px); }
        @media (min-width: 768px) {
          .service-modal-content { flex-direction: row; }
          .service-modal-image { flex: 1; }
          .service-modal-image img { height: 100%; min-height: 300px; }
          .service-modal-text { flex: 1.2; }
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .hero-title { font-size: 2.1rem; }
          .hero-subtitle { font-size: 1.25rem; }
          .section-title { font-size: 1.7rem; }
          .nav-dots { display: none; }
        }
        @media (max-width: 768px) {
          .hero { padding: 50px 20px; min-height: auto; }
          .hero-title { font-size: 1.8rem; }
          .hero-subtitle { font-size: 1.1rem; min-height: auto; }
          .hero-desc { font-size: 0.95rem; }
          .section-title { font-size: 1.5rem; }
          .section-subtitle { font-size: 0.95rem; }
          .service-card { padding: 16px 12px; }
          .carousel-item { min-width: 220px; }
          .carousel-item img { height: 140px; }
          .contact-card { padding: 22px 18px; }
          .about-title { font-size: 1.5rem; text-align: center; }
          .about-title::after { left: 50%; transform: translateX(-50%); }
          .about-desc { text-align: center; }
          .about-highlights { align-items: center; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 1.5rem; }
          .section-title { font-size: 1.4rem; }
          .stats-card h3 { font-size: 1.7rem; }
          .testimonial { padding: 22px 18px; }
          .testimonial p { font-size: 0.95rem; }
          .process-step { padding: 18px 8px; }
          .step-number { width: 42px; height: 42px; font-size: 1rem; }
        }
      `}</style>

      {/* ===== NAV DOTS ===== */}
      <div className="nav-dots">
        {["home", "about", "services", "projects", "process", "gallery", "stats", "testimonials", "contact"].map((section) => (
          <div
            key={section}
            className={`nav-dot ${activeSection === section ? "active" : ""}`}
            data-label={
              section === "home" ? "الرئيسية" :
                section === "about" ? "من نحن" :
                  section === "services" ? "الخدمات" :
                    section === "projects" ? "أعمالنا" :
                      section === "process" ? "خطوات العمل" :
                        section === "gallery" ? "المعرض" :
                          section === "stats" ? "إحصائيات" :
                            section === "testimonials" ? "آراء العملاء" : "تواصل معنا"
            }
            onClick={() => scrollToSection(section)}
          />
        ))}
      </div>

      {/* ===== HERO ===== */}
      <section className="hero" id="home" ref={(el) => (sectionRefs.current["home"] = el)}>
        <div className="hero-content">
          <h1 className="hero-title">InFuture Digital Solutions</h1>
          <p className="hero-subtitle">
            {typedText}
            <span className="typed-cursor">|</span>
          </p>
          <p className="hero-desc">
            شريكك الرقمي الموثوق ✨ حلول متكاملة من الفكرة حتى التنفيذ،
            بجودة واحترافية لضمان نجاح مشروعك.
          </p>
          <Button
            className="glow-button"
            onClick={() => window.open("https://wa.me/201108293956", "_blank")}
          >
            <FaWhatsapp style={{ marginRight: "6px" }} /> ابدأ الآن
          </Button>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <FaArrowRight style={{ transform: "rotate(90deg)" }} />
        </div>
      </section>

      {/* ===== ABOUT SECTION - SIMPLE & CLEAN ===== */}
      <section className="about-section" id="about" ref={(el) => (sectionRefs.current["about"] = el)}>
        <Container>
          <div className="about-container">
            <div className="about-text">
              <h2 className="about-title">من نحن</h2>
              <p className="about-desc">
                في <strong>InFuture</strong>، نؤمن أن كل مشروع فريد ويستحق اهتمامًا خاصًا.
                نعمل معك خطوة بخطوة لفهم أهدافك وتقديم الحلول الأنسب.
              </p>
              <p className="about-desc">
                منذ انطلاقتنا، ركزنا على الجمع بين الإبداع والتقنية لتقديم تجارب رقمية
                استثنائية تساعد عملاءنا على النمو والتميز في سوقهم.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <span>حلول مخصصة تناسب احتياجاتك</span>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <span>فريق محترف ذو خبرة واسعة</span>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="highlight-icon" />
                  <span>دعم فني مستمر حتى بعد التسليم</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img
                src="https://www.qeematech.net/wp-content/uploads/2024/04/traffic-img.png.webp"
                alt="من نحن"
                className="img-fluid"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== SERVICES ===== */}
      <Container className="py-5" id="services" ref={(el) => (sectionRefs.current["services"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">خدماتنا</h2>
          <p className="section-subtitle">
            مجموعة متكاملة من الخدمات الرقمية لتنمية مشروعك
          </p>
        </div>
        <Row>
          {services.map((s, idx) => (
            <Col md={4} sm={6} className="mb-4" key={idx}>
              <Card className="service-card h-100" onClick={() => openServiceModal(s)}>
                <div className="service-image-wrapper">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-content">
                  <Card.Title>{s.title}</Card.Title>
                  <Card.Text>{s.desc}</Card.Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== PROCESS ===== */}
      <section className="process-section" id="process" ref={(el) => (sectionRefs.current["process"] = el)}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">خطوات العمل</h2>
            <p className="section-subtitle">منهجية بسيطة وواضحة لضمان أفضل النتائج</p>
          </div>
          <Row className="justify-content-center">
            {processSteps.map((step, idx) => (
              <Col md={3} sm={6} key={idx}>
                <div className="process-step">
                  <div className="step-number">{step.step}</div>
                  <span className="step-icon">{step.icon}</span>
                  <h5>{step.title}</h5>
                  <p>{step.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== PROJECTS ===== */}
      <Container className="py-5" id="projects" ref={(el) => (sectionRefs.current["projects"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">أعمالنا</h2>
          <p className="section-subtitle">نماذج من مشاريعنا التي نفخر بها</p>
        </div>
        <Row className="justify-content-center">
          {projects.map((p, idx) => (
            <Col md={6} lg={4} sm={6} className="mb-4 d-flex justify-content-center" key={idx}>
              <Card className="project-card h-100 text-center" style={{ maxWidth: "320px" }}>
                <img src={p.img} alt={p.title} className="img-fluid project-img" />
                <div className="p-4">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted small">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <Button variant="primary" className="project-btn mt-2" onClick={() => window.open(p.link, "_blank")}>
                    عرض <FaArrowRight style={{ marginLeft: "4px", fontSize: "0.7rem" }} />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== GALLERY ===== */}
      <section className="gallery-section" id="gallery" ref={(el) => (sectionRefs.current["gallery"] = el)}>
        <Container>
          <h2>المعرض</h2>
          <div className="carousel-track" ref={carouselRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {galleryImages.map((img, idx) => (
              <div className="carousel-item" key={idx}>
                <img src={img} alt={`Gallery ${idx + 1}`} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <Container className="py-5" id="stats" ref={(el) => (sectionRefs.current["stats"] = el)}>
        <Row className="text-center">
          {stats.map((stat, idx) => (
            <Col md={3} sm={6} className="mb-4" key={idx}>
              <Card className="stats-card h-100">
                <h3><CountUp end={stat.number} duration={2} />+ {stat.icon}</h3>
                <p>{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== TESTIMONIALS ===== */}
      <Container className="py-5" id="testimonials" ref={(el) => (sectionRefs.current["testimonials"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">آراء العملاء</h2>
          <p className="section-subtitle">ثقتكم هي دافعنا للاستمرار</p>
        </div>
        <div className="testimonial">
          <div className="testimonial-rating">
            {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => <FaStar key={i} />)}
          </div>
          <p>"{testimonials[testimonialIndex].text}"</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{testimonials[testimonialIndex].avatar}</div>
            <div className="testimonial-info">
              <h5>{testimonials[testimonialIndex].name}</h5>
              <span>{testimonials[testimonialIndex].role}</span>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <div key={idx} className={`testimonial-dot ${testimonialIndex === idx ? "active" : ""}`} onClick={() => setTestimonialIndex(idx)} />
            ))}
          </div>
        </div>
      </Container>

      {/* ===== CONTACT ===== */}
      <section className="contact-section" id="contact" ref={(el) => (sectionRefs.current["contact"] = el)}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">تواصل معنا</h2>
            <p className="section-subtitle">فريقنا جاهز لمساعدتك</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="contact-card">
                <Row>
                  <Col md={5} className="mb-4 mb-md-0">
                    <h4 className="mb-4" style={{ color: darkMode ? '#fff' : '#1a1a2e', fontWeight: 600 }}>معلومات التواصل</h4>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaEnvelope /></div>
                      <div className="contact-text"><h5>البريد</h5><a href="mailto:infuturedigitall@gmail.com">infuturedigitall@gmail.com</a></div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaPhone /></div>
                      <div className="contact-text"><h5>الهاتف</h5><a href="tel:+201108293956">+20 110 829 3956</a></div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaMapMarkerAlt /></div>
                      <div className="contact-text"><h5>الموقع</h5><p>القاهرة، مصر</p></div>
                    </div>
                    <div className="mt-4">
                      <h5 className="mb-3" style={{ color: darkMode ? '#fff' : '#1a1a2e' }}>تابعنا</h5>
                      <div className="social-links">
                        <a href="#" className="social-link"><FaFacebook /></a>
                        <a href="#" className="social-link"><FaTwitter /></a>
                        <a href="#" className="social-link"><FaLinkedin /></a>
                        <a href="#" className="social-link"><FaInstagram /></a>
                      </div>
                    </div>
                  </Col>
                  <Col md={7}>
                    <h4 className="mb-4" style={{ color: darkMode ? '#fff' : '#1a1a2e', fontWeight: 600 }}>أرسل رسالة</h4>
                    {formSubmitted ? (
                      <div className="form-success">
                        <FaCheckCircle /><h5 className="mb-2">تم الإرسال ✓</h5><p style={{ opacity: 0.9 }}>سنتواصل معك قريبًا</p>
                      </div>
                    ) : (
                      <Form onSubmit={handleFormSubmit} className="contact-form">
                        <Form.Group><Form.Control type="text" placeholder="الاسم *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></Form.Group>
                        <Form.Group><Form.Control type="email" placeholder="البريد *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></Form.Group>
                        <Form.Group><Form.Control as="textarea" rows={4} placeholder="الرسالة *" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required /></Form.Group>
                        <Button type="submit" className="submit-btn">إرسال <FaArrowRight style={{ marginLeft: "6px" }} /></Button>
                      </Form>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <div className="footer-logo"><FaRocket /> <span>InFuture</span></div>
              <p className="footer-desc">حلول رقمية مبتكرة لنجاح مشروعك في العالم الرقمي.</p>
              <div className="social-links">
                <a href="#" className="social-link"><FaFacebook /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
                <a href="#" className="social-link"><FaInstagram /></a>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="footer-links">
                <h5>روابط</h5>
                <ul>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#home">الرئيسية</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#services">خدماتنا</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#projects">أعمالنا</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#contact">تواصل</a></li>
                </ul>
              </div>
            </Col>
            <Col md={4}>
              <div className="footer-links">
                <h5>الخدمات</h5>
                <ul>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#services">إعلانات ممولة</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#services">SEO</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#services">سوشيال ميديا</a></li>
                  <li><FaArrowRight style={{ fontSize: "0.65rem" }} /> <a href="#services">تصميم مواقع</a></li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom">© {new Date().getFullYear()} InFuture. جميع الحقوق محفوظة.</div>
        </Container>
      </footer>

      {/* ===== PROJECT MODAL ===== */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg">
        {selectedProject && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedProject.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <img src={selectedProject.img} alt={selectedProject.title} className="img-fluid rounded mb-3" />
              <p className="mb-3">{selectedProject.desc}</p>
              <div className="project-tags mb-3">{selectedProject.tags?.map((tag, i) => <span key={i} className="project-tag">{tag}</span>)}</div>
              <Button variant="primary" className="project-btn" onClick={() => window.open(selectedProject.link, "_blank")}>زيارة الموقع <FaArrowRight style={{ marginLeft: "4px" }} /></Button>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* ===== SERVICE MODAL ===== */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg" className="service-modal">
        {selectedService && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedService.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <div className="service-modal-content">
                <div className="service-modal-image"><img src={selectedService.img} alt={selectedService.title} /></div>
                <div className="service-modal-text">
                  <p className="service-description">{selectedService.details}</p>
                  <h5 className="service-features-title">مميزات الخدمة:</h5>
                  <ul className="service-features-list">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx}><FaCheckCircle className="feature-check" /><span>{feature}</span></li>
                    ))}
                  </ul>
                  <Button className="contact-btn" onClick={() => { setModalShow(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>
                    اطلب الخدمة <FaArrowRight style={{ marginRight: '6px' }} />
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

export default Home;
