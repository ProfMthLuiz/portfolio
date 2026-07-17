import "./Footer.css";

import { useRef } from "react";

// Import Icons
import { FaCode } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="main-footer" ref={footerRef}>
      <div className="footer-container">
        <a
          href="https://www.linkedin.com/in/matheus-luiz99/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-author-link"
        >
          <FaCode />
          <span>Matheus Luiz</span>
        </a>

        <p className="footer-text-copyright">
          © 2026 <b>Matheus Luiz.</b> Construindo experiências, uma linha de
          código por vez.
        </p>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/matheus-luiz99/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ProfMthLuiz"
            className="footer-social-link"
            title="GitHub"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:mthluiz99@gmail.com"
            className="footer-social-link"
            title="E-mail"
            target="_blank"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </footer>
  );
}
