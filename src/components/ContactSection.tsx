import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import "./mediaQueryStyles.css";

const ContactSection = () => {
  const callNumber = () => {
    window.location.href = "tel:+48516170052";
  };

  const openIG = () => {
    window.open(
      "https://instagram.com/direct/inbox/?recipient=szlapa.brows",
      "_blank"
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background ">
      <div className="mx-auto px-6 mediaSmall">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground" style={{ wordBreak: "keep-all" }}>
              Porozmawiajmy o{" "}
            </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent smallBlock">
              Twoich brwiach
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gotowa na metamorfozę swoich brwi? Umów się na wizytę już dziś lub
            skontaktuj się z nami, aby dowiedzieć się więcej o naszych usługach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Lokalizacja
                    </h3>
                    <p className="text-muted-foreground">
                      Czaniec, ul. Cisowa 3, 43-354
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Telefon
                    </h3>
                    <p className="text-muted-foreground">+48 516 170 052</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <p className="text-muted-foreground">
                      aleksandra.janos@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-border/30">
              <h3
                className="text-2xl font-bold text-foreground mb-4"
                style={{ wordBreak: "break-word" }}
              >
                Gotowa na perfekcyjne brwi?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Umów wizyte i przekonaj się sama, dlaczego klientki wybrały
                Brows•Zone w kwestii stylizacji brwi. Nowe klientki otrzymują
                10% zniżki na wszystkie usługi!
              </p>

              <div className="space-y-4">
                <HeroButton
                  onClick={() => openIG()}
                  size="lg"
                  className="w-full text-lg py-4 smallText"
                >
                  10% Zniżki na pierwszą wizyte
                </HeroButton>
                <HeroButton
                  onClick={() => callNumber()}
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-4 smallText"
                >
                  Zadzwoń: +48 516 170 052
                </HeroButton>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  Śledź mnie w mediach społecznościowych, aby otrzymywać porady
                  urodowe oraz wyjątkowe oferty!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
