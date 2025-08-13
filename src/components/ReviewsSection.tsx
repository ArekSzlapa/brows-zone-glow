import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah M.",
      location: "Training Partner",
      rating: 5,
      text: "I was so impressed with the attention to detail during our training sessions. The precision and technique are amazing!",
      service: "Practice Session"
    },
    {
      name: "Jessica L.",
      location: "Friend",
      rating: 5,
      text: "She did my brows for a special event and I felt so confident! The shaping was perfect and lasted beautifully.",
      service: "Eyebrow Shaping"
    },
    {
      name: "Maria C.",
      location: "Family Member",
      rating: 5,
      text: "Professional, gentle, and so talented! I'm excited to see her business grow - she has such a natural gift.",
      service: "Brow Threading"
    },
    {
      name: "Ashley D.",
      location: "Training Instructor",
      rating: 5,
      text: "One of my most dedicated students. Shows exceptional skill and passion for the craft. Clients will love her work!",
      service: "Professional Training"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">What People</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from training partners, friends, and instructors who've experienced my passion for beautiful brows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-card/50 border-primary/10 shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-foreground mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>
                
                {/* Reviewer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.location}</div>
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
          <p className="text-lg text-muted-foreground mb-6">
            Ready to be my next happy client?
          </p>
          <div className="inline-flex items-center space-x-2 text-primary">
            <Star className="w-5 h-5 fill-primary" />
            <span className="font-semibold">Let's create your perfect brows together!</span>
            <Star className="w-5 h-5 fill-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;