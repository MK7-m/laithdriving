import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface HeroSectionProps {
  language: string;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = useTranslation(language as any);
  const isRTL = language === 'ar';

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-16 pb-24 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all hover:scale-105"
              onClick={scrollToContact}
              data-testid="hero-book-lesson"
            >
              {t('hero.cta.primary')}
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold transition-all hover:scale-105 inline-flex items-center"
              asChild
              data-testid="hero-whatsapp"
            >
              <a href="https://wa.me/31614681863?text=Hi!%20I'm%20interested%20in%20driving%20lessons%20with%20Top%20Automaat%20Les">
                <svg className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.403"/>
                </svg>
                {t('hero.cta.whatsapp')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
