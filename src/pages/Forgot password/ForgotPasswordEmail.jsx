"use client"

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ForgotPasswordEmail = () => {
  const [collegeMail, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
  
    // Validate college email
    if (!collegeMail.trim()) {
      setEmailError("Email is required");
      return;
    }
  
    if (!collegeMail.endsWith(".in") && !collegeMail.includes("@mcet")) {
      setEmailError("Please enter a valid college email");
      return;
    }
  
    setEmailError("");
    setIsLoading(true);
  
    try {
      // Send request to backend
      const res = await axios.post(
        "https://test.mcetit.drmcetit.com/api/requestChange/",
        {collegeMail},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Server Response:", res.data);
  
      // Store email in sessionStorage to access it in the OTP page
      sessionStorage.setItem("resetEmail", collegeMail);
      navigate("/forgot-password/otp");
  
    } catch (error) {
      console.error("Forgot password error:", error);
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">Forgot Password</h4>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="bi bi-envelope-fill fs-1 text-muted"></i>
                <p className="mt-3">
                  Enter your college email address and we'll send you an OTP to reset your password.
                </p>
              </div>

              <form onSubmit={handleButtonSubmit}>
                <div className="mb-4">
                  <label htmlFor="collegeMail" className="form-label">
                    College Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    id="collegeMail"
                    placeholder="72762*bit***@mcet.in"
                    value={collegeMail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary py-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <p className="mb-0">
                Remember your password?{" "}
                <a href="/login" className="text-primary">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
