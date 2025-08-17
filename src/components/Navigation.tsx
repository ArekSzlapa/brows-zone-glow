import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { HeroButton } from "./ui/hero-button";
import logo from "../assets/logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsMobileMenuOpen(false); // Close mobile menu on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const nav = document.querySelector('nav');
        if (nav && !nav.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle hash-based scrolling when navigating from other pages
  useEffect(() => {
    if (location.hash && location.pathname === "/") {
      setTimeout(() => {
        scrollToSection(location.hash.substring(1));
      }, 100);
    }
  }, [location]);

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
    setIsMobileMenuOpen(false);
  };

  const goToHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  const goToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (link) => {
    if (link.path) {
      goToPage(link.path);
    } else if (location.pathname === "/") {
      scrollToSection(link.id);
    } else {
      navigate(`/#${link.id}`);
    }
  };

  const handleBooking = () => {
    if (location.pathname === "/") {
      scrollToSection("form");
    } else {
      navigate("/#form");
    }
  };

  const navLinks = [
    { name: "Usługi", path: "/services" },
    { name: "Metamorfozy", id: "transformations" },
    { name: "Opinie", id: "reviews" },
    { name: "O mnie", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={goToHome}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span
                style={{ display: "flex", justifyContent: "center" }}
                className="text-primary-foreground font-bold text-lg"
              >
                <img style={{ width: "70%" }} src={logo} />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                Brows•Zone
              </span>
              <p className="text-sm text-muted-foreground">Aleksandra Szłapa</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path || link.id}
                onClick={() => handleNavigation(link)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Social Icons & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <a
                style={{ display: "flex", alignItems: "center" }}
                href="https://facebook.com/share/16jnDEi78z/?mibextid=wwXlfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 text-foreground/60 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                style={{ display: "flex", alignItems: "center" }}
                href="https://instagram.com/szlapa.brows/#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 text-foreground/60 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* CTA Button */}
            <HeroButton size="default" onClick={handleBooking}>
              Umów wizyte
            </HeroButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 bg-card/95 backdrop-blur-md rounded-lg p-4 shadow-elegant">
            {navLinks.map((link) => (
              <button
                key={link.path || link.id}
                onClick={() => handleNavigation(link)}
                className="text-left text-foreground/80 hover:text-primary transition-colors duration-300 font-medium py-2 border-b border-border/30 last:border-b-0"
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center space-x-6 py-3 border-b border-border/30">
              <a
                href="https://facebook.com/share/16jnDEi78z/?mibextid=wwXlfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/szlapa.brows/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <HeroButton
              size="default"
              className="w-full mt-4"
              onClick={handleBooking}
            >
              Umów wizyte
            </HeroButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
