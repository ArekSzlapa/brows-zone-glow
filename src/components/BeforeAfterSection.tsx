import { useState, useRef, useCallback } from "react"
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

interface InteractiveSliderProps {
  beforeImage: string
  afterImage: string
}

const InteractiveSlider = ({ beforeImage, afterImage }: InteractiveSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [isDragging])

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before Image (Right Side) */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before treatment"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* After Image (Left Side - Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="After treatment"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-background shadow-lg z-10 transition-all duration-75"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full shadow-lg border-2 border-primary cursor-grab flex items-center justify-center transition-all duration-200 ${
            isDragging ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-primary rounded-full"></div>
            <div className="w-0.5 h-4 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground">
        After
      </div>
      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground">
        Before
      </div>

      {/* Instruction Text */}
      {!isDragging && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-muted-foreground animate-fade-in">
          Drag to compare
        </div>
      )}
    </div>
  )
}

const BeforeAfterSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

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
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length)
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
            Real clients, real results. Drag the slider to compare!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Interactive Slider */}
              <div className="relative">
                <InteractiveSlider 
                  beforeImage={currentTransformation.before}
                  afterImage={currentTransformation.after}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex space-x-2">
                    {transformations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
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