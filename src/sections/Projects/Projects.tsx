import "./Projects.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import ProjectSlider from "../../components/ProjectSlider/ProjectSlider";

export default function Projects({ gsap }) {
  const projectsRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="projects" id="projects" ref={projectsRef}>
      <h2 className="section__title">Projetos</h2>
      <ProjectSlider />
    </section>
  );
}
