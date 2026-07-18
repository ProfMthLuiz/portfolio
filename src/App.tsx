import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FluidCursor } from "./components/FluidCursor/FluidCursor";

gsap.registerPlugin(ScrollTrigger);

import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Stack from "./sections/Stack/Stack";
import Projects from "./sections/Projects/Projects";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Import CSS
import "./styles/Breakpoints.css";
import "./styles/index.css";

function App() {
  return (
    <>
      <FluidCursor />

      <Header />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
