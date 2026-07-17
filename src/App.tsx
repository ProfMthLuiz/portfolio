import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FluidCursor } from "./components/FluidCursor/FluidCursor";

gsap.registerPlugin(ScrollTrigger);

import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import Footer from "./components/Footer/Footer";
import About from "./sections/About/About";
import Stack from "./sections/Stack/Stack";
import Contact from "./sections/Contact/Contact";

// Import CSS
import "./styles/Breakpoints.css";
import "./styles/index.css";

function App() {
  return (
    <>
      <FluidCursor />

      <Header />
      <Hero gsap={gsap} />
      <About gsap={gsap} />
      <Stack gsap={gsap} />
      <Contact gsap={gsap} />
      <Footer gsap={gsap} />
    </>
  );
}

export default App;
