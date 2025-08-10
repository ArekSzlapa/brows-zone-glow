import { HeroButton } from "@/components/ui/hero-button"

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">About </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Brows Zone
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            With over 8 years of experience in the beauty industry, Brows Zone is your 
            trusted destination for premium eyebrow services. We believe that perfect 
            brows are not just about beauty—they're about confidence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">8+</div>
              <div className="text-foreground font-medium mb-2">Years Experience</div>
              <div className="text-sm text-muted-foreground">
                Perfecting the art of eyebrow enhancement
              </div>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-foreground font-medium mb-2">Natural Products</div>
              <div className="text-sm text-muted-foreground">
                Safe, gentle treatments for all skin types
              </div>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/30">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-foreground font-medium mb-2">Online Booking</div>
              <div className="text-sm text-muted-foreground">
                Schedule your appointment anytime, anywhere
              </div>
            </div>
          </div>

          <blockquote className="text-2xl italic text-foreground mb-8 font-light">
            "Every client leaves feeling more confident and beautiful. 
            That's the Brows Zone promise."
          </blockquote>

          <HeroButton size="lg" className="px-8 py-4">
            Meet Our Team
          </HeroButton>
        </div>
      </div>
    </section>
  )
}

export default AboutSection