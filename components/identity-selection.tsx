'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  HelpCircle,
  Mic,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoreResourcesSection } from '@/components/more-resources-section';
import { getEntryReturnHints } from '@/lib/entry-returning';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

type Role = 'public' | 'worker';

type IdentitySelectionProps = {
  onSelectRole: (role: Role) => void;
};

/* ─── 共用小元件 ─── */

function TaskTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-none tracking-tight text-foreground/80 border-[oklch(0.88_0.04_350_/_0.65)] bg-white/70">
      {children}
    </span>
  );
}

const ctaButtonWarm =
  'w-full min-h-11 rounded-xl bg-gradient-to-r from-[oklch(0.62_0.16_25)] to-[oklch(0.68_0.14_45)] text-white shadow-sm hover:opacity-95';
const ctaButtonCool =
  'w-full min-h-11 rounded-xl bg-gradient-to-r from-[oklch(0.52_0.12_280)] to-[oklch(0.6_0.14_265)] text-white shadow-sm hover:opacity-95';

/* ─── 第一屏：Hero（直接打痛點）─── */

function HeroSection({ actionRef }: { actionRef: React.RefObject<HTMLDivElement | null> }) {
  const { assessments } = familyFinHealthUrls;

  const scrollToAction = () => {
    actionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.985_0.018_85)] via-[oklch(0.98_0.025_55)] to-[oklch(0.96_0.04_40_/_0.35)] pt-16 pb-24 md:pt-24 md:pb-32">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.88_0.12_25_/_0.18)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[oklch(0.82_0.1_280_/_0.1)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center space-y-8">
        <p className="text-sm font-semibold tracking-widest text-[oklch(0.62_0.16_25)] uppercase">
          好理家在・家庭財務導航系統
        </p>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-5xl md:text-[3.25rem] leading-tight">
          為家庭釋放財務壓力，
          <br className="hidden sm:block" />
          建構財務韌性
        </h1>

        <p className="text-lg font-semibold text-[oklch(0.38_0.07_290)] sm:text-xl">
          不是錢不夠，而是你還沒看見問題在哪裡
        </p>

        <p className="text-base leading-relaxed text-[oklch(0.46_0.04_290)] max-w-2xl mx-auto">
          你現在的壓力，不只是因為錢不夠——而是你還沒看見問題卡在哪裡。
          <br className="hidden sm:block" />
          你未來的不安，也不是因為不努力——而是你還不知道風險會從哪裡來。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="min-h-14 rounded-2xl bg-gradient-to-r from-[oklch(0.58_0.18_25)] to-[oklch(0.65_0.16_40)] text-white text-base font-bold shadow-lg hover:opacity-95 px-8"
          >
            <a href={assessments.resilience.href} target="_blank" rel="noopener noreferrer">
              開始檢測我的家庭壓力
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="min-h-14 rounded-2xl border-2 border-[oklch(0.7_0.1_270)] text-[oklch(0.42_0.1_270)] text-base font-bold hover:bg-[oklch(0.97_0.025_280)] px-8 bg-white/70"
          >
            <a href={assessments.fraudDefense.href} target="_blank" rel="noopener noreferrer">
              看看未來風險在哪裡
            </a>
          </Button>
        </div>

        <p className="text-sm text-[oklch(0.58_0.04_290)]">
          免費使用・3 分鐘即可完成
        </p>

        <button
          type="button"
          onClick={scrollToAction}
          className="inline-flex flex-col items-center gap-1 text-xs text-[oklch(0.55_0.05_290)] hover:text-[oklch(0.4_0.07_290)] transition-colors mt-4"
          aria-label="向下滾動到行動入口"
        >
          <span>或從這裡開始你的起點</span>
          <ArrowRight className="h-4 w-4 rotate-90" aria-hidden />
        </button>
      </div>
    </section>
  );
}

/* ─── 第二屏：讓人對號入座 ─── */

function PainPointSection() {
  const { assessments } = familyFinHealthUrls;

  const painPoints = [
    '每個月都有收入，但還是覺得很緊',
    '有存一點錢，但一有事情就不夠用',
    '不敢想未來（小孩、父母、退休）',
    '常常不知道錢到底花去哪了',
  ];

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="pain-point-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 text-center space-y-10">
        <div className="space-y-3">
          <h2
            id="pain-point-heading"
            className="text-2xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-3xl"
          >
            你是不是這樣？
          </h2>
          <p className="text-[oklch(0.46_0.04_290)]">這些感受，比你想像的更常見</p>
        </div>

        <ul className="space-y-3.5 text-left max-w-xl mx-auto">
          {painPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-4 rounded-2xl border border-[oklch(0.9_0.04_30_/_0.6)] bg-[oklch(0.995_0.01_40_/_0.9)] px-5 py-4 shadow-sm"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.58_0.16_25)]"
                aria-hidden
              />
              <span className="text-base font-medium text-[oklch(0.3_0.06_290)]">{point}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <p className="text-[oklch(0.42_0.05_290)] font-medium">
            這不是你一個人的問題——這是很多家庭都在承受的重量
          </p>
          <Button
            asChild
            className="min-h-13 rounded-2xl bg-gradient-to-r from-[oklch(0.58_0.18_25)] to-[oklch(0.65_0.16_40)] text-white text-base font-bold shadow-md hover:opacity-95 px-10"
          >
            <a href={assessments.resilience.href} target="_blank" rel="noopener noreferrer">
              這不是你一個人的問題 → 開始檢測
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── 第三屏：核心雙軸模型 ─── */

function CoreModelSection() {
  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-b from-[oklch(0.975_0.022_290_/_0.35)] to-[oklch(0.97_0.02_40_/_0.25)]"
      aria-labelledby="core-model-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2
            id="core-model-heading"
            className="text-2xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-3xl"
          >
            好理家在怎麼幫你？
          </h2>
          <p className="text-[oklch(0.46_0.04_290)]">
            我們用雙軸模型，同時看見現在與未來
          </p>
        </div>

        {/* 雙軸圖 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-5 items-center">
            {/* 左：現在（壓力）*/}
            <div className="rounded-3xl border-2 border-[oklch(0.78_0.14_25_/_0.55)] bg-gradient-to-br from-[oklch(0.97_0.04_35)] to-[oklch(0.94_0.07_25)] p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.88_0.12_25_/_0.4)] text-xl">
                  🔍
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[oklch(0.58_0.14_25)] uppercase tracking-widest">
                    現在
                  </p>
                  <p className="text-lg font-bold text-[oklch(0.26_0.07_290)]">釋放財務壓力</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/75 px-4 py-3.5 space-y-2">
                <p className="text-sm font-bold text-[oklch(0.34_0.07_290)]">財務結構分析</p>
                <ul className="space-y-1.5 text-xs text-[oklch(0.46_0.04_290)]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.16_25)] shrink-0" aria-hidden />
                    收支結構是否健全？
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.16_25)] shrink-0" aria-hidden />
                    債務壓力有多重？
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.16_25)] shrink-0" aria-hidden />
                    現金流是否穩定？
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-[oklch(0.91_0.1_25_/_0.3)] px-4 py-2.5 text-center">
                <p className="text-xs font-semibold text-[oklch(0.44_0.12_25)]">
                  → 輸出：你為什麼累
                </p>
              </div>
            </div>

            {/* 中：行動調整 */}
            <div className="flex flex-col items-center gap-3 py-4 md:py-0">
              <ArrowRight
                className="h-6 w-6 rotate-90 md:rotate-0 text-[oklch(0.55_0.06_290)]"
                aria-hidden
              />
              <div className="rounded-2xl bg-white border-2 border-[oklch(0.87_0.04_290_/_0.5)] px-4 py-3 text-center shadow-sm">
                <p className="text-xs font-bold text-[oklch(0.38_0.06_290)] whitespace-nowrap">
                  行動調整
                </p>
                <p className="text-[10px] text-[oklch(0.52_0.04_290)] mt-0.5">
                  收入・支出・資產・負債
                </p>
              </div>
              <ArrowRight
                className="h-6 w-6 rotate-90 md:rotate-0 text-[oklch(0.55_0.06_290)]"
                aria-hidden
              />
            </div>

            {/* 右：未來（風險）*/}
            <div className="rounded-3xl border-2 border-[oklch(0.72_0.1_270_/_0.5)] bg-gradient-to-br from-[oklch(0.97_0.03_280)] to-[oklch(0.93_0.07_260)] p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.86_0.1_270_/_0.35)] text-xl">
                  🛡️
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[oklch(0.5_0.14_265)] uppercase tracking-widest">
                    未來
                  </p>
                  <p className="text-lg font-bold text-[oklch(0.26_0.07_290)]">建構財務韌性</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/75 px-4 py-3.5 space-y-2">
                <p className="text-sm font-bold text-[oklch(0.34_0.07_290)]">財務風險預測</p>
                <ul className="space-y-1.5 text-xs text-[oklch(0.46_0.04_290)]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.14_265)] shrink-0" aria-hidden />
                    緊急預備金是否足夠？
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.14_265)] shrink-0" aria-hidden />
                    收入穩定性如何？
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.14_265)] shrink-0" aria-hidden />
                    家庭支持系統在哪？
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-[oklch(0.9_0.08_265_/_0.28)] px-4 py-2.5 text-center">
                <p className="text-xs font-semibold text-[oklch(0.42_0.12_265)]">
                  → 輸出：你撐不撐得住未來
                </p>
              </div>
            </div>
          </div>

          {/* 整合結果 */}
          <div className="rounded-2xl bg-gradient-to-r from-[oklch(0.96_0.05_35)] via-white to-[oklch(0.95_0.04_275)] border border-[oklch(0.88_0.04_290_/_0.45)] px-6 py-5 text-center shadow-sm">
            <p className="text-base font-bold text-[oklch(0.26_0.07_290)]">
              從「撐不住」→「撐得住」
            </p>
            <p className="mt-1 text-sm text-[oklch(0.46_0.04_290)]">
              整合雙軸報告，產出屬於你家庭的「財務導航建議」
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 第四屏：工具是解法，不只是功能 ─── */

function ToolsSolutionSection() {
  const { assessments, tools } = familyFinHealthUrls;

  const solutions = [
    {
      emoji: '📋',
      label: '壓力診斷',
      title: '家庭財務壓力檢測',
      description: '找出讓你喘不過氣的結構性原因，不再用猜的',
      href: assessments.resilience.href,
      cta: '開始檢測',
      accent: 'warm' as const,
    },
    {
      emoji: '🔮',
      label: '未來模擬',
      title: '未來風險模擬器',
      description: '用數字看見未來可能的衝擊點，提前做好心理與財務準備',
      href: tools.calculator.href,
      cta: '開始模擬',
      accent: 'warm' as const,
    },
    {
      emoji: '💬',
      label: 'AI 即時',
      title: '財務問題即時解答',
      description: '把心裡的問題直接問出來，AI 協助你在幾秒內釐清方向',
      href: tools.askIvy.href,
      cta: '立即發問',
      accent: 'cool' as const,
    },
    {
      emoji: '🤝',
      label: '真人陪伴',
      title: '專業陪你一起調整',
      description: '一對一線上諮詢，讓財務健康顧問成為你最穩定的後盾',
      href: tools.consultation.href,
      cta: '預約諮詢',
      accent: 'cool' as const,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="tools-solution-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2
            id="tools-solution-heading"
            className="text-2xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-3xl"
          >
            工具不只是功能，是解法
          </h2>
          <p className="text-[oklch(0.46_0.04_290)]">
            每一個工具都對應一個你正在面對的處境
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex flex-col gap-4 rounded-3xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                s.accent === 'warm'
                  ? 'border-[oklch(0.9_0.05_35_/_0.7)] bg-gradient-to-br from-[oklch(0.995_0.012_40)] to-[oklch(0.975_0.03_28)] focus-visible:ring-[oklch(0.58_0.18_25)]'
                  : 'border-[oklch(0.88_0.05_270_/_0.6)] bg-gradient-to-br from-[oklch(0.995_0.008_285)] to-[oklch(0.975_0.022_268)] focus-visible:ring-[oklch(0.52_0.14_265)]'
              )}
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden>
                    {s.emoji}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5',
                      s.accent === 'warm'
                        ? 'bg-[oklch(0.93_0.07_30)] text-[oklch(0.5_0.18_25)]'
                        : 'bg-[oklch(0.91_0.06_270)] text-[oklch(0.44_0.14_265)]'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[oklch(0.28_0.06_290)]">{s.title}</h3>
                <p className="text-xs leading-relaxed text-[oklch(0.46_0.04_290)]">
                  {s.description}
                </p>
              </div>
              <span
                className={cn(
                  'mt-auto flex items-center gap-1 text-xs font-bold',
                  s.accent === 'warm'
                    ? 'text-[oklch(0.55_0.18_25)]'
                    : 'text-[oklch(0.48_0.14_265)]'
                )}
              >
                {s.cta}
                <ArrowRight
                  className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 第五屏：信任感 ─── */

/* ─── 合作夥伴條 ─── */

function PartnersOfficialStrip() {
  return (
    <section
      className={cn(
        'mx-auto mt-14 flex max-w-4xl flex-col gap-5 rounded-2xl border-2 border-[oklch(0.72_0.19_25)]',
        'bg-[oklch(0.97_0.035_25)] px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:mt-16 md:px-8 md:py-5'
      )}
      aria-labelledby="partners-official-heading"
    >
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Handshake
          className="h-8 w-8 shrink-0 text-[oklch(0.78_0.16_85)]"
          strokeWidth={1.75}
          aria-hidden
        />
        <h2
          id="partners-official-heading"
          className="text-base font-bold tracking-tight text-[oklch(0.22_0.06_290)] sm:text-lg"
        >
          官方合作與贊助
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-8 sm:justify-end sm:gap-10">
        <div className="shrink-0">
          <Image
            src="/partners/money-trainer-logo.png"
            alt="馴錢師財商研究中心 Money Trainer Financial Study Center"
            width={280}
            height={80}
            className="h-11 w-auto max-w-[min(100vw-4rem,260px)] object-contain object-left sm:h-12"
          />
        </div>
        <div
          className="shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/10"
          aria-label="星展基金會 DBS Foundation"
        >
          <Image
            src="/partners/dbs-foundation-logo.png"
            alt="DBS Foundation 星展基金會 — Creating Impact for a Better World"
            width={320}
            height={96}
            className="h-10 w-auto max-w-[min(100vw-4rem,280px)] object-contain object-left sm:h-12"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 任務卡子元件 ─── */

function ExternalTaskCard({
  href,
  icon,
  iconWrapClass,
  title,
  description,
  cta,
  accent = 'warm',
}: {
  href: string;
  icon: ReactNode;
  iconWrapClass: string;
  title: string;
  description: string;
  cta: string;
  accent?: 'warm' | 'cool';
}) {
  return (
    <div className="rounded-3xl border border-[oklch(0.9_0.035_350_/_0.85)] bg-white/85 p-5 shadow-[0_1px_0_oklch(1_0_0_/_0.8)_inset,0_8px_28px_oklch(0.55_0.08_25_/_0.06)] backdrop-blur-sm transition-all duration-200 hover:border-[oklch(0.82_0.06_350_/_0.75)] hover:shadow-[0_12px_32px_oklch(0.55_0.08_25_/_0.08)] sm:p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm',
              iconWrapClass
            )}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="text-base font-semibold tracking-tight text-[oklch(0.28_0.06_290)]">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[oklch(0.45_0.03_290)]">{description}</p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <TaskTag>約 3–5 分鐘</TaskTag>
              <TaskTag>免費使用</TaskTag>
              <TaskTag>完成後會看到建議下一步</TaskTag>
            </div>
          </div>
        </div>
        <Button asChild className={cn(accent === 'cool' ? ctaButtonCool : ctaButtonWarm)}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {cta}
          </a>
        </Button>
      </div>
    </div>
  );
}

function InternalTaskCard({
  icon,
  iconWrapClass,
  title,
  description,
  cta,
  onAction,
  accent = 'warm',
}: {
  icon: ReactNode;
  iconWrapClass: string;
  title: string;
  description: string;
  cta: string;
  onAction: () => void;
  accent?: 'warm' | 'cool';
}) {
  return (
    <div className="rounded-3xl border border-[oklch(0.9_0.035_350_/_0.85)] bg-white/85 p-5 shadow-[0_1px_0_oklch(1_0_0_/_0.8)_inset,0_8px_28px_oklch(0.55_0.08_25_/_0.06)] backdrop-blur-sm transition-all duration-200 hover:border-[oklch(0.82_0.06_350_/_0.75)] hover:shadow-[0_12px_32px_oklch(0.55_0.08_25_/_0.08)] sm:p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm',
              iconWrapClass
            )}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="text-base font-semibold tracking-tight text-[oklch(0.28_0.06_290)]">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[oklch(0.45_0.03_290)]">{description}</p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <TaskTag>約 3–5 分鐘</TaskTag>
              <TaskTag>免費使用</TaskTag>
              <TaskTag>完成後會看到建議下一步</TaskTag>
            </div>
          </div>
        </div>
        <Button
          type="button"
          onClick={onAction}
          className={cn(accent === 'cool' ? ctaButtonCool : ctaButtonWarm)}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}

/* ─── 主元件 ─── */

export function IdentitySelection({ onSelectRole }: IdentitySelectionProps) {
  const [audience, setAudience] = useState<Role>('public');
  const [returning, setReturning] = useState(() => ({
    usedPublic: false,
    usedWorker: false,
    lastRole: null as Role | null,
  }));
  const { assessments, tools, socialWorker } = familyFinHealthUrls;
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hints = getEntryReturnHints();
    setReturning(hints);
    if (hints.lastRole) setAudience(hints.lastRole);
  }, []);

  return (
    <div>
      {/* 第一屏 */}
      <HeroSection actionRef={actionRef} />

      {/* 第二屏 */}
      <PainPointSection />

      {/* 第三屏 */}
      <CoreModelSection />

      {/* 官方合作與贊助（置於核心模型之後） */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
        <PartnersOfficialStrip />
      </div>

      {/* 第四屏 */}
      <ToolsSolutionSection />

      {/* ─── 行動區：從這裡開始你的起點 ─── */}
      <div
        ref={actionRef}
        className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.985_0.018_85)] via-[oklch(0.98_0.025_55)] to-[oklch(0.96_0.04_40_/_0.35)]"
      >
        <div
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[oklch(0.88_0.12_25_/_0.25)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-40 h-64 w-64 rounded-full bg-[oklch(0.82_0.1_280_/_0.12)] blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-14">
          {/* 回訪使用者快速入口 */}
          {(returning.usedPublic || returning.usedWorker) && (
            <section
              className="mb-10 rounded-3xl border border-[oklch(0.85_0.06_350_/_0.55)] bg-white/90 p-5 shadow-md backdrop-blur-sm sm:p-6 md:mb-12"
              aria-label="曾使用者的快速入口"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="min-w-0 space-y-2 max-w-xl">
                  <p className="text-base font-bold tracking-tight text-[oklch(0.26_0.07_290)]">
                    歡迎回來，直接前往你的工作位置
                  </p>
                  <p className="text-sm leading-relaxed text-[oklch(0.44_0.04_290)]">
                    若你曾從這裡進入過民眾或社工流程，可先到官網上的個人中心或個案歷程紀要接續上次進度；下方仍可依今天想做的事重新選擇。
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  {returning.usedPublic && (
                    <Button
                      asChild
                      className={cn(ctaButtonWarm, 'min-h-11 w-full min-w-[11rem] px-5 sm:w-auto')}
                    >
                      <a
                        href={tools.personalCenter.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        開啟個人中心
                      </a>
                    </Button>
                  )}
                  {returning.usedWorker && (
                    <Button
                      asChild
                      className={cn(ctaButtonCool, 'min-h-11 w-full min-w-[11rem] px-5 sm:w-auto')}
                    >
                      <a
                        href={socialWorker.serviceHistory.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        開啟個案歷程紀要
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}

          <div className="space-y-8">
            <header className="max-w-2xl space-y-4">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[oklch(0.26_0.07_290)] sm:text-4xl">
                從哪裡開始，都可以
              </h2>
              <p className="text-pretty text-base leading-relaxed text-[oklch(0.42_0.04_290)] sm:text-lg">
                不論你現在承受的是財務壓力，還是擔心未來的未知風險，好理家在都有最適合你的起點。
              </p>
            </header>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm font-medium text-[oklch(0.4_0.05_290)]">我目前是</p>
              <div
                className="inline-flex w-fit rounded-full border border-[oklch(0.88_0.04_350_/_0.7)] bg-white/75 p-1 shadow-sm backdrop-blur-sm"
                role="group"
                aria-label="使用身分（僅影響下方任務排序與用詞）"
              >
                <button
                  type="button"
                  onClick={() => setAudience('public')}
                  aria-pressed={audience === 'public'}
                  className={cn(
                    'min-h-10 rounded-full px-5 text-sm font-semibold transition-all',
                    audience === 'public'
                      ? 'bg-gradient-to-r from-[oklch(0.62_0.16_25)] to-[oklch(0.7_0.14_48)] text-white shadow-sm'
                      : 'text-[oklch(0.35_0.06_290)] hover:bg-[oklch(0.97_0.02_85)]'
                  )}
                >
                  一般民眾
                </button>
                <button
                  type="button"
                  onClick={() => setAudience('worker')}
                  aria-pressed={audience === 'worker'}
                  className={cn(
                    'min-h-10 rounded-full px-5 text-sm font-semibold transition-all',
                    audience === 'worker'
                      ? 'bg-gradient-to-r from-[oklch(0.52_0.12_280)] to-[oklch(0.58_0.14_260)] text-white shadow-sm'
                      : 'text-[oklch(0.35_0.06_290)] hover:bg-[oklch(0.97_0.02_85)]'
                  )}
                >
                  社工夥伴
                </button>
              </div>
            </div>

            <p className="text-sm text-[oklch(0.48_0.04_290)]">
              {audience === 'public'
                ? '先選一件今天最想完成的事；若還沒頭緒，可先點「我不知道從哪裡開始」看引導。需要登入保存紀錄時，網站會再提示你。'
                : '常用動作放在這裡，點了就走；若還沒頭緒，可先點「我不知道從哪裡開始」看示意流程。'}
            </p>

            {/* 民眾：兩路徑提示 */}
            {audience === 'public' && (
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4" aria-label="好理家在兩大核心方向">
                <div className="flex items-start gap-3 rounded-2xl border border-[oklch(0.88_0.06_30_/_0.65)] bg-[oklch(0.985_0.025_40_/_0.7)] px-4 py-4 backdrop-blur-sm">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.94_0.08_30)] to-[oklch(0.91_0.1_20)] shadow-sm text-lg">
                    🔍
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold tracking-tight text-[oklch(0.28_0.07_290)]">
                      釋放財務壓力
                    </p>
                    <p className="text-xs leading-relaxed text-[oklch(0.46_0.04_290)]">
                      檢視你的財務結構是否健全，找出長期讓家庭喘不過氣的根源
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[oklch(0.86_0.05_280_/_0.5)] bg-[oklch(0.975_0.022_280_/_0.6)] px-4 py-4 backdrop-blur-sm">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.93_0.07_280)] to-[oklch(0.9_0.09_260)] shadow-sm text-lg">
                    🛡️
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold tracking-tight text-[oklch(0.28_0.07_290)]">
                      建構財務韌性
                    </p>
                    <p className="text-xs leading-relaxed text-[oklch(0.46_0.04_290)]">
                      提前預知未來潛在風險，讓家庭在面對變局時依然站得穩
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 任務卡 */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {audience === 'public' ? (
                <>
                  <ExternalTaskCard
                    href={assessments.resilience.href}
                    icon={
                      <TrendingUp
                        className="h-6 w-6 text-[oklch(0.55_0.18_25)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.96_0.06_40)] to-[oklch(0.94_0.08_25)]"
                    title="家庭財務壓力檢測"
                    description="檢視你的財務結構是否健全，找出壓力根源，讓改善方向變得清晰可行。"
                    cta="開始檢測"
                  />
                  <ExternalTaskCard
                    href={assessments.fraudDefense.href}
                    icon={
                      <ShieldAlert
                        className="h-6 w-6 text-[oklch(0.52_0.2_25)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.96_0.05_350)] to-[oklch(0.94_0.07_40)]"
                    title="未來風險預知檢測"
                    description="預知詐騙這個潛在風險，在家庭財務被侵蝕之前建立防線、鞏固韌性。"
                    cta="開始檢測"
                  />
                  <ExternalTaskCard
                    href={assessments.anxiety.href}
                    icon={
                      <Sparkles
                        className="h-6 w-6 text-[oklch(0.55_0.16_300)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.95_0.06_320)] to-[oklch(0.93_0.08_40)]"
                    title="財務壓力狀態釐清"
                    description="把財務壓力轉化成看得見的輪廓，是卸下重量、找到出口最重要的第一步。"
                    cta="開始檢測"
                  />
                  <InternalTaskCard
                    icon={
                      <HelpCircle
                        className="h-6 w-6 text-[oklch(0.55_0.18_25)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.96_0.06_40)] to-[oklch(0.94_0.08_25)]"
                    title="我不知道從哪裡開始"
                    description="還沒決定要先做檢測還是用工具？點這裡會帶你進引導，從最順手的一步慢慢來就好。"
                    cta="進入引導"
                    onAction={() => onSelectRole('public')}
                  />
                </>
              ) : (
                <>
                  <ExternalTaskCard
                    accent="cool"
                    href={socialWorker.voiceToText.href}
                    icon={<Mic className="h-6 w-6 text-[oklch(0.5_0.14_270)]" aria-hidden />}
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.94_0.06_280)] to-[oklch(0.92_0.08_260)]"
                    title="開始語音轉文字"
                    description="會談錄音轉摘要與逐字稿，減少會後謄打的時間。"
                    cta="開啟工具"
                  />
                  <ExternalTaskCard
                    accent="cool"
                    href={socialWorker.financeScreening.href}
                    icon={
                      <ClipboardCheck
                        className="h-6 w-6 text-[oklch(0.48_0.14_270)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.93_0.07_270)] to-[oklch(0.9_0.09_250)]"
                    title="使用財務風險快篩"
                    description="快速拉出風險輪廓，方便與個案對焦下一步。"
                    cta="開始快篩"
                  />
                  <ExternalTaskCard
                    accent="cool"
                    href={tools.askIvy.href}
                    icon={<Bot className="h-6 w-6 text-[oklch(0.5_0.14_270)]" aria-hidden />}
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.94_0.06_280)] to-[oklch(0.91_0.09_260)]"
                    title="問問 AI，協助整理判斷"
                    description="把名詞、數字與情境丟給 AI 協助梳理，再回頭做決定。"
                    cta="開啟問問 AI"
                  />
                  <InternalTaskCard
                    accent="cool"
                    icon={
                      <HelpCircle
                        className="h-6 w-6 text-[oklch(0.5_0.14_270)]"
                        aria-hidden
                      />
                    }
                    iconWrapClass="bg-gradient-to-br from-[oklch(0.93_0.07_270)] to-[oklch(0.9_0.09_250)]"
                    title="我不知道從哪裡開始"
                    description="不確定要先開哪個工具或從哪裡記錄？先進示意的社工流程，把常用動作排一排；正式個案資料仍以官網為準。"
                    cta="進入示意流程"
                    onAction={() => onSelectRole('worker')}
                  />
                </>
              )}
            </div>
          </div>

          <MoreResourcesSection />
        </div>
      </div>
    </div>
  );
}
