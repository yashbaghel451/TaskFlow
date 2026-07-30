import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axiosApi";

const VerifyEmail = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);

        setStatus("success");
        setMessage(data.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "Email verification failed.",
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        {status === "verifying" && (
          <>
            <h1>Verifying Email... ⏳</h1>
            <p>Please wait while we verify your email address.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1>Email Verified Successfully! ✅</h1>

            <p>{message}</p>

            <Link to="/login" className="btn btn-primary full-width">
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1>Email Verification Failed ❌</h1>

            <p>{message}</p>

            <Link to="/login" className="btn btn-primary full-width">
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
