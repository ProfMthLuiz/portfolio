import "./App.css";
import "./css/Header.css";
import "./css/Skills.css";
import "./css/Hero.css";
import "./css/About.css";
import "./css/Stack.css";
import "./css/Projects.css";
import "./css/Contact.css";
import "./css/Footer.css";
import "./css/Breakpoints.css";

import { FaReact, FaLaravel, FaNodeJs } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { skills } from "./skills";
import { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
import { TiArrowDownThick } from "react-icons/ti";

import { TypeAnimation } from "react-type-animation";

import avatar from "./assets/avatar.png";

import gsap from "gsap";
import { FluidCursor } from "./FluidCursor";
import GlassCard from "./GlassCard";

type SectionId = "hero" | "about" | "stack" | "projects" | "contact";

interface SectionData {
  id: SectionId;
  label: string;
}

const sectionsList: SectionData[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const navMenuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  const text = "EXPLORE - MORE - LET'S -";
  const letters = text.split("");

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Pegamos a largura total ocupada pelos elementos na tela
    const totalWidth = track.scrollWidth;

    // Como triplicamos a array [...skills, ...skills, ...skills],
    // o tamanho de uma única lista idêntica é exatamente 1/3 do total.
    const oneThirdWidth = totalWidth / 3;

    // Animamos usando pixels exatos baseados na matemática do componente
    timelineRef.current = gsap.to(track, {
      x: -oneThirdWidth, // Move exatamente a distância de uma lista completa
      repeat: -1,
      duration: 20, // Ajuste a velocidade aqui se achar necessário
      ease: "none",
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (timelineRef.current) timelineRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) timelineRef.current.play();
  };

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
    <div className="App">
      <FluidCursor />
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

      <section className="hero " id="hero">
        <div className="blob-small"></div>

        <div className="hero__container container grid">
          <div className="hero__data">
            <h3 className="hero__subtitle">Hi! I'm Matheus</h3>
            <h1 className="hero__title">
              Fullstack Developer & <br />
              <TypeAnimation
                sequence={[
                  "UI/UX Enthusiast.",
                  2000,
                  "Web Developer.",
                  2000,
                  "Problem Solver.",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </h1>
            <p className="hero__description">
              I create beautiful and functional web applications.
            </p>
          </div>

          <div className="hero__circle">
            <div className="hero__text">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  style={{
                    transform: `rotate(${index * (360 / letters.length)}deg)`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <a href="#technologies" className="hero__arrow">
              <TiArrowDownThick />
            </a>
          </div>
        </div>
      </section>

      <section className="about " id="about">
        <div className="about__container container grid">
          <div className="about__images">
            <div className="about__box-1"></div>
            <div className="about__box-2"></div>
            <div className="about__box-3"></div>

            <img
              src={avatar}
              alt="Digital professional portrait"
              className="about__img"
            />

            <div className="blob-small"></div>

            <a
              href="https://www.linkedin.com/in/matheus-luiz99/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-linkedin"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/ProfMthLuiz"
              className="social-link-github"
              title="GitHub"
              target="_blank"
            >
              <FaGithub />
            </a>
          </div>

          <div className="about__data">
            <h2 className="section__title">ABOUT ME</h2>
            <span className="about__subtitle">
              Creating modern experiences through code and creativity.
            </span>

            <p className="about__description">
              Sou um <b>Desenvolvedor Full Stack</b> apaixonado por transformar
              ideias em soluções digitais modernas, escaláveis e intuitivas.
              Minha principal stack é <b>React,</b> <b>TypeScript,</b>{" "}
              <b>Laravel</b> e <b>MySQL,</b> buscando sempre escrever código
              limpo, organizado e de fácil manutenção. Além de desenvolver
              aplicações, também atuo como professor, compartilhando
              conhecimento e incentivando novos desenvolvedores a evoluírem na
              área da tecnologia. Acredito que ensinar também é uma forma de
              aprender, e isso fortalece minha <b>comunicação,</b>{" "}
              <b>colaboração</b> e <b>capacidade de resolver problemas.</b>
            </p>
          </div>
        </div>
      </section>

      <section className="stack " id="stack">
        <h2 className="section__title">My Tech Stack</h2>
        <div className="slider">
          <div
            className="track"
            ref={trackRef} /* Atrelando a referência aqui */
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* TRIPLICAMOS a array aqui para garantir que sempre haja conteúdo preenchendo a tela */}
            {[...skills, ...skills, ...skills].map(
              ({ name, icon: Icon, color }, index) => (
                <div
                  className="skills"
                  key={`${name}-${index}`}
                  style={{ "--color": color } as React.CSSProperties}
                >
                  <Icon className="icon" />
                  <p>{name}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <h2 className="section__title">Projects</h2>

        <div className="card__projects">
          <div className="card__container container__projects">
            <GlassCard
              title="Frontend"
              description="React • TypeScript • Next.js"
              icon={<FaReact />}
              color="mint"
            />

            <GlassCard
              title="Backend"
              description="Laravel • PHP • MySQL"
              icon={<FaLaravel />}
              color="violet"
            />

            <GlassCard
              title="Mobile"
              description="React Native"
              icon={<FaNodeJs />}
              color="ocean"
            />

            <GlassCard
              title="Frontend"
              description="React • TypeScript • Next.js"
              icon={<FaReact />}
              color="mint"
            />

            <GlassCard
              title="Backend"
              description="Laravel • PHP • MySQL"
              icon={<FaLaravel />}
              color="violet"
            />

            <GlassCard
              title="Mobile"
              description="React Native"
              icon={<FaNodeJs />}
              color="ocean"
            />

            <GlassCard
              title="Frontend"
              description="React • TypeScript • Next.js"
              icon={<FaReact />}
              color="mint"
            />

            <GlassCard
              title="Backend"
              description="Laravel • PHP • MySQL"
              icon={<FaLaravel />}
              color="violet"
            />

            <GlassCard
              title="Mobile"
              description="React Native"
              icon={<FaNodeJs />}
              color="ocean"
            />
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__container">
          <header className="contact__header">
            <h2 className="contact__title">Let's Build Something</h2>

            <p className="contact__subtitle">
              Available for freelance opportunities and full-time technical
              leadership roles.
            </p>
          </header>

          <form className="contact__form">
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  className="contact__input"
                  placeholder="John Doe"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email" className="contact__label">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  className="contact__input"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                Message
              </label>

              <textarea
                id="message"
                className="contact__textarea"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button type="submit" className="contact__button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="main-footer">
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

          <div className="footer-text-wrapper">
            <p className="footer-text">
              <span className="footer-copyright">
                © 2026 <b>Matheus Luiz.</b> Building experiences, one line of
                code at a time.
              </span>
            </p>
          </div>

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
              href="#"
              className="footer-social-link"
              title="GitHub"
              target="_blank"
            >
              <MdEmail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
