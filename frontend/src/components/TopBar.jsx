import React, { useEffect, useState } from "react";

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TopBar = () => {
  const [lang, setLang] = useState("EN");

  const [contactInfo, setContactInfo] = useState({
    email: "info@perfectartcontracting.com",
    phone_primary: "+966 555 000 1234",
    whatsapp: "+966 555 111 2222",
    linkedin_url: "https://www.linkedin.com/",
  });

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await fetch(`${API_ORIGIN}/api/contact`);

        if (!response.ok) {
          throw new Error(`Contact API failed: ${response.status}`);
        }

        const result = await response.json();

        if (result?.success && result?.data) {
          setContactInfo((prev) => ({
            ...prev,
            ...result.data,
          }));
        }
      } catch (error) {
        console.error("Failed to load contact information:", error);
      }
    };

    loadContactInfo();
  }, []);

  const phoneNumber = contactInfo.phone_primary || "";
  const whatsappNumber = (contactInfo.whatsapp || "").replace(/\D/g, "");

  return (
    <div className="website-topbar">
      <div className="container-fluid px-lg-4 px-xl-5">
        <div className="website-topbar-inner">

          {/* LEFT - CONTACT DETAILS */}
          <div className="website-contact-wrapper">

            {/* EMAIL */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="website-contact-item"
              aria-label="Email Perfect Art Contracting"
            >
              <span className="website-contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </span>

              <span className="website-contact-text">
                {contactInfo.email}
              </span>
            </a>

            {/* PHONE */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="website-contact-item"
              aria-label="Call Perfect Art Contracting"
            >
              <span className="website-contact-icon">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>

              <span className="website-contact-text">
                {phoneNumber}
              </span>
            </a>

          </div>

          {/* RIGHT - SOCIAL + LANGUAGE */}
          <div className="website-topbar-right">

            {/* SOCIAL LINKS */}
            <div className="website-social-links">

              {/* LINKEDIN */}
              <a
                href={contactInfo.linkedin_url || "https://www.linkedin.com/"}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              {/* WHATSAPP */}
              <a
                href={
                  whatsappNumber
                    ? `https://wa.me/${whatsappNumber}`
                    : "#"
                }
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>

            </div>

            {/* LANGUAGE */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="website-language-btn"
              aria-label="Switch Language"
            >
              {lang === "EN" ? "AR / EN" : "EN / AR"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;