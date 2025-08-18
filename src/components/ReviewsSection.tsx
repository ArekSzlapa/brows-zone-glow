import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import "./mediaQueryStyles.css";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Janina",
      location: "Klientka",
      rating: 5,
      text: "Byłam pod ogromnym wrażeniem dbałości o szczegóły podczas zabiegu. Precyzja i technika są naprawdę niesamowite!",
      service: "Laminacja brwi z koloryzacją",
    },
    {
      name: "Joanna Mąkosa",
      location: "Instruktor szkoleniowy",
      rating: 5,
      text: "[...] Pracujesz niesamowicie pewnie i samodzielnie. Masz super estetykę ❤️",
      // service: "Instruktor szkoleniowy",
    },
    {
      name: "Martyna",
      location: "Klientka",
      rating: 5,
      text: "Gorąco polecam pięknie brwi i rzęski. Profesjonalna obsługa z dużą wiedzą. Brwi i rzęsy trzymają się naprawdę bardzo długo co pozwala mi się długo nacieszyć naturalnym wyglądem. Napewno wrócę i to nie raz!",
      service: "Geometria brwi z koloryzacją",
    },
    {
      name: "Magdalena",
      location: "Klientka",
      rating: 5,
      text: "Rzęsy są pięknie podkręcone i przyciemnione, a efekt wygląda bardzo naturalnie. Zabieg był profesjonalny i komfortowy, a spojrzenie od razu zyskało wyrazistość, Ola zadbała o komfortową i luźną atmosfere :)",
      service: "Lifting rzęs z koloryzacją",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 mediaSmall">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground/80">Opinie o</span>{" "}
            <span className="bg-clip-text text-primary">Brows•Zone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Poznaj opinie klientek i instruktorów, którzy doświadczyli mojej
            pasji do pięknych brwi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/10 shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/80 mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground/80">
                      {review.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.location}
                    </div>
                  </div>
                  <div className="text-sm text-primary font-medium">
                    {review.service}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Gotowa aby zostać kolejną zadowoloną klientką?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
