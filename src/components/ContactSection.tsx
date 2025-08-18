import { BookingForm } from "./booking/BookingForm";
import "./mediaQueryStyles.css";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="mx-auto px-6 mediaSmall">
        {/* Contact Form */}
        <div id="form">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground/80">Umów się na </span>
              <span className="bg-clip-text text-primary">wizytę</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
