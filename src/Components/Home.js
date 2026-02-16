import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import CountUp from "react-countup";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaSearch,
  FaCloud,
  FaRocket,
  FaServer,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import "./AnimatedSection.css";

function Home({ darkMode = false }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
      icon: <FaLaptopCode size={50} />,
      title: "تصميم المواقع",
      desc: "مواقع جذابة وسهلة الاستخدام.",
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: "تطبيقات الهاتف",
      desc: "تطبيقات iOS و Android احترافية.",
    },
    {
      icon: <FaSearch size={50} />,
      title: "تسويق إلكتروني",
      desc: "SEO والسوشيال ميديا للوصول لملايين العملاء.",
    },
    {
      icon: <FaCloud size={50} />,
      title: "استضافة وحلول سحابية",
      desc: "حلول سريعة وآمنة لمواقعك وتطبيقاتك.",
    },
    {
      icon: <FaRocket size={50} />,
      title: "إطلاق المشاريع",
      desc: "نساعدك على إطلاق مشاريعك بسرعة وكفاءة.",
    },
    {
      icon: <FaServer size={50} />,
      title: "خوادم قوية",
      desc: "خوادم سريعة وآمنة لدعم أعمالك الرقمية.",
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
      title: "موافع تجاريه ",
      desc: "متجر إلكتروني كامل مع خيارات دفع وشحن متقدمة، مقدم كحل رقمي شامل لدعم التجارة الإلكترونية.",
      img: "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg",
      link: "https://bluelounge4catering.com/",
    },
    {
      title: "مواقع الشركات",
      desc: "تصميم موقع احترافي لشركات بمظهر عصري وجذاب، مع التركيز على حلول رقمية مبتكرة لتطوير أعمالكم.",
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const openModal = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };
  // Scroll إلى قسم محدد
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
  body {
    margin:0; 
    font-family: 'Segoe UI', sans-serif;
    background-color: #FFFFFF;
    color: #1E367E;
  }

  /* Particles Background */
  .particles-bg {position: fixed; width: 100%; height: 100%; top:0; left:0; z-index:-1; overflow:hidden;}
  .particle {
    width:8px; height:8px; border-radius:50%; background:#4FA9E2; 
    position:absolute; opacity:0.5; 
    animation: float 15s linear infinite;
  }
  @keyframes float {
    0% {transform: translateY(0) translateX(0);}
    50% {transform: translateY(-50px) translateX(50px);}
    100% {transform: translateY(0) translateX(0);}
  }

  /* Hero Section */
  .hero {
    padding:120px 20px; 
    text-align:center; 
    background: linear-gradient(270deg, #1E367E, #3A5BA9, #4FA9E2);
    background-size: 600% 600%; 
    animation: gradientBG 20s ease infinite;
    color:#FFFFFF;
  }
  @keyframes gradientBG {0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
  .fade-in {opacity:0; transform:translateY(-30px); animation: fadeInUp 1s forwards;}
  @keyframes fadeInUp {to{opacity:1; transform:translateY(0);}}
  .glow-button {
    transition: all 0.3s ease; 
    background: #3A5BA9; color:#FFFFFF; border-radius: 30px; padding: 12px 30px; font-weight:bold;
  }
  .glow-button:hover {transform: scale(1.1); box-shadow:0 0 20px #4FA9E2,0 0 30px #3A5BA9;}

  /* Services Cards */
  .service-card {
    transition: transform 0.5s ease, box-shadow 0.5s ease; 
    border-radius:20px; padding:20px; background: #4FA9E2; color: #FFFFFF;
  }
  .service-card:hover {transform: scale(1.08) rotate(2deg); box-shadow:0 15px 40px rgba(0,0,0,0.3);}
  .service-icon {transition: transform 1s ease-in-out;}
  .service-card:hover .service-icon {transform: rotate(360deg);}
/* Services Cards Icons Rotate Continuously */
.service-icon {
  display: inline-block;
  animation: rotateIcon 5s linear infinite; /* دوران مستمر لمدة 5 ثواني */
}

@keyframes rotateIcon {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  /* Projects Cards */
  .project-card {
    border-radius:20px; overflow:hidden; transition: transform 0.5s ease, box-shadow 0.5s ease; 
    background: #FFFFFF; color: #1E367E;
  }
  .project-card img {transition: transform 0.5s ease, filter 0.5s ease;}
  .project-card:hover {transform: scale(1.05); box-shadow:0 20px 50px rgba(30,54,126,0.4);}
  .project-card:hover img {transform: scale(1.1); filter: brightness(1.1);}

  /* Stats */
  .stats-card {
    border-radius:25px; padding:25px; color:#FFFFFF; 
    background: linear-gradient(135deg,#1E367E,#3A5BA9,#4FA9E2); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .stats-card:hover {transform: scale(1.05); box-shadow:0 20px 40px rgba(0,0,0,0.3);}

  /* Testimonials */
  .testimonial {
    background:#FFFFFF; color:#1E367E; border-radius:20px; padding:30px; text-align:center; max-width:600px; margin:0 auto; 
    box-shadow:0 15px 40px rgba(30,54,126,0.3); transition: all 0.5s ease;
  }
  .testimonial p {font-size:1.2rem; font-style:italic;}
  .testimonial h5 {margin-top:15px; font-weight:700;}

  /* Team Section */
  .team-section {direction: rtl;}
  .team-title {color: #1E367E; font-weight: bold; font-size: 2rem;}
  .team-list {list-style: none; padding-left: 0;}
  .team-list li {margin-bottom: 10px; font-size: 1.1rem; padding-left:0;}
 /* Team Section Image - خفف الحركة */
.team-img {
  animation: floatTeam 6s ease-in-out infinite alternate;
}

@keyframes floatTeam {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); } /* زيادة الحركة عشان تبان */
  100% { transform: translateY(0px); }
}
`}</style>

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

      <section className="hero" id="home">
        <h1 className="fade-in">Infuture - حلول برمجية مبتكرة</h1>
        <p className="fade-in" style={{ animationDelay: "0.5s" }}>
          رواد صناعة المواقع والتطبيقات والمتاجر الإلكترونية
        </p>
        <div className="mt-4">
          <Button
            className="glow-button"
            onClick={() => {
              window.open("https://wa.me/201108293956", "_blank");
            }}
          >
            ابدأ الآن
          </Button>
        </div>
      </section>

      <Container className="py-5" id="services">
        <h2 className="text-center mb-5">خدماتنا</h2>
        <Row>
          {services.map((s, idx) => (
            <Col md={4} sm={6} className="mb-4" key={idx}>
              <Card className="service-card text-center h-100">
                <div className="service-icon mb-3">{s.icon}</div>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text>{s.desc}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="py-5 bg-light" id="projects">
        <h2
          className="text-center mb-5"
          style={{ fontWeight: "bold", color: "#1E367E" }}
        >
          بعض من أعمالنا ومشاريعنا
        </h2>
        <Row className="justify-content-center">
          {projects.map((p, idx) => (
            <Col
              md={6}
              lg={3}
              sm={6}
              className="mb-4 d-flex justify-content-center"
              key={idx}
            >
              <Card
                className="project-card shadow-lg h-100 text-center position-relative overflow-hidden"
                style={{ maxWidth: "300px" }} // تحديد حجم موحد للكارد
              >
                <div className="project-img-wrapper">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="img-fluid project-img"
                  />
                  <div className="project-overlay">
                    <h5 className="overlay-title">{p.title}</h5>
                    <p className="overlay-desc">{p.desc}</p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => window.open(p.link, "_blank")}
                    >
                      اضغط للمشاهدة
                    </button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5 text-center" id="stats">
        <Row>
          {stats.map((s, idx) => (
            <Col md={3} sm={6} key={idx} className="mb-4">
              <Card className="stats-card">
                <h3>
                  <CountUp end={s.number} duration={2} />
                </h3>
                <p>{s.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5" id="testimonials">
        <h2 className="text-center mb-4">آراء عملائنا</h2>
        <div className="testimonial">
          <p>“{testimonials[testimonialIndex].text}”</p>
          <h5>{testimonials[testimonialIndex].name}</h5>
        </div>
      </Container>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
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
              <p>{selectedProject.desc}</p>
            </Modal.Body>
          </>
        )}
      </Modal>

      <section className="py-5 team-section" id="about">
        <Container>
          <Row className="align-items-center">
            {/* الصورة على الشمال */}
            <Col md={6} className="text-center mb-4 mb-md-0">
              <img
                src="https://www.qeematech.net/wp-content/uploads/2024/04/traffic-img.png.webp"
                alt="Team Combined"
                className="team-img img-fluid"
              />
            </Col>

            {/* النص على اليمين */}
            <Col md={6}>
              <h2 className="team-title mb-4">
                Infuture - خبراؤنا وحلولنا الرقمية المبتكرة
              </h2>
              <ul className="team-list mb-4">
                <li>
                  شركة Digital Solutions مصرية متخصصة في تطوير البرمجيات وتصميم
                  المواقع والتطبيقات.
                </li>
                <li>
                  أكثر من 3 سنوات خبرة في تصميم تطبيقات iOS وAndroid عالية
                  الجودة.
                </li>
                <li>
                  تقديم حلول متكاملة للمتاجر الإلكترونية مع خيارات دفع وشحن ذكي.
                </li>
                <li>
                  خبرة واسعة في تقديم خدمات رقمية للشركات المحلية والدولية.
                </li>
                <li>
                  تكامل كامل مع بوابات الدفع الإلكتروني الحديثة لضمان سهولة
                  الاستخدام.
                </li>
                <li>
                  فريق متخصص في تطوير البرمجيات، المواقع، والتطبيقات مع التركيز
                  على تجربة المستخدم.
                </li>
                <li>
                  نقدم حلول مبتكرة وسريعة تناسب جميع أحجام الأعمال والمشاريع.
                </li>
                <li>
                  دورات تدريبية متخصصة لتطوير المهارات الرقمية وفهم البرمجة
                  الحديثة.
                </li>
                <li>
                  دعم متواصل وخدمة عملاء متميزة لكل مشروع من البداية حتى التسليم
                  النهائي.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
