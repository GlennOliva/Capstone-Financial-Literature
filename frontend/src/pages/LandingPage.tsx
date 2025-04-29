import React, { useState } from "react";
import "../css/landing.css";
import {
  IoMenuOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoFacebook,
  IoChevronUpOutline,
} from "react-icons/io5";

import about_banner from "../assets/images/about-banner.png";
import bg from "../assets/images/bg.png";
import feature_1 from "../assets/images/feature-1.png";
import feature_2 from "../assets/images/feature-2.png";
import logo from "../assets/images/financial_logo.png";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div id="top">
      <header>
        <div className="container">
        <a href="#" className="inline-flex items-center space-x-2 text-xl font-semibold text-gray-800 hover:text-primary transition-colors">
  <img
    src={logo}
    alt="Funel logo"
    className="w-45 h-40 object-contain "
  />
</a>


          <div className="navbar-wrapper">
            <button
              className="navbar-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <IoMenuOutline size={24} />
            </button>

            <nav className={`navbar ${menuOpen ? "open" : ""}`}>
              <ul className="navbar-list">
                <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
                <li className="nav-item"><a href="#features" className="nav-link">Why us?</a></li>
              </ul>
              <Link className="btn btn-primary" to="/login">LOGIN</Link>
            </nav>
          </div>
        </div>
      </header>


      <main>
        <article>
          {/* HERO SECTION */}
          <section className="hero" id="home">
            <div className="container">
              <div className="hero-content">
                <h1 className="h1 hero-title">Your full-funnel growth agency</h1>
                <p className="hero-text">
                  Capture and retrieve your lists across devices to help you stay organized at work, home, and on the go.
                </p>
                <button className="btn btn-primary">Get started</button>
              </div>
              <div className="hero-banner"></div>
            </div>
            <img src={bg} alt="shape" className="shape-content" />
          </section>

        {/* ABOUT SECTION */}
<section className="about" id="about">
  <div className="container">
    <div className="about-top">
      <h2 className="h2 section-title">What We Can Offer</h2>
      <p className="section-text" style={{textAlign: 'justify'}}>
        Our finance platform is built to simplify your money management with AI-powered tools designed to help you budget, save, and invest smarter.
      </p>

      <ul className="about-list">
        {[
          {
            title: "Chatbot Finance Assistant",
            icon: "🤖",
            desc: "Ask questions, get insights, and receive instant financial advice with our intelligent chatbot."
          },
          {
            title: "Smart Budget Calculator",
            icon: "📊",
            desc: "Easily calculate, categorize, and track your monthly expenses and income to stay on top of your finances."
          },
          {
            title: "Investments & Savings Tools",
            icon: "💰",
            desc: "Plan your future with customizable investment goals and automated saving strategies."
          },
        ].map((item, index) => (
          <li key={index}>
            <div className="about-card">
              <div className="card-icon">{item.icon}</div>
              <h3 className="h3 card-title">{item.title}</h3>
              <p className="card-text">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="about-bottom">
      <figure className="about-bottom-banner">
        <img
          src={about_banner}
          alt="Finance App Overview"
          className="about-banner"
        />
      </figure>

      <div className="about-bottom-content">
        <h2 className="h2 section-title">Built for modern money management</h2>
        <p className="section-text">
          Whether you're budgeting for today or investing in your future, our platform provides the tools and guidance to help you reach your financial goals.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* FEATURES SECTION */}
<section className="features" id="features">
  <div className="container">
    <h2 className="h2 section-title">
      Our team is made up of all different backgrounds from all over the world.
    </h2>
    <p className="section-text" style={{ textAlign: 'justify' }}>
      Our platform combines intelligent automation with user-friendly design to guide you through every step of your financial journey. Whether you're tracking your daily expenses, chatting with our AI finance assistant, or planning for long-term goals like investments and savings, we provide the tools you need to make confident financial decisions—no spreadsheets or stress required.
    </p>

    <ul className="features-list">
      {[
        {
          title: "Cover your everyday expenses",
          img: feature_1,
          text: "Inspiration comes in many ways and you like to save everything from motivational quotes to investment tips—our tools make it easy to organize and act on your financial goals.",
        },
        {
          title: "Investment insights tailored for you",
          img: feature_2,
          text: "Access smart investment suggestions based on your goals, risk tolerance, and timeline—all with clear visual breakdowns and projections.",
        },
      ].map((feature, index) => (
        <li className="features-item" key={index}>
          <figure className="features-item-banner">
            <img src={feature.img} alt={`feature ${index + 1}`} />
          </figure>
          <div className="feature-item-content">
            <h3 className="h2 item-title">{feature.title}</h3>
            <p className="item-text">{feature.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

          
        </article>
      </main>

      {/* FOOTER */}
      (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src={logo}     className="w-45 h-40 object-contain " alt="Funel logo" />
            </a>

            <p className="footer-text">Follow us on</p>

            <ul className="social-list">
              <li>
                <a
                  href="https://github.com/codewithsadee"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <IoLogoGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/codewithsadee"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/c/codewithsadee"
                  className="social-link"
                  aria-label="YouTube"
                >
                  <IoLogoYoutube />
                </a>
              </li>
              <li>
                <a href="#" className="social-link" aria-label="Facebook">
                  <IoLogoFacebook />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-box">
            {[
              {
                title: "Company",
                links: ["About Us", "Features", "Pricing"],
              },
              {
                title: "Products",
                links: ["Blog", "Help Center", "Contact"],
              },
              {
                title: "Resources",
                links: ["FAQ’S", "Testimonial", "Terms & Conditions"],
              },
              {
                title: "Relevent",
                links: ["Why", "Products", "Customers"],
              },
            ].map((section, idx) => (
              <ul className="footer-link-list" key={idx}>
                <li>
                  <h3 className="h4 link-title">{section.title}</h3>
                </li>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; 2025 <a href="#">@E-Finance</a> All right reserved
        </p>
      </div>
    </footer>

      {/* BACK TO TOP */}
      <a href="#top" className="go-top active" aria-label="Back to top">
        <IoChevronUpOutline />
      </a>
    </div>
  );
};

export default LandingPage;
