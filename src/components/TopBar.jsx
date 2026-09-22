import React, { useState } from "react";

const TopBar = () => {
  const [lang, setLang] = useState("EN");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  return (
    <div className="website-topbar">
      <div className="container-fluid px-lg-4 px-xl-5">
        <div className="website-topbar-inner">

          {/* LEFT - CONTACT DETAILS */}
          <div className="website-contact-wrapper">

            {/* EMAIL */}
            <a
              href="mailto:info@perfectartcontracting.com"
              className="website-contact-item"
              aria-label="Email Perfect Art Contracting"
            >
              <span className="website-contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </span>

              <span className="website-contact-text">
                info@perfectartcontracting.com
              </span>
            </a>

            {/* PHONE */}
            <a
              href="tel:+966579797607"
              className="website-contact-item"
              aria-label="Call Perfect Art Contracting"
            >
              <span className="website-contact-icon">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>

              <span className="website-contact-text">
                +966 57 979 7607
              </span>
            </a>

          </div>

          {/* RIGHT - SOCIAL + LANGUAGE */}
          <div className="website-topbar-right">

            {/* SOCIAL LINKS */}
            <div className="website-social-links">

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/966579797607"
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