import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GallerySectionProps {
  language: string;
}

export function GallerySection({ language }: GallerySectionProps) {
  const t = useTranslation(language as any);
  const isRTL = language === 'ar';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: photos, isLoading } = useQuery({
    queryKey: ['/api/photos'],
  });

  return (
    <section id="gallery" className={`py-20 bg-muted/30 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="gallery-title">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="gallery-subtitle">
            {t('gallery.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-muted animate-pulse" />
              </Card>
            ))}
          </div>
        ) : photos && Array.isArray(photos) && photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(photos as any[]).map((photo: any) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" data-testid={`gallery-item-${photo.id}`}>
                    <CardContent className="p-0">
                      <img
                        src={photo.thumbnailUrl || photo.url}
                        alt={photo.originalName}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground truncate">{photo.originalName}</p>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  <img
                    src={photo.url}
                    alt={photo.originalName}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg" data-testid="gallery-empty">
              No photos available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
