import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import CountUp from "react-countup";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaSearch,
  FaCloud,
  FaRocket,
  FaServer,
  FaGraduationCap,
  FaPalette,
  FaLaptop,
  FaPhone,
  FaWhatsapp,
  FaFacebookF
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Home({ darkMode = false }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#f0f8ff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  const testimonials = [
    { name: "أحمد علي", text: "خدمات رائعة واحترافية، أنصح بشدة!" },
    { name: "سارة محمود", text: "تصميمات مذهلة وتجربة مستخدم ممتازة." },
    { name: "محمد فؤاد", text: "سرعة تنفيذ ودعم ممتاز طوال الوقت." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <FaGraduationCap size={50} />,
      title: "كورسات التسويق الإلكتروني",
      desc: "تدريب عملي يؤهلك لسوق العمل ويدعم إدارة الحملات وبناء البراند.",
    },
    {
      icon: <FaPalette size={50} />,
      title: "كورسات الجرافيك ديزاين",
      desc: "من الأساسيات حتى الاحتراف، مع مشاريع حقيقية.",
    },
    {
      icon: <FaPalette size={50} />,
      title: "تصميم الهوية البصرية",
      desc: "نصنع هوية متكاملة تعبر عن مشروعك وتجذب العملاء.",
    },
    {
      icon: <FaLaptop size={50} />,
      title: "تطوير المواقع",
      desc: "مواقع شركات ومتاجر إلكترونية وسريعة الاستجابة.",
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: "تطبيقات الموبايل",
      desc: "تطبيقات iOS و Android مع UI/UX احترافي ودعم كامل.",
    },
  ];

  const projects = [
    {
      title: "مواقع الشركات",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب، مع التركيز على حلول رقمية مبتكرة لتطوير أعمالكم.",
      img: "https://images.pexels.com/photos/3184327/pexels-photo-3184327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      link: "https://ediltechis.com/",
    },
    {
      title: "متاجر إلكترونية",
      desc: "متجر إلكتروني كامل مع خيارات دفع وشحن متقدمة، كحل رقمي شامل لدعم التجارة الإلكترونية.",
      img: "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg",
      link: "https://bluelounge4catering.com/",
    },
    {
      title: "مواقع الشركات",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب.",
      img: "https://images.pexels.com/photos/190364/pexels-photo-190364.jpeg",
      link: "https://elnbress.com/",
    },
  ];

  const stats = [
    { number: 3, label: "سنوات خبرة" },
    { number: 3, label: "مشروع تحت التنفيذ" },
    { number: 20, label: "عملاء سعداء" },
    { number: 10, label: "مشروعات منتهية" },
  ];

  const galleryImages = [
    "/assets/photo_5809677419944807673_y.jpg",
    "/assets/photo_5809677419944807674_y.jpg",
    "/assets/photo_5809677419944807676_y.jpg",
    "/assets/photo_5809677419944807677_y.jpg",
  ];

  // Carousel auto scroll with pause on hover
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

  const openModal = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };

  return (
    <>
      <style>{`
        body {margin:0; font-family: 'Segoe UI', sans-serif;}

        /* Particles Background */
        .particles-bg {position: fixed; width: 100%; height: 100%; top:0; left:0; z-index:-1; overflow:hidden;}
        .particle {width:8px; height:8px; border-radius:50%; background:#4FA9E2; position:absolute; opacity:0.5; animation: float 15s linear infinite;}
        @keyframes float {0% {transform: translateY(0) translateX(0);} 50% {transform: translateY(-50px) translateX(50px);} 100% {transform: translateY(0) translateX(0);}}

        /* Hero Section */
        .hero {padding:120px 20px; text-align:center; color:#fff; position:relative; z-index:1;}
        .hero::before {
          content:"";
          position:absolute; top:0; left:0; width:100%; height:100%;
          background: linear-gradient(270deg,#1E367E,#3A5BA9,#4FA9E2);
          background-size:600% 600%;
          animation: gradientBG 20s ease infinite;
          z-index:-1;
        }
        @keyframes gradientBG {0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .glow-button {transition: all 0.3s ease; background: #3A5BA9; color:#fff; border-radius:30px; padding:12px 30px; font-weight:bold;}
        .glow-button:hover {transform: scale(1.1); box-shadow:0 0 20px #4FA9E2,0 0 30px #3A5BA9;}

        /* Services */
        .service-card {border-radius:20px; padding:20px; background:#4FA9E2; color:#fff; transition: transform 0.5s ease, box-shadow 0.5s ease; text-align:center;}
        .service-card:hover {transform: scale(1.08) rotate(2deg); box-shadow:0 15px 40px rgba(0,0,0,0.3);}
        .service-icon {animation: rotateIcon 5s linear infinite;}
        @keyframes rotateIcon {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}

        /* Stats */
        .stats-card {border-radius:25px; padding:25px; color:#fff; background: linear-gradient(135deg,#1E367E,#3A5BA9,#4FA9E2);}

        /* Testimonials */
        .testimonial {background:#fff; color:#1E367E; border-radius:20px; padding:30px; text-align:center; max-width:600px; margin:0 auto; box-shadow:0 15px 40px rgba(30,54,126,0.3);}
        .testimonial p {font-size:1.2rem; font-style:italic;}
        .testimonial h5 {margin-top:15px; font-weight:700;}

        /* Cinema Gallery */
        .gallery-section-cinema {padding:60px 0; background: linear-gradient(180deg,#1E367E,#3A5BA9,#4FA9E2);}
        .gallery-section-cinema h2 {font-size:2.5rem; margin-bottom:40px; color:#fff; text-shadow:0 0 10px #1E367E;}
        .carousel-track-cinema {display:flex; overflow-x:auto; gap:30px; padding:20px 0; scroll-behavior:smooth; cursor: grab;}
        .carousel-track-cinema::-webkit-scrollbar {height:10px;}
        .carousel-track-cinema::-webkit-scrollbar-thumb {background:#fff; border-radius:5px;}
        .carousel-item-cinema {min-width:400px; flex-shrink:0; border-radius:15px; overflow:hidden; box-shadow:0 15px 30px rgba(0,0,0,0.6); transition: transform 0.3s, box-shadow 0.3s; cursor:pointer;}
        .carousel-item-cinema img {width:100%; height:250px; object-fit:cover; transition: transform 0.5s;}
        .carousel-item-cinema:hover {transform: scale(1.05); box-shadow:0 25px 50px rgba(0,0,0,0.8);}
        .carousel-item-cinema:hover img {transform: scale(1.1);}
        @media (max-width:768px){.carousel-item-cinema{min-width:300px;height:200px;}.carousel-item-cinema img{height:200px;}}
        @media (max-width:480px){.carousel-item-cinema{min-width:250px;height:150px;}.carousel-item-cinema img{height:150px;}}
      `}</style>

      {/* Particles Background */}
      <div className="particles-bg">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              width: 5 + Math.random() * 10 + "px",
              height: 5 + Math.random() * 10 + "px",
              animationDuration: 5 + Math.random() * 10 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* Hero */}
      <section className="hero" id="home">
        <h1 className="hero-title">Infuture Digital Solutions</h1>
        <p className="fade-in-text mt-2 text-lg font-medium text-gray-700">مستقبلك يبدأ من هنا</p>
        <p>حلول رقمية متكاملة من التدريب حتى التنفيذ والهوية البصرية.</p>
        <Button className="glow-button" onClick={() => window.open("https://wa.me/201108293956", "_blank")}>
          ابدأ مشروعك الآن
        </Button>
      </section>

      {/* Services */}
      <Container className="py-5" id="services">
        <h2 className="text-center mb-5">خدماتنا</h2>
        <Row>
          {services.map((s, idx) => (
            <Col md={4} sm={6} className="mb-4" key={idx}>
              <Card className="service-card h-100">
                <div className="service-icon mb-3">{s.icon}</div>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text>{s.desc}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Projects */}
      <Container className="py-5" id="projects">
        <h2 className="text-center mb-5" style={{ fontWeight: "bold", color: "#1E367E" }}>
          بعض من أعمالنا ومشاريعنا
        </h2>
        <Row className="justify-content-center">
          {projects.map((p, idx) => (
            <Col md={6} lg={3} sm={6} className="mb-4 d-flex justify-content-center" key={idx}>
              <Card className="project-card shadow-lg h-100 text-center position-relative overflow-hidden" style={{ maxWidth: "300px" }}>
                <img src={p.img} alt={p.title} className="img-fluid project-img" />
                <div className="p-3">
                  <h5>{p.title}</h5>
                  <p>{p.desc}</p>
                  <Button variant="primary" onClick={() => openModal(p)}>اضغط للمشاهدة</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Cinema Gallery */}
      <section className="gallery-section-cinema">
        <Container>
          <h2 className="text-center mb-4">معرضنا الرقمي</h2>
          <div
            className="carousel-track-cinema"
            ref={carouselRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {galleryImages.map((img, idx) => (
              <div className="carousel-item-cinema" key={idx}>
                <img src={img} alt={`Gallery ${idx}`} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Container className="py-5 text-center" id="stats">
        <Row>
          {stats.map((s, idx) => (
            <Col md={3} sm={6} key={idx} className="mb-4">
              <Card className="stats-card">
                <h3><CountUp end={s.number} duration={2} /></h3>
                <p>{s.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="py-5" id="testimonials">
        <h2 className="text-center mb-4">آراء عملائنا</h2>
        <div className="testimonial">
          <p>“{testimonials[testimonialIndex].text}”</p>
          <h5>{testimonials[testimonialIndex].name}</h5>
        </div>
      </Container>

      {/* Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedProject.img} alt={selectedProject.title} className="img-fluid rounded mb-3" />
              <p>{selectedProject.desc}</p>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* About / Team */}
      <section className="py-5 team-section" id="about">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center mb-4 mb-md-0">
              <img src="https://www.qeematech.net/wp-content/uploads/2024/04/traffic-img.png.webp" alt="Team" className="team-img img-fluid" />
            </Col>
            <Col md={6}>
              <h2 className="team-title mb-4">من نحن</h2>
              <ul className="team-list mb-4">
                <li>InFuture Digital Solutions شركة متخصصة في بناء وتطوير العلامات التجارية رقميًا.</li>
                <li>خبرة عملية في تصميم تطبيقات iOS و Android عالية الجودة.</li>
                <li>حلول متكاملة للمتاجر الإلكترونية وخدمات الدفع والشحن الذكي.</li>
                <li>فريق متخصص في تطوير البرمجيات والمواقع والتطبيقات مع التركيز على تجربة المستخدم.</li>
                <li>دعم مستمر بعد التنفيذ لضمان نجاح المشروع الرقمي.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
