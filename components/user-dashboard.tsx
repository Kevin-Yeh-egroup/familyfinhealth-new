'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  Bell,
  Bookmark,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/** 示意用使用者資料（可日後改為登入使用者） */
const DEMO_USER = {
  name: '馴XXXX博',
  email: 'egroup.kevin@gmail.com',
  avatarChar: '馴',
};

const tabTriggerClass =
  'rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 sm:px-4 py-3 text-sm font-medium text-muted-foreground shadow-none transition-colors ' +
  'hover:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent ' +
  'data-[state=active]:text-foreground data-[state=active]:border-red-500';

function TabPlaceholder({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm">
      <CardContent className="p-8 space-y-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{description}</p>
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {cta}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export function UserDashboard() {
  const { assessments, tools } = familyFinHealthUrls;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rose-50/30 to-violet-50/20 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 頂部：標題區 + 個人小卡 */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10 mb-10">
          <div className="space-y-3 min-w-0 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance leading-tight">
              個人中心
            </h1>
            <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed max-w-xl">
              集中管理你的財務歷程、更新進度與重要提醒。
            </p>
            <Badge
              variant="secondary"
              className="mt-1 rounded-full border border-rose-200/80 bg-rose-100/90 text-rose-900 hover:bg-rose-100"
            >
              專屬個人資料
            </Badge>
          </div>

          <Card className="w-full lg:max-w-[20rem] shrink-0 rounded-2xl border-border/50 shadow-md">
            <CardContent className="p-5 flex flex-row items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-white shadow-inner"
                aria-hidden
              >
                {DEMO_USER.avatarChar}
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-semibold text-foreground truncate">{DEMO_USER.name}</p>
                <p className="text-xs text-muted-foreground truncate">{DEMO_USER.email}</p>
                <Badge variant="outline" className="text-[11px] font-normal text-muted-foreground border-border/80">
                  財務韌性 尚無紀錄
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList
            className={cn(
              'flex h-auto w-full flex-wrap justify-start gap-1 rounded-none border-0 border-b border-border bg-transparent p-0'
            )}
          >
            <TabsTrigger value="overview" className={tabTriggerClass}>
              總覽
            </TabsTrigger>
            <TabsTrigger value="resilience" className={tabTriggerClass}>
              財務韌性
            </TabsTrigger>
            <TabsTrigger value="fraud" className={tabTriggerClass}>
              詐騙防禦能力
            </TabsTrigger>
            <TabsTrigger value="anxiety" className={tabTriggerClass}>
              財務焦慮
            </TabsTrigger>
            <TabsTrigger value="planning" className={tabTriggerClass}>
              夢想達成財務管理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-6 outline-none">
            {/* 財務韌性 — 空狀態 */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-rose-900/90 mb-4">
                <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                <span className="font-semibold">財務韌性</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">尚無紀錄</p>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-md">
                完成一次評估後會顯示分數與趨勢
              </p>
            </div>

            {/* 精選工具 — 記帳助理 */}
            <a
              href={tools.basicAccounting.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative block overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-lg transition-transform duration-200',
                'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500',
                'hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="space-y-4 min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    全新上線
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight">
                    財務生活記帳助理
                  </h2>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed max-w-lg">
                    AI 驅動的個人記帳體驗，自動分析收支模式，讓財務管理更輕鬆。
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['智慧記帳', 'AI 洞察', '月度圖表'].map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs backdrop-blur-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center self-end sm:self-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30"
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </a>

            {/* 我的訂閱文章 */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">我的訂閱文章</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Bell className="h-4 w-4 shrink-0" aria-hidden />
                      訂閱 0 類
                    </span>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <a href={tools.knowledgeBase.href} target="_blank" rel="noopener noreferrer">
                        管理訂閱
                      </a>
                    </Button>
                  </div>
                </div>
                <p className="font-medium text-foreground mb-2">目前尚未訂閱標籤</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                  訂閱你感興趣的知識標籤後，儀表板就會在這裡顯示相關文章。
                </p>
                <Button
                  className="rounded-full bg-orange-100 text-orange-900 hover:bg-orange-200/90 shadow-none border border-orange-200/80"
                  asChild
                >
                  <a href={tools.knowledgeBase.href} target="_blank" rel="noopener noreferrer">
                    立即設定訂閱
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* 我的收藏 */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">我的收藏</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Bookmark className="h-4 w-4 shrink-0" aria-hidden />
                    共 0 筆
                  </span>
                </div>
                <p className="font-medium text-foreground mb-2">你尚未收藏任何內容</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                  你可以在知識庫文章點擊「收藏」，之後就能在這裡快速回到內容。
                </p>
                <Button
                  className="rounded-full bg-orange-100 text-orange-900 hover:bg-orange-200/90 shadow-none border border-orange-200/80"
                  asChild
                >
                  <a href={tools.knowledgeBase.href} target="_blank" rel="noopener noreferrer">
                    前往知識庫
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resilience" className="mt-8 outline-none">
            <TabPlaceholder
              title="財務韌性紀錄"
              description="完成財務韌性檢測後，此處將顯示你的分數與歷史趨勢。"
              href={assessments.resilience.href}
              cta="前往財務韌性檢測"
            />
          </TabsContent>

          <TabsContent value="fraud" className="mt-8 outline-none">
            <TabPlaceholder
              title="詐騙防禦能力紀錄"
              description="完成檢測後，可在這裡追蹤你的防詐意識與建議。"
              href={assessments.fraudDefense.href}
              cta="前往詐騙防禦檢測"
            />
          </TabsContent>

          <TabsContent value="anxiety" className="mt-8 outline-none">
            <TabPlaceholder
              title="財務焦慮紀錄"
              description="完成檢測後，可在此檢視壓力來源與後續資源建議。"
              href={assessments.anxiety.href}
              cta="前往財務焦慮檢測"
            />
          </TabsContent>

          <TabsContent value="planning" className="mt-8 outline-none">
            <TabPlaceholder
              title="夢想達成財務管理"
              description="設定財務目標後，可在此追蹤進度與調整計畫。"
              href={tools.financialPlanning.href}
              cta="前往夢想達成"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
