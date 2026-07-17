import "./Stack.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { skills } from "../../../constants/skills";

export default function Stack({ gsap }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

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

  const handleMouseEnter = () => {
    if (timelineRef.current) timelineRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) timelineRef.current.play();
  };

  return (
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
  );
}
