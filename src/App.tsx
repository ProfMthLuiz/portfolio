import "./App.css";
import { skills } from "./skills";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const timelineRef = useRef(null);
  const trackRef = useRef(null); // Ref adicionada para pegar a track diretamente

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

  return (
    <div className="App">
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
