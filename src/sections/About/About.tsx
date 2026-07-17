import "./About.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

// Import Icons
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// Import Image Avatar
import avatar from "../../assets/images/avatar.png";

export default function About({ gsap }) {
  const aboutRef = useRef<HTMLDivElement>(null);

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

  return (
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
            ideias em soluções digitais modernas, escaláveis e intuitivas. Minha
            principal stack é <b>React,</b> <b>TypeScript,</b> <b>Laravel</b> e{" "}
            <b>MySQL,</b> buscando sempre escrever código limpo, organizado e de
            fácil manutenção. Além de desenvolver aplicações, também atuo como
            professor, compartilhando conhecimento e incentivando novos
            desenvolvedores a evoluírem na área da tecnologia. Acredito que
            ensinar também é uma forma de aprender, e isso fortalece minha{" "}
            <b>comunicação,</b> <b>colaboração</b> e{" "}
            <b>capacidade de resolver problemas.</b>
          </p>
        </div>
      </div>
    </section>
  );
}
