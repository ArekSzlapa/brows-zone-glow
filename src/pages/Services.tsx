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
    {
      title: "Laminacja Brwi",
      description:
        "Stylizacja brwi dopasowana do rysów twarzy, nadająca naturalny blask",
      price: "40 zł",
    },
    {
      title: "Laminacja Brwi z Koloryzacją",
      description: "Pełna stylizacja z dodaniem koloru dla wyrazistego efektu",
      price: "50 zł",
    },
    {
      title: "Geometria Brwi z Koloryzacją",
      description: "Precyzyjne modelowanie włosków dla idealnego kształtu brwi",
      price: "40 zł",
    },
  ];

  const rzesyServices = [
    {
      title: "Lifting Rzęs",
      description: "Podkreślenie naturalnej długości i objętości rzęs",
      price: "40 zł",
    },
    {
      title: "Lifting Rzęs z Koloryzacją",
      description:
        "Lifting z dodatkiem koloru dla bardziej wyrazistego spojrzenia",
      price: "50 zł",
    },
  ];

  const kombinowaneServices = [
    {
      title: "Laminacja Brwi i Rzęs",
      description:
        "Kompletny pakiet stylizacji brwi i rzęs dla harmonijnego efektu",
      price: "70 zł",
    },
    {
      title: "Laminacja Brwi i Rzęs z Koloryzacją",
      description:
        "Pełna stylizacja z koloryzacją dla maksymalnie wyrazistego efektu",
      price: "90 zł",
    },
  ];

  const ServiceSection = ({
    title,
    services,
    gradient,
  }: {
    title: string;
    services: typeof brwiServices;
    gradient: string;
  }) => (
    <div className="mb-16">
      <h3
        className={`text-3xl font-bold mb-8 text-center bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="border-0 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  {service.price}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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

          <div className="max-w-6xl mx-auto">
            <ServiceSection
              title="Brwi"
              services={brwiServices}
              gradient="from-primary to-primary/100"
            />

            <ServiceSection
              title="Rzęsy"
              services={rzesyServices}
              gradient="from-primary to-primary/100"
            />

            <ServiceSection
              title="Brwi i Rzęsy"
              services={kombinowaneServices}
              gradient="from-primary to-primary/100"
            />
          </div>

          {/* Image Section */}
          <div className="max-w-4xl mx-auto mt-20">
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
      </section>

      <Footer />
    </main>
  );
};

export default Services;
