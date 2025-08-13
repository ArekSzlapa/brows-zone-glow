import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="transformations">
        <BeforeAfterSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
};

export default Index;
