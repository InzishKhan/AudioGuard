import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "./HomePage.css"; // Optional CSS for styling

import heroBackground from "../assets/img/VUI exploration.gif";
import introBackground from "../assets/img/square-purple-1.png";
import icon1 from "../assets/img/upload.svg";
import icon2 from "../assets/img/analysis.svg";
import icon3 from "../assets/img/eye-scanner.svg";

const HomePage = () => {
  const [dailyFact, setDailyFact] = useState("");
  const location = useLocation();

  // Fetch a daily fact from an API
  useEffect(() => {
    const fetchDailyFact = async () => {
      try {
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await response.json();
        setDailyFact(data.text);
      } catch (error) {
        console.error("Error fetching daily fact:", error);
        setDailyFact("Did you know? React is awesome!"); // Fallback fact
      }
    };

    fetchDailyFact();
  }, []);

  // Scroll to the "How It Works" section if the location state indicates it
  useEffect(() => {
    if (location.state?.scrollToAbout) {
      const aboutSection = document.getElementById("how-it-works");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="background-container">
          <img src={heroBackground} className="homepage-background-image" alt="Hero background" />
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="10" className="text-center">
              <h1 className="hero-title">Welcome to AudioGuard</h1>
              <p className="hero-subtitle">
                Your go-to platform for detecting fake audio scenes with AI-powered technology.
              </p>
              <div className="hero-buttons">
                <Button color="primary" tag={Link} to="/signup" className="hero-button">
                  Sign Up
                </Button>
                <Button color="secondary" tag={Link} to="/learn-more" className="hero-button">
                  Upload Audio
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Introduction Section */}
      <div className="intro-section" id="how-it-works"> 
        <div className="background-container">
          <img src={introBackground} className="homepage-background-image" alt="Intro background" />
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="10">
              <h2 className="section-title">How It Works</h2>
              <div className="intro-icons">
                <div className="intro-icon">
                  <img src={icon1} alt="Upload Audio" />
                  <h4>Upload Audio</h4>
                  <p>Upload your audio file in seconds.</p>
                </div>
                <div className="intro-icon">
                  <img src={icon2} alt="Analyze" />
                  <h4>Analyze</h4>
                  <p>Our AI analyzes the audio for authenticity.</p>
                </div>
                <div className="intro-icon">
                  <img src={icon3} alt="Get Results" />
                  <h4>Get Results</h4>
                  <p>Receive detailed detection results instantly.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  
        {/* Call-to-Action Section (Moved Up) */}
        <section className="cta-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8" md="10" className="text-center">
                <h2 className="section-title">Ready to Get Started?</h2>
                <p className="section-text">
                  Sign up now to upload an audio file and see your detection results in real-time.
                </p>
                <Button color="primary" tag={Link} to="/signup" className="cta-button">
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
  
        {/* Daily Fact Section (Moved Down) */}
        <section className="fact-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8" md="10">
                <Card className="fact-card">
                  <CardBody>
                    <CardTitle tag="h3" className="fact-title">
                      Daily Fact
                    </CardTitle>
                    <CardText className="fact-text">{dailyFact}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
  
        {/* Footer Section */}
        <footer className="footer-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8" md="10" className="text-center">
                <h3 className="footer-title">Contact Us</h3>
                <p className="footer-text">
                  Have questions or feedback? Reach out to us at{" "}
                  <a href="mailto:creator@scenefake.com" className="footer-link">
                    creator@scenefake.com
                  </a>
                  .
                </p>
                <p className="footer-text">
                  Check out our GitHub repository for more details:{" "}
                  <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  };
  
  export default HomePage;
  