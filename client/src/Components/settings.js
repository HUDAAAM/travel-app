import React, { useState, useEffect } from "react";
import SidebarDrawer from "./SidebarDrawer";
import "../App.css";

export default function Settings({ setUserId }) {
  // استعادة القيم من localStorage أو استخدام القيم الافتراضية
  const savedTheme = localStorage.getItem("appTheme") || "Light";
  const savedLanguage = localStorage.getItem("appLanguage") || "English";

  const [theme, setTheme] = useState(savedTheme);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(savedLanguage);

  // تطبيق الثيم على body
  useEffect(() => {
    if (theme === "Dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");

    localStorage.setItem("appTheme", theme); // حفظ الثيم
  }, [theme]);

  // حفظ اللغة في localStorage
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  // ترجمات النصوص
  const texts = {
    English: {
      title: "Settings",
      appSettings: "App Settings",
      notifications: "Notifications",
      status: "Status",
      theme: "Theme",
      selectedTheme: "Selected Theme",
      language: "Language",
      selectedLanguage: "Selected Language",
    },
    Arabic: {
      title: "الإعدادات",
      appSettings: "إعدادات التطبيق",
      notifications: "الإشعارات",
      status: "الحالة",
      theme: "المظهر",
      selectedTheme: "المظهر المختار",
      language: "اللغة",
      selectedLanguage: "اللغة المختارة",
    },
    French: {
      title: "Paramètres",
      appSettings: "Paramètres de l'application",
      notifications: "Notifications",
      status: "Statut",
      theme: "Thème",
      selectedTheme: "Thème sélectionné",
      language: "Langue",
      selectedLanguage: "Langue sélectionnée",
    },
  };

  const t = texts[language];

  return (
    <div className="settings-container-with-sidebar">
      <SidebarDrawer setUserId={setUserId} />

      <div className="settings-content">
        <h1 className="page-title">{t.title}</h1>

        <div className="page-card">
          <h2>{t.appSettings}</h2>

          {/* Notifications */}
          <div className="settings-item">
            <div className="settings-row">
              <label>{t.notifications}</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            </div>
            <p className="settings-status">
              {t.status}: {notifications ? "On" : "Off"}
            </p>
          </div>

          {/* Theme */}
          <div className="settings-item">
            <div className="settings-row">
              <label>{t.theme}</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
            <p className="settings-status">
              {t.selectedTheme}: {theme}
            </p>
          </div>

          {/* Language */}
          <div className="settings-item">
            <div className="settings-row">
              <label>{t.language}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
              </select>
            </div>
            <p className="settings-status">
              {t.selectedLanguage}: {language}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
