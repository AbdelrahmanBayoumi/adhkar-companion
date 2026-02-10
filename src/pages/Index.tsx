import { useState, useMemo, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdhkarCard from '@/components/AdhkarCard';
import ProgressBar from '@/components/ProgressBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import type { AdhkarItem, TabType } from '@/types/adhkar';

import arData from '@/data/ar.json';
import enData from '@/data/en.json';

const Index = () => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [tab, setTab] = useState<TabType>('morning');
  const [counters, setCounters] = useState<Record<string, number>>({});

  const data: AdhkarItem[] = isAr ? arData : enData;

  const morningItems = useMemo(() => data.filter(i => i.type === 0 || i.type === 1), [data]);
  const eveningItems = useMemo(() => data.filter(i => i.type === 0 || i.type === 2), [data]);
  const items = tab === 'morning' ? morningItems : eveningItems;

  const getKey = (item: AdhkarItem) => `${tab}-${item.order}`;
  const getRemaining = (item: AdhkarItem) => counters[getKey(item)] ?? item.count;

  const decrement = useCallback((item: AdhkarItem) => {
    const key = getKey(item);
    setCounters(prev => {
      const cur = prev[key] ?? item.count;
      return cur > 0 ? { ...prev, [key]: cur - 1 } : prev;
    });
  }, [tab]);

  const resetOne = useCallback((item: AdhkarItem) => {
    const key = getKey(item);
    setCounters(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, [tab]);

  const resetAll = useCallback(() => {
    setCounters(prev => {
      const next = { ...prev };
      items.forEach(i => delete next[getKey(i)]);
      return next;
    });
  }, [items, tab]);

  const completed = items.filter(i => getRemaining(i) <= 0).length;

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabType)}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="morning" className="font-heading">
              {isAr ? '☀️ أذكار الصباح' : '☀️ Morning'}
            </TabsTrigger>
            <TabsTrigger value="evening" className="font-heading">
              {isAr ? '🌙 أذكار المساء' : '🌙 Evening'}
            </TabsTrigger>
          </TabsList>

          <ProgressBar completed={completed} total={items.length} />

          {completed > 0 && (
            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={resetAll} className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                {isAr ? 'إعادة الكل' : 'Reset All'}
              </Button>
            </div>
          )}

          <TabsContent value="morning" className="space-y-4">
            {morningItems.map((item, idx) => (
              <AdhkarCard
                key={item.order}
                item={item}
                index={idx}
                remainingCount={getRemaining(item)}
                onDecrement={() => decrement(item)}
                onReset={() => resetOne(item)}
              />
            ))}
          </TabsContent>

          <TabsContent value="evening" className="space-y-4">
            {eveningItems.map((item, idx) => (
              <AdhkarCard
                key={item.order}
                item={item}
                index={idx}
                remainingCount={getRemaining(item)}
                onDecrement={() => decrement(item)}
                onReset={() => resetOne(item)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
