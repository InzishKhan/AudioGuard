import React, { useState } from "react";
import signImg from "../assets/img/download.gif"; // adjust path as needed

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import "./SignupPage.css"; 

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup Successful!");
  };

  return (
    <div className="signup-page-wrapper">
      {}
      <div className="background-container">
      <img src={signImg} className="signup-background-image" alt="Signup background" />

      </div>

      <div className="section section-signup content-overlay mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="card-register glassmorphism">
                <CardHeader>
                  <CardTitle tag="h4">Sign Up</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" required /> I agree to the terms and conditions.
                      </Label>
                    </FormGroup>
                    <Button color="primary" block type="submit">
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="text-center">
                  <p>
                    Already have an account? <Link to="/login">Login here</Link>
                  </p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SignupPage;
