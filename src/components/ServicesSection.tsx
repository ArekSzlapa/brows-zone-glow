import { Card, CardContent } from "@/components/ui/card"
import serviceImage from "@/assets/service-image.jpg"

const ServicesSection = () => {
  const services = [
    {
      title: "Eyebrow Threading",
      description: "Precision hair removal technique for perfectly shaped brows",
      price: "From $25"
    },
    {
      title: "Brow Shaping & Styling",
      description: "Custom brow design tailored to your facial features",
      price: "From $35"
    },
    {
      title: "Brow Tinting",
      description: "Semi-permanent color enhancement for fuller-looking brows",
      price: "From $30"
    },
    {
      title: "Brow Lamination",
      description: "Long-lasting treatment for sleek, groomed brows",
      price: "From $45"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Our </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional eyebrow services designed to enhance your natural beauty 
            with precision and care.
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
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection