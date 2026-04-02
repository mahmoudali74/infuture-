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

  // Intersection Observer for fade-in animations (مبسط)
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
    document.body.style.backgroundColor = darkMode ? "#0a0a0a" : "#f0f8ff";
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

  // Auto scroll gallery (مُلغى لتخفيف الحمل)
  // useEffect(() => { ... }, [isHovering]); // تم حذفه

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
        /* ===== GLOBAL STYLES ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        /* ===== SIMPLE ANIMATIONS ===== */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* ===== FADE IN ON SCROLL ===== */
        .animate-on-scroll {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
        }
        
        /* ===== HERO SECTION - ثابت بدون أنيميشن ثقيل ===== */
        .hero {
          min-height: 100vh;
          padding: 80px 20px;
          text-align: center;
          color: #fff;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1E367E, #3A5BA9, #4FA9E2);
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #fff;
        }
        
        .hero-subtitle {
          font-size: 1.6rem;
          margin: 15px 0;
          color: rgba(255,255,255,0.95);
          min-height: 50px;
        }
        
        .typed-cursor {
          border-right: 2px solid #fff;
          animation: blink 0.7s infinite;
          display: inline-block;
          margin-left: 5px;
        }
        
        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        .hero-desc {
          font-size: 1.1rem;
          margin: 25px 0 40px;
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
        }
        
        .glow-button {
          transition: all 0.3s ease;
          background: #fff;
          color: #1E367E;
          border: none;
          border-radius: 50px;
          padding: 14px 35px;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        
        .glow-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          color: rgba(255,255,255,0.8);
          font-size: 1.5rem;
        }
        
        /* ===== NAVIGATION DOTS ===== */
        .nav-dots {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: 2px solid #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-dot.active {
          background: #fff;
          transform: scale(1.2);
        }
        
        /* ===== SECTIONS ===== */
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          color: ${darkMode ? '#fff' : '#1E367E'};
          text-align: center;
        }
        
        .section-subtitle {
          color: ${darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
          font-size: 1.1rem;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
        
        /* ===== SERVICES ===== */
        .service-card {
          border-radius: 16px;
          overflow: hidden;
          border: none;
          transition: transform 0.2s ease;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          height: 100%;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
          cursor: pointer;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
        }
        
        .service-image-wrapper {
          height: 200px;
          overflow: hidden;
        }
        
        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .service-card:hover img {
          transform: scale(1.05);
        }
        
        .service-content {
          padding: 20px 15px;
          background: ${darkMode ? '#16213e' : '#fff'};
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .service-card h5 {
          font-weight: 700;
          margin-bottom: 8px;
          font-size: 1.1rem;
          color: ${darkMode ? '#fff' : '#1E367E'};
        }
        
        .service-card p {
          opacity: 0.85;
          line-height: 1.6;
          font-size: 0.9rem;
          color: ${darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
          margin-bottom: 0;
        }
        
        /* ===== PROJECTS ===== */
        .project-card {
          border-radius: 16px;
          overflow: hidden;
          border: none;
          transition: transform 0.2s ease;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .project-card:hover {
          transform: translateY(-5px);
        }
        
        .project-img {
          height: 180px;
          object-fit: cover;
          width: 100%;
        }
        
        .project-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin: 12px 0;
          justify-content: center;
        }
        
        .project-tag {
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 15px;
          background: ${darkMode ? '#3A5BA9' : '#4FA9E2'};
          color: #fff;
          font-weight: 500;
        }
        
        .project-btn {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          border: none;
          border-radius: 20px;
          padding: 8px 20px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .project-btn:hover {
          transform: translateY(-2px);
        }
        
        /* ===== PROCESS SECTION ===== */
        .process-section {
          padding: 80px 0;
          background: ${darkMode ? '#121212' : '#f0f8ff'};
        }
        
        .process-step {
          text-align: center;
          padding: 25px 15px;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 auto 15px;
        }
        
        .step-icon {
          font-size: 1.5rem;
          color: #4FA9E2;
          margin-bottom: 12px;
          display: block;
        }
        
        .process-step h5 {
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .process-step p {
          opacity: 0.8;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        /* ===== GALLERY ===== */
        .gallery-section-cinema {
          padding: 60px 0;
          background: linear-gradient(135deg, #1E367E, #3A5BA9, #4FA9E2);
          position: relative;
          overflow: hidden;
        }
        
        .gallery-section-cinema h2 {
          font-size: 2.3rem;
          margin-bottom: 40px;
          color: #fff;
          text-align: center;
        }
        
        .carousel-track-cinema {
          display: flex;
          gap: 20px;
          padding: 20px 10px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .carousel-track-cinema::-webkit-scrollbar {
          display: none;
        }
        
        .carousel-item-cinema {
          min-width: 300px;
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          scroll-snap-align: start;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
        }
        
        .carousel-item-cinema img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 15px;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: #fff;
        }
        
        /* ===== STATS ===== */
        .stats-card {
          border-radius: 20px;
          padding: 30px 20px;
          background: linear-gradient(145deg, #1E367E, #3A5BA9, #4FA9E2);
          color: #fff;
          text-align: center;
          border: none;
          box-shadow: 0 10px 30px rgba(30,54,126,0.2);
        }
        
        .stats-card h3 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .stats-card p {
          font-size: 1rem;
          opacity: 0.95;
          font-weight: 500;
        }
        
        /* ===== TESTIMONIALS ===== */
        .testimonial {
          background: ${darkMode ? '#1a1a2e' : '#fff'};
          color: ${darkMode ? '#fff' : '#1E367E'};
          border-radius: 20px;
          padding: 35px;
          text-align: center;
          max-width: 650px;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(30,54,126,0.1);
        }
        
        .testimonial p {
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.7;
          margin: 15px 0 20px;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 15px;
        }
        
        .testimonial-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #fff;
        }
        
        .testimonial-info h5 {
          font-weight: 700;
          margin-bottom: 2px;
          font-size: 1.1rem;
        }
        
        .testimonial-info span {
          opacity: 0.7;
          font-size: 0.9rem;
        }
        
        .testimonial-rating {
          color: #FFD700;
          margin: 10px 0;
          font-size: 1rem;
        }
        
        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        
        .testimonial-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(30,54,126,0.2)'};
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .testimonial-dot.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          transform: scale(1.2);
        }
        
        /* ===== WHY CHOOSE US ===== */
        .why-choose-section {
          padding: 80px 0;
          background: ${darkMode ? '#121212' : '#f0f8ff'};
        }
        
        .why-choose-content {
          padding-right: 20px;
        }
        
        .why-choose-title {
          font-size: 2.3rem;
          font-weight: 800;
          margin-bottom: 25px;
          color: ${darkMode ? '#fff' : '#1E367E'};
          text-align: right;
        }
        
        .why-choose-text {
          font-size: 1.05rem;
          line-height: 1.9;
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
          margin-bottom: 15px;
          text-align: right;
        }
        
        .why-choose-text strong {
          color: #3A5BA9;
          font-weight: 700;
        }
        
        .why-choose-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          color: ${darkMode ? '#fff' : '#1E367E'};
          font-weight: 600;
        }
        
        .feature-icon {
          font-size: 1.3rem;
          color: #4FA9E2;
          flex-shrink: 0;
        }
        
        .why-choose-image img {
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(30,54,126,0.15);
          max-width: 100%;
        }
        
        /* ===== CONTACT SECTION ===== */
        .contact-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1E367E, #3A5BA9, #4FA9E2);
        }
        
        .contact-section h2 {
          color: #fff;
        }
        
        .contact-section .section-subtitle {
          color: rgba(255,255,255,0.9);
        }
        
        .contact-card {
          background: ${darkMode ? 'rgba(26,26,46,0.95)' : 'rgba(255,255,255,0.95)'};
          border-radius: 20px;
          padding: 35px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }
        
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px 0;
          border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }
        
        .contact-info-item:last-child {
          border-bottom: none;
        }
        
        .contact-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .contact-text h5 {
          font-weight: 700;
          margin-bottom: 3px;
          font-size: 1rem;
        }
        
        .contact-text p,
        .contact-text a {
          opacity: 0.85;
          text-decoration: none;
          color: ${darkMode ? '#fff' : '#1E367E'};
          font-size: 0.95rem;
        }
        
        .contact-form .form-control {
          border-radius: 12px;
          padding: 12px 18px;
          border: 2px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(30,54,126,0.15)'};
          background: ${darkMode ? '#1a1a2e' : '#f8fbff'};
          color: ${darkMode ? '#fff' : '#000'};
          margin-bottom: 15px;
          font-size: 0.95rem;
        }
        
        .contact-form .form-control:focus {
          border-color: #4FA9E2;
          box-shadow: 0 0 0 3px rgba(79,169,226,0.15);
          background: ${darkMode ? '#16213e' : '#fff'};
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          border: none;
          border-radius: 25px;
          padding: 14px 40px;
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          transition: all 0.2s ease;
          width: 100%;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
        }
        
        .form-success {
          text-align: center;
          padding: 25px;
          color: #fff;
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          border-radius: 16px;
        }
        
        .form-success svg {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        
        /* ===== FOOTER ===== */
        .footer {
          background: ${darkMode ? '#0a0a0a' : '#1E367E'};
          color: rgba(255,255,255,0.9);
          padding: 50px 0 25px;
        }
        
        .footer-logo {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-desc {
          opacity: 0.85;
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }
        
        .social-links {
          display: flex;
          gap: 10px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .social-link:hover {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          transform: translateY(-3px);
        }
        
        .footer-links h5 {
          color: #fff;
          font-weight: 700;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }
        
        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
        }
        
        .footer-links a:hover {
          color: #4FA9E2;
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 20px;
          margin-top: 35px;
          text-align: center;
          opacity: 0.8;
          font-size: 0.9rem;
        }
        
        /* ===== MODAL ===== */
        .modal-content {
          border-radius: 20px;
          border: none;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .modal-header {
          border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          padding: 20px 25px;
        }
        
        .modal-title {
          font-weight: 700;
          color: ${darkMode ? '#fff' : '#1E367E'};
          font-size: 1.4rem;
        }
        
        .modal-body {
          padding: 25px;
        }
        
        .modal-body img {
          border-radius: 12px;
          margin-bottom: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .modal-body p {
          line-height: 1.7;
          opacity: 0.9;
          font-size: 0.95rem;
        }
        
        .btn-close {
          filter: ${darkMode ? 'brightness(0) invert(1)' : 'none'};
        }
        
        /* ===== SERVICE MODAL ===== */
        .service-modal .modal-content {
          border-radius: 20px;
          overflow: hidden;
          border: none;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
        }
        
        .service-modal .modal-header {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          color: #fff;
          padding: 20px 25px;
          border: none;
        }
        
        .service-modal .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }
        
        .service-modal .btn-close {
          filter: brightness(0) invert(1);
        }
        
        .service-modal-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .service-modal-image {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .service-modal-image img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        
        .service-modal-text {
          padding: 5px 5px;
        }
        
        .service-description {
          font-size: 1rem;
          line-height: 1.9;
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
          margin-bottom: 20px;
          text-align: right;
        }
        
        .service-features-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: ${darkMode ? '#fff' : '#1E367E'};
          margin-bottom: 15px;
          text-align: right;
        }
        
        .service-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 25px 0;
        }
        
        .service-features-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          font-size: 0.95rem;
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
        }
        
        .service-features-list li:last-child {
          border-bottom: none;
        }
        
        .feature-check {
          color: #4FA9E2;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .contact-btn {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          border: none;
          border-radius: 25px;
          padding: 14px 35px;
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          transition: all 0.2s ease;
          width: 100%;
          margin-top: 5px;
        }
        
        .contact-btn:hover {
          transform: translateY(-2px);
        }
        
        @media (min-width: 768px) {
          .service-modal-content {
            flex-direction: row;
          }
          .service-modal-image {
            flex: 1;
          }
          .service-modal-image img {
            height: 100%;
            min-height: 350px;
          }
          .service-modal-text {
            flex: 1.3;
          }
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.4rem; }
          .section-title { font-size: 2.2rem; }
          .nav-dots { display: none; }
        }
        
        @media (max-width: 768px) {
          .hero { padding: 60px 20px; min-height: auto; }
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 1.2rem; min-height: auto; }
          .hero-desc { font-size: 1rem; }
          .section-title { font-size: 1.8rem; }
          .section-subtitle { font-size: 1rem; }
          .service-card { padding: 20px 15px; }
          .carousel-item-cinema { min-width: 250px; }
          .carousel-item-cinema img { height: 160px; }
          .about-content { padding-left: 0; text-align: center; }
          .team-list li { text-align: center; }
          .contact-card { padding: 25px 20px; }
          .why-choose-title { text-align: center; }
          .why-choose-text { text-align: center; }
          .why-choose-features { align-items: center; }
        }
        
        @media (max-width: 480px) {
          .hero-title { font-size: 1.7rem; }
          .section-title { font-size: 1.6rem; }
          .stats-card h3 { font-size: 2rem; }
          .testimonial { padding: 25px 20px; }
          .testimonial p { font-size: 1rem; }
          .process-step { padding: 20px 10px; }
          .step-number { width: 50px; height: 50px; font-size: 1.1rem; }
        }
      `}</style>

      {/* ===== NAVIGATION DOTS ===== */}
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

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home" ref={(el) => (sectionRefs.current["home"] = el)}>
        <div className="hero-content">
          <h1 className="hero-title">InFuture Digital Solutions</h1>
          <p className="hero-subtitle">
            {typedText}
            <span className="typed-cursor">|</span>
          </p>
          <p className="hero-desc">
            شريكك الرقمي الموثوق ✨ نقدم حلولاً متكاملة من التدريب حتى التنفيذ،
            مع التركيز على الإبداع والجودة لتحقيق نجاح مشروعك في العالم الرقمي.
          </p>
          <Button
            className="glow-button"
            onClick={() => window.open("https://wa.me/201108293956", "_blank")}
          >
            <FaWhatsapp style={{ marginRight: "8px" }} /> ابدأ مشروعك الآن
          </Button>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <FaArrowRight style={{ transform: "rotate(90deg)" }} />
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="why-choose-section" id="about" ref={(el) => (sectionRefs.current["about"] = el)}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="why-choose-content">
                <h2 className="why-choose-title">لماذا نحن خيارك الأمثل</h2>
                <p className="why-choose-text">
                  نعتقد أن كل عمل له طبيعته الخاصة ويستحق نهجًا مخصصًا في الحلول الرقمية. 
                  لهذا السبب، نتعاون معكم بشكل وثيق لفهم أهدافكم واحتياجاتكم، ثم نعمل على 
                  تطوير استراتيجيات تتماشى مع توقعاتكم وتحقق نتائج أفضل.
                </p>
                <p className="why-choose-text">
                  في <strong>InFuture Digital Solutions</strong>، نؤمن بأن النجاح الرقمي 
                  يبدأ من فهم عميق لاحتياجات عملائنا. منذ عام 2025، نعمل على تقديم حلول 
                  مبتكرة ومتكاملة في مجال التطوير والتصميم الرقمي، مع التركيز على الجودة 
                  والاحترافية في كل مشروع.
                </p>
                <div className="why-choose-features mt-4">
                  <div className="feature-item">
                    <FaCheckCircle className="feature-icon" />
                    <span>حلول مخصصة لكل عميل</span>
                  </div>
                  <div className="feature-item">
                    <FaCheckCircle className="feature-icon" />
                    <span>فريق متخصص وذو خبرة</span>
                  </div>
                  <div className="feature-item">
                    <FaCheckCircle className="feature-icon" />
                    <span>دعم مستمر بعد التنفيذ</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="why-choose-image">
                <img
                  src="https://www.qeematech.net/wp-content/uploads/2024/04/traffic-img.png.webp"
                  alt="Why Choose Us"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <Container className="py-5" id="services" ref={(el) => (sectionRefs.current["services"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">خدماتنا المميزة</h2>
          <p className="section-subtitle">
            نقدم مجموعة متكاملة من الخدمات الرقمية المصممة خصيصاً لتحقيق أهدافك وتنمية مشروعك
          </p>
        </div>
        <Row>
          {services.map((s, idx) => (
            <Col md={4} sm={6} className="mb-4" key={idx}>
              <Card
                className="service-card h-100"
                onClick={() => openServiceModal(s)}
              >
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

      {/* ===== PROCESS SECTION ===== */}
      <section className="process-section" id="process" ref={(el) => (sectionRefs.current["process"] = el)}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">خطوات عملنا</h2>
            <p className="section-subtitle">
              منهجية واضحة ومجربة تضمن لك أفضل النتائج في كل مرحلة من مراحل المشروع
            </p>
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

      {/* ===== PROJECTS SECTION ===== */}
      <Container className="py-5" id="projects" ref={(el) => (sectionRefs.current["projects"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">أحدث أعمالنا</h2>
          <p className="section-subtitle">
            نماذج من مشاريعنا الناجحة التي نفخر بتقديمها لعملائنا الكرام
          </p>
        </div>
        <Row className="justify-content-center">
          {projects.map((p, idx) => (
            <Col md={6} lg={4} sm={6} className="mb-4 d-flex justify-content-center" key={idx}>
              <Card className="project-card shadow h-100 text-center" style={{ maxWidth: "340px" }}>
                <img src={p.img} alt={p.title} className="img-fluid project-img" />
                <div className="p-4">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted small">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    className="project-btn mt-2"
                    onClick={() => window.open(p.link, "_blank")}
                  >
                    عرض المشروع <FaArrowRight style={{ marginLeft: "5px", fontSize: "0.8rem" }} />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>


      {/* ===== STATS SECTION ===== */}
      <Container className="py-5" id="stats" ref={(el) => (sectionRefs.current["stats"] = el)}>
        <Row className="text-center">
          {stats.map((stat, idx) => (
            <Col md={3} sm={6} className="mb-4" key={idx}>
              <Card className="stats-card h-100">
                <h3>
                  <CountUp end={stat.number} duration={2} />+
                  <span className="stats-icon">{stat.icon}</span>
                </h3>
                <p>{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <Container className="py-5" id="testimonials" ref={(el) => (sectionRefs.current["testimonials"] = el)}>
        <div className="text-center mb-5">
          <h2 className="section-title">آراء عملائنا</h2>
          <p className="section-subtitle">
            ثقة عملائنا هي أكبر دافع لنا لمواصلة التميز والإبداع
          </p>
        </div>
        <div className="testimonial">
          <div className="testimonial-rating">
            {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
              <FaStar key={i} />
            ))}
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
              <div
                key={idx}
                className={`testimonial-dot ${testimonialIndex === idx ? "active" : ""}`}
                onClick={() => setTestimonialIndex(idx)}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact-section" id="contact" ref={(el) => (sectionRefs.current["contact"] = el)}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">تواصل معنا</h2>
            <p className="section-subtitle">
              فريقنا جاهز لمساعدتك في تحويل أفكارك إلى واقع رقمي ملموس
            </p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="contact-card">
                <Row>
                  <Col md={5} className="mb-4 mb-md-0">
                    <h4 className="mb-4" style={{ color: darkMode ? '#fff' : '#1E367E', fontWeight: 700 }}>
                      معلومات التواصل
                    </h4>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaEnvelope /></div>
                      <div className="contact-text">
                        <h5>البريد الإلكتروني</h5>
                        <a href="mailto:info@infuture.com">infuturedigitall@gmail.com</a>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaPhone /></div>
                      <div className="contact-text">
                        <h5>رقم التواصل</h5>
                        <a href="tel:+201108293956">+20 110 829 3956</a>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-icon"><FaMapMarkerAlt /></div>
                      <div className="contact-text">
                        <h5>الموقع</h5>
                        <p>القاهرة، جمهورية مصر العربية</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="mb-3" style={{ color: darkMode ? '#fff' : '#1E367E' }}>تابعنا</h5>
                      <div className="social-links">
                        <a href="#" className="social-link"><FaFacebook /></a>
                        <a href="#" className="social-link"><FaTwitter /></a>
                        <a href="#" className="social-link"><FaLinkedin /></a>
                        <a href="#" className="social-link"><FaInstagram /></a>
                      </div>
                    </div>
                  </Col>
                  <Col md={7}>
                    <h4 className="mb-4" style={{ color: darkMode ? '#fff' : '#1E367E', fontWeight: 700 }}>
                      أرسل لنا رسالة
                    </h4>
                    {formSubmitted ? (
                      <div className="form-success">
                        <FaCheckCircle />
                        <h5 className="mb-2">تم إرسال رسالتك بنجاح! ✓</h5>
                        <p style={{ opacity: 0.9 }}>سنتواصل معك في أقرب وقت ممكن</p>
                      </div>
                    ) : (
                      <Form onSubmit={handleFormSubmit} className="contact-form">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="اسمك الكامل *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="email"
                            placeholder="بريدك الإلكتروني *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="رسالتك *"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                          />
                        </Form.Group>
                        <Button type="submit" className="submit-btn">
                          إرسال الرسالة <FaArrowRight style={{ marginLeft: "8px" }} />
                        </Button>
                      </Form>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      {/* ===== PROJECT MODAL ===== */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg">
        {selectedProject && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="img-fluid rounded mb-3"
              />
              <p className="mb-3">{selectedProject.desc}</p>
              <div className="project-tags mb-3">
                {selectedProject.tags?.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
              <Button
                variant="primary"
                className="project-btn"
                onClick={() => window.open(selectedProject.link, "_blank")}
              >
                زيارة الموقع <FaArrowRight style={{ marginLeft: "5px" }} />
              </Button>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* ===== SERVICE DETAILS MODAL ===== */}
      <Modal 
        show={modalShow} 
        onHide={() => setModalShow(false)} 
        centered 
        size="lg"
        className="service-modal"
      >
        {selectedService && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedService.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="service-modal-content">
                <div className="service-modal-image">
                  <img src={selectedService.img} alt={selectedService.title} />
                </div>
                <div className="service-modal-text">
                  <p className="service-description">{selectedService.details}</p>
                  <h5 className="service-features-title">مميزات الخدمة:</h5>
                  <ul className="service-features-list">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="feature-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="contact-btn"
                    onClick={() => {
                      setModalShow(false);
                      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    اطلب الخدمة الآن <FaArrowRight style={{ marginRight: '8px' }} />
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
