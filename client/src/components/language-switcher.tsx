import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select value={currentLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-28" data-testid="language-switcher">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nl" data-testid="language-option-nl">🇳🇱 NL</SelectItem>
        <SelectItem value="en" data-testid="language-option-en">🇬🇧 EN</SelectItem>
        <SelectItem value="ar" data-testid="language-option-ar">🇸🇦 العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
