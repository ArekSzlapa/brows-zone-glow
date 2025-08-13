import { HeroButton } from "@/components/ui/hero-button";

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{ wordBreak: "break-all" }}
          >
            <span className="text-foreground">Informacje o </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Brows•Zone
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            W Brows•Zone dbam o to, by Twoje brwi były perfekcyjnie dopasowane
            do Ciebie. Precyzja, estetyka i pasja sprawiają, że każda wizyta
            staje się wyjątkowym doświadczeniem, a efekt dodaje pewności siebie
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-foreground font-medium mb-2">
                Certyfikowanych Szkoleń
              </div>
              <div className="text-sm text-muted-foreground">
                Doskonalenie sztuki stylizacji brwi u najlepszych trenerów
                branży
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-foreground font-medium mb-2">
                Najlepszych Produktów
              </div>
              <div className="text-sm text-muted-foreground">
                Bezpieczne i delikatne, dla każdego rodzaju skóry
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-foreground font-medium mb-2">
                Rezerwacja wizyt
              </div>
              <div className="text-sm text-muted-foreground">
                Skontaktuj się ze mną, a dobierzemy dla Ciebie najdogodniejszy
                termin
              </div>
            </div>
          </div>

          <blockquote className="text-2xl italic text-foreground mb-8 font-light">
            "Każda klientka wychodzi pewniejsza siebie i piękniejsza. To cel
            Brows•Zone"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
