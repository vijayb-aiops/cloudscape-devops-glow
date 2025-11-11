import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import MatrixRain from "@/components/MatrixRain";
import CursorEffect from "@/components/CursorEffect";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <MatrixRain />
      <CursorEffect />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
};

export default Index;
