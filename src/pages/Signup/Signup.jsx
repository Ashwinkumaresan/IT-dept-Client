"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    collegeMail: "",
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
    if (!formData.collegeMail) newErrors.collegeMail = "collegeMail is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData); // Debugging line

    if (validateForm()) {
        try {
            const response = await axios.post("https://test.mcetit.drmcetit.com/api/signup/student/", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log("Server Response:", response.data);
            alert("Account Created");
            navigate("/");
        } catch (error) {
            console.error("Error sending data:", error.response?.data);
            notify(error.response?.data?.error || error.response?.data.register);

            if(error.response?.data.register)
            setUsernameAlreadyExists(true);
        }
    }
};

const notify = (obj) => {
  toast.warn(obj, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
};


  return (
    <div className="auth-page mt-5">
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
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
                    <Form.Label>College Mail</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                      <Form.Control
                        type="collegeMail"
                        name="collegeMail"
                        placeholder="72762*bit***@mcet.in"
                        value={formData.collegeMail}
                        onChange={handleChange}
                        isInvalid={!!errors.collegeMail}
                      />
                      <Form.Control.Feedback type="invalid">{errors.collegeMail}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

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

export default Signup;