import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import "./mediaQueryStyles.css";

// Import before/after images
import before1 from "@/assets/before-1.jpeg";
import after1 from "@/assets/after-1.jpeg";
import before2 from "@/assets/before-2.jpeg";
import after2 from "@/assets/after-2.jpeg";
import before3 from "@/assets/before-6.jpeg";
import after3 from "@/assets/after-6.jpeg";

interface InteractiveSliderProps {
  beforeImage: string;
  afterImage: string;
}

const InteractiveSlider = ({
  beforeImage,
  afterImage,
}: InteractiveSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isHolding, setIsHolding] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate slider with ping-pong effect
  useEffect(() => {
    if (isHolding) return; // pause animation when holding

    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        let next = prev + direction;
        if (next >= 100) {
          next = 100;
          setDirection(-1);
        } else if (next <= 0) {
          next = 0;
          setDirection(1);
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isHolding, direction]);

  const handleHoldStart = useCallback(() => setIsHolding(true), []);
  const handleHoldEnd = useCallback(() => setIsHolding(false), []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isHolding || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isHolding]
  );

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) =>
    handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleHoldEnd}
      onMouseDown={handleHoldStart}
      onTouchStart={handleHoldStart}
      onContextMenu={(e) => e.preventDefault()} // disable right-click
    >
      {/* Before Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {sliderPosition > 50 && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground/80">
          Przed
        </div>
      )}
      {sliderPosition < 50 && (
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground/80">
          Po
        </div>
      )}

      {/* Slider line & handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full border border-gray-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

const BeforeAfterSection = () => {
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

  const transformations = [
    {
      before: before1,
      after: after1,
      service: "Geometria brwi z koloryzacja",
      description:
        "Precyzyjne wyznaczenie kształtu i trwała koloryzacją dla idealnie dopasowanych brwi",
      price: "40 zł",
      duration: "60 min",
    },
    {
      before: before2,
      after: after2,
      service: "Laminacja brwi z koloryzacją",
      description:
        "Utrwalenie kształtu i koloru brwi dla pełnego, zadbanego wyglądu",
      price: "50 zł ",
      duration: "90 min",
    },
    {
      before: before3,
      after: after3,
      service: "Lifting rzęs z koloryzacją",
      description:
        "Podkręcenie i przyciemnienie rzęs dla naturalnie wyrazistego spojrzenia",
      price: "50 zł",
      duration: "90 min",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground/80">Wykonane </span>
            <span className="text-primary bg-clip-text ">Metamorfozy</span>
          </h2>
        </div>

        {/* Three Separate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {transformations.map((transformation, index) => (
            <Card
              key={index}
              className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full"
            >
              <CardContent className="p-0 flex flex-col h-full">
                {/* Interactive Slider */}
                <div className="relative">
                  <InteractiveSlider
                    beforeImage={transformation.after}
                    afterImage={transformation.before}
                  />
                </div>

                {/* Service Info - Flex grow to fill available space */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground/80 mb-2">
                    {transformation.service}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow">
                    {transformation.description}
                  </p>
                  {/* 
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-md font-bold text-primary">
                        {transformation.price}
                      </span>
                      <span className="text-md text-muted-foreground ml-2">
                        • {transformation.duration}
                      </span>
                    </div>
                  </div> */}

                  {/* Button positioned at bottom */}
                  {/* <HeroButton
                    onClick={() => scrollToSection("form")}
                    size="default"
                    className="w-full mt-auto"
                  >
                    Zarezerwuj wizyte
                  </HeroButton>  */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
