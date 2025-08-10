import { HeroButton } from "@/components/ui/hero-button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Get In </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your brows? Book your appointment today or contact 
            us for any questions about our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">123 Beauty Street, Downtown, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-BROW</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">Mon-Sat: 9AM-7PM, Sun: 10AM-5PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@browszone.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-border/30">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for Perfect Brows?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Book your appointment online 24/7 and discover why hundreds of clients 
                trust Brows Zone for their eyebrow needs. First-time clients receive 
                15% off all services!
              </p>
              
              <div className="space-y-4">
                <HeroButton size="lg" className="w-full text-lg py-4">
                  Book Now - 15% Off First Visit
                </HeroButton>
                <HeroButton variant="outline" size="lg" className="w-full text-lg py-4">
                  Call Us: (555) 123-BROW
                </HeroButton>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  Follow us on social media for beauty tips and special offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection