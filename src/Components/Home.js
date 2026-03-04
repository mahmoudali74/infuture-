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

  // Auto scroll gallery
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isHovering]);

  const testimonials = [
    { 
      name: "أستاذ حسام", 
      role: "مدير تسويق",
      text: "خدمات رائعة واحترافية، أنصح بشدة! فريق عمل متعاون ونتائج ملموسة.",
      avatar: "👨‍💼",
      rating: 5 
    },
    { 
      name: "أستاذ علي", 
      role: "صاحب مشروع",
      text: "تصميمات مذهلة وتجربة مستخدم ممتازة. تجاوزوا توقعاتي تماماً!",
      avatar: "👨‍🔧",
      rating: 5 
    },
    { 
      name: "أستاذة منى", 
      role: "رائدة أعمال",
      text: "سرعة تنفيذ ودعم ممتاز طوال الوقت. شراكة حقيقية وليست مجرد خدمة.",
      avatar: "👩‍💼",
      rating: 5 
    },
  ];

  const services = [
    {
      icon: <FaGraduationCap size={50} />,
      title: "كورسات التسويق الإلكتروني",
      desc: "تدريب عملي يؤهلك لسوق العمل ويدعم إدارة الحملات وبناء البراند.",
      color: "#4FA9E2",
      delay: "0s"
    },
    {
      icon: <FaPalette size={50} />,
      title: "كورسات الجرافيك ديزاين",
      desc: "من الأساسيات حتى الاحتراف، مع مشاريع حقيقية وتطبيق عملي.",
      color: "#3A5BA9",
      delay: "0.1s"
    },
    {
      icon: <FaPalette size={50} />,
      title: "تصميم الهوية البصرية",
      desc: "نصنع هوية متكاملة تعبر عن مشروعك وتجذب العملاء بلمسة إبداعية.",
      color: "#1E367E",
      delay: "0.2s"
    },
    {
      icon: <FaLaptop size={50} />,
      title: "تطوير المواقع",
      desc: "مواقع شركات ومتاجر إلكترونية وسريعة الاستجابة بأحدث التقنيات.",
      color: "#4FA9E2",
      delay: "0.3s"
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: "تطبيقات الموبايل",
      desc: "تطبيقات iOS و Android مع UI/UX احترافي ودعم كامل بعد الإطلاق.",
      color: "#3A5BA9",
      delay: "0.4s"
    },
    {
      icon: <FaCode size={50} />,
      title: "استشارات تقنية",
      desc: "خبراء جاهزون لمساعدتك في اختيار أفضل الحلول التقنية لمشروعك.",
      color: "#1E367E",
      delay: "0.5s"
    },
  ];

  const projects = [
    {
      title: "مواقع الشركات",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب، مع التركيز على حلول رقمية مبتكرة لتطوير أعمالكم.",
      img: "/assets/Screenshot 2026-02-17 145639.png",
      link: "https://ediltechis.com/",
      tags: ["React", "Bootstrap", "SEO"]
    },
    {
      title: "متاجر إلكترونية",
      desc: "متجر إلكتروني كامل مع خيارات دفع وشحن متقدمة، كحل رقمي شامل لدعم التجارة الإلكترونية.",
      img: "/assets/Screenshot 2026-02-17 145545.png",
      link: "https://bluelounge4catering.com/",
      tags: ["E-commerce", "Payment", "Admin Panel"]
    },
    {
      title: "منصات تعليمية",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب مع نظام إدارة محتوى متقدم.",
      img: "/assets/Screenshot 2026-02-17 145614.png",
      link: "https://elnbress.com/",
      tags: ["LMS", "Video", "Quizzes"]
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
        
        /* ===== ANIMATIONS ===== */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotateIcon {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* ===== PARTICLES ===== */
        .particles-bg {
          position: fixed; width: 100%; height: 100%; top: 0; left: 0; 
          z-index: -1; overflow: hidden; pointer-events: none;
        }
        .particle {
          position: absolute; border-radius: 50%; 
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          opacity: 0.6; animation: float 6s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(79, 169, 226, 0.5);
        }
        .particle::after {
          content: ''; position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(79,169,226,0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        /* ===== FADE IN ON SCROLL ===== */
        .animate-on-scroll {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animate-in {
          opacity: 1; transform: translateY(0);
        }

        /* ===== HERO SECTION ===== */
        .hero {
          min-height: 100vh; padding: 100px 20px; text-align: center; 
          color: #fff; position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          background: linear-gradient(-45deg, #1E367E, #3A5BA9, #4FA9E2, #6BB6FF);
          background-size: 400% 400%; animation: gradientBG 15s ease infinite;
          overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 20% 80%, rgba(79,169,226,0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(58,91,169,0.3) 0%, transparent 50%);
          z-index: 0;
        }
        .hero-content { position: relative; z-index: 2; max-width: 900px; }
        .hero-title {
          font-size: 3.5rem; font-weight: 800; margin-bottom: 20px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.3);
          animation: fadeInUp 1s ease;
        }
        .hero-subtitle {
          font-size: 1.8rem; margin: 15px 0; color: rgba(255,255,255,0.95);
          min-height: 60px;
        }
        .typed-cursor {
          border-right: 3px solid #fff; animation: blink 0.7s infinite;
          display: inline-block; margin-left: 5px;
        }
        @keyframes blink { 50% { border-color: transparent; } }
        
        .hero-desc {
          font-size: 1.2rem; margin: 25px 0 40px; color: rgba(255,255,255,0.9);
          line-height: 1.8; animation: fadeInUp 1s ease 0.3s both;
        }
        
        .glow-button {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: linear-gradient(135deg, #fff, #f0f8ff);
          color: #1E367E; border: none; border-radius: 50px; 
          padding: 15px 40px; font-weight: 700; font-size: 1.1rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          position: relative; overflow: hidden;
        }
        .glow-button::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .glow-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 60px rgba(79,169,226,0.6), 0 0 0 3px rgba(255,255,255,0.3);
        }
        .glow-button:hover::before { left: 100%; }
        
        .scroll-indicator {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          animation: bounce 2s infinite; cursor: pointer;
          color: rgba(255,255,255,0.8); font-size: 1.5rem;
        }

        /* ===== NAVIGATION ===== */
        .nav-dots {
          position: fixed; right: 30px; top: 50%; transform: translateY(-50%);
          z-index: 1000; display: flex; flex-direction: column; gap: 15px;
        }
        .nav-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: rgba(255,255,255,0.5); border: 2px solid #fff;
          cursor: pointer; transition: all 0.3s ease;
          position: relative;
        }
        .nav-dot::after {
          content: attr(data-label); position: absolute; right: 25px; top: 50%;
          transform: translateY(-50%); white-space: nowrap;
          color: #fff; font-size: 0.85rem; opacity: 0;
          transition: opacity 0.3s; pointer-events: none;
          background: rgba(30,54,126,0.9); padding: 5px 12px; border-radius: 20px;
        }
        .nav-dot:hover::after { opacity: 1; }
        .nav-dot.active {
          background: #fff; transform: scale(1.3);
          box-shadow: 0 0 20px rgba(255,255,255,0.8);
        }

        /* ===== SERVICES ===== */
        .section-title {
          font-size: 3rem; font-weight: 800; margin-bottom: 15px;
          background: linear-gradient(90deg, #1E367E, #3A5BA9, #4FA9E2);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.1);
          letter-spacing: 1px; position: relative; display: inline-block;
        }
        .section-title::after {
          content: ''; position: absolute; bottom: -10px; left: 50%;
          transform: translateX(-50%); width: 80px; height: 4px;
          background: linear-gradient(90deg, #4FA9E2, #3A5BA9);
          border-radius: 2px;
        }
        .section-subtitle {
          color: ${darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
          font-size: 1.2rem; margin-bottom: 50px; max-width: 600px; margin-left: auto; margin-right: auto;
        }

        .service-card {
          border-radius: 24px; padding: 30px 25px; 
          background: ${darkMode 
            ? 'linear-gradient(145deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(145deg, #ffffff, #f8fbff)'};
          color: ${darkMode ? '#fff' : '#1E367E'};
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: center; border: none;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          position: relative; overflow: hidden;
          height: 100%;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
          background: linear-gradient(90deg, #4FA9E2, #3A5BA9, #1E367E);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .service-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 60px rgba(30,54,126,0.25);
        }
        .service-card:hover::before { transform: scaleX(1); }
        
        .service-icon {
          width: 90px; height: 90px; margin: 0 auto 20px;
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(79,169,226,0.15), rgba(58,91,169,0.1));
          color: #4FA9E2; transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
        }
        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff; box-shadow: 0 15px 35px rgba(79,169,226,0.4);
        }
        .service-card h5 { font-weight: 700; margin-bottom: 12px; font-size: 1.3rem; }
        .service-card p { opacity: 0.85; line-height: 1.7; font-size: 0.95rem; }

        /* ===== PROJECTS ===== */
        .project-card {
          border-radius: 20px; overflow: hidden; border: none;
          transition: all 0.4s ease; background: ${darkMode ? '#1a1a2e' : '#fff'};
          box-shadow: 0 15px 50px rgba(0,0,0,0.12);
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 70px rgba(30,54,126,0.3);
        }
        .project-img {
          height: 200px; object-fit: cover; width: 100%;
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-img { transform: scale(1.08); }
        .project-tags {
          display: flex; gap: 8px; flex-wrap: wrap; margin: 15px 0;
          justify-content: center;
        }
        .project-tag {
          font-size: 0.75rem; padding: 4px 12px; border-radius: 20px;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff; font-weight: 500;
        }
        .project-btn {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          border: none; border-radius: 25px; padding: 8px 25px;
          font-weight: 600; transition: all 0.3s ease;
        }
        .project-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(30,54,126,0.4);
        }

        /* ===== PROCESS SECTION ===== */
        .process-section {
          padding: 100px 0;
          background: ${darkMode 
            ? 'linear-gradient(180deg, #0a0a0a, #121212)' 
            : 'linear-gradient(180deg, #f0f8ff, #e6f2ff)'};
          position: relative;
        }
        .process-section::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234FA9E2' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        .process-step {
          text-align: center; padding: 30px 20px; position: relative;
          transition: all 0.3s ease;
        }
        .process-step:hover { transform: translateY(-8px); }
        .step-number {
          width: 70px; height: 70px; border-radius: 50%;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; font-weight: 800; margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(79,169,226,0.4);
          position: relative; z-index: 2;
        }
        .step-number::after {
          content: ''; position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px;
          border-radius: 50%; border: 2px dashed rgba(79,169,226,0.5);
          animation: rotateIcon 20s linear infinite;
        }
        .step-icon {
          font-size: 1.8rem; color: #4FA9E2; margin-bottom: 15px;
          display: block;
        }
        .process-step h5 { font-weight: 700; margin-bottom: 10px; }
        .process-step p { opacity: 0.8; font-size: 0.95rem; line-height: 1.6; }
        
        /* Connector line for desktop */
        @media (min-width: 992px) {
          .process-step:not(:last-child)::after {
            content: ''; position: absolute; top: 35px; right: -50%;
            width: 100%; height: 3px;
            background: linear-gradient(90deg, #4FA9E2, transparent);
            z-index: 1;
          }
        }

        /* ===== GALLERY CINEMA ===== */
        .gallery-section-cinema {
          padding: 80px 0; 
          background: linear-gradient(135deg, #1E367E 0%, #3A5BA9 50%, #4FA9E2 100%);
          position: relative; overflow: hidden;
        }
        .gallery-section-cinema::before {
          content: ''; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        .gallery-section-cinema h2 {
          font-size: 2.8rem; margin-bottom: 50px; color: #fff;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3); position: relative; z-index: 2;
        }
        .carousel-track-cinema {
          display: flex; gap: 25px; padding: 30px 10px;
          overflow-x: auto; scroll-behavior: smooth; cursor: grab;
          scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none;
          position: relative; z-index: 2;
        }
        .carousel-track-cinema::-webkit-scrollbar { display: none; }
        .carousel-item-cinema {
          min-width: 380px; flex-shrink: 0; border-radius: 20px;
          overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          transition: all 0.4s ease; cursor: pointer;
          scroll-snap-align: start; position: relative;
          background: ${darkMode ? '#1a1a2e' : '#fff'};
        }
        .carousel-item-cinema:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.6);
        }
        .carousel-item-cinema img {
          width: 100%; height: 240px; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .carousel-item-cinema:hover img { transform: scale(1.1); }
        .gallery-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: #fff; transform: translateY(20px); opacity: 0;
          transition: all 0.3s ease;
        }
        .carousel-item-cinema:hover .gallery-overlay {
          transform: translateY(0); opacity: 1;
        }

        /* ===== STATS ===== */
        .stats-card {
          border-radius: 24px; padding: 35px 25px;
          background: linear-gradient(145deg, #1E367E, #3A5BA9, #4FA9E2);
          color: #fff; text-align: center; border: none;
          box-shadow: 0 20px 50px rgba(30,54,126,0.3);
          transition: all 0.4s ease; position: relative; overflow: hidden;
        }
        .stats-card::before {
          content: ''; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .stats-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 30px 70px rgba(30,54,126,0.5);
        }
        .stats-card:hover::before { opacity: 1; }
        .stats-card h3 {
          font-size: 3rem; font-weight: 800; margin-bottom: 5px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .stats-card p {
          font-size: 1.1rem; opacity: 0.95; font-weight: 500;
        }
        .stats-icon {
          font-size: 1.5rem; opacity: 0.9;
        }

        /* ===== TESTIMONIALS ===== */
        .testimonial {
          background: ${darkMode 
            ? 'linear-gradient(145deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(145deg, #fff, #f8fbff)'};
          color: ${darkMode ? '#fff' : '#1E367E'};
          border-radius: 28px; padding: 40px;
          text-align: center; max-width: 700px; margin: 0 auto;
          box-shadow: 0 25px 60px rgba(30,54,126,0.15);
          transition: all 0.4s ease; position: relative;
        }
        .testimonial::before {
          content: '"'; position: absolute; top: 20px; left: 30px;
          font-size: 6rem; font-family: Georgia, serif;
          color: ${darkMode ? 'rgba(79,169,226,0.2)' : 'rgba(79,169,226,0.1)'};
          line-height: 1;
        }
        .testimonial p {
          font-size: 1.3rem; font-style: italic; line-height: 1.8;
          margin: 20px 0 25px; position: relative; z-index: 2;
        }
        .testimonial-author {
          display: flex; align-items: center; justify-content: center;
          gap: 15px; margin-top: 20px;
        }
        .testimonial-avatar {
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; color: #fff;
          box-shadow: 0 8px 25px rgba(79,169,226,0.4);
        }
        .testimonial-info h5 {
          font-weight: 700; margin-bottom: 3px; font-size: 1.2rem;
        }
        .testimonial-info span {
          opacity: 0.7; font-size: 0.95rem;
        }
        .testimonial-rating {
          color: #FFD700; margin: 10px 0; font-size: 1.1rem;
        }
        .testimonial-dots {
          display: flex; justify-content: center; gap: 10px; margin-top: 25px;
        }
        .testimonial-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(30,54,126,0.2)'};
          cursor: pointer; transition: all 0.3s ease;
        }
        .testimonial-dot.active {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          transform: scale(1.3);
        }

        /* ===== ABOUT / TEAM ===== */
        .team-section {
          padding: 100px 0;
          background: ${darkMode 
            ? 'linear-gradient(180deg, #121212, #0a0a0a)' 
            : 'linear-gradient(180deg, #fff, #f0f8ff)'};
        }
        .team-img {
          border-radius: 30px; 
          box-shadow: 0 30px 80px rgba(30,54,126,0.25);
          transition: transform 0.5s ease;
          max-width: 100%;
        }
        .team-img:hover { transform: scale(1.03); }
        .about-content {
          padding-left: ${window.innerWidth > 768 ? '40px' : '0'};
        }
        .about-content h3 {
          font-size: 2.2rem; font-weight: 800; margin-bottom: 25px;
          color: ${darkMode ? '#fff' : '#1E367E'};
        }
        .team-list {
          list-style: none; padding: 0; margin: 0;
        }
        .team-list li {
          padding: 15px 0 15px 35px; position: relative;
          border-bottom: 1px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,54,126,0.1)'};
          font-size: 1.05rem; line-height: 1.7;
          color: ${darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
          transition: all 0.3s ease;
        }
        .team-list li:hover {
          padding-left: 40px; color: ${darkMode ? '#4FA9E2' : '#3A5BA9'};
        }
        .team-list li::before {
          content: '✓'; position: absolute; left: 0; top: 50%;
          transform: translateY(-50%);
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          color: #fff; font-size: 0.8rem; display: flex;
          align-items: center; justify-content: center;
          font-weight: bold;
        }

        /* ===== CONTACT SECTION ===== */
        .contact-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1E367E 0%, #3A5BA9 50%, #4FA9E2 100%);
          position: relative; overflow: hidden;
        }
        .contact-section::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .contact-section h2 { color: #fff; position: relative; z-index: 2; }
        .contact-section .section-subtitle { color: rgba(255,255,255,0.9); }
        
        .contact-card {
          background: ${darkMode ? 'rgba(26,26,46,0.9)' : 'rgba(255,255,255,0.95)'};
          border-radius: 28px; padding: 40px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.25);
          backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);
        }
        .contact-info-item {
          display: flex; align-items: flex-start; gap: 15px;
          padding: 20px 0; border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }
        .contact-info-item:last-child { border-bottom: none; }
        .contact-icon {
          width: 50px; height: 50px; border-radius: 15px;
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 1.3rem; flex-shrink: 0;
        }
        .contact-text h5 { font-weight: 700; margin-bottom: 5px; }
        .contact-text p, .contact-text a {
          opacity: 0.8; text-decoration: none; 
          color: ${darkMode ? '#fff' : '#1E367E'};
          transition: color 0.3s;
        }
        .contact-text a:hover { color: #4FA9E2; }
        
        .contact-form .form-control {
          border-radius: 15px; padding: 15px 20px;
          border: 2px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(30,54,126,0.15)'};
          background: ${darkMode ? '#1a1a2e' : '#f8fbff'};
          color: ${darkMode ? '#fff' : '#000'};
          transition: all 0.3s ease; margin-bottom: 20px;
        }
        .contact-form .form-control:focus {
          border-color: #4FA9E2; box-shadow: 0 0 0 4px rgba(79,169,226,0.15);
          background: ${darkMode ? '#16213e' : '#fff'};
        }
        .contact-form .form-control::placeholder {
          color: ${darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'};
        }
        .submit-btn {
          background: linear-gradient(135deg, #1E367E, #3A5BA9);
          border: none; border-radius: 25px; padding: 15px 45px;
          font-weight: 700; font-size: 1.05rem; color: #fff;
          transition: all 0.4s ease; width: 100%;
          position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(30,54,126,0.4);
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:disabled {
          opacity: 0.7; cursor: not-allowed; transform: none;
        }
        .form-success {
          text-align: center; padding: 30px; color: #fff;
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          border-radius: 20px; animation: fadeInUp 0.5s ease;
        }
        .form-success svg { font-size: 3rem; margin-bottom: 15px; }

        /* ===== FOOTER ===== */
        .footer {
          background: ${darkMode ? '#0a0a0a' : '#1E367E'};
          color: rgba(255,255,255,0.9); padding: 60px 0 30px;
          position: relative;
        }
        .footer-logo {
          font-size: 1.8rem; font-weight: 800; margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .footer-logo span {
          background: linear-gradient(135deg, #4FA9E2, #fff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .footer-desc { opacity: 0.85; line-height: 1.8; margin-bottom: 25px; }
        .social-links { display: flex; gap: 12px; }
        .social-link {
          width: 45px; height: 45px; border-radius: 15px;
          background: rgba(255,255,255,0.15); display: flex;
          align-items: center; justify-content: center;
          color: #fff; font-size: 1.2rem; text-decoration: none;
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: linear-gradient(135deg, #4FA9E2, #3A5BA9);
          transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .footer-links h5 {
          color: #fff; font-weight: 700; margin-bottom: 20px; font-size: 1.2rem;
        }
        .footer-links ul { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a {
          color: rgba(255,255,255,0.8); text-decoration: none;
          transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;
        }
        .footer-links a:hover {
          color: #4FA9E2; transform: translateX(5px);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 25px; margin-top: 40px; text-align: center;
          opacity: 0.8; font-size: 0.95rem;
        }

        /* ===== MODAL ===== */
        .modal-content {
          border-radius: 24px; border: none;
          background: ${darkMode 
            ? 'linear-gradient(145deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(145deg, #fff, #f8fbff)'};
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
        }
        .modal-header {
          border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          padding: 25px 30px;
        }
        .modal-title { font-weight: 700; color: ${darkMode ? '#fff' : '#1E367E'}; }
        .modal-body { padding: 30px; }
        .modal-body img {
          border-radius: 16px; margin-bottom: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
        .modal-body p { line-height: 1.8; opacity: 0.9; }
        .btn-close {
          filter: ${darkMode ? 'brightness(0) invert(1)' : 'none'};
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .hero-title { font-size: 2.8rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .section-title { font-size: 2.5rem; }
          .nav-dots { display: none; }
        }
        @media (max-width: 768px) {
          .hero { padding: 80px 20px; min-height: auto; }
          .hero-title { font-size: 2.3rem; }
          .hero-subtitle { font-size: 1.3rem; min-height: auto; }
          .hero-desc { font-size: 1.05rem; }
          .section-title { font-size: 2rem; }
          .section-subtitle { font-size: 1.05rem; }
          .service-card { padding: 25px 20px; }
          .service-icon { width: 75px; height: 75px; }
          .carousel-item-cinema { min-width: 280px; }
          .carousel-item-cinema img { height: 180px; }
          .about-content { padding-left: 0; text-align: center; }
          .team-list li { text-align: left; }
          .contact-card { padding: 30px 25px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 1.9rem; }
          .section-title { font-size: 1.7rem; }
          .stats-card h3 { font-size: 2.3rem; }
          .testimonial { padding: 30px 25px; }
          .testimonial p { font-size: 1.1rem; }
          .process-step { padding: 25px 15px; }
          .step-number { width: 55px; height: 55px; font-size: 1.2rem; }
        }

        /* ===== GLASSMORPHISM UTILS ===== */
        .glass {
          background: ${darkMode 
            ? 'rgba(26,26,46,0.7)' 
            : 'rgba(255,255,255,0.85)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${darkMode 
            ? 'rgba(255,255,255,0.15)' 
            : 'rgba(30,54,126,0.1)'};
        }
      `}</style>

      {/* ===== PARTICLES BACKGROUND ===== */}
      <div className="particles-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              width: 4 + Math.random() * 12 + "px",
              height: 4 + Math.random() * 12 + "px",
              animationDuration: 8 + Math.random() * 12 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* ===== NAVIGATION DOTS ===== */}
      <div className="nav-dots">
        {["home", "services", "projects", "process", "gallery", "stats", "testimonials", "about", "contact"].map((section) => (
          <div
            key={section}
            className={`nav-dot ${activeSection === section ? "active" : ""}`}
            data-label={
              section === "home" ? "الرئيسية" :
              section === "services" ? "الخدمات" :
              section === "projects" ? "أعمالنا" :
              section === "process" ? "خطوات العمل" :
              section === "gallery" ? "المعرض" :
              section === "stats" ? "إحصائيات" :
              section === "testimonials" ? "آراء العملاء" :
              section === "about" ? "من نحن" : "تواصل معنا"
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
            
    {/* الجملة المميزة - مستقبلك يبدأ من هنا */}
    <div className="hero-badge animate-on-scroll">
      <span className="badge-icon">🚀</span>
      <span className="badge-text">مستقبلك يبدأ من هنا</span>
      <span className="badge-sparkle">✨</span>
    </div>
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
        <div className="scroll-indicator" onClick={() => scrollToSection("services")}>
          <FaArrowRight style={{ transform: "rotate(90deg)" }} />
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <Container className="py-5" id="services" ref={(el) => (sectionRefs.current["services"] = el)}>
        <div className="text-center mb-5 animate-on-scroll">
          <h2 className="section-title">خدماتنا المميزة</h2>
          <p className="section-subtitle">
            نقدم مجموعة متكاملة من الخدمات الرقمية المصممة خصيصاً لتحقيق أهدافك وتنمية مشروعك
          </p>
        </div>
        <Row>
          {services.map((s, idx) => (
            <Col md={4} sm={6} className="mb-4" key={idx}>
              <Card 
                className="service-card h-100 animate-on-scroll"
                style={{ animationDelay: s.delay }}
              >
                <div className="service-icon mb-3">{s.icon}</div>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text>{s.desc}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== PROCESS SECTION ===== */}
      <section className="process-section" id="process" ref={(el) => (sectionRefs.current["process"] = el)}>
        <Container>
          <div className="text-center mb-5 animate-on-scroll">
            <h2 className="section-title" style={{ color: darkMode ? '#fff' : '#1E367E' }}>
              خطوات عملنا
            </h2>
            <p className="section-subtitle" style={{ color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }}>
              منهجية واضحة ومجربة تضمن لك أفضل النتائج في كل مرحلة من مراحل المشروع
            </p>
          </div>
          <Row className="justify-content-center">
            {processSteps.map((step, idx) => (
              <Col md={3} sm={6} key={idx} className="animate-on-scroll">
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
        <div className="text-center mb-5 animate-on-scroll">
          <h2 className="section-title">أحدث أعمالنا</h2>
          <p className="section-subtitle">
            نماذج من مشاريعنا الناجحة التي نفخر بتقديمها لعملائنا الكرام
          </p>
        </div>
        <Row className="justify-content-center">
          {projects.map((p, idx) => (
            <Col md={6} lg={4} sm={6} className="mb-4 d-flex justify-content-center" key={idx}>
              <Card className="project-card shadow-lg h-100 text-center animate-on-scroll" style={{ maxWidth: "340px" }}>
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

      {/* ===== CINEMA GALLERY ===== */}
      <section className="gallery-section-cinema" id="gallery" ref={(el) => (sectionRefs.current["gallery"] = el)}>
        <Container>
          <h2 className="text-center mb-4 animate-on-scroll">معرضنا الإبداعي</h2>
          <div
            className="carousel-track-cinema animate-on-scroll"
            ref={carouselRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {galleryImages.map((img, idx) => (
              <div className="carousel-item-cinema glass" key={idx}>
                <img src={img} alt={`Gallery ${idx + 1}`} />
                <div className="gallery-overlay">
                  <h6 className="mb-1">مشروع #{idx + 1}</h6>
                  <small>تصميم وتطوير احترافي</small>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== STATS SECTION ===== */}
      <Container className="py-5 text-center" id="stats" ref={(el) => (sectionRefs.current["stats"] = el)}>
        <Row>
          {stats.map((s, idx) => (
            <Col md={3} sm={6} key={idx} className="mb-4 animate-on-scroll">
              <Card className="stats-card">
                <h3>
                  <span className="stats-icon">{s.icon}</span>
                  <CountUp end={s.number} duration={2.5} separator="," />+
                </h3>
                <p>{s.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <Container className="py-5" id="testimonials" ref={(el) => (sectionRefs.current["testimonials"] = el)}>
        <div className="text-center mb-5 animate-on-scroll">
          <h2 className="section-title">آراء عملائنا</h2>
          <p className="section-subtitle">
            ثقة عملائنا هي أكبر دافع لنا لمواصلة التميز والإبداع
          </p>
        </div>
        <div className="testimonial animate-on-scroll">
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

      {/* ===== ABOUT / TEAM SECTION ===== */}
      <section className="team-section" id="about" ref={(el) => (sectionRefs.current["about"] = el)}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center mb-4 mb-md-0 animate-on-scroll">
              <img
                src="https://www.qeematech.net/wp-content/uploads/2024/04/traffic-img.png.webp"
                alt="Team"
                className="team-img img-fluid"
              />
            </Col>
            <Col md={6} className="about-content animate-on-scroll">
              <h3>من نحن؟</h3>
              <ul className="team-list">
                {[
                  "InFuture Digital Solutions شركة متخصصة في بناء وتطوير العلامات التجارية رقميًا.",
                  "خبرة عملية في تصميم تطبيقات iOS و Android عالية الجودة.",
                  "حلول متكاملة للمتاجر الإلكترونية وخدمات الدفع والشحن الذكي.",
                  "فريق متخصص في تطوير البرمجيات والمواقع والتطبيقات مع التركيز على تجربة المستخدم.",
                  "دعم مستمر بعد التنفيذ لضمان نجاح المشروع الرقمي.",
                ].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact-section" id="contact" ref={(el) => (sectionRefs.current["contact"] = el)}>
        <Container>
          <div className="text-center mb-5 animate-on-scroll">
            <h2 className="section-title">تواصل معنا</h2>
            <p className="section-subtitle">
              فريقنا جاهز لمساعدتك في تحويل أفكارك إلى واقع رقمي ملموس
            </p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="contact-card animate-on-scroll">
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
                        <a href="tel:+201108293956">201108293956</a>
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
    </>
  );
}

export default Home;
