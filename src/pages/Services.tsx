import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { HeroButton } from "@/components/ui/hero-button";
import serviceImage from "@/assets/Ola-2.jpeg";

const Services = () => {
  const navigate = useNavigate();

  const scrollToForm = () => {
    navigate("/#form");
  };
  const brwiServices = [
    { title: "Laminacja Brwi", time: "120 min", price: "40 zł" },
    { title: "Laminacja Brwi z Koloryzacją", time: "120 min", price: "50 zł" },
    { title: "Geometria Brwi z Koloryzacją", time: "120 min", price: "40 zł" },
  ];

  const rzesyServices = [
    { title: "Lifting Rzęs", time: "90 min", price: "40 zł" },
    { title: "Lifting Rzęs z Koloryzacją", time: "90 min", price: "50 zł" },
  ];

  const kombinowaneServices = [
    { title: "Laminacja Brwi i Rzęs", time: "120 min", price: "70 zł" },
    { title: "Laminacja Brwi i Rzęs z Koloryzacją", time: "120 min", price: "90 zł" },
  ];


  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Oferowane </span>
              <span className="bg-clip-text text-primary">Usługi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profesjonalna stylizacja brwi i rzęs, która podkreśli Twoje
              naturalne piękno – z precyzją i troską o każdy detal.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Services Card */}
            <div className="space-y-8">
              <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Brwi Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      Brwi
                    </h3>
                    <div className="space-y-4">
                      {brwiServices.map((service, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div className="flex-1">
                            <span className="font-semibold text-foreground">{service.title}</span>
                            <span className="text-muted-foreground ml-2">({service.time})</span>
                          </div>
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rzęsy Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      Rzęsy
                    </h3>
                    <div className="space-y-4">
                      {rzesyServices.map((service, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div className="flex-1">
                            <span className="font-semibold text-foreground">{service.title}</span>
                            <span className="text-muted-foreground ml-2">({service.time})</span>
                          </div>
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brwi i Rzęsy Section */}
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      Brwi i Rzęsy
                    </h3>
                    <div className="space-y-4">
                      {kombinowaneServices.map((service, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div className="flex-1">
                            <span className="font-semibold text-foreground">{service.title}</span>
                            <span className="text-muted-foreground ml-2">({service.time})</span>
                          </div>
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={serviceImage}
                  alt="Professional eyebrow and eyelash services"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Gotowa na metamorfozę?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Umów wizyte już dziś i przekonaj się o jakości naszych usług
                  </p>
                  <HeroButton onClick={scrollToForm} className="w-full sm:w-auto">
                    Zarezerwuj wizyte
                  </HeroButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
