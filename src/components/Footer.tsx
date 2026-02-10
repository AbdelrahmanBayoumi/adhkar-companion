import { Github } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Footer = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <footer className="border-t border-border bg-card/60 py-6 text-center text-sm text-muted-foreground">
      <p className="mb-2">
        {isAr
          ? 'قاعدة بيانات مفتوحة المصدر لأذكار الصباح والمساء'
          : 'An open-source database for Morning and Evening Adhkar.'}
      </p>
      <a
        href="https://github.com/Seen-Arabic/Morning-And-Evening-Adhkar-DB"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:underline"
      >
        <Github className="h-4 w-4" />
        GitHub
      </a>
      <p className="mt-1 text-xs opacity-60">MIT License</p>
    </footer>
  );
};

export default Footer;
