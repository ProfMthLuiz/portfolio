import "./Hero.css";

// Import Icons
import { TiArrowDownThick } from "react-icons/ti";

import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const text = "EXPLORE - MORE - LET'S -";
  const letters = text.split("");

  return (
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
  );
}
