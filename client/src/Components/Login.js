import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { isValidEmail, isValidPassword } from "../Validation/userValidation";
import loginIllustration from "../Image/logo.png";

export default function Login({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    let tempErrors = {};
    if (!isValidEmail(email)) tempErrors.email = "Invalid email";
    if (!isValidPassword(password))
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const user = res.data;
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      if (setUserId) setUserId(user._id);

      navigate("/home-intro");
    } catch (err) {
      console.error(err);
      setErrors({
        api: err.response?.data?.message || "Login failed. Check your credentials.",
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img src={loginIllustration} alt="Login Illustration" className="login-img" />
        <h1 className="login-title">Welcome!</h1>

        <div className="login-card">
          <input
            type="email"
            placeholder="Your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          {errors.email && <span className="login-error">{errors.email}</span>}

          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {errors.password && <span className="login-error">{errors.password}</span>}

          {errors.api && <span className="login-error">{errors.api}</span>}

          <button onClick={handleLogin} className="home-login-btn">
            Sign In
          </button>

          <p className="login-register-text">
            Don't have an account?{" "}
            <Link to="/register" className="login-register-link">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
