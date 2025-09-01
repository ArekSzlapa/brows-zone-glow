import { BookingForm } from "./booking/BookingForm";
import "./mediaQueryStyles.css";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="mx-auto px-6 mediaSmall">
        {/* Booking Form Section */}
        <div id="form">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground/80">Book your </span>
              <span className="bg-clip-text text-primary">appointment</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Fill out the form and book your appointment now!
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
