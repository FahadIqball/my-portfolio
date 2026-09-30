import PageTransition from "@/components/ui/PageTransition";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fahad Iqbal",
    "jobTitle": "React Native Developer",
    "url": "https://fahadiqbal.dev",
    "sameAs": [
      "https://github.com/FahadIqball",
      "https://linkedin.com/in/fadyyy"
    ],
    "email": "fahadiqbalaps@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rahim Yar Khan",
      "addressCountry": "Pakistan"
    }
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </PageTransition>
  );
}
