import { HeroButton } from "@/components/ui/hero-button";
import heroImage from "@/assets/hero_session.jpg";
import openBooksy from "@/helpers/BooksyBooking";

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
      {/* Full width background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional eyebrow shaping service"
          className="w-full h-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/70" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center lg:justify-start min-h-screen">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground/80">Podkreślam Twoje</span> <br />
              <span className="text-foreground/80">
                naturalne
                <span className=" text-primary"> piękno</span>
              </span>
            </h1>

            <p className="text-xl text-foreground/80 leading-relaxed">
              Odkryj sztukę perfekcyjnych brwi w Brows•Zone
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <HeroButton
                onClick={() => openBooksy()}
                size="lg"
                className="text-lg px-8 py-4"
              >
                Umów wizytę
              </HeroButton>
              <HeroButton
                onClick={() => (window.location.href = "tel:+48516170052")}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Zadzwoń 516 170 052
              </HeroButton>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block lg:left-1/4">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
