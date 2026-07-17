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

import { FaArrowRightLong } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

import avatar from "./assets/images/avatar.png";

import { FluidCursor } from "./components/FluidCursor/FluidCursor";

import emailjs from "@emailjs/browser";
import ProjectSlider from "./components/ProjectSlider/ProjectSlider";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const navMenuRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // animation
  const aboutRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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

  // Animação Hero Section
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero__subtitle", {
      opacity: 0,
      y: 40,
      duration: 0.6,
    })
      .from(
        ".hero__title",
        {
          opacity: 0,
          x: -50,
          duration: 0.8,
        },
        "-=.3",
      )
      .from(".hero__description", {
        opacity: 0,
        y: 20,
      })
      .from(".hero__circle", {
        opacity: 0,
        scale: 0.8,
      });
  });

  // Animação About Section
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to([".about__box-1", ".blob-small"], {
        opacity: 1,
        x: -20,
        y: -10,
        rotate: -5,
        duration: 1,
      })

        .to(
          ".about__box-2",
          { opacity: 1, x: -10, y: -5, rotate: -2, duration: 1 },
          "-=0.5",
        )

        .to([".about__box-3", ".about__img"], {
          opacity: 1,
          y: 0,
          right: "-1.25rem",
          duration: 1.5,
          stagger: 0.2,
        })

        .to([".about__data"], {
          opacity: 1,
          left: 0,
          duration: 1.5,
          stagger: 0.2,
        })

        .to(
          [".social-link-linkedin", ".social-link-github"],
          {
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
          },
          "-=0.5",
        );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Animação Stack Section
  useGSAP(
    () => {
      // Garantimos que o elemento existe antes de animar
      if (!stackRef.current) return;

      gsap.fromTo(
        stackRef.current, // Passamos a referência direta ao invés da classe string
        {
          opacity: 0,
          y: 50, // Começa um pouco abaixo para dar um efeito sutil de subida
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    // Removemos o escopo aqui para evitar que o GSAP ignore a referência principal
  );

  // Animação Projects Section
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          end: "+=500",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".section__title",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );
      tl.fromTo(
        ".slider-section",
        {
          opacity: 0,
          y: 150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          y: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 2,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".swiper-pagination-bullets",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
      );
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  // Animação Contact Section
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 60%",
          end: "+=500",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".contact__status",
        {
          opacity: 0,
          x: -150,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
      );
      tl.fromTo(
        ".contact__title",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 2,
          ease: "power2.out",
        },
      );
      tl.fromTo(
        ".contact__description",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__detail:nth-child(1)",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__detail:nth-child(2)",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__detail:nth-child(3)",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__form",
        {
          opacity: 0,
          x: 150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 3,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__stack-title",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".contact__badges",
        {
          opacity: 0,
          x: -150, // Começa deslocado 150px para a esquerda
        },
        {
          opacity: 1,
          x: 0, // Vai para a posição original dele de forma ultra fluida
          duration: 1,
          ease: "power2.out",
        },
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

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
  ); // O hook já limpa e escopa tudo sozinho aqui!

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

      <section className="about " id="about" ref={aboutRef}>
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

      <section className="stack " id="stack" ref={stackRef}>
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

      <section className="projects" id="projects" ref={projectsRef}>
        <h2 className="section__title">Projetos</h2>
        <ProjectSlider />
      </section>

      <section className="contact" id="contact" ref={contactRef}>
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
    </div>
  );
}

export default App;
