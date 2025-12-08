// src/ThemeLanguageContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeLanguageContext = createContext();

export const ThemeLanguageProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("appTheme") || "Light";
  const savedLanguage = localStorage.getItem("appLanguage") || "English";

  const [theme, setTheme] = useState(savedTheme);
  const [language, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    if (theme === "Dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");

    localStorage.setItem("appTheme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  return (
    <ThemeLanguageContext.Provider
      value={{ theme, setTheme, language, setLanguage }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};
