import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HeroButton } from "@/components/ui/hero-button"

// Import before/after images
import before1 from "@/assets/before-1.jpg"
import after1 from "@/assets/after-1.jpg"
import before2 from "@/assets/before-2.jpg"
import after2 from "@/assets/after-2.jpg"
import before3 from "@/assets/before-3.jpg"
import after3 from "@/assets/after-3.jpg"

const BeforeAfterSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAfter, setShowAfter] = useState(false)

  const transformations = [
    {
      before: before1,
      after: after1,
      service: "Eyebrow Threading & Shaping",
      description: "Complete transformation with precise threading and custom shaping"
    },
    {
      before: before2,
      after: after2,
      service: "Brow Restoration & Tinting",
      description: "Restored fullness with professional tinting and shaping"
    },
    {
      before: before3,
      after: after3,
      service: "Brow Lamination & Styling",
      description: "Sleek, groomed look with long-lasting lamination treatment"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length)
    setShowAfter(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length)
    setShowAfter(false)
  }

  const currentTransformation = transformations[currentSlide]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Amazing </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the incredible difference our expert brow services make. 
            Real clients, real results.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Image Slider */}
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={showAfter ? currentTransformation.after : currentTransformation.before}
                    alt={showAfter ? "After treatment" : "Before treatment"}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  />
                  
                  {/* Before/After Toggle */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full p-1 border border-border/50">
                      <div className="flex">
                        <button
                          onClick={() => setShowAfter(false)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            !showAfter 
                              ? 'bg-primary text-primary-foreground shadow-sm' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          Before
                        </button>
                        <button
                          onClick={() => setShowAfter(true)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            showAfter 
                              ? 'bg-primary text-primary-foreground shadow-sm' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          After
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex space-x-2">
                    {transformations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentSlide(index)
                          setShowAfter(false)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentSlide 
                            ? 'bg-primary w-6' 
                            : 'bg-background/60 hover:bg-background/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide Info */}
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentTransformation.service}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {currentTransformation.description}
                  </p>
                  
                  <HeroButton size="lg" className="animate-fade-in">
                    Book This Service
                  </HeroButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Transformations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterSection