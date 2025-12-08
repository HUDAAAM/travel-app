import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { isValidName, isValidEmail, isValidPassword, passwordsMatch } from "../Validation/userValidation";

export default function Register({ setUserId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    let tempErrors = {};

    if (!isValidName(name)) tempErrors.name = "Name is required";
    if (!isValidEmail(email)) tempErrors.email = "Invalid email";
    if (!isValidPassword(password))
      tempErrors.password = "Password must be at least 6 characters";
    if (!passwordsMatch(password, confirmPassword))
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      if (setUserId && res.data._id) {
        setUserId(res.data._id);
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors({
        api: err.response?.data?.message || "Registration failed. Try again.",
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Register</h1>

        <div className="login-card">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          {errors.name && <span className="login-error">{errors.name}</span>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          {errors.email && <span className="login-error">{errors.email}</span>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {errors.password && <span className="login-error">{errors.password}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
          />
          {errors.confirmPassword && (
            <span className="login-error">{errors.confirmPassword}</span>
          )}

          {errors.api && <span className="login-error">{errors.api}</span>}

          <button onClick={handleRegister} className="home-login-btn">
            Register
          </button>

          <p className="login-register-text">
            Already have an account?{" "}
            <Link to="/login" className="login-register-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
