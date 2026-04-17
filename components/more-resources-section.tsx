'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Heart, PauseCircle, Pencil, Users } from 'lucide-react';

const COLUMN_SLIDES = [
  {
    thumbLabel: '馴錢師 財務諮詢室',
    thumbClass: 'from-emerald-50 via-teal-50 to-cyan-50',
    title:
      '從經濟依賴到經濟獨立：出身會計的單親媽媽重整現金流，有哪些關鍵思考？／【馴錢師財務諮詢室】',
    excerpt:
      '從零開始累積儲蓄、獨力撫養孩子，她如何一步步釐清現金流、重新掌握家計節奏？',
    tags: ['馴錢師財務諮詢室', '熱門專欄'] as const,
    date: '2025/11/28',
  },
  {
    thumbLabel: '馴錢師 財務諮詢室',
    thumbClass: 'from-emerald-50 via-teal-50 to-cyan-50',
    title:
      '家庭年收入 85 萬，為什麼還在刷卡周轉、債越滾越大？／【馴錢師財務諮詢室】',
    excerpt:
      '家裡長期用信用卡周轉，不夠時還得向親友借錢。先把金流與債務結構看清楚，才有機會止血。',
    tags: ['馴錢師財務諮詢室', '熱門專欄'] as const,
    date: '2026/03/06',
  },
] as const;

const EVENT_SLIDES = [
  {
    thumbLabel: 'AI 實務工具分享會',
    thumbClass: 'from-rose-50 via-orange-50 to-amber-50',
    title: '「好理家在・財務健檢網」AI 實務工具分享會',
    excerpt:
      'AI 正逐漸成為生活與工作中的數位助手。一起了解如何運用實務工具，讓財務陪伴更有效率。',
    dateRange: '即日起至活動頁公告',
    timeLabel: '依活動頁為準',
    status: '名額有限請盡速報名',
  },
  {
    thumbLabel: '更多活動',
    thumbClass: 'from-sky-50 via-indigo-50 to-violet-50',
    title: '更多實體與線上活動',
    excerpt: '演講、工作坊與報名資訊會不定期更新，歡迎到活動公告頁鎖定最新場次。',
    dateRange: '詳見活動公告',
    timeLabel: '各場次不同',
    status: '報名方式以活動頁為準',
  },
] as const;

function CarouselDots({
  count,
  index,
  onSelect,
  activeClass,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  activeClass: string;
}) {
  return (
    <div className="flex justify-center gap-2 pt-3" role="tablist" aria-label="輪播頁次">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`第 ${i + 1} 則`}
          onClick={() => onSelect(i)}
          className={cn(
            'h-2 rounded-full transition-all',
            i === index ? cn('min-w-5', activeClass) : 'w-2 bg-[oklch(0.88_0.02_0)] hover:bg-[oklch(0.8_0.03_0)]'
          )}
        />
      ))}
    </div>
  );
}

function useCarousel(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);

  useEffect(() => {
    if (length <= 1 || intervalMs <= 0) return;
    const t = window.setInterval(next, intervalMs);
    return () => window.clearInterval(t);
  }, [length, intervalMs, next]);

  return [index, setIndex] as const;
}

export function MoreResourcesSection() {
  const { events, resources } = familyFinHealthUrls;
  const [colIdx, setColIdx] = useCarousel(COLUMN_SLIDES.length, 7000);
  const [evtIdx, setEvtIdx] = useCarousel(EVENT_SLIDES.length, 8000);

  const col = COLUMN_SLIDES[colIdx];
  const evt = EVENT_SLIDES[evtIdx];

  return (
    <section
      className="mx-auto mt-10 max-w-6xl space-y-6 md:mt-12"
      aria-labelledby="more-resources-heading"
    >
      <div className="text-center space-y-1.5">
        <h2
          id="more-resources-heading"
          className="text-xl font-bold tracking-tight text-[oklch(0.24_0.07_290)] sm:text-2xl"
        >
          更多資源與服務
        </h2>
        <p className="text-sm text-[oklch(0.45_0.04_290)] sm:text-base">溫暖陪伴您的每一步</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
        {/* 多多益善專欄 */}
        <article className="flex flex-col rounded-2xl border border-[oklch(0.9_0.03_0)] bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[oklch(0.22_0.06_290)]">多多益善專欄</h3>
            <PauseCircle className="h-5 w-5 shrink-0 text-[oklch(0.55_0.04_0)]" aria-hidden />
          </div>
          <a
            href={resources.popular.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 flex-col rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.14_280)] focus-visible:ring-offset-2"
          >
            <div
              className={cn(
                'relative mb-3 flex aspect-[16/10] items-end overflow-hidden rounded-xl bg-gradient-to-br p-4 shadow-inner',
                col.thumbClass
              )}
            >
              <span className="max-w-[85%] rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
                {col.thumbLabel}
              </span>
            </div>
            <h4 className="text-sm font-semibold leading-snug text-[oklch(0.22_0.06_290)] group-hover:underline">
              {col.title}
            </h4>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[oklch(0.44_0.03_0)]">
              {col.excerpt}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {col.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[oklch(0.94_0.01_0)] px-2.5 py-0.5 text-[11px] font-medium text-[oklch(0.42_0.02_0)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[oklch(0.48_0.03_0)]">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {col.date}
            </p>
          </a>
          <CarouselDots
            count={COLUMN_SLIDES.length}
            index={colIdx}
            onSelect={setColIdx}
            activeClass="bg-[oklch(0.55_0.16_25)]"
          />
        </article>

        {/* 最新活動 */}
        <article className="flex flex-col rounded-2xl border border-[oklch(0.9_0.03_0)] bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[oklch(0.22_0.06_290)]">最新活動</h3>
            <PauseCircle className="h-5 w-5 shrink-0 text-[oklch(0.55_0.04_0)]" aria-hidden />
          </div>
          <a
            href={events.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 flex-col rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.52_0.14_260)] focus-visible:ring-offset-2"
          >
            <div
              className={cn(
                'relative mb-3 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br p-4 shadow-inner',
                evt.thumbClass
              )}
            >
              <span className="rounded-lg bg-white/90 px-3 py-2 text-center text-xs font-bold leading-snug text-[oklch(0.28_0.08_25)] shadow-sm">
                好理家在
                <br />
                {evt.thumbLabel}
              </span>
            </div>
            <h4 className="text-sm font-semibold leading-snug text-[oklch(0.22_0.06_290)] group-hover:underline">
              {evt.title}
            </h4>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[oklch(0.44_0.03_0)]">
              {evt.excerpt}
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[oklch(0.42_0.03_0)]">
              <li className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.5_0.12_260)]" aria-hidden />
                <span>{evt.dateRange}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.5_0.12_260)]" aria-hidden />
                <span>{evt.timeLabel}</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.5_0.12_260)]" aria-hidden />
                <span>{evt.status}</span>
              </li>
            </ul>
          </a>
          <CarouselDots
            count={EVENT_SLIDES.length}
            index={evtIdx}
            onSelect={setEvtIdx}
            activeClass="bg-[oklch(0.52_0.18_260)]"
          />
        </article>

        {/* 線上徵稿 */}
        <article className="flex flex-col overflow-hidden rounded-2xl border border-[oklch(0.88_0.06_35)] shadow-md">
          <div className="flex flex-1 flex-col bg-gradient-to-br from-[oklch(0.96_0.06_35)] via-[oklch(0.94_0.08_45)] to-[oklch(0.92_0.1_55)] p-5 sm:p-6">
            <h3 className="text-base font-bold text-[oklch(0.26_0.07_290)]">線上徵稿</h3>
            <div className="mt-5 flex flex-1 flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-md">
                <Pencil className="h-7 w-7 text-[oklch(0.58_0.16_25)]" strokeWidth={2} aria-hidden />
              </div>
              <h4 className="mt-4 text-lg font-bold text-[oklch(0.22_0.07_290)]">好理家在文章徵稿</h4>
              <p className="mt-2 text-sm text-[oklch(0.4_0.05_290)]">分享實務經驗，幫助更多家庭 ✨</p>
              <div className="mt-4 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-left text-sm text-[oklch(0.38_0.04_290)] shadow-sm">
                <span className="mr-1" aria-hidden>
                  💰
                </span>
                <span className="font-semibold">稿費資訊</span>
                <span className="block pt-1 text-xs leading-relaxed sm:text-sm">每字 2 元，上限 3,000 元</span>
              </div>
              <Button
                asChild
                className="mt-6 w-full min-h-12 rounded-full bg-gradient-to-r from-[oklch(0.68_0.16_55)] to-[oklch(0.62_0.18_40)] text-base font-semibold text-white shadow-md hover:opacity-95"
              >
                <a href={resources.callForArticles.href} target="_blank" rel="noopener noreferrer">
                  <Heart className="mr-2 h-4 w-4 inline-block align-text-bottom" aria-hidden />
                  立即投稿
                </a>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
