import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Car, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ServicesSectionProps {
  language: string;
}

export function ServicesSection({ language }: ServicesSectionProps) {
  const t = useTranslation(language as any);
  const isRTL = language === 'ar';

  const scrollToContact = (service: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = service;
        }
      }, 500);
    }
  };

  return (
    <section id="services" className={`py-20 bg-card ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="services-title">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="services-subtitle">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Single Lesson */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105" data-testid="service-single">
            <CardHeader className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">{t('services.single.title')}</CardTitle>
              <CardDescription>{t('services.single.description')}</CardDescription>
              <div className="text-3xl font-bold text-primary">€50</div>
              <div className="text-sm text-muted-foreground">{t('services.single.duration')}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.single.feature1')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.single.feature2')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.single.feature3')}</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => scrollToContact('single')}
                data-testid="book-single-lesson"
              >
                {t('services.single.cta')}
              </Button>
            </CardContent>
          </Card>

          {/* Complete Package */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-secondary border-2 relative" data-testid="service-package">
            <div className={`absolute -top-3 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}>
              <Badge className="bg-secondary text-secondary-foreground">{t('services.package.badge')}</Badge>
            </div>
            <CardHeader className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-xl font-semibold">{t('services.package.title')}</CardTitle>
              <CardDescription>{t('services.package.description')}</CardDescription>
              <div className="text-3xl font-bold text-secondary">€1000</div>
              <div className="text-sm text-muted-foreground">{t('services.package.duration')}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.package.feature1')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.package.feature2')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.package.feature3')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.package.feature4')}</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => scrollToContact('package')}
                data-testid="book-package"
              >
                {t('services.package.cta')}
              </Button>
            </CardContent>
          </Card>

          {/* Trial Lesson */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105" data-testid="service-trial">
            <CardHeader className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold">{t('services.trial.title')}</CardTitle>
              <CardDescription>{t('services.trial.description')}</CardDescription>
              <div className="text-3xl font-bold text-accent">€35</div>
              <div className="text-sm text-muted-foreground">{t('services.trial.duration')}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.trial.feature1')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.trial.feature2')}</span>
                </li>
                <li className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className={`w-5 h-5 text-accent ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{t('services.trial.feature3')}</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                onClick={() => scrollToContact('trial')}
                data-testid="book-trial-lesson"
              >
                {t('services.trial.cta')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
