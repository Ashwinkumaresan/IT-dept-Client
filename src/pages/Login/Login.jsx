import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export const Login = ({ notify }) => {
  const [formData, setFormData] = useState({ collegeMail: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [sendNotify, setSendNotify] = useState(false)
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //console.log(formData)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, authenticate the user
      const loginResponse = await axios.post(
        "https://test.mcetit.drmcetit.com/api/login/student/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Server Response:", loginResponse.data);

      localStorage.setItem("access_token", loginResponse.data.access_token);
      localStorage.setItem("refresh_token", loginResponse.data.refresh_token);
      localStorage.setItem("CollegeMail", formData.collegeMail);
      localStorage.setItem("timestamp", new Date().getTime());

      console.log(loginResponse.data.access);
      console.log(loginResponse.data);

      navigate("/");
      setSendNotify(notify)
    } catch (error) {
      setError(true);
      console.error("Error response:", error.loginResponse?.data || error.loginResponse.data);
      console.error("Error sending data:", error.loginResponse?.data);
      console.log("Server loginResponse:", loginResponse.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col md={8} lg={6} xl={5}>
            <div className="auth-card p-md-5 p-1 border rounded-1">
              <div className="card-header text-center">
                <h4 className="mb-0">Welcome Back</h4>
                <p className="text-muted">Sign in to your account</p>
              </div>

              <div className="card-body">
                {error && <p className="text-danger text-center">Invalid college Mail ID or Password</p>}
                <Form onSubmit={handleSubmit}>
                  {/* collegeMail Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>College Mail</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="collegeMail"
                        placeholder="72762*bit***@mcet.in"
                        value={formData.collegeMail}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Label>Password</Form.Label>
                      <Link to="/forgotpassword-email" className="text-primary small">
                        Forgot Password?
                      </Link>
                    </div>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="toggle-password"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Sign In Button */}
                  <Button type="submit" variant="primary" className="w-100 mb-3" disabled={isSubmitting} onClick={sendNotify} >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              </div>

              {/* Sign Up Link */}
              <div className="card-footer text-center">
                <p className="mb-0">
                  Don't have an account? <Link to="/student-signup" className="text-primary">Sign Up</Link>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-4">
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
