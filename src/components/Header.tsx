import { Sun, Moon, Languages } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="font-heading text-lg font-bold text-primary md:text-xl">
          {isAr ? 'أذكار الصباح والمساء' : 'Morning & Evening Adhkar'}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            title={isAr ? 'English' : 'عربي'}
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
