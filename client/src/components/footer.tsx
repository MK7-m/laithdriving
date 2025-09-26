import { useTranslation } from "@/lib/i18n";
import { Mail, MessageSquare } from "lucide-react";

interface FooterProps {
  language: string;
}

export function Footer({ language }: FooterProps) {
  const t = useTranslation(language as any);
  const isRTL = language === 'ar';

  return (
    <footer className={`bg-foreground text-background py-12 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Top Automaat Les</h3>
            <p className="text-background/80 mb-4" data-testid="footer-description">
              {t('footer.description')}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <a href="https://wa.me/31614681863" className="text-background/80 hover:text-background transition-colors" data-testid="footer-whatsapp">
                <MessageSquare className="w-6 h-6" />
              </a>
              <a href="mailto:Laithrazzak@gmail.com" className="text-background/80 hover:text-background transition-colors" data-testid="footer-email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.services.title')}</h4>
            <ul className="space-y-2 text-background/80">
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-background transition-colors">{t('footer.services.single')}</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-background transition-colors">{t('footer.services.package')}</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-background transition-colors">{t('footer.services.trial')}</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-background transition-colors">{t('footer.services.exam')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact.title')}</h4>
            <div className="space-y-2 text-background/80">
              <p>
                <a href="mailto:Laithrazzak@gmail.com" className="hover:text-background transition-colors">
                  Laithrazzak@gmail.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/31614681863" className="hover:text-background transition-colors">
                  +31 6 14681863
                </a>
              </p>
              <p className="text-sm">{t('footer.contact.hours')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p dangerouslySetInnerHTML={{ __html: t('footer.copyright') }} data-testid="footer-copyright" />
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}>
        <a
          href="https://wa.me/31614681863?text=Hi!%20I'm%20interested%20in%20driving%20lessons%20with%20Top%20Automaat%20Les"
          className="bg-accent hover:bg-accent/90 text-accent-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
          title="Contact us on WhatsApp"
          data-testid="floating-whatsapp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
