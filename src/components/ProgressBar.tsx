import { useApp } from '@/contexts/AppContext';

interface Props {
  completed: number;
  total: number;
}

const ProgressBar = ({ completed, total }: Props) => {
  const { language } = useApp();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isAr = language === 'ar';

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm text-muted-foreground">
        <span>{isAr ? 'التقدم' : 'Progress'}</span>
        <span>{completed}/{total} ({pct}%)</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
