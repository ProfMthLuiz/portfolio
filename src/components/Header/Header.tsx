import "./Header.css";

import { useState, useRef, useEffect } from "react";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";

type SectionId = "hero" | "about" | "stack" | "projects" | "contact";

interface SectionData {
  id: SectionId;
  label: string;
}

const sectionsList: SectionData[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      sectionsList.forEach(({ id }) => {
        const section = document.getElementById(id);

        if (section) {
          const top = section.offsetTop - 50; // Distância do topo (offset de 50px)
          const height = section.offsetHeight; // Altura da seção

          // Verifica se o scroll atual está dentro dos limites da seção
          if (scrollY > top && scrollY <= top + height) {
            setActiveSection(id);
          }
        }
      });
    };

    // Adiciona o ouvinte de evento ao montar o componente
    window.addEventListener("scroll", handleScroll);

    // CRUCIAL: Remove o ouvinte ao desmontar para evitar vazamento de memória
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    if (!navMenuRef.current) return;

    gsap.to(navMenuRef.current, {
      right: isMenuOpen ? "-120%" : "0%",
      duration: 0.5,
      ease: "power3.inOut",
    });

    setIsMenuOpen((prev) => !prev);
  };
  return (
    <header className="header">
      <nav className="nav container">
        <a href="/" className="nav__logo">
          Matheus Luiz.
        </a>

        <div className="nav__menu" id="nav-menu" ref={navMenuRef}>
          <ul className="nav__list">
            {sectionsList.map(({ id, label }) => (
              <li className="nav__item" key={id}>
                <a
                  href={`#${id}`}
                  className={`nav__link ${activeSection === id ? "active-link" : ""}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Close */}
          <button
            className="nav__close"
            id="nav-close"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <IoMdClose />
          </button>
        </div>

        {/* Toggle */}
        <button
          className="nav__toggle"
          id="nav-toggle"
          aria-label="Togglew menu"
          onClick={toggleMenu}
        >
          <MdMenuOpen />
        </button>
      </nav>
    </header>
  );
}
