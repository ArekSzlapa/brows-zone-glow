import { CarouselWithArrows } from "@/components/CarouselWithArrows";
import ExpandableImage from "@/components/ExpandableImage";
import { MediaLightbox } from "@/components/MediaLightbox";
import MutedPlayableVideo from "@/components/MutedPlayableVideo";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export const Gallery = () => {
  const [igPosts, setIgPosts] = useState(null);
  useEffect(() => {
    axios.get("/api/instagram/posts").then((res) => {
      setIgPosts(res.data);
    });
  }, []);
  return (
    <>
      <Navigation />
      <section className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground/80">Moje </span>
              <span className="text-primary bg-clip-text ">Posty</span>
            </h2>
          </div>

          {/* Three Separate Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {igPosts?.map((post) => (
              <Card key={post.id} className="...">
                <CardContent className="p-0 flex flex-col h-full">
                  <MediaLightbox post={post} />

                  <div className="p-6 flex flex-col flex-grow">
                    <p
                      className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow"
                      style={{ wordBreak: "break-word" }}
                    >
                      {post.caption}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
