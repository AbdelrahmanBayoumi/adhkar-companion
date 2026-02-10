import { useState } from 'react';
import { Check, Play, Pause, ChevronDown, RotateCcw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import type { AdhkarItem } from '@/types/adhkar';
import { cn } from '@/lib/utils';

interface Props {
  item: AdhkarItem;
  index: number;
  remainingCount: number;
  onDecrement: () => void;
  onReset: () => void;
}

const AdhkarCard = ({ item, index, remainingCount, onDecrement, onReset }: Props) => {
  const { language, playAudio, playingUrl } = useApp();
  const [fadlOpen, setFadlOpen] = useState(false);
  const isAr = language === 'ar';
  const completed = remainingCount <= 0;
  const isPlaying = playingUrl === item.audio;

  return (
    <article
      className={cn(
        'group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 md:p-6',
        completed && 'border-primary/40 bg-accent opacity-70'
      )}
    >
      {completed && (
        <div className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-5 w-5" />
        </div>
      )}

      {/* Order number */}
      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {index + 1}
      </span>

      {/* Arabic content */}
      <p className="mb-4 font-arabic text-xl leading-[2.2] text-foreground md:text-2xl" dir="rtl">
        {item.content}
      </p>

      {/* English details */}
      {!isAr && item.transliteration && (
        <p className="mb-2 text-sm italic text-muted-foreground" dir="ltr">
          {item.transliteration}
        </p>
      )}
      {!isAr && item.translation && (
        <p className="mb-4 text-sm leading-relaxed text-foreground/80" dir="ltr">
          {item.translation}
        </p>
      )}

      {/* Fadl accordion */}
      {item.fadl && (
        <div className="mb-3 border-t border-border pt-3">
          <button
            onClick={() => setFadlOpen(!fadlOpen)}
            className="flex w-full items-center justify-between text-sm font-medium text-primary"
          >
            <span>{isAr ? 'الفضل' : 'Virtue'}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', fadlOpen && 'rotate-180')} />
          </button>
          {fadlOpen && (
            <p className={cn('mt-2 text-sm leading-relaxed text-muted-foreground', isAr && 'font-arabic')} dir={isAr ? 'rtl' : 'ltr'}>
              {item.fadl}
            </p>
          )}
        </div>
      )}

      {/* Source */}
      {item.source && (
        <p className={cn('mb-4 text-xs text-muted-foreground/70', isAr && 'font-arabic')} dir={isAr ? 'rtl' : 'ltr'}>
          {item.source}
        </p>
      )}

      {/* Action area */}
      <div className="flex items-center gap-3">
        {/* Counter button */}
        <button
          onClick={onDecrement}
          disabled={completed}
          className={cn(
            'flex h-12 min-w-[80px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-all',
            completed
              ? 'cursor-default bg-primary text-primary-foreground'
              : 'bg-primary text-primary-foreground active:scale-95'
          )}
        >
          {completed ? (
            <Check className="h-5 w-5" />
          ) : (
            <span>{remainingCount}</span>
          )}
        </button>

        {/* Count description */}
        <span className="text-xs text-muted-foreground">
          {item.count_description}
        </span>

        <div className="flex-1" />

        {/* Reset */}
        {completed && (
          <button
            onClick={onReset}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            title={isAr ? 'إعادة' : 'Reset'}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        {/* Audio */}
        {item.audio && (
          <button
            onClick={() => playAudio(item.audio)}
            className="rounded-lg bg-secondary p-2.5 text-secondary-foreground hover:bg-secondary/80"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
        )}
      </div>
    </article>
  );
};

export default AdhkarCard;
