import "./Contact.css";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

// Import icons
import { HiBadgeCheck } from "react-icons/hi";
import { MdQuestionAnswer } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser, FaPencilAlt } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { ImSpinner6 } from "react-icons/im";
import { GrSend } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

import emailjs from "@emailjs/browser";
import { allSkills } from "../../../constants/skills";

export default function Contact({ gsap }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
            Atualmente estou disponível para projetos freelance. Me conte sobre
            a sua ideia e eu entrarei em contato.
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
            <span className="contact__stack-title">Tecnologias Utilizadas</span>

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
            <p className="contact__success">Mensagem enviada com sucesso! 🎉</p>
          )}

          <button
            type="submit"
            className={loading ? "contact__button-loading" : "contact__button"}
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
            Suas informações estão seguras. Eu nunca compartilharei seus dados.
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
  );
}
