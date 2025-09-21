import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { HeroButton } from "@/components/ui/hero-button";
import serviceImage from "@/assets/services_session.jpg";
import openBooksy from "@/helpers/BooksyBooking";

const Services = () => {
  const navigate = useNavigate();

  const scrollToForm = () => {
    navigate("/#form");
  };
  const brwiServices = [
    { title: "LAMINACJA BRWI • FARBKA • ODŻYWKA", price: "140,-" },
    { title: "LAMINACJA BRWI • ODŻYWKA", price: "120,-" },
    { title: "GEOMETRIA BRWI • FARBKA • ODŻYWKA", price: "70,-" },
    { title: "GEOMETRIA BRWI • ODŻYWKA", price: "50,-" },
    { title: "* W KAŻDEJ USŁUDZE REGULACJA BRWI *" },
  ];

  const rzesyServices = [
    { title: "LIFTING RZĘS • FARBKA • ODŻYWKA", price: "140,-" },
    { title: "LIFTING RZĘS • ODŻYWKA", price: "120,-" },
  ];

  const kombinowaneServices = [
    { title: "PAKIET LAMINACJI • FARBKA • ODŻYWKA", price: "250,-" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground/80">Oferowane </span>
              <span className="bg-clip-text text-primary">Usługi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profesjonalna stylizacja brwi i rzęs, która podkreśli Twoje
              naturalne piękno – z precyzją i troską o każdy detal.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Services Card */}
            <div className="h-full">
              <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  {/* Brwi Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      BROW BAR
                    </h3>
                    <div className="space-y-4">
                      {brwiServices.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex-1">
                            <span className="font-semibold text-foreground/80">
                              {service.title}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rzęsy Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      LASH BAR
                    </h3>
                    <div className="space-y-4">
                      {rzesyServices.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex-1">
                            <span className="font-semibold text-foreground/80">
                              {service.title}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brwi i Rzęsy Section */}
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4 border-b border-border/50 pb-2">
                      LASH & BROW BAR{" "}
                    </h3>
                    <div className="space-y-4">
                      {kombinowaneServices.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex-1">
                            <span className="font-semibold text-foreground/80">
                              {service.title}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Image with CTA Button */}
            <div className="flex flex-col h-full">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant flex-1">
                <img
                  src={serviceImage}
                  alt="Professional eyebrow and eyelash services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
            {/* Title spanning across both columns */}
          </div>
          <div className="mt-8">
            <h3 className="text-3xl font-bold text-foreground/80 text-center mb-3">
              Gotowa na metamorfozę?
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Umów wizytę już dziś i przekonaj się o jakości moich usług.
            </p>
            <div className="mt-6 text-center">
              <HeroButton
                onClick={() => openBooksy()}
                className="w-full sm:w-auto"
              >
                Zarezerwuj wizytę
              </HeroButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
