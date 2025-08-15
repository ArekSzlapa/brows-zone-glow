import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigation = (link) => {
    if (link.path) {
      navigate(link.path);
    } else if (location.pathname === "/") {
      scrollToSection(link.id);
    } else {
      navigate(`/#${link.id}`);
    }
  };

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div
              onClick={() =>
                location.pathname === "/" ? scrollToTop() : navigate("/")
              }
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span
                  style={{ display: "flex", justifyContent: "center" }}
                  className="text-primary-foreground font-bold"
                >
                  <img style={{ width: "70%" }} src={logo} />
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  Brows•Zone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Aleksandra Szłapa
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Z pasją, zaangażowaniem i pełnym oddaniem pomagam Ci osiągnąć
              wymarzone brwi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Odnośniki</h3>
            <div className="space-y-2">
              {[
                { name: "Usługi", path: "/services" },
                { name: "Metamorfozy", id: "transformations" },
                { name: "Opinie", id: "reviews" },
                { name: "O mnie", path: "/about" },
                { name: "Kontakt", id: "contact" },
                { name: "Zarezerwuj wizyte", id: "form" },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="block text-left text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Czaniec, Śląskie</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+48 516 170 052</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">asbrows.zone@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Śledź mnie w mediach społecznościowych:
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/szlapa.brows/#"
                  target="_blank"
                  className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  target="_blank"
                  href="https://facebook.com/share/16jnDEi78z/?mibextid=wwXlfr"
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
              © {currentYear} Brows•Zone. Dla Ciebie i Twoich brwi.
            </p>
            <p className="text-sm text-muted-foreground">
              Przeszkolona i certyfikowana • Gotowa, by Ci pomóc
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
