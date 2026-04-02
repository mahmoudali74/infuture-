// Home.js
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import CountUp from "react-countup";
import {
  FaRocket, FaUsers, FaCode, FaCheckCircle, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaArrowRight, FaStar, FaWhatsapp,
  FaChartLine, FaPalette
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home({ darkMode = false }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const carouselRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRefs = useRef({});
  const [selectedService, setSelectedService] = useState(null);

  // Typing effect
  useEffect(() => {
    const texts = ["حلول رقمية", "تصميم إبداعي", "تطوير احترافي", "نجاح مشروعك"];
    let textIndex = 0, charIndex = 0, isDeleting = false, timeout;
    const type = () => {
      const currentText = texts[textIndex];
      if (isDeleting) { setTypedText(currentText.substring(0, charIndex - 1)); charIndex--; }
      else { setTypedText(currentText.substring(0, charIndex + 1)); charIndex++; }
      if (!isDeleting && charIndex === currentText.length) timeout = setTimeout(() => (isDeleting = true), 2000);
      else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
      timeout = setTimeout(type, isDeleting ? 50 : 100);
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      for (const sec in sectionRefs.current) {
        const el = sectionRefs.current[sec];
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(sec); break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0b1120" : "#f8fafc";
    document.body.style.color = darkMode ? "#e2e8f0" : "#0f172a";
  }, [darkMode]);

  // Testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIndex(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const testimonials = [
    { name: "أ. حسام", text: "خدمات رائعة واحترافية، أنصح بشدة!", avatar: "👨‍💼", rating: 5 },
    { name: "أ. علي", text: "تصميمات مذهلة وتجربة مستخدم ممتازة!", avatar: "👨‍🔧", rating: 5 },
    { name: "أ. منى", text: "سرعة تنفيذ ودعم ممتاز طوال الوقت.", avatar: "👩‍💼", rating: 5 },
  ];

  const services = [
    { img: "/assets/pexels-kindelmedia-7688467.jpg", title: "حملات إعلانية", desc: "إدارة احترافية لحملاتك", details: "نقدم خدمات متكاملة لإدارة الحملات الإعلانية الممولة على فيسبوك، إنستجرام، جوجل.", features: ["فيسبوك وإنستجرام", "إعلانات جوجل", "تحليل البيانات", "استهداف دقيق"] },
    { img: "/assets/pexels-pixabay-270637.jpg", title: "تحسين SEO", desc: "ظهورك في النتائج الأولى", details: "نحسن ترتيب موقعك في جوجل لزيادة الزوار العضيين بشكل مستدام.", features: ["كلمات مفتاحية", "تحسين المحتوى", "SEO تقني", "تقارير شهرية"] },
    { img: "/assets/pexels-fauxels-3183183.jpg", title: "سوشيال ميديا", desc: "إدارة حسابات التواصل", details: "ندير حساباتك باحترافية ونزيد التفاعل مع جمهورك.", features: ["تخطيط المحتوى", "تصميم بوستات", "كتابة إبداعية", "تحليل المنافسين"] },
    { img: "/assets/pexels-pixabay-247819.jpg", title: "تصميم جرافيك", desc: "هوية بصرية مميزة", details: "تصميم شعارات وهوية بصرية تعكس علامتك التجارية.", features: ["شعارات Logo", "هوية متكاملة", "تصاميم سوشيال", "موشن جرافيك"] },
    { img: "/assets/pexels-marviio-1561081.jpg", title: "تصوير منتجات", desc: "صور احترافية عالية الجودة", details: "تصوير منتجاتك بإضاءة واستوديو احترافي لزيادة المبيعات.", features: ["تصوير ستوديو", "تعديل احترافي", "فيديوهات قصيرة", "تسليم سريع"] },
    { img: "/assets/pexels-pixabay-270404.jpg", title: "مواقع ومتاجر", desc: "حلول رقمية متكاملة", details: "تصميم وبرمجة مواقع ومتاجر إلكترونية سريعة وآمنة.", features: ["تصميم UI/UX", "برمجة خاصة", "بوابات دفع", "دعم فني"] },
  ];

  const projects = [
    { title: "مواقع الشركات", desc: "تصميم عصري واحترافي", img: "/assets/Screenshot 2026-02-17 145639.png", link: "https://ediltechis.com/", tags: ["React", "Bootstrap"] },
    { title: "متاجر إلكترونية", desc: "متجر كامل بوابات دفع", img: "/assets/Screenshot 2026-02-17 145545.png", link: "https://bluelounge4catering.com/", tags: ["E-commerce", "Payment"] },
    { title: "منصات تعليمية", desc: "نظام إدارة محتوى متقدم", img: "/assets/Screenshot 2026-02-17 145614.png", link: "https://elnbress.com/", tags: ["LMS", "Video"] },
  ];

  const stats = [
    { number: 3, label: "سنوات خبرة", icon: <FaRocket /> },
    { number: 20, label: "عملاء سعداء", icon: <FaUsers /> },
    { number: 10, label: "مشروعات منتهية", icon: <FaCheckCircle /> },
    { number: 3, label: "مشاريع جارية", icon: <FaCode /> },
  ];

  const galleryImages = [
    "/assets/photo_5809677419944807673_y.jpg",
    "/assets/photo_5809677419944807674_y.jpg",
    "/assets/photo_5809677419944807676_y.jpg",
    "/assets/photo_5809677419944807677_y.jpg",
  ];

  const processSteps = [
    { step: "01", title: "اكتشاف", desc: "نفهم أهدافك", icon: <FaChartLine /> },
    { step: "02", title: "تخطيط", desc: "نضع استراتيجية", icon: <FaPalette /> },
    { step: "03", title: "تنفيذ", desc: "نحول الفكرة لواقع", icon: <FaCode /> },
    { step: "04", title: "إطلاق", desc: "دعم مستمر بعد التسليم", icon: <FaRocket /> },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => { setFormData({ name: "", email: "", message: "" }); setFormSubmitted(false); }, 3000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openServiceModal = (service) => { setSelectedService(service); setModalShow(true); };

  return (
    <>
      <style>{`
        /* ===== BASE ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: hidden; background: ${darkMode ? "#0b1120" : "#f8fafc"}; color: ${darkMode ? "#e2e8f0" : "#0f172a"}; }
        
        /* ===== HERO ===== */
        .hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px 16px; background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; position: relative; }
        .hero h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 10px; }
        .hero p.sub { font-size: 1.2rem; opacity: 0.95; min-height: 36px; margin-bottom: 15px; }
        .cursor { border-right: 2px solid #fff; animation: blink 0.7s infinite; margin-left: 4px; }
        @keyframes blink { 50% { border-color: transparent; } }
        .hero p.desc { font-size: 0.95rem; max-width: 480px; margin-bottom: 25px; line-height: 1.6; opacity: 0.95; }
        .cta { background: #fff; color: #2563eb; border: none; border-radius: 50px; padding: 12px 28px; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .scroll-down { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); font-size: 1.3rem; cursor: pointer; opacity: 0.8; }
        
        /* ===== SECTIONS ===== */
        .sec { padding: 3rem 0; }
        .sec-h { text-align: center; margin-bottom: 2rem; }
        .sec-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 6px; }
        .sec-sub { font-size: 0.95rem; opacity: 0.75; max-width: 400px; margin: 0 auto; }
        
        /* ===== CARDS ===== */
        .card-std { border: none; border-radius: 12px; overflow: hidden; height: 100%; background: ${darkMode ? "#1e293b" : "#fff"}; box-shadow: 0 3px 12px rgba(0,0,0,0.06); transition: transform 0.2s; display: flex; flex-direction: column; }
        .card-std:hover { transform: translateY(-3px); }
        .card-std img { height: 120px; width: 100%; object-fit: cover; display: block; }
        .card-body-sm { padding: 0.75rem 0.65rem; flex: 1; display: flex; flex-direction: column; }
        .card-body-sm h5 { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; line-height: 1.3; }
        .card-body-sm p { font-size: 0.82rem; opacity: 0.8; margin: 0 0 8px 0; line-height: 1.4; flex: 1; }
        .tag { font-size: 0.65rem; padding: 3px 8px; border-radius: 20px; background: #2563eb; color: #fff; font-weight: 600; margin-right: 5px; margin-bottom: 5px; display: inline-block; }
        .btn-std { background: #2563eb; border: none; border-radius: 50px; padding: 8px 0; font-size: 0.85rem; color: #fff; width: 100%; font-weight: 600; margin-top: auto; }
        
        /* ===== GRID LAYOUTS - FIXED ===== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          width: 100%;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          width: 100%;
        }
        
        /* ===== PROCESS & STATS ===== */
        .grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .box-sm { text-align: center; padding: 1rem 0.5rem; background: ${darkMode ? "#1e293b" : "#fff"}; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .step-num { width: 36px; height: 36px; border-radius: 50%; background: #2563eb; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; margin-bottom: 8px; }
        .box-sm h5 { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
        .box-sm p { font-size: 0.8rem; opacity: 0.75; margin: 0; }
        
        .stat-box { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; border-radius: 12px; padding: 1.2rem 0.5rem; text-align: center; box-shadow: 0 4px 15px rgba(37,99,235,0.2); }
        .stat-box h3 { font-size: 1.6rem; font-weight: 800; margin-bottom: 3px; }
        .stat-box p { font-size: 0.8rem; opacity: 0.95; margin: 0; }
        
        /* ===== ABOUT ===== */
        .about-box { background: ${darkMode ? "#1e293b" : "#fff"}; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); max-width: 750px; margin: 0 auto; }
        .about-title { font-size: 1.4rem; font-weight: 800; color: #2563eb; margin-bottom: 10px; }
        .about-text { font-size: 0.95rem; line-height: 1.7; margin-bottom: 15px; opacity: 0.9; }
        .about-list { list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .about-list li { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; background: ${darkMode ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)"}; padding: 6px 12px; border-radius: 50px; color: ${darkMode ? "#93c5fd" : "#1e3a8a"}; }
        
        /* ===== GALLERY ===== */
        .gallery-track { display: flex; gap: 10px; overflow-x: auto; padding: 8px 12px; scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .gallery-track::-webkit-scrollbar { display: none; }
        .gal-item { min-width: 150px; flex-shrink: 0; border-radius: 10px; overflow: hidden; scroll-snap-align: start; background: #fff; }
        .gal-item img { width: 100%; height: 100px; object-fit: cover; }
        
        /* ===== TESTIMONIALS ===== */
        .testi-box { background: ${darkMode ? "#1e293b" : "#fff"}; border-radius: 16px; padding: 1.5rem 1rem; text-align: center; margin: 0 auto; max-width: 450px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
        .testi-text { font-size: 0.95rem; font-style: italic; line-height: 1.6; margin: 10px 0 15px; }
        .testi-auth { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .testi-ava { width: 40px; height: 40px; border-radius: 50%; background: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #fff; }
        .testi-name { font-weight: 700; font-size: 0.95rem; margin: 0; }
        .testi-role { font-size: 0.8rem; opacity: 0.7; }
        .stars { color: #fbbf24; font-size: 0.9rem; margin-bottom: 8px; }
        .dots { display: flex; justify-content: center; gap: 6px; margin-top: 15px; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: ${darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}; cursor: pointer; }
        .dot.active { background: #2563eb; }
        
        /* ===== CONTACT ===== */
        .contact-card { background: ${darkMode ? "#1e293b" : "#fff"}; border-radius: 16px; padding: 1.5rem; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
        .info-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}; }
        .info-item:last-child { border-bottom: none; }
        .icon-box { width: 36px; height: 36px; border-radius: 9px; background: #2563eb; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; flex-shrink: 0; }
        .lbl { font-size: 0.9rem; font-weight: 700; margin: 0 0 2px; }
        .val { font-size: 0.9rem; opacity: 0.85; margin: 0; text-decoration: none; color: inherit; display: block; }
        .form-ctrl { border-radius: 10px; padding: 10px 14px; border: 1px solid ${darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}; background: ${darkMode ? "#0f172a" : "#f8fafc"}; color: inherit; margin-bottom: 10px; font-size: 0.95rem; width: 100%; }
        .form-ctrl:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); outline: none; }
        .submit-btn { background: #2563eb; border: none; border-radius: 50px; padding: 11px; font-weight: 700; font-size: 1rem; color: #fff; width: 100%; }
        .success-box { text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 12px; color: #fff; }
        
        /* ===== MODALS ===== */
        .modal-content { border-radius: 14px; border: none; background: ${darkMode ? "#1e293b" : "#fff"}; }
        .modal-header { border-bottom: 1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}; padding: 14px 18px; }
        .modal-title { font-weight: 800; font-size: 1.2rem; }
        .modal-body { padding: 18px; }
        .modal-body img { border-radius: 10px; margin-bottom: 12px; width: 100%; height: 180px; object-fit: cover; }
        .features { list-style: none; padding: 0; margin: 10px 0; }
        .features li { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 0.9rem; border-bottom: 1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}; }
        .features li:last-child { border-bottom: none; }
        .check { color: #2563eb; }
        .modal-btn { background: #2563eb; border: none; border-radius: 50px; padding: 11px; font-weight: 700; font-size: 0.95rem; color: #fff; width: 100%; margin-top: 10px; }
        
        /* ===== RESPONSIVE ===== */
        @media (min-width: 768px) {
          .hero h1 { font-size: 2.3rem; }
          .hero p.sub { font-size: 1.4rem; }
          .sec-title { font-size: 1.8rem; }
          .grid-4 { grid-template-columns: repeat(4, 1fr); }
          .about-box { padding: 2rem 1.5rem; }
          .testi-box { padding: 2rem 1.5rem; max-width: 550px; }
          .contact-card { padding: 2rem; }
          .card-std img { height: 140px; }
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 992px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr); }
          .nav-dots { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); z-index: 999; display: flex; flex-direction: column; gap: 8px; }
          .n-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: 2px solid #fff; cursor: pointer; transition: 0.2s; }
          .n-dot.active { background: #fff; transform: scale(1.3); }
        }
        .nav-dots { display: none; }
      `}</style>

      {/* Nav Dots */}
      <div className="nav-dots">
        {["home","about","services","projects","process","gallery","stats","testimonials","contact"].map(s => (
          <div key={s} className={`n-dot ${activeSection===s?"active":""}`} onClick={()=>scrollToSection(s)} />
        ))}
      </div>

      {/* Hero */}
      <section className="hero" id="home" ref={el=>sectionRefs.current.home=el}>
        <h1>InFuture Digital Solutions</h1>
        <p className="sub">{typedText}<span className="cursor">|</span></p>
        <p className="desc">شريكك الرقمي الموثوق ✨ حلول متكاملة من الفكرة حتى التنفيذ بجودة واحترافية.</p>
        <Button className="cta" onClick={()=>window.open("https://wa.me/201108293956","_blank")}>
          <FaWhatsapp style={{marginRight:6}} /> ابدأ مشروعك
        </Button>
        <div className="scroll-down" onClick={()=>scrollToSection("about")}>↓</div>
      </section>

      {/* About */}
      <section className="sec" id="about" ref={el=>sectionRefs.current.about=el}>
        <Container>
          <div className="about-box">
            <h2 className="about-title">من نحن</h2>
            <p className="about-text">في InFuture، نؤمن أن كل مشروع فريد ويستحق اهتمامًا خاصًا. نعمل معك خطوة بخطوة لفهم أهدافك وتقديم الحلول الأنسب.</p>
            <ul className="about-list">
              <li><FaCheckCircle size={14}/> حلول مخصصة تناسب احتياجاتك</li>
              <li><FaCheckCircle size={14}/> فريق محترف ذو خبرة واسعة</li>
              <li><FaCheckCircle size={14}/> دعم فني مستمر حتى بعد التسليم</li>
              <li><FaCheckCircle size={14}/> أسعار تنافسية وجودة مضمونة</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Services - FIXED GRID */}
      <section className="sec" id="services" ref={el=>sectionRefs.current.services=el}>
        <Container>
          <div className="sec-h"><h2 className="sec-title">خدماتنا</h2><p className="sec-sub">مجموعة متكاملة من الخدمات الرقمية لتنمية مشروعك</p></div>
          <div className="services-grid">
            {services.map((s,i)=>(
              <Card className="card-std" key={i} onClick={()=>openServiceModal(s)}>
                <img src={s.img} alt={s.title} />
                <div className="card-body-sm"><h5>{s.title}</h5><p>{s.desc}</p></div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="sec" id="process" ref={el=>sectionRefs.current.process=el} style={{background: darkMode?"#0b1120":"#f1f5f9"}}>
        <Container>
          <div className="sec-h"><h2 className="sec-title">خطوات العمل</h2><p className="sec-sub">منهجية بسيطة وواضحة</p></div>
          <div className="grid-4">
            {processSteps.map((st,i)=>(
              <div className="box-sm" key={i}>
                <div className="step-num">{st.step}</div>
                <h5>{st.title}</h5>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects - FIXED GRID */}
      <section className="sec" id="projects" ref={el=>sectionRefs.current.projects=el}>
        <Container>
          <div className="sec-h"><h2 className="sec-title">أعمالنا</h2><p className="sec-sub">نماذج من مشاريعنا</p></div>
          <div className="projects-grid">
            {projects.map((p,i)=>(
              <Card className="card-std" key={i}>
                <img src={p.img} alt={p.title} />
                <div className="card-body-sm">
                  <h5>{p.title}</h5>
                  <p>{p.desc}</p>
                  <div>{p.tags.map((t,j)=><span key={j} className="tag">{t}</span>)}</div>
                  <Button className="btn-std" onClick={()=>window.open(p.link,"_blank")}>عرض <FaArrowRight style={{marginLeft:4,fontSize:"0.7rem"}}/></Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="sec" id="gallery" ref={el=>sectionRefs.current.gallery=el} style={{background:"linear-gradient(135deg,#2563eb,#3b82f6)"}}>
        <Container>
          <div className="sec-h mb-3"><h2 className="sec-title" style={{color:"#fff"}}>المعرض</h2></div>
          <div className="gallery-track" ref={carouselRef}>
            {galleryImages.map((img,i)=><div className="gal-item" key={i}><img src={img} alt={`G${i+1}`}/></div>)}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="sec" id="stats" ref={el=>sectionRefs.current.stats=el}>
        <Container>
          <div className="grid-4">
            {stats.map((st,i)=>(
              <div className="stat-box" key={i}>
                <h3><CountUp end={st.number} duration={2}/></h3>
                <p>{st.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="sec" id="testimonials" ref={el=>sectionRefs.current.testimonials=el}>
        <Container>
          <div className="sec-h"><h2 className="sec-title">آراء العملاء</h2><p className="sec-sub">ثقتكم هي دافعنا</p></div>
          <div className="testi-box">
            <div className="stars">{Array.from({length:testimonials[testimonialIndex].rating}).map((_,i)=><FaStar key={i}/>)}</div>
            <p className="testi-text">"{testimonials[testimonialIndex].text}"</p>
            <div className="testi-auth">
              <div className="testi-ava">{testimonials[testimonialIndex].avatar}</div>
              <div><p className="testi-name">{testimonials[testimonialIndex].name}</p><p className="testi-role">{testimonials[testimonialIndex].role}</p></div>
            </div>
            <div className="dots">
              {testimonials.map((_,i)=><div key={i} className={`dot ${testimonialIndex===i?"active":""}`} onClick={()=>setTestimonialIndex(i)}/>)}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="sec" id="contact" ref={el=>sectionRefs.current.contact=el} style={{background:"linear-gradient(135deg,#2563eb,#3b82f6)"}}>
        <Container>
          <div className="sec-h mb-3"><h2 className="sec-title" style={{color:"#fff"}}>تواصل معنا</h2><p className="sec-sub" style={{color:"rgba(255,255,255,0.9)"}}>فريقنا جاهز لمساعدتك</p></div>
          <div className="contact-card">
            <Row>
              <Col md={5} className="mb-3 mb-md-0">
                <h4 style={{fontWeight:700,fontSize:"1.1rem",marginBottom:12}}>معلومات التواصل</h4>
                <div className="info-item"><div className="icon-box"><FaEnvelope/></div><div><p className="lbl">البريد</p><a href="mailto:infuturedigitall@gmail.com" className="val">infuturedigitall@gmail.com</a></div></div>
                <div className="info-item"><div className="icon-box"><FaPhone/></div><div><p className="lbl">الهاتف</p><a href="tel:+201108293956" className="val">+20 110 829 3956</a></div></div>
                <div className="info-item"><div className="icon-box"><FaMapMarkerAlt/></div><div><p className="lbl">الموقع</p><p className="val">القاهرة، مصر</p></div></div>
              </Col>
              <Col md={7}>
                <h4 style={{fontWeight:700,fontSize:"1.1rem",marginBottom:12}}>أرسل رسالة</h4>
                {formSubmitted ? (
                  <div className="success-box"><FaCheckCircle/><h5 style={{margin:"6px 0"}}>تم الإرسال ✓</h5><p style={{opacity:0.9,margin:0}}>سنتواصل معك قريبًا</p></div>
                ) : (
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Control className="form-ctrl" type="text" placeholder="الاسم *" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} required/>
                    <Form.Control className="form-ctrl" type="email" placeholder="البريد *" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required/>
                    <Form.Control className="form-ctrl" as="textarea" rows={3} placeholder="الرسالة *" value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} required/>
                    <Button type="submit" className="submit-btn">إرسال <FaArrowRight style={{marginLeft:5}}/></Button>
                  </Form>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Project Modal */}
      <Modal show={modalShow} onHide={()=>setModalShow(false)} centered size="lg">
        {selectedProject && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedProject.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <img src={selectedProject.img} alt={selectedProject.title}/>
              <p style={{marginBottom:12}}>{selectedProject.desc}</p>
              <div style={{marginBottom:15}}>{selectedProject.tags?.map((t,i)=><span key={i} className="tag">{t}</span>)}</div>
              <Button className="btn-std" onClick={()=>window.open(selectedProject.link,"_blank")}>زيارة الموقع</Button>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Service Modal */}
      <Modal show={modalShow} onHide={()=>setModalShow(false)} centered size="lg">
        {selectedService && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedService.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <img src={selectedService.img} alt={selectedService.title}/>
              <p style={{fontSize:"0.95rem",lineHeight:1.7,textAlign:"right",margin:"12px 0"}}>{selectedService.details}</p>
              <h5 style={{fontWeight:700,textAlign:"right",marginBottom:10}}>مميزات الخدمة:</h5>
              <ul className="features">{selectedService.features.map((f,i)=><li key={i}><FaCheckCircle className="check"/><span>{f}</span></li>)}</ul>
              <Button className="modal-btn" onClick={()=>{setModalShow(false);document.getElementById('contact').scrollIntoView({behavior:'smooth'})}}>طلب الخدمة <FaArrowRight style={{marginRight:5}}/></Button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
