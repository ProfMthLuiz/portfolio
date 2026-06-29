import "./App.css";
import "./css/Header.css";
import "./css/Skills.css";
import "./css/Hero.css";

import { skills } from "./skills";
import { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { TiArrowDownThick } from "react-icons/ti";

import avatar from "./assets/avatar.png";

import gsap from "gsap";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  const text = "EXPLORE - MORE - LET'S";
  const letters = text.split("");

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
      <header className="header" id="header">
        <nav className="nav container">
          <a href="/" className="nav__logo">
            Matheus Luiz.
          </a>

          <div className="nav__menu" id="nav-menu" ref={navMenuRef}>
            <ul className="nav__list">
              <li>
                <a href="#about" className="nav__link">
                  About
                </a>
              </li>
              <li>
                <a href="#technologies" className="nav__link">
                  Tecnologies
                </a>
              </li>
              <li>
                <a href="#projects" className="nav__link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="nav__link">
                  Experience
                </a>
              </li>
              <li>
                <a href="#certificates" className="nav__link">
                  Certificates
                </a>
              </li>
              <li>
                <a href="#contact" className="nav__link">
                  Contact
                </a>
              </li>
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

      <section className="hero section" id="hero">
        <div className="blob-small"></div>
        <div className="blob-small"></div>

        <div className="hero__container container grid">
          <div className="hero__data">
            <h3 className="hero__subtitle">Hi! I'm Matheus.</h3>
            <h1 className="hero__title">
              Full-Stack <span>Developer</span>{" "}
            </h1>
            <p className="hero__description">
              I create beautiful and functional web applications.
            </p>
          </div>
          <div className="hero__images">
            <div className="hero__box-1"></div>
            <div className="hero__box-2"></div>
            <div className="hero__box-3"></div>

            <img
              src={avatar}
              alt="Digital professional portrait"
              className="hero__img"
            />

            <div className="hero__circle">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  style={{
                    transform: `rotate(${index * (360 / letters.length)}deg)`,
                  }}
                  className="hero__text"
                >
                  {letter}
                </span>
              ))}
              <a href="#about" className="hero__arrow">
                <TiArrowDownThick />
              </a>
            </div>

            <div className="blog-big"></div>
          </div>
        </div>
      </section>

      <section className="about section" id="about"></section>

      <section className="technologies section" id="technologies"></section>
      <section className="projects section" id="projects"></section>
      <section className="experience section" id="experience"></section>
      <section className="certificates section" id="certificates"></section>
      <section className="contact section" id="contact"></section>

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
    </div>
  );
}

export default App;
