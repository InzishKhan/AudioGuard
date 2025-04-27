import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import { FaStar } from "react-icons/fa";
import signImg from "../assets/img/download.gif"; // Import the background GIF
import "./FeedbackPage.css"; 

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    const feedback = {
      rating,
      comment,
    };
    // Simulate sending feedback to an email (for demo purposes)
    const mailtoLink = `mailto:sample@email.com?subject=Feedback&body=Rating: ${feedback.rating} stars%0D%0AComment: ${feedback.comment}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="feedback-page">
      {/* Background GIF */}
      <div className="feedback-background-container">
        <img src={signImg} className="feedback-background-image" alt="Background" />
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="feedback-card shadow-lg">
              <CardBody>
                <CardTitle className="text-center mb-4">Feedback</CardTitle>
                <div className="text-center mb-4">
                  <h6>Rate your experience:</h6>
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`star ${index < rating ? "active" : ""}`}
                        onClick={() => handleRatingClick(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <Button color="primary" onClick={handleSubmit}>
                    Submit Feedback
                  </Button>
                </div>
                <p className="text-muted text-center mt-3">
                  For more queries, email us at{" "}
                  <a href="mailto:sample@email.com">sample@email.com</a>.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedbackPage;