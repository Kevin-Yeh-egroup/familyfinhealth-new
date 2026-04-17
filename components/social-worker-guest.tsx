'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileStack, Landmark, Users } from 'lucide-react';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

type SocialWorkerGuestProps = {
  onSimulateLoggedIn?: () => void;
};

type WorkerProblem = 'docs' | 'finance' | 'cases';

const PROBLEM_CHOICES: Record<
  WorkerProblem,
  {
    emoji: string;
    title: string;
    lead: string;
    lines: [string, string];
  }
> = {
  docs: {
    emoji: '📝',
    title: '會議、文書資料難以整理',
    lead: '開不完的會、寫不完的紀錄，資訊散在各處，很難快速回顧或交接。',
    lines: [
      '這不代表你不夠認真，而是工作量本身就容易超載；能省下的力氣，都值得留給個案與自己。',
      '從語音轉文字與知識查找開始，讓紀錄與經驗比較好找、也比較好延續。',
    ],
  },
  finance: {
    emoji: '🔎',
    title: '財務資料難以辨識解析',
    lead: '帳單、借貸、風險訊號交錯在一起，一時難以判讀優先順序。',
    lines: [
      '財務線索往往需要時間拼湊；有結構的懶人包與快篩工具，能幫你先把輪廓拉出來。',
      '再搭配試算與問答，把不確定的數字與名詞慢慢對上實際狀況。',
    ],
  },
  cases: {
    emoji: '🧩',
    title: '個案資料大量且複雜',
    lead: '同時追很多案主，資訊量大、脈絡深，很難一眼掌握從哪裡接續。',
    lines: [
      '複雜不是個案的錯，也不是你的錯，而是系統性負荷的常態。',
      '先從歷程紀要與風險快篩收斂重點，需要時再搭配諮詢與知識庫補強判斷。',
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

const problemCopy: Record<WorkerProblem, { icon: ReactNode; heading: string; sub: string }> = {
  docs: {
    icon: <FileStack className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '讓會議與文書較好整理',
    sub: '直接點選卡片前往好理家在網站。可依個案狀況擇一使用，不必一次全開；順手的工具會比完美的流程更實際。',
  },
  finance: {
    icon: <Landmark className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '協助辨識與解析財務線索',
    sub: '懶人包適合與服務對象一起對照討論；快篩與試算則有助釐清風險與數字。皆為外部連結，將另開新分頁。',
  },
  cases: {
    icon: <Users className="h-5 w-5 shrink-0 text-primary" aria-hidden />,
    heading: '在複雜資料裡找到接點',
    sub: '先從歷程與風險摘要收斂視野，再用知識庫與諮詢補齊不確定的部分；一步一步來就好。',
  },
};

export function SocialWorkerGuest({ onSimulateLoggedIn }: SocialWorkerGuestProps) {
  const { tools, socialWorker } = familyFinHealthUrls;
  const { lazyPacks } = socialWorker;
  const [problem, setProblem] = useState<WorkerProblem | null>(null);

  const reset = () => setProblem(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-20 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-14 space-y-12 md:space-y-14">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground tracking-wide">社工未登入（示意）</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug tracking-tight text-balance">
            工作節奏緊湊時，從哪裡找到支點？
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
            先想想最常卡住你的環節；我們依「可能遇到的問題」整理了好理家在網站上可直接使用的資源（以下連結皆前往官網）。
          </p>
        </header>

        {problem === null && (
          <section className="space-y-6" aria-label="可能遇到的問題">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">可能遇到的問題</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose">
                三種狀況都常見，也都很值得被正視；點進去之後，只會顯示與該問題較相關的建議與連結。
              </p>
            </div>
            <div className="grid gap-4 md:gap-5">
              {(Object.keys(PROBLEM_CHOICES) as WorkerProblem[]).map((key) => {
                const item = PROBLEM_CHOICES[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProblem(key)}
                    className={cn(
                      'text-left rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-sm',
                      'hover:shadow-md hover:border-primary/35 active:scale-[0.99] transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    )}
                  >
                    <div className="text-2xl mb-3" aria-hidden>
                      {item.emoji}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-2 tracking-tight">{item.title}</h3>
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

        {problem !== null && (
          <div className="space-y-10 md:space-y-12">
            <section className="space-y-8" aria-label="建議使用的資源">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    {problemCopy[problem].icon}
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                      {problemCopy[problem].heading}
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
                  重選問題
                </Button>
              </div>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-prose">
                {problemCopy[problem].sub}
              </p>

              <div className="grid gap-4">
                {problem === 'docs' && (
                  <>
                    <LinkCard
                      href={socialWorker.voiceToText.href}
                      title={socialWorker.voiceToText.title}
                      description={socialWorker.voiceToText.description}
                    />
                    <LinkCard
                      href={tools.knowledgeBase.href}
                      title={tools.knowledgeBase.title}
                      description={tools.knowledgeBase.description}
                    />
                    <LinkCard
                      href={socialWorker.serviceHistory.href}
                      title={socialWorker.serviceHistory.title}
                      description={socialWorker.serviceHistory.description}
                    />
                  </>
                )}
                {problem === 'finance' && (
                  <>
                    <LinkCard
                      href={lazyPacks.debt.href}
                      title={lazyPacks.debt.title}
                      description={lazyPacks.debt.description}
                    />
                    <LinkCard
                      href={lazyPacks.fraud.href}
                      title={lazyPacks.fraud.title}
                      description={lazyPacks.fraud.description}
                    />
                    <LinkCard
                      href={lazyPacks.financial.href}
                      title={lazyPacks.financial.title}
                      description={lazyPacks.financial.description}
                    />
                    <LinkCard
                      href={socialWorker.financeScreening.href}
                      title={socialWorker.financeScreening.title}
                      description={socialWorker.financeScreening.description}
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
                  </>
                )}
                {problem === 'cases' && (
                  <>
                    <LinkCard
                      href={socialWorker.serviceHistory.href}
                      title={socialWorker.serviceHistory.title}
                      description={socialWorker.serviceHistory.description}
                    />
                    <LinkCard
                      href={socialWorker.financeScreening.href}
                      title={socialWorker.financeScreening.title}
                      description={socialWorker.financeScreening.description}
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
              </div>
            </section>

            {onSimulateLoggedIn && (
              <div className="flex flex-col items-center gap-2 text-center">
                <Button type="button" variant="default" size="lg" className="w-full sm:w-auto min-h-11" onClick={onSimulateLoggedIn}>
                  示意：切換為已登入
                </Button>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">登入後將進入個案歷程紀要示意畫面；此按鈕僅供本改版原型示範用。</p>
              </div>
            )}

            <section className="rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-card to-accent/10 p-8 sm:p-10 text-center space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight text-balance leading-snug">
                需要一起梳理？線上諮詢也在這裡
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
                  可與財務健康諮詢師線上討論；若個案狀況適合轉介或並行，也可作為資源選項之一。
                </p>
              </a>
            </section>

            <div className="flex justify-center pb-4">
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                回到可能遇到的問題
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
