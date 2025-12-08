import React, { useState } from "react";
import SidebarDrawer from "./SidebarDrawer";
import "../App.css";

export default function Help({ setUserId }) {

  // FAQ state
  const [faqs, setFaqs] = useState([
    { question: "How to use the app?", answer: "Simply navigate through the menus and follow instructions.", open: false },
    { question: "How to reset password?", answer: "Go to Login → Forgot Password, then follow the steps.", open: false },
    { question: "Contact support", answer: "Email us at 56s19102@utas.edu.om", open: false },
  ]);

  // Contact form
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, open: !faq.open } : faq
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    setSubmitted(true);
    setMessage("");
    alert("Your message has been sent to support!");
  };

  return (
    <div className="help-container-with-sidebar">
      <SidebarDrawer setUserId={setUserId} />

      <div className="help-content">
        <h1 className="page-title">Help</h1>

        <div className="page-card">

          {/* FAQs */}
          <h2>FAQs</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <p
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                {faq.question} {faq.open ? "▲" : "▼"}
              </p>

              {faq.open && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}

          {/* Contact Support */}
          <h2>Contact Support</h2>
          <form onSubmit={handleSubmit} className="help-form">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows="4"
              required
            ></textarea>

            <button type="submit">Send Message</button>

            {submitted && (
              <p className="success-msg">Message sent successfully!</p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
