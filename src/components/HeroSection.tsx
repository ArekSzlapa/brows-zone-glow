import { HeroButton } from "@/components/ui/hero-button";
import heroImage from "@/assets/hero-image.jpg";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional eyebrow shaping service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Idealne</span>{" "}
            <span className="text-foreground ">brwi</span>
            <br />
            <span className="text-foreground">za każdym razem</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Odmień swój wygląd dzięki profesjonalnemu modelowaniu, laminacji i
            stylizacji brwi. Odkryj sztukę perfekcyjnych brwi w Brows•Zone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <HeroButton
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="text-lg px-8 py-4"
            >
              Zarezerwuj wizyte
            </HeroButton>
            <HeroButton
              onClick={() => scrollToSection("services")}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Zobacz usługi
            </HeroButton>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
