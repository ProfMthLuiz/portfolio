import "./App.css";
import "./css/Header.css";
import "./css/Skills.css";
import "./css/Hero.css";
import "./css/About.css";
import "./css/Breakpoints.css";

import { skills } from "./skills";
import { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { TiArrowDownThick } from "react-icons/ti";

import { TypeAnimation } from "react-type-animation";

import avatar from "./assets/avatar.png";

import gsap from "gsap";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  const text = "EXPLORE - MORE - LET'S -";
  const letters = text.split("");

  useEffect(() => {
    const scrollHeader = () => {
      // No React, usamos window.scrollY diretamente em vez de "this.scrollY"
      if (window.scrollY >= 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Adiciona o listener quando o componente renderiza
    window.addEventListener("scroll", scrollHeader);

    // CRÍTICO: Limpa o listener quando o componente é desmontado
    // Isso evita vazamento de memória (memory leak)
    return () => {
      window.removeEventListener("scroll", scrollHeader);
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
      <header className={`header ${scrolled ? "scroll-header" : ""}`}>
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

      <section className="hero " id="hero">
        <div className="blob-small"></div>
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

              <a href="#about" className="hero__arrow">
                <TiArrowDownThick />
              </a>
            </div>

            <div className="blob-big"></div>
          </div>
        </div>
      </section>

      <section className="about " id="about">
        <div className="about__container container grid">
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

          <div className="about__image">
            <div className="blob-small"></div>
            <div className="about__shadow"></div>
            <img
              src={avatar}
              alt="Digital professional portrait"
              className="about__perfil"
            />
          </div>
        </div>
      </section>
      <section className="technologies " id="technologies"></section>
      <section className="projects " id="projects"></section>
      <section className="experience " id="experience"></section>
      <section className="certificates " id="certificates"></section>
      <section className="contact " id="contact"></section>

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
