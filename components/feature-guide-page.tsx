'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

type FeatureGuidePageProps = {
  onSimulateLoggedIn?: () => void;
};

type Scenario = 'explore' | 'clarify' | 'act';

const SCENARIO_CHOICES: Record<
  Scenario,
  {
    emoji: string;
    title: string;
    lead: string;
    lines: [string, string];
  }
> = {
  explore: {
    emoji: '💸',
    title: '想了解自己的財務狀況',
    lead: '我不確定自己現在，究竟算不算是「還可以」。',
    lines: [
      '或許你很少仔細對過帳，心裡也沒有底——這其實很常見，並不是你的錯。',
      '從幾分鐘的檢測開始就好，慢慢看清現況；不必一次把所有事都打理完美。',
    ],
  },
  clarify: {
    emoji: '😟',
    title: '最近有點壓力或焦慮',
    lead: '一談到錢，我就容易緊繃、睡不穩，或心裡一直掛著放不下。',
    lines: [
      '感到壓力並不代表脆弱，而是身體在溫柔地提醒你：需要被好好聽見。',
      '先讓自己喘口氣，再用檢測與談話整理思緒；我們會陪你在安心的節奏裡，一步一步來。',
    ],
  },
  act: {
    emoji: '🧭',
    title: '想開始整理或改善',
    lead: '我已經想動了，只是還找不到清楚的第一步。',
    lines: [
      '真正的改變，往往從很小、很具體的行動開始，而不是一次巨大的決心。',
      '接下來會為你準備記帳、試算與目標規劃，讓想法慢慢變成做得到、也看得見的進展。',
    ],
  },
};

function LinkCard({
  href,
  title,
  description,
  emphasize,
}: {
  href: string;
  title: string;
  description: string;
  emphasize?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block rounded-xl p-5 md:p-6 text-left shadow-sm transition-all duration-200',
        'hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        emphasize
          ? 'border-2 border-accent/40 bg-accent/5 hover:border-accent/60'
          : 'border border-border/60 bg-card hover:border-primary/40'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1.5">
          <h3 className="font-semibold text-foreground text-base leading-snug tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <ExternalLink
          className="h-4 w-4 shrink-0 text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity mt-1"
          aria-hidden
        />
      </div>
    </a>
  );
}

const scenarioCopy: Record<Scenario, { icon: ReactNode; heading: string; sub: string }> = {
  explore: {
    icon: <Compass className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '先幫自己做個簡單檢測',
    sub: '直接點選卡片即可前往好理家在網站。下面任一項檢測都可以開始，沒有標準答案；只要誠實面對當下的自己，就已經是很好的第一步。',
  },
  clarify: {
    icon: <Sparkles className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '先釐清問題，不用自己撐',
    sub: '直接點選卡片前往對應功能。若壓力與金錢有關，建議先完成財務焦慮檢測；其餘可依需要慢慢使用。',
  },
  act: {
    icon: <HeartHandshake className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '把想法變成具體行動',
    sub: '直接點選卡片前往工具頁面。記帳、試算與夢想達成可擇一開始，從最順手的一項就好。',
  },
};

export function FeatureGuidePage({ onSimulateLoggedIn }: FeatureGuidePageProps) {
  const { assessments, tools } = familyFinHealthUrls;
  const [scenario, setScenario] = useState<Scenario | null>(null);

  const reset = () => setScenario(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-20 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-14 space-y-12 md:space-y-14">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug tracking-tight text-balance">
            不知道從哪開始？我們幫你整理好了
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
            沒有誰天生就懂理財；選一個最貼近你此刻心情的選項，我們再一起往下走。
          </p>
        </header>

        {scenario === null && (
          <section className="space-y-6" aria-label="選擇情境">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">選擇情境</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose">
                三種起點都一樣值得被尊重；點進去之後，我們會依你的選擇，只顯示這一階段需要的內容。
              </p>
            </div>
            <div className="grid gap-4 md:gap-5">
              {(Object.keys(SCENARIO_CHOICES) as Scenario[]).map((key) => {
                const item = SCENARIO_CHOICES[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenario(key)}
                    className={cn(
                      'text-left rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-sm',
                      'hover:shadow-md hover:border-primary/35 active:scale-[0.99] transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    )}
                  >
                    <div className="text-2xl mb-3" aria-hidden>
                      {item.emoji}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-foreground/85 font-medium leading-relaxed mb-3">
                      {item.lead}
                    </p>
                    <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      <p>{item.lines[0]}</p>
                      <p>{item.lines[1]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {scenario !== null && (
          <div className="space-y-14">
            <section className="space-y-8" aria-label="建議的檢測與工具">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    {scenarioCopy[scenario].icon}
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                      {scenarioCopy[scenario].heading}
                    </h2>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className="text-muted-foreground shrink-0 -mr-2"
                >
                  重選情境
                </Button>
              </div>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-prose">
                {scenarioCopy[scenario].sub}
              </p>

              <div className="grid gap-4">
                {scenario === 'explore' && (
                  <>
                    <LinkCard
                      href={assessments.resilience.href}
                      title={assessments.resilience.title}
                      description={assessments.resilience.description}
                    />
                    <LinkCard
                      href={assessments.fraudDefense.href}
                      title={assessments.fraudDefense.title}
                      description={assessments.fraudDefense.description}
                    />
                    <LinkCard
                      href={assessments.anxiety.href}
                      title={assessments.anxiety.title}
                      description={assessments.anxiety.description}
                    />
                  </>
                )}
                {scenario === 'clarify' && (
                  <>
                    <LinkCard
                      href={assessments.anxiety.href}
                      title={assessments.anxiety.title}
                      description="若壓力與錢有關，可優先完成此檢測"
                    />
                    <LinkCard
                      href={tools.askIvy.href}
                      title={tools.askIvy.title}
                      description={tools.askIvy.description}
                    />
                    <LinkCard
                      href={tools.knowledgeBase.href}
                      title={tools.knowledgeBase.title}
                      description={tools.knowledgeBase.description}
                    />
                    <LinkCard
                      href={tools.consultation.href}
                      title={tools.consultation.title}
                      description={tools.consultation.description}
                      emphasize
                    />
                  </>
                )}
                {scenario === 'act' && (
                  <>
                    <LinkCard
                      href={tools.basicAccounting.href}
                      title={tools.basicAccounting.title}
                      description={tools.basicAccounting.description}
                    />
                    <LinkCard
                      href={tools.calculator.href}
                      title={tools.calculator.title}
                      description={tools.calculator.description}
                    />
                    <LinkCard
                      href={tools.financialPlanning.href}
                      title={tools.financialPlanning.title}
                      description={tools.financialPlanning.description}
                    />
                  </>
                )}
              </div>
            </section>

            <section className="rounded-2xl border-2 border-dashed border-primary/35 bg-primary/5 p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">建議登入，使用個人中心</h2>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                {tools.personalCenter.description}。登入後，你可以在好理家在網站持續查看檢測紀錄、工具使用與後續建議，讓努力被好好留下來。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2.5 list-none leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary shrink-0" aria-hidden>
                    ✔
                  </span>
                  <span>已完成的檢測與結果摘要</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary shrink-0" aria-hidden>
                    ✔
                  </span>
                  <span>曾使用過的工具與紀錄</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary shrink-0" aria-hidden>
                    ✔
                  </span>
                  <span>依你現況整理的下一步建議</span>
                </li>
              </ul>
              <LinkCard
                href={tools.personalCenter.href}
                title={tools.personalCenter.title}
                description="於好理家在網站開啟個人中心（另開新分頁）"
                emphasize
              />
              {onSimulateLoggedIn && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-11 border-primary/40"
                  onClick={onSimulateLoggedIn}
                >
                  示意：在此預覽已登入畫面
                </Button>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">「預覽已登入」僅供本改版原型示範用。</p>
            </section>

            <section className="space-y-5 rounded-2xl border border-border/50 bg-muted/30 p-5 sm:p-7">
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                  檢測之外，你還可以使用
                </h2>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  這些資源都在好理家在網站，與檢測結果搭配使用，往往能幫你看得更完整、也走得更穩。
                </p>
              </div>
              <div className="grid gap-4">
                <LinkCard
                  href={tools.personalCenter.href}
                  title={tools.personalCenter.title}
                  description={tools.personalCenter.description}
                />
                <LinkCard
                  href={tools.basicAccounting.href}
                  title={tools.basicAccounting.title}
                  description={tools.basicAccounting.description}
                />
                <LinkCard
                  href={tools.financialPlanning.href}
                  title={tools.financialPlanning.title}
                  description={tools.financialPlanning.description}
                />
                <LinkCard
                  href={tools.calculator.href}
                  title={tools.calculator.title}
                  description={tools.calculator.description}
                />
                <LinkCard
                  href={tools.askIvy.href}
                  title={tools.askIvy.title}
                  description={tools.askIvy.description}
                />
                <LinkCard
                  href={tools.knowledgeBase.href}
                  title={tools.knowledgeBase.title}
                  description={tools.knowledgeBase.description}
                />
              </div>
            </section>

            <section className="rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-card to-accent/10 p-8 sm:p-10 text-center space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight text-balance leading-snug">
                還是不確定？我們陪你一起看
              </h2>
              <a
                href={tools.consultation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group block rounded-xl border-2 border-accent/40 bg-accent/10 p-6 sm:p-7 transition-colors',
                  'hover:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                  <span className="font-semibold text-foreground text-lg leading-snug">免費個人線上財務諮詢</span>
                  <ExternalLink
                    className="h-4 w-4 text-muted-foreground sm:ml-1 hidden sm:inline opacity-70 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
                  不用準備完美說詞，帶著你的疑惑與心情來就好；專業諮詢師會與你慢慢梳理。
                </p>
              </a>
            </section>

            <div className="flex justify-center pb-4">
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                回到選擇情境
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
