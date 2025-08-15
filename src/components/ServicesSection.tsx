import { Card, CardContent } from "@/components/ui/card";
import serviceImage from "@/assets/Ola-2.jpeg";

const ServicesSection = () => {
  const services = [
    {
      title: "Geometria Brwi z koloryzacją",
      description: "Precyzyjne modelowanie włosków dla idealnego kształtu brwi",
      price: "40 zł",
    },
    {
      title: "Laminacja Brwi",
      description: "Stylizacja brwi dopasowana do rysów twarzy",
      price: "40 zł",
    },
    {
      title: "Lifting Rzęs",
      description: "Podkreślenie koloru i objętości rzęs.",
      price: "40 zł",
    },
    {
      title: "Laminacja Brwi i Rzęs",
      description:
        "trwałe podkreślenie, odżywienie i nadanie idealnego kształtu dla pełnego, naturalnego efektu",
      price: "70 zł",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Oferowane </span>
            <span className="bg-clip-text text-primary">Usługi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Profesjonalna stylizacja brwi, która podkreśli Twoje naturalne
            piękno – z precyzją i troską o każdy detal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {service.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={serviceImage}
                alt="Professional eyebrow threading service"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant border border-border/50">
              <div className="text-center">
                <div className="text-xl font-bold text-primary mb-1">Brwi</div>
                <div className="text-s text-muted-foreground">
                  {" "}
                  dopracowane do perfekcji
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
