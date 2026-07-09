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

import {
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaArrowRightLong,
} from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";

import { ImSpinner6 } from "react-icons/im";

import { FaUser, FaPencilAlt } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

import { skills, allSkills } from "./skills";
import { useEffect, useRef, useState } from "react";

import { LuMessageSquareText } from "react-icons/lu";

import { IoMdClose } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdMenuOpen, MdEmail } from "react-icons/md";
import { TiArrowDownThick } from "react-icons/ti";
import { HiBadgeCheck } from "react-icons/hi";
import { GiPadlock } from "react-icons/gi";

import { TypeAnimation } from "react-type-animation";

import avatar from "./assets/avatar.png";

import gsap from "gsap";
import { FluidCursor } from "./FluidCursor";
import GlassCard from "./GlassCard";

import emailjs from "@emailjs/browser";
import ProjectSlider from "./components/TravelSlider/ProjectSlider";

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

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const navMenuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setMessage(true);
        formRef.current?.reset();

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar a mensagem, tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
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
        <div className="hero__container container grid">
          <div className="hero__data">
            <h3 className="hero__subtitle">Olá, eu sou o Matheus</h3>
            <h1 className="hero__title">
              Desenvolvedor Full Stack & <br />
              <TypeAnimation
                sequence={[
                  "Criando experiências digitais.",
                  2000,
                  "Transformando ideias em soluções.",
                  2000,
                  "Construindo aplicações modernas.",
                  2000,
                  "Sempre aprendendo e evoluindo.",
                  2000,
                ]}
                wrapper="span"
                cursor
                repeat={Infinity}
              />
            </h1>
            <p className="hero__description">
              Transformo ideias em aplicações web modernas, responsivas e
              intuitivas.
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
            <h2 className="section__title">SOBRE MIM</h2>
            <span className="about__subtitle">
              Criando experiências modernas através de código e criatividade.
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

      <section className="projects" id="projects">
        <h2 className="section__title">Projetos</h2>

        <div className="card__projects">
          <div className="card__container container__projects">
            <GlassCard
              title="Frontend"
              description="React • TypeScript • Next.js"
              icon={<FaReact />}
              color="mint"
              href="https://github.com/ProfMthLuiz"
            />

            <GlassCard
              title="Backend"
              description="Laravel • PHP • MySQL"
              icon={<FaLaravel />}
              color="violet"
              href="https://github.com/ProfMthLuiz"
            />

            <GlassCard
              title="Mobile"
              description="React Native"
              icon={<FaNodeJs />}
              color="ocean"
              href="https://github.com/ProfMthLuiz"
            />

            <GlassCard
              title="Frontend"
              description="React • TypeScript • Next.js"
              icon={<FaReact />}
              color="mint"
              href="https://github.com/ProfMthLuiz"
            />

            <GlassCard
              title="Backend"
              description="Laravel • PHP • MySQL"
              icon={<FaLaravel />}
              color="violet"
              href="https://github.com/ProfMthLuiz"
            />
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__status">
              <HiBadgeCheck />
              <span>Disponível para novos projetos</span>
            </div>

            <h2 className="contact__title">
              Vamos
              <br />
              <span>Construir</span>
              <br />
              Algo Juntos.
            </h2>

            <p className="contact__description">
              Atualmente estou disponível para projetos freelance. Me conte
              sobre a sua ideia e eu entrarei em contato.
            </p>

            <ul className="contact__details">
              <li className="contact__detail">
                <MdQuestionAnswer />
                <span>
                  Costumo responder em até <b>24 horas.</b>
                </span>
              </li>

              <li className="contact__detail">
                <FaLocationDot />
                <span>
                  Atuando do <b>Brasil</b>
                </span>
              </li>

              <li className="contact__detail">
                <MdEmail />
                <span>
                  <b>mthluiz99@gmail.com</b>
                </span>
              </li>
            </ul>

            <div className="contact__stack">
              <span className="contact__stack-title">
                Tecnologias Utilizadas
              </span>

              <div className="contact__badges">
                {allSkills.map(({ name, icon: Icon, color, width }, index) => (
                  <span
                    className="contact__badge"
                    key={`${name}-${index}`}
                    style={
                      {
                        "--color": color,
                        "--badge-width": width,
                      } as React.CSSProperties
                    }
                  >
                    <Icon className="contact__badge-icon " />
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="contact__circles">
              <div className="circle-outer">
                <div className="circle-mid">
                  <div className="circle-inner"></div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact__form" ref={formRef} onSubmit={sendEmail}>
            <div className="contact__row">
              <div className="contact__field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact__input"
                  required
                />
                <label htmlFor="name" className="contact__label">
                  <FaUser /> Nome
                </label>
              </div>

              <div className="contact__field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact__input"
                  required
                />
                <label htmlFor="email" className="contact__label">
                  <MdEmail />
                  E-mail
                </label>
              </div>
            </div>

            <div className="contact__field">
              <input
                type="text"
                id="subject"
                name="subject"
                className="contact__input"
                required
              />

              <label htmlFor="subject" className="contact__label">
                <FaPencilAlt />
                Assunto
              </label>
            </div>

            <div className="contact__field">
              <textarea
                id="message"
                name="message"
                className="contact__textarea"
                required
              ></textarea>

              <label htmlFor="message" className="contact__label">
                <LuMessageSquareText />
                Mensagem
              </label>
            </div>

            {message && (
              <p className="contact__success">
                Mensagem enviada com sucesso! 🎉
              </p>
            )}

            <button
              type="submit"
              className={
                loading ? "contact__button-loading" : "contact__button"
              }
              disabled={loading}
            >
              {loading ? (
                <>
                  <ImSpinner6 className="contact__spinner" />
                  <span className="contact__button-text">Sending...</span>
                </>
              ) : (
                <>
                  <GrSend />
                  <span className="contact__button-text">Send Message</span>
                  <FaArrowRightLong />
                </>
              )}
            </button>

            <p className="contact__privacy">
              <GiPadlock />
              Suas informações estão seguras. Eu nunca compartilharei seus
              dados.
            </p>
          </form>
        </div>
        <div className="contact__circles">
          <div className="circle-outer">
            <div className="circle-mid">
              <div className="circle-inner"></div>
            </div>
          </div>
        </div>
        <div className="dot-matrix"></div>
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

      <ProjectSlider />
    </div>
  );
}

export default App;
