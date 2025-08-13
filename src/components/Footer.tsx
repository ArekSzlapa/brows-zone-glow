import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">B</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Brows Zone</h3>
                <p className="text-sm text-muted-foreground">Beauty Studio</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Just starting my journey in the beauty industry with passion, dedication, 
              and a commitment to helping you achieve your perfect brows.
            </p>
            <div className="flex items-center space-x-2 text-primary">
              <Heart className="w-4 h-4 fill-primary" />
              <span className="text-sm font-medium">Made with love and ambition</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "Services", href: "#services" },
                { name: "Sample Results", href: "#transformations" },
                { name: "About Me", href: "#about" },
                { name: "Book Appointment", href: "#contact" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Downtown Beauty District</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">(555) 123-BROW</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">hello@browszone.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Follow my journey:</p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Brows Zone. Starting fresh with big dreams.
            </p>
            <p className="text-sm text-muted-foreground">
              New to the industry • Trained & Certified • Ready to serve you
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;