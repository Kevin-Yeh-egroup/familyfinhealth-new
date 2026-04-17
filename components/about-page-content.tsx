'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Pause, Trophy } from 'lucide-react';
import {
  aboutServices,
  mediaArticles,
  mediaOutlets,
  outletAccent,
  outletBorder,
  outletLabel,
  type MediaOutletId,
} from '@/lib/about-page-data';
import { Button } from '@/components/ui/button';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

const trustStats = [
  { emoji: '🏡', value: '15 年', label: '社工實務經驗' },
  { emoji: '👨‍👩‍👧‍👦', value: '數萬', label: '家庭案例整理' },
  { emoji: '🤖', value: 'AI ×', label: '社工專業結合' },
  { emoji: '💙', value: '免費', label: '開放給所有人' },
];

const PAGE_SIZE = 8;

const serviceShell: Record<
  (typeof aboutServices)[number]['theme'],
  string
> = {
  pink:
    'border-[oklch(0.9_0.06_350)] bg-[oklch(0.985_0.025_350)] shadow-[0_8px_28px_oklch(0.88_0.08_350_/_0.12)]',
  blue:
    'border-[oklch(0.88_0.06_250)] bg-[oklch(0.98_0.02_250)] shadow-[0_8px_28px_oklch(0.85_0.1_250_/_0.1)]',
  orange:
    'border-[oklch(0.9_0.08_75)] bg-[oklch(0.99_0.03_85)] shadow-[0_8px_28px_oklch(0.88_0.12_75_/_0.12)]',
  cyan:
    'border-[oklch(0.88_0.06_195)] bg-[oklch(0.985_0.03_195)] shadow-[0_8px_28px_oklch(0.85_0.08_195_/_0.12)]',
  neutral:
    'border-[oklch(0.9_0.02_0)] bg-[oklch(0.97_0.01_0)] shadow-[0_8px_24px_oklch(0.5_0.02_0_/_0.06)]',
  rose:
    'border-[oklch(0.9_0.06_15)] bg-[oklch(0.99_0.025_15)] shadow-[0_8px_28px_oklch(0.88_0.1_15_/_0.1)]',
};

const filterTagStyles: Record<number, string> = {
  0: 'border-[oklch(0.62_0.16_25)] bg-gradient-to-r from-[oklch(0.62_0.16_25)] to-[oklch(0.68_0.14_45)] text-white',
  1: 'border-pink-200/80 bg-pink-50/90 text-[oklch(0.32_0.06_290)]',
  2: 'border-sky-200/80 bg-sky-50/90 text-[oklch(0.32_0.06_290)]',
  3: 'border-emerald-200/80 bg-emerald-50/90 text-[oklch(0.32_0.06_290)]',
  4: 'border-amber-200/80 bg-amber-50/90 text-[oklch(0.32_0.06_290)]',
  5: 'border-violet-200/80 bg-violet-50/90 text-[oklch(0.32_0.06_290)]',
  6: 'border-rose-200/80 bg-rose-50/90 text-[oklch(0.32_0.06_290)]',
  7: 'border-cyan-200/80 bg-cyan-50/90 text-[oklch(0.32_0.06_290)]',
  8: 'border-stone-200/80 bg-stone-50/90 text-[oklch(0.32_0.06_290)]',
};

export function AboutPageContent() {
  const [outlet, setOutlet] = useState<MediaOutletId>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (outlet === 'all') return mediaArticles;
    return mediaArticles.filter((a) => a.outletId === outlet);
  }, [outlet]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const sliceStart = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(sliceStart, sliceStart + PAGE_SIZE);

  const rangeText =
    filtered.length === 0
      ? '顯示第 0 篇，共 0 篇'
      : `顯示第 ${sliceStart + 1}-${sliceStart + pageItems.length} 篇，共 ${filtered.length} 篇`;

  const { assessments } = familyFinHealthUrls;

  return (
    <main className="min-h-screen bg-[oklch(0.99_0.012_85)] pb-20">
      {/* 為什麼選擇好理家在？ */}
      <section
        className="bg-gradient-to-b from-[oklch(0.975_0.022_290_/_0.28)] to-[oklch(0.985_0.015_85)] py-16 md:py-20"
        aria-labelledby="about-trust-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2
              id="about-trust-heading"
              className="text-2xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-3xl"
            >
              為什麼選擇好理家在？
            </h2>
            <p className="text-[oklch(0.46_0.04_290)]">
              我們把 15 年的社工實務，轉化成每個家庭都能使用的工具
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[oklch(0.9_0.04_290_/_0.45)] bg-white/85 px-4 py-5 text-center space-y-2 shadow-sm"
              >
                <p className="text-3xl" aria-hidden>
                  {s.emoji}
                </p>
                <p className="text-xl font-bold text-[oklch(0.28_0.07_290)]">{s.value}</p>
                <p className="text-xs text-[oklch(0.48_0.04_290)]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.97_0.05_35)] via-[oklch(0.975_0.035_50)] to-[oklch(0.97_0.04_275)] border border-[oklch(0.88_0.05_40_/_0.45)] p-8 text-center space-y-5 shadow-sm">
            <p className="text-lg font-bold text-[oklch(0.26_0.07_290)]">
              好理家在，幫你看見兩件事
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-[oklch(0.58_0.16_25)]">✔</span>
                <span className="font-semibold text-[oklch(0.34_0.06_290)]">現在的財務結構</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-[oklch(0.5_0.14_265)]">✔</span>
                <span className="font-semibold text-[oklch(0.34_0.06_290)]">未來的風險位置</span>
              </div>
            </div>
            <Button
              asChild
              className="min-h-14 rounded-2xl bg-gradient-to-r from-[oklch(0.58_0.18_25)] to-[oklch(0.65_0.16_40)] text-white text-base font-bold shadow-lg hover:opacity-95 px-10"
            >
              <a href={assessments.resilience.href} target="_blank" rel="noopener noreferrer">
                免費檢測我的家庭狀態
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 我們的服務 */}
      <section
        className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:px-8"
        aria-labelledby="about-services-heading"
      >
        <header className="mb-10 text-center">
          <h2
            id="about-services-heading"
            className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold tracking-tight text-[oklch(0.28_0.05_290)] sm:text-3xl"
          >
            <span className="text-2xl" aria-hidden>
              🌸
            </span>
            我們的服務
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            溫暖陪伴您的每一步
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aboutServices.map((s) => (
            <article
              key={s.title}
              className={cn(
                'rounded-2xl border p-6 transition-[transform,box-shadow] hover:-translate-y-0.5',
                serviceShell[s.theme]
              )}
            >
              <div className="mb-4 text-3xl" aria-hidden>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[oklch(0.28_0.05_290)]">
                {s.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[oklch(0.45_0.03_260)]">
                {s.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 獲獎殊榮 */}
      <section
        className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 md:px-8"
        aria-labelledby="about-awards-heading"
      >
        <header className="mb-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h2
              id="about-awards-heading"
              className="inline-flex items-center gap-2 text-2xl font-bold text-[oklch(0.28_0.05_290)] sm:text-3xl"
            >
              <span aria-hidden>🏆</span>
              獲獎殊榮
            </h2>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-white/80 text-muted-foreground shadow-sm hover:bg-muted/50"
              aria-label="暫停輪播（示意）"
            >
              <Pause className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            榮獲各界肯定，持續為社會創造價值
          </p>
        </header>

        <div className="overflow-hidden rounded-[1.5rem] border border-[oklch(0.9_0.04_350)] bg-white shadow-lg">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 via-white to-slate-200">
            <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
              2025
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-3 py-1 text-xs font-bold text-white shadow-md">
              <span aria-hidden>🔥</span> HOT
            </div>
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <Trophy
                className="h-16 w-16 text-amber-500/90 drop-shadow-sm"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                It Matters Awards
              </p>
              <p className="max-w-sm text-xs leading-snug text-slate-600 sm:text-sm">
                馴錢師財商顧問股份有限公司
                <br />
                好理家在 財務健檢網
                <br />
                <span className="font-semibold text-slate-800">
                  AI Selected 社會影響力獎
                </span>
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-b-[1.5rem] bg-[oklch(0.96_0.04_350)] px-5 py-6 sm:px-8 sm:py-8">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              <span aria-hidden>🏆</span>
              獲獎公告
            </span>
            <h3 className="mt-4 text-xl font-bold leading-snug text-[oklch(0.35_0.12_290)] sm:text-2xl">
              2025 IT Matters Awards
              <br />
              AI Selected 社會影響力獎
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[oklch(0.38_0.03_260)] sm:text-base">
              馴錢師以『好理家在-財務健檢網』獲頒第三屆 IT Matters Awards「AI
              Selected
              社會影響力獎」，與醫療、金融、公共治理等專案並列，顯示家庭財務與社會福利已成為
              AI 社會影響力的重要議題。
            </p>
            <a
              href="https://www.familyfinhealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-[oklch(0.48_0.14_280)] underline-offset-4 hover:underline"
            >
              查看完整報導 →
            </a>
            <div
              className="pointer-events-none absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-md sm:h-20 sm:w-20"
              aria-hidden
            >
              <Trophy className="h-8 w-8 text-white drop-shadow sm:h-10 sm:w-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 媒體報導 */}
      <section
        className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8"
        aria-labelledby="about-media-heading"
      >
        <header className="mb-6 text-center sm:text-left">
          <h2
            id="about-media-heading"
            className="text-2xl font-bold text-[oklch(0.32_0.1_260)] sm:text-3xl"
          >
            媒體報導
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            好理家在獲得全台主流媒體廣泛關注與肯定
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {mediaOutlets.map((o, idx) => {
            const active = outlet === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setOutlet(o.id);
                  setPage(1);
                }}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                  active
                    ? filterTagStyles[0]
                    : cn(
                        filterTagStyles[(idx % 8) + 1] ||
                          'border-border bg-card',
                        'hover:opacity-90'
                      )
                )}
              >
                {o.label}（{o.count}）
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{rangeText}</p>

        <ul className="mt-6 flex flex-col gap-4">
          {pageItems.map((article, i) => (
            <li key={article.id}>
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex gap-4 rounded-xl border border-border/60 bg-white p-4 shadow-sm transition-[box-shadow,transform] hover:shadow-md sm:gap-5',
                  'border-l-4',
                  outletBorder[article.outletId]
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60 text-sm font-bold text-[oklch(0.32_0.1_260)]">
                  {sliceStart + i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug text-[oklch(0.32_0.1_260)]">
                    {article.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={cn(
                          'h-2 w-2 shrink-0 rounded-full',
                          outletAccent[article.outletId]
                        )}
                      />
                      {outletLabel[article.outletId]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden>📅</span>
                      {article.date}
                    </span>
                  </div>
                </div>
                <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/50" />
              </a>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-1"
            aria-label="媒體報導分頁"
          >
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-[oklch(0.32_0.1_260)] hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  'flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-medium',
                  n === safePage
                    ? 'bg-gradient-to-r from-[oklch(0.62_0.16_25)] to-[oklch(0.68_0.14_45)] text-white shadow-sm'
                    : 'text-[oklch(0.32_0.1_260)] hover:bg-muted'
                )}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-[oklch(0.32_0.1_260)] hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
            >
              &gt;
            </button>
          </nav>
        )}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-[oklch(0.48_0.14_280)] hover:underline">
            ← 返回首頁
          </Link>
        </p>
      </section>
    </main>
  );
}
