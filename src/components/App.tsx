"use client";
import { LenisProvider } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import RevealObserver from "./ui/Reveal";

export default function App() {
  return (
    <>
      <LenisProvider />
      <RevealObserver />
      <Navigation />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
