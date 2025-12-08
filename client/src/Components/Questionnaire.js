import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarDrawer from "./SidebarDrawer";
import places from "../places";
import "../App.css";

export default function Questionnaire({ userId: propUserId, setUserId }) {
    const [answers, setAnswers] = useState({
        environment: "",
        activities: [],
        budget: "",
        travelStyle: "",
        season: "",
        tripType: "",
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const userId = propUserId || localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) navigate("/login");
    }, [userId, navigate]);

    const handleChange = (e, type) => {
        const name = e.target.name;
        const value = e.target.value;

        if (type === "checkbox") {
            const current = answers[name] || [];
            if (e.target.checked) {
                setAnswers({ ...answers, [name]: [...current, value] });
            } else {
                setAnswers({
                    ...answers,
                    [name]: current.filter((a) => a !== value),
                });
            }
        } else {
            setAnswers({ ...answers, [name]: value });
        }
    };

    const handleSubmit = () => {
        if (
            !answers.environment ||
            answers.activities.length === 0 ||
            !answers.budget ||
            !answers.travelStyle ||
            !answers.season ||
            !answers.tripType
        ) {
            alert("Please answer all questions!");
            return;
        }

        const envMap = {
            "Beach & Sea": "beach",
            "Mountains & Nature": "nature",
            "City Life": "city",
            "Desert & Warm Places": "beach",
        };

        const filteredPlaces = places.filter(
            (place) =>
                place.type.includes(envMap[answers.environment]) &&
                place.budget.toLowerCase() === answers.budget.toLowerCase()
        );

        if (filteredPlaces.length === 0) {
            alert("No suitable destination found!");
            return;
        }

        const selectedPlace = filteredPlaces[Math.floor(Math.random() * filteredPlaces.length)];

        navigate("/recommendation", {
            state: {
                userId,
                title: selectedPlace.name,
                description: `Enjoy a ${
                    answers.environment
                } trip with your ${answers.travelStyle.toLowerCase()} companion(s) on a ${answers.budget.toLowerCase()} budget. Activities: ${answers.activities.join(
                    ", "
                )}. Best time to go: ${answers.season}. Trip type preference: ${answers.tripType}.`,
                image: selectedPlace.image,
            },
        });
    };

    const questions = [
        {
            q: "1. What type of environment do you enjoy the most?",
            name: "environment",
            options: ["Beach & Sea", "Mountains & Nature", "City Life", "Desert & Warm Places"],
            type: "radio",
        },
        {
            q: "2. What kind of activities do you prefer?",
            name: "activities",
            options: [
                "Adventure & Hiking",
                "Relaxing & Spa",
                "Trying new food",
                "Visiting museums & culture",
                "Shopping",
            ],
            type: "checkbox",
        },
        {
            q: "3. What is your budget?",
            name: "budget",
            options: ["Low", "Medium", "High"],
            type: "radio",
        },
        {
            q: "4. What is your travel style?",
            name: "travelStyle",
            options: ["Solo", "Couple", "Family", "Friends"],
            type: "radio",
        },
        {
            q: "5. Which season do you prefer to travel in?",
            name: "season",
            options: ["Spring", "Summer", "Autumn", "Winter"],
            type: "radio",
        },
        {
            q: "6. Do you prefer relaxing trips or adventurous trips?",
            name: "tripType",
            options: ["Relaxing", "Adventurous", "Mixed"],
            type: "radio",
        },
    ];

    const currentQuestions = questions.slice(currentIndex, currentIndex + 3);

    const handlePrev = () => {
        if (currentIndex - 3 >= 0) {
            setCurrentIndex(currentIndex - 3);
        } else {
            setCurrentIndex(0);
        }
    };

    return (
        <div className="questionnaire-container-with-sidebar gradient-bg">
            <SidebarDrawer setUserId={setUserId} />

            <div className="questionnaire-content">
                <h1 className="home-title gradient-text">Let's Find Your Next Adventure!</h1>
                <p className="questionnaire-subtitle gradient-text">
                    Tell us what you love, and we'll find the perfect place for you
                </p>

                <div className="questionnaire-card">
                    {currentQuestions.map(({ q, name, options, type }) => (
                        <div key={name} className="question-block">
                            <h3 className="question gradient-text">{q}</h3>
                            <div className="options">
                                {options.map((opt) => (
                                    <label key={opt} className="option-label">
                                        <input
                                            type={type}
                                            name={name}
                                            value={opt}
                                            checked={
                                                type === "checkbox"
                                                    ? answers[name]?.includes(opt)
                                                    : answers[name] === opt
                                            }
                                            onChange={(e) => handleChange(e, type)}
                                        />{" "}
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="navigation-buttons">
                        {currentIndex > 0 ? (
                            <span className="previous-arrow" onClick={handlePrev}>
                                ← Previous
                            </span>
                        ) : (
                            <span className="previous-arrow-placeholder"></span>
                        )}

                        <button
                            onClick={() => {
                                if (currentIndex === 0) {
                                    setCurrentIndex(3); // مباشرة إلى السؤال 4
                                } else {
                                    handleSubmit(); // عند النهاية
                                }
                            }}
                            className="home-login-btn"
                        >
                            {currentIndex + 3 >= questions.length ? "Get My Destination" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
