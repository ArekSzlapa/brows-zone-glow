import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/aboutme_session.jpg";
import { Link, Pointer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import openBooksy from "@/helpers/BooksyBooking";

const About = () => {
  const navigate = useNavigate();

  const scrollToForm = () => {
    navigate("/#form");
  };
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {/* <span className="text-foreground">Informacje o </span> */}
              <span className="bg-clip-text text-primary">Brows•Zone</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              W Brows•Zone dbam o to, by Twoje brwi były perfekcyjnie dopasowane
              do Ciebie. Precyzja, estetyka i pasja sprawiają, że każda wizyta
              staje się wyjątkowym doświadczeniem, a efekt dodaje pewności
              siebie.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-foreground/80 font-medium mb-2">
                    Certyfikowanych Szkoleń
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Doskonalenie sztuki stylizacji brwi u najlepszych trenerów
                    branży
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-foreground/80 font-medium mb-2">
                    Najlepszych Produktów
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Bezpieczne i delikatne, dla każdego rodzaju skóry
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-foreground/80 font-medium mb-2">
                    Rezerwacja wizyt
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => scrollToForm()}
                    >
                      Użyj formularza
                    </span>
                    , aby zarezerwować wizytę!
                  </div>
                </CardContent>
              </Card>
            </div>

            <blockquote className="text-2xl italic text-foreground/80 mb-12 font-light">
              "Każda klientka wychodzi pewniejsza siebie i piękniejsza."
              <br />
              To cel Brows•Zone
            </blockquote>
          </div>

          {/* About Image and Story */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <img
                src={aboutImage}
                alt="Professional eyebrow stylist at work"
                className="w-full h-96 object-cover rounded-2xl shadow-elegant"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground/80 mb-4">
                Moja historia
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Pasja do stylizacji brwi rozpoczęła się u mnie kilka lat temu,
                gdy zauważyłam, jak wielka różnica w wyglądzie może powstać
                dzięki odpowiednio dopasowanym brwiom. Od tego momentu
                poświęciłam się nauce i doskonaleniu tej sztuki.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ukończyłam kursy u najlepszych specjalistów w branży, zdobywając
                certyfikaty w zakresie laminacji brwi, liftingu rzęs oraz
                zaawansowanych technik stylizacji. Każda klientka jest dla mnie
                wyjątkowa i zasługuje na indywidualne podejście.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                W Brows•Zone używam wyłącznie najwyższej jakości produktów,
                bezpiecznych i delikatnych dla skóry. Moje zabiegi są wykonywane
                z najwyższą precyzją i dbałością o detale.
              </p>

              <HeroButton
                onClick={() => openBooksy()}
                size="lg"
                className="mt-6"
              >
                Umów się na wizytę
              </HeroButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
