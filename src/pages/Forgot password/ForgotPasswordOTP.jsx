import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export const ForgotPasswordOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")
  const [timer, setTimer] = useState(() => {
    // Get the timer value from localStorage if available, otherwise set to 300 seconds (5 minutes)
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? JSON.parse(savedTimer) : 300; // Default to 300 seconds (5 minutes)
  });
  const [canResend, setCanResend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const collegeMail = sessionStorage.getItem('resetEmail');
  const navigate = useNavigate()

  // References for OTP inputs
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  // Get email from session storage
  const email = sessionStorage.getItem("resetEmail")

  // Redirect to email page if no email is found
  useEffect(() => {
    if (!email) {
      navigate("/forgotpassword-email")
    }
  }, [email, navigate])



  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('timer', JSON.stringify(newTimer)); // Save the updated timer to localStorage
          return newTimer;
        });
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };



// Handle OTP input (allows both numbers and characters)
const handleOtpChange = (index, value) => {
  // Allow only the first character if value contains more than 1 character
  if (value.length > 1) {
    value = value.slice(0, 1);
  }

  // Optional: You can add validation to restrict to a specific set of characters (e.g., only alphanumeric)
  // if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
  //   return;
  // }

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // Auto-focus next input if a value is entered
  if (value && index < otp.length - 1) {
    inputRefs[index + 1].current.focus();
  }
}

// Handle key down for backspace and navigation
const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs[index - 1].current.focus();
  }
  // Optional: You can handle other keys here if needed
};


  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if ((e.key === "F5") || (e.ctrlKey && e.key === "r")) {
  //       e.preventDefault();
  //       alert("Page reload is disabled.");
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);


  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpError("");
    setIsLoading(true);

    try {
      // Send request to backend for OTP verification
      const res = await axios.post(
        "https://test.mcetit.drmcetit.com/api/OtpVerification/",
        { otp, collegeMail },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      ////console.log("Server Response:", res.data);

      // Store OTP verification status
      sessionStorage.setItem("otpVerified", otp);

      // Navigate to password reset page
      navigate("/forgot-password/reset");

    } catch (error) {
      //console.error("OTP verification error:", error);
      //console.log(otp)
      setOtpError("Invalid OTP or verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // Resend OTP
  const resendOtp = async (e) => {
    e.preventDefault();

    if (canResend) {
      try {
        // Reset OTP fields
        setOtp(["", "", "", "", "", ""]);

        // Reset timer
        setTimer(300);
        setCanResend(false);

        // Focus first input
        inputRefs[0].current.focus();

        // API call to request a new OTP
        const res = await axios.post(
          "https://test.mcetit.drmcetit.com/api/requestChange/",
          { collegeMail },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        //console.log("Server Response:", res.data);

        // Alert user
        alert(`A new OTP has been sent to ${email}`);

        // Continue to OTP verification flow
        handleVerifyOtp();

      } catch (error) {
        //console.error("Forgot password error:", error);
      }
    }
  };


  // Mask email for privacy
  const maskEmail = (email) => {
    if (!email) return ""
    const [username, domain] = email.split("@")
    const maskedUsername = username.charAt(0) + "*".repeat(username.length - 4) + username.charAt(username.length - 3) + username.charAt(username.length - 2) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">Enter OTP</h4>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="bi bi-shield-lock-fill fs-1 text-muted"></i>
                <p className="mt-3">
                  We've sent a 6-digit OTP to <strong>{maskEmail(email)}</strong>
                </p>
                <p className="alert alert-info">
                Check your inbox or junk or spam folder for the OTP.
                </p>
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div className="mb-4">
                  <label className="form-label">Enter 6-digit OTP</label>
                  <div className="d-flex gap-2 justify-content-between mt-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        className="form-control text-center"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        style={{ width: "3rem" }}
                        required
                      />
                    ))}
                  </div>
                  {otpError && <div className="text-danger small mt-2">{otpError}</div>}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-muted small">{!canResend ? `Resend OTP in ${formatTime(timer)}` : ""}</span>
                  <button type="button" className="btn btn-link p-0" onClick={resendOtp} disabled={!canResend}>
                    Resend OTP
                  </button>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary py-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <p className="mb-0">
                <Link to="/forgotpassword-email" className="text-primary">
                  <i className="bi bi-arrow-left me-1"></i> Back to Email
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
