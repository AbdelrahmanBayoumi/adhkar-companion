export interface AdhkarItem {
  order: number;
  content: string;
  translation?: string;
  transliteration?: string;
  count: number;
  count_description: string;
  fadl: string;
  source: string;
  type: number; // 0 = both, 1 = morning, 2 = evening
  audio: string;
  hadith_text: string;
  explanation_of_hadith_vocabulary: string;
}

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';
export type TabType = 'morning' | 'evening';
