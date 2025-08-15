import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="transformations">
        <BeforeAfterSection />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
};

export default Index;
