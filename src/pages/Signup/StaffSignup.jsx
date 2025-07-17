"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export const StaffSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    empId: "",
    password: "", 
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("Poor");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameAlreadyExist, setUsernameAlreadyExists] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.password) {
      calculatePasswordStrength(formData.password);
    } else {
      setPasswordStrength(0);
      setPasswordStrengthText("Poor");
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
    setPasswordStrengthText(
      strength < 25 ? "Poor" : strength < 50 ? "Weak" : strength < 75 ? "Good" : "Strong"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Full name is required";
    if (!formData.empId) newErrors.empId = "empId is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Submitting data:", formData); // Debugging line

    if (validateForm()) {
        try {
            const response = await axios.post("https://test.mcetit.drmcetit.com/api/signup/teacher/", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            //console.log("Server Response:", response.data);
            alert("Data sent successfully!");
            navigate("/");
        } catch (error) {
            //console.error("Error sending data:", error.response?.data);
            alert("Error: " + (error.response?.data?.error || error.response?.data.register));

            if(error.response?.data.register)
            setUsernameAlreadyExists(true);
        }
    }
};


  return (
    <div className="auth-page mt-5">
      <Container>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col md={8} lg={6} xl={5}>
            <div className="auth-card p-md-5 p-1 border rounded-1">
              <div className="card-header text-center">
                <h4 className="mb-0">Create an Account</h4>
                <p className="text-muted">Join to access exclusive features</p>
              </div>

              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaUser /></InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your full name"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  

                  <Form.Group className="mb-3">
                    <Form.Label>Emp id</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                      <Form.Control
                        type="empId"
                        name="empId"
                        placeholder="MIT**"
                        value={formData.empId}
                        onChange={handleChange}
                        isInvalid={!!errors.empId}
                      />
                      <Form.Control.Feedback type="invalid">{errors.empId}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  { usernameAlreadyExist && <p className="m-0 text-danger fs-6">You'r college mail id has already register</p>}

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaLock /></InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </InputGroup>
                    <ProgressBar now={passwordStrength} variant={passwordStrengthText.toLowerCase()} style={{ height: "5px" }} />
                    <small className="text-muted">Password strength: {passwordStrengthText}</small>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaLock /></InputGroup.Text>
                      <Form.Control
                        type={showconfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Button variant="outline-secondary" onClick={() => setShowconfirmPassword(!showconfirmPassword)}>
                        {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </Form>
              </div>
            </div>
            {/* Back to Home */}
            <div className="text-center m1-4">
              <Link to="/" className="text-muted">
                <i className="fa fa-arrow-left me-1"></i> Back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

