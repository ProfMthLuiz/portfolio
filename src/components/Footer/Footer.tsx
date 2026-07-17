import "./Footer.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

// Import Icons
import { FaCode } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer({ gsap }) {
  const footerRef = useRef<HTMLDivElement>(null);

  // Animação Footer Section
  useGSAP(
    () => {
      // Criamos uma timeline com gatilho automático (toggleActions) em vez de scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%", // Dispara quando o topo do rodapé estiver quase aparecendo
          toggleActions: "play none none reverse", // Dá play completo ao descer e reverte ao subir tudo
        },
      });

      // Animamos os 3 elementos em sequência rápida usando um tempo fixo automático
      tl.fromTo(
        ".footer-author-link",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      )
        .fromTo(
          ".footer-text-copyright",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5", // Começa 0.5 segundos antes da anterior terminar para ficar fluido
        )
        .fromTo(
          ".footer-social",
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5", // Também sobrepõe para criar um efeito de cascata lindo
        );
    },
    { scope: footerRef },
  );

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
