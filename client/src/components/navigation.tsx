import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/lib/i18n";

interface NavigationProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const t = useTranslation(language as any);
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = language === 'ar';

  const navItems = [
    { href: "/", label: t('nav.home') },
    { href: "#services", label: t('nav.services') },
    { href: "#gallery", label: t('nav.gallery') },
    { href: "#contact", label: t('nav.contact') },
  ];

  if ((user as any)?.isAdmin) {
    navItems.push({ href: "/admin", label: t('nav.admin') });
  }

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className={`bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-primary cursor-pointer" data-testid="logo">
                Top Automaat Les
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  data-testid={`nav-${item.href.slice(1)}`}
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                      location === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid={`nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            ))}
          </div>

          {/* Language Switcher & Auth */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            
            {isAuthenticated ? (
              <Button variant="outline" asChild data-testid="logout-button">
                <a href="/api/logout">{t('logout.button')}</a>
              </Button>
            ) : (
              <Button variant="outline" asChild data-testid="login-button">
                <a href="/api/login">{t('login.button')}</a>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" data-testid="mobile-menu-button">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    item.href.startsWith('#') ? (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="text-left text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-base font-medium"
                        data-testid={`mobile-nav-${item.href.slice(1)}`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={`block transition-colors px-3 py-2 rounded-md text-base font-medium ${
                            location === item.href
                              ? 'text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                          onClick={() => setIsOpen(false)}
                          data-testid={`mobile-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    )
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
