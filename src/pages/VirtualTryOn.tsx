import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, RotateCcw, Download, Palette, Eye } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const VirtualTryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedShape, setSelectedShape] = useState<string>("classic");
  const [selectedColor, setSelectedColor] = useState<string>("dark-brown");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const browShapes = [
    { id: "classic", name: "Classic", description: "Natural arch" },
    { id: "dramatic", name: "Dramatic", description: "High arch" },
    { id: "soft", name: "Soft", description: "Gentle curve" },
    { id: "straight", name: "Straight", description: "Minimal arch" },
  ];

  const browColors = [
    { id: "light-brown", name: "Light Brown", color: "#8B4513" },
    { id: "medium-brown", name: "Medium Brown", color: "#654321" },
    { id: "dark-brown", name: "Dark Brown", color: "#3C2414" },
    { id: "black", name: "Black", color: "#1C1C1C" },
    { id: "auburn", name: "Auburn", color: "#A0522D" },
    { id: "blonde", name: "Blonde", color: "#D2B48C" },
  ];

  useEffect(() => {
    return () => {
      if (isStreaming) {
        stopCamera();
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        toast.success("Kamera uruchomiona! Spróbuj różne kształty brwi.");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Nie można uzyskać dostępu do kamery. Sprawdź uprawnienia.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsTakingPhoto(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame
      ctx.drawImage(video, 0, 0);
      
      // Add brow overlay (simplified representation)
      ctx.strokeStyle = browColors.find(c => c.id === selectedColor)?.color || "#3C2414";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      
      // Draw simplified brow shapes based on selection
      const centerX = canvas.width / 2;
      const eyeY = canvas.height * 0.35;
      
      drawBrowShape(ctx, centerX - 80, eyeY, selectedShape, "left");
      drawBrowShape(ctx, centerX + 80, eyeY, selectedShape, "right");
      
      // Download the image
      const link = document.createElement("a");
      link.download = `virtual-tryion-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Zdjęcie zostało pobrane!");
    }
    
    setTimeout(() => setIsTakingPhoto(false), 500);
  };

  const drawBrowShape = (ctx: CanvasRenderingContext2D, startX: number, startY: number, shape: string, side: "left" | "right") => {
    const flipX = side === "right" ? -1 : 1;
    
    ctx.save();
    ctx.translate(startX, startY);
    ctx.scale(flipX, 1);
    
    ctx.beginPath();
    
    switch (shape) {
      case "classic":
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -8, 50, 0);
        ctx.quadraticCurveTo(30, 5, 0, 3);
        break;
      case "dramatic":
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -12, 50, 0);
        ctx.quadraticCurveTo(30, 6, 0, 4);
        break;
      case "soft":
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -5, 50, 0);
        ctx.quadraticCurveTo(30, 4, 0, 2);
        break;
      case "straight":
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -2, 50, 0);
        ctx.quadraticCurveTo(30, 3, 0, 2);
        break;
    }
    
    ctx.fill();
    ctx.restore();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              <Eye className="w-4 h-4 mr-2" />
              Virtual Try-On
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Wypróbuj kształt brwi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wykorzystaj naszą technologię AR, aby zobaczyć jak będziesz wyglądać z różnymi kształtami i kolorami brwi przed wizytą.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Camera View */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    {isStreaming ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <canvas
                          ref={canvasRef}
                          className="hidden"
                        />
                        <div className="absolute inset-0 pointer-events-none">
                          <svg
                            className="absolute inset-0 w-full h-full"
                            style={{ filter: `drop-shadow(2px 2px 4px rgba(0,0,0,0.3))` }}
                          >
                            {/* Left eyebrow overlay */}
                            <g transform={`translate(${240}, ${140})`}>
                              <path
                                d="M0,0 Q25,-8 50,0 Q30,5 0,3 Z"
                                fill={browColors.find(c => c.id === selectedColor)?.color}
                                opacity="0.8"
                              />
                            </g>
                            {/* Right eyebrow overlay */}
                            <g transform={`translate(${400}, ${140}) scale(-1,1)`}>
                              <path
                                d="M0,0 Q25,-8 50,0 Q30,5 0,3 Z"
                                fill={browColors.find(c => c.id === selectedColor)?.color}
                                opacity="0.8"
                              />
                            </g>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                          <p className="text-muted-foreground">Kliknij "Uruchom kamerę" aby rozpocząć</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {!isStreaming ? (
                      <Button onClick={startCamera} size="lg">
                        <Camera className="w-5 h-5 mr-2" />
                        Uruchom kamerę
                      </Button>
                    ) : (
                      <>
                        <Button onClick={capturePhoto} disabled={isTakingPhoto} size="lg">
                          <Download className="w-5 h-5 mr-2" />
                          {isTakingPhoto ? "Zapisywanie..." : "Pobierz zdjęcie"}
                        </Button>
                        <Button variant="outline" onClick={stopCamera} size="lg">
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Zatrzymaj
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Shape Selection */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-primary" />
                    Kształt brwi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {browShapes.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setSelectedShape(shape.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedShape === shape.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-medium">{shape.name}</div>
                        <div className="text-sm text-muted-foreground">{shape.description}</div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Color Selection */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-primary" />
                    Kolor brwi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {browColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          selectedColor === color.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-border/50"
                          style={{ backgroundColor: color.color }}
                        />
                        <div className="font-medium">{color.name}</div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Instructions */}
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Instrukcje</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Umieść się przed kamerą w dobrym oświetleniu</li>
                    <li>• Wybierz kształt i kolor brwi</li>
                    <li>• Sprawdź jak wyglądasz w lustrzance</li>
                    <li>• Pobierz zdjęcie aby pokazać je podczas wizyty</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default VirtualTryOn;