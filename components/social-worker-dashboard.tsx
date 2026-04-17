'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart3,
  BookMarked,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Copy,
  DollarSign,
  ExternalLink,
  Eye,
  FolderOpen,
  HelpCircle,
  Mic,
  MoreVertical,
  Paperclip,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

type CaseRow = {
  id: string;
  name: string;
  gender: '男' | '女';
  age: number;
  lowRisk?: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  /** 最近一次快篩（示意）；無則總覽右卡為空狀態 */
  lastScreeningAt?: Date | null;
  riskScore?: number;
  riskLabel?: string;
};

type DetailTab = 'overview' | 'screening' | 'family-map' | 'debt' | 'files';

const TAB_LABELS: Record<DetailTab, string> = {
  overview: '總覽',
  screening: '財務風險快篩',
  'family-map': '家庭經濟圖譜',
  debt: '債務盤點表',
  files: '案主檔案庫',
};

/** 示意資料：姓名皆為虛構，與真人無關 */
const MOCK_CASES: CaseRow[] = [
  {
    id: '1',
    name: '林宥辰',
    gender: '男',
    age: 62,
    lowRisk: true,
    createdAt: new Date(2026, 2, 18, 15, 30, 32),
    updatedAt: new Date(2026, 2, 18, 15, 30, 32),
    lastScreeningAt: new Date(2026, 2, 18, 15, 30, 0),
    riskScore: 11,
    riskLabel: '低度風險',
  },
  {
    id: '2',
    name: '張淑芬',
    gender: '女',
    age: 58,
    createdAt: new Date(2025, 11, 30, 10, 15, 0),
    updatedAt: null,
  },
  {
    id: '3',
    name: '吳承翰',
    gender: '男',
    age: 35,
    createdAt: new Date(2025, 11, 30, 16, 40, 0),
    updatedAt: null,
  },
  {
    id: '4',
    name: '鄭雅琳',
    gender: '女',
    age: 44,
    lowRisk: true,
    createdAt: new Date(2025, 11, 28, 11, 0, 0),
    updatedAt: new Date(2026, 0, 8, 9, 30, 0),
    lastScreeningAt: new Date(2026, 0, 8, 10, 0, 0),
    riskScore: 18,
    riskLabel: '低度風險',
  },
  {
    id: '5',
    name: '許志豪',
    gender: '男',
    age: 51,
    createdAt: new Date(2025, 8, 16, 8, 45, 0),
    updatedAt: null,
  },
  {
    id: '6',
    name: '蔡宜庭',
    gender: '女',
    age: 29,
    lowRisk: true,
    createdAt: new Date(2025, 7, 31, 13, 20, 0),
    updatedAt: null,
    lastScreeningAt: new Date(2025, 7, 31, 14, 0, 0),
    riskScore: 9,
    riskLabel: '低度風險',
  },
  {
    id: '7',
    name: '江俊賢',
    gender: '男',
    age: 47,
    createdAt: new Date(2025, 5, 10, 15, 0, 0),
    updatedAt: null,
  },
  {
    id: '8',
    name: '楊婉如',
    gender: '女',
    age: 66,
    createdAt: new Date(2025, 5, 1, 9, 10, 0),
    updatedAt: new Date(2025, 5, 15, 16, 25, 0),
  },
  {
    id: '9',
    name: '羅子晴',
    gender: '女',
    age: 33,
    createdAt: new Date(2025, 4, 27, 10, 5, 0),
    updatedAt: null,
  },
  {
    id: '10',
    name: '曾明德',
    gender: '男',
    age: 55,
    createdAt: new Date(2025, 4, 26, 14, 50, 0),
    updatedAt: null,
  },
  {
    id: '11',
    name: '范慧君',
    gender: '女',
    age: 39,
    createdAt: new Date(2025, 3, 12, 11, 35, 0),
    updatedAt: new Date(2025, 4, 1, 9, 0, 0),
  },
];

function formatDateTime(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = d.getHours();
  const min = String(d.getMinutes()).padStart(2, '0');
  const isAm = h < 12;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const ap = isAm ? '上午' : '下午';
  return `${y}/${m}/${day} ${ap} ${h12}:${min}`;
}

function formatDetailDateTime(d: Date): string {
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${y}年${mo}月${day}日 ${hh}:${mm}:${ss}`;
}

function formatScreeningLine(d: Date): string {
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = String(d.getMinutes()).padStart(2, '0');
  const ap = h < 12 ? '上午' : '下午';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${y}年${mo}月${day}日 ${ap}${String(h12).padStart(2, '0')}:${min}`;
}

const brownBtn = 'bg-[#5D4A3A] hover:bg-[#4d3d30] text-white border-0';

function ScreeningSummaryCard({ c }: { c: CaseRow }) {
  const href = familyFinHealthUrls.socialWorker.financeScreening.href;
  const hasScreening = c.lastScreeningAt && c.riskScore != null && c.riskLabel;

  return (
    <Card className="rounded-xl border border-border/70 shadow-sm p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart3 className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
          <h2 className="font-semibold text-foreground">財務風險快篩</h2>
        </div>
        <Button type="button" variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Eye className="h-3.5 w-3.5" aria-hidden />
            查看詳情
          </a>
        </Button>
      </div>
      {hasScreening ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">篩檢時間：{formatScreeningLine(c.lastScreeningAt!)}</p>
          <div className="flex flex-wrap items-baseline gap-3">
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white font-normal border-0">{c.riskLabel}</Badge>
            <span className="text-3xl font-semibold text-foreground tabular-nums">{c.riskScore} 分</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground leading-relaxed">尚無快篩紀錄，可前往官網完成財務風險快篩。</p>
          <Button type="button" size="sm" className={brownBtn} asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">
              前往財務風險快篩
            </a>
          </Button>
        </div>
      )}
    </Card>
  );
}

function FinancialCompanionBlock() {
  const screeningHref = familyFinHealthUrls.socialWorker.financeScreening.href;

  return (
    <Card className="rounded-xl border border-border/70 shadow-sm overflow-hidden">
      <div className="border-b border-border/60 bg-sky-50/80 dark:bg-sky-950/30 px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white shrink-0">
              <BookMarked className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <h2 className="text-lg font-bold text-foreground tracking-tight">陪您瞭解財務狀況</h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md border border-sky-200 bg-sky-100/80 px-2 py-0.5 text-xs font-medium text-sky-900 dark:border-sky-800 dark:bg-sky-900/40 dark:text-sky-100">
                  <HelpCircle className="h-3.5 w-3.5 mr-1" aria-hidden />
                  新對話
                </span>
              </div>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-full" aria-label="重新整理對話">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-3xl">
          直接用自然語句回答即可（可一次提供多項資訊），AI 會依題序引導你完成所有必填內容。支援上傳檔案協助 AI 理解資訊。
        </p>
      </div>

      <div className="p-4 md:p-6 space-y-5">
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 md:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm">已收集的資訊（可帶入財務風險快篩）</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                依「評估次數」整理每題最新回答，可一鍵複製（含題目）或直接帶入快篩。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button type="button" variant="outline" size="sm" className="text-destructive border-destructive/40 hover:bg-destructive/5 gap-1">
                <Copy className="h-3.5 w-3.5" aria-hidden />
                複製全部（含題目）
              </Button>
              <Button type="button" size="sm" className="gap-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground border-0" asChild>
                <a href={screeningHref} target="_blank" rel="noopener noreferrer">
                  帶入財務風險快篩
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground py-6 text-center rounded-md border border-dashed border-border/60 bg-background/50">
            目前尚未有已收集的回答內容。
          </p>
        </div>

        <div className="rounded-xl border-2 border-sky-200/80 dark:border-sky-800/80 bg-sky-50/30 dark:bg-sky-950/20 p-8 md:p-12 min-h-[220px] flex flex-col items-center justify-center text-center gap-4">
          <Sparkles className="h-10 w-10 text-sky-600 dark:text-sky-400" aria-hidden />
          <div className="space-y-2 max-w-md">
            <p className="text-sm font-medium text-foreground">可從這些方向開始描述</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              收入／補助、支出、負債、家庭狀況等。例如：「月收入大約 5 萬⋯⋯」「目前沒有負債。」也可上傳檔案協助 AI 理解。
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2 rounded-xl border border-border/80 bg-background p-2 shadow-sm">
            <Button type="button" variant="ghost" size="icon" className="shrink-0 h-10 w-10 text-muted-foreground" aria-label="上傳附件">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
              placeholder="輸入你的回答⋯（Enter 送出，Shift+Enter 換行）"
              className="min-h-[44px] max-h-32 resize-none border-0 shadow-none focus-visible:ring-0 px-1 py-2.5 text-sm"
              rows={2}
            />
            <Button type="button" variant="ghost" size="icon" className="shrink-0 h-10 w-10 text-muted-foreground" aria-label="語音輸入">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left px-1">AI 回覆僅供參考，請查核重要資訊</p>
        </div>
      </div>
    </Card>
  );
}

function DebtEmptyCard() {
  return (
    <Card className="rounded-xl border border-border/70 shadow-sm p-8 md:p-10">
      <div className="flex items-start justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5D4A3A] text-white">
            <DollarSign className="h-4 w-4" aria-hidden />
          </div>
          <h2 className="font-semibold text-foreground text-lg">債務盤點概覽</h2>
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-1.5 shrink-0">
          <Eye className="h-3.5 w-3.5" aria-hidden />
          查看詳情
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
        <DollarSign className="h-16 w-16 text-amber-200/90 dark:text-amber-900/50" strokeWidth={1.25} aria-hidden />
        <p className="text-muted-foreground">尚無債務資料</p>
        <Button type="button" className={brownBtn}>前往新增</Button>
      </div>
    </Card>
  );
}

function FilesEmptyCard() {
  return (
    <Card className="rounded-xl border border-border/70 shadow-sm p-8 md:p-10">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <FolderOpen className="h-5 w-5 text-[#5D4A3A]" aria-hidden />
        <h2 className="font-semibold text-foreground text-lg">案主檔案庫</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <FolderOpen className="h-16 w-16 text-amber-200/90 dark:text-amber-900/50" strokeWidth={1.25} aria-hidden />
        <p className="text-muted-foreground">尚無檔案記錄</p>
        <Button type="button" className={cn(brownBtn, 'gap-2')}>
          <FolderOpen className="h-4 w-4" aria-hidden />
          前往檔案庫
        </Button>
      </div>
    </Card>
  );
}

function CaseDetailView({ c, onBack }: { c: CaseRow; onBack: () => void }) {
  const [tab, setTab] = React.useState<DetailTab>('overview');
  const lastTouch = c.updatedAt ?? c.createdAt;
  const genderLabel = c.gender === '男' ? '男性' : '女性';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-foreground font-semibold text-lg hover:opacity-80 transition-opacity text-left"
        >
          <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
          {c.name}
        </button>
        <p className="text-sm font-medium text-red-800/90 dark:text-red-300/90 mt-2 pl-0.5">
          個案歷程紀要 ・ {TAB_LABELS[tab]}
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as DetailTab)} className="gap-0">
        <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full flex flex-wrap justify-start gap-0 mb-6">
          {(Object.keys(TAB_LABELS) as DetailTab[]).map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className={cn(
                'rounded-none border-0 border-b-2 border-transparent bg-transparent shadow-none px-4 py-3 text-sm font-medium text-muted-foreground',
                'data-[state=active]:text-red-700 dark:data-[state=active]:text-red-400',
                'data-[state=active]:border-red-600 dark:data-[state=active]:border-red-500',
                'data-[state=active]:bg-transparent hover:text-foreground'
              )}
            >
              {TAB_LABELS[key]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
            <Card className="rounded-xl border border-border/70 shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-muted-foreground" aria-hidden />
                  <h2 className="font-semibold text-foreground">個案資訊</h2>
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="編輯個案資訊">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3 text-sm flex-1">
                <p>
                  <span className="text-muted-foreground">姓名</span>
                  <span className="ml-2 font-medium text-foreground">{c.name}</span>
                </p>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="text-muted-foreground">性別</span>
                  <Badge variant="secondary" className="font-normal text-muted-foreground">
                    {genderLabel}
                  </Badge>
                </p>
                <p>
                  <span className="text-muted-foreground">建立時間</span>
                  <span className="ml-2 tabular-nums text-foreground">{formatDetailDateTime(c.createdAt)}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">最後更新</span>
                  <span className="ml-2 tabular-nums text-foreground">{formatDetailDateTime(lastTouch)}</span>
                </p>
              </div>
            </Card>
            <ScreeningSummaryCard c={c} />
          </div>
          <FinancialCompanionBlock />
        </TabsContent>

        <TabsContent value="screening" className="mt-0 space-y-4">
          <ScreeningSummaryCard c={c} />
          <p className="text-sm text-muted-foreground leading-relaxed px-1">
            完整題組與歷次紀錄請至官網「財務風險快篩」查看；此處為個案脈絡下的摘要示意。
          </p>
        </TabsContent>

        <TabsContent value="family-map" className="mt-0">
          <Card className="rounded-xl border border-dashed border-border/80 p-10 md:p-14 text-center">
            <p className="text-muted-foreground mb-4">尚無家庭經濟圖譜</p>
            <Button type="button" variant="outline" size="sm">
              前往建立圖譜
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="debt" className="mt-0">
          <DebtEmptyCard />
        </TabsContent>

        <TabsContent value="files" className="mt-0">
          <FilesEmptyCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SocialWorkerDashboard() {
  const [searchInput, setSearchInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [activeCaseId, setActiveCaseId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_CASES;
    return MOCK_CASES.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const activeCase = activeCaseId ? MOCK_CASES.find((x) => x.id === activeCaseId) : null;

  const openCase = (id: string) => setActiveCaseId(id);
  const closeCase = () => setActiveCaseId(null);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setPage(1);
    }
  };

  if (activeCase) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-8">
        <CaseDetailView c={activeCase} onBack={closeCase} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">個案歷程紀要</h1>
            <p className="text-sm font-medium text-amber-900/85 dark:text-amber-200/90">個案歷程紀要</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto shrink-0">
            <Input
              placeholder="搜尋姓名...按Enter鍵確認"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={onSearchKeyDown}
              className="w-full sm:w-[min(100%,280px)] rounded-lg bg-background border-border/80"
              aria-label="搜尋個案姓名"
            />
            <Button type="button" className="w-full sm:w-auto shrink-0 bg-[#5D4A3A] hover:bg-[#4d3d30] text-white border-0">
              <Plus className="h-4 w-4 mr-1.5" aria-hidden />
              新增個案
            </Button>
          </div>
        </header>

        <Card className="border-border/60 shadow-md rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/70">
                <TableHead className="pl-5 font-semibold text-foreground">姓名</TableHead>
                <TableHead className="font-semibold text-foreground">性別/年齡</TableHead>
                <TableHead className="font-semibold text-foreground">建立時間</TableHead>
                <TableHead className="font-semibold text-foreground">更新時間</TableHead>
                <TableHead className="w-12 pr-5 text-right font-semibold text-foreground">
                  <span className="sr-only">操作</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    查無符合的個案
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer border-b border-border/50 hover:bg-muted/40"
                    onClick={() => openCase(row.id)}
                  >
                    <TableCell className="pl-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">{row.name}</span>
                        {row.lowRisk ? (
                          <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white font-normal border-0 text-xs">
                            低度風險
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.gender} / {row.age}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">{formatDateTime(row.createdAt)}</TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {row.updatedAt ? formatDateTime(row.updatedAt) : '—'}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            aria-label={`${row.name} 操作選單`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              openCase(row.id);
                            }}
                          >
                            檢視歷程
                          </DropdownMenuItem>
                          <DropdownMenuItem>編輯資料</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">刪除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 px-4 py-3 border-t border-border/60 bg-muted/20">
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground tabular-nums">
              <span>
                {total === 0 ? '0' : `${start + 1}-${Math.min(start + pageSize, total)}`} of {total}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  setPageSize(Number(v));
                  setPage(1);
                }}
              >
                <SelectTrigger size="sm" className="w-[4.5rem] h-8" aria-label="每頁筆數">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-0.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goFirst}
                  disabled={pageClamped <= 1}
                  aria-label="第一頁"
                >
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goPrev}
                  disabled={pageClamped <= 1}
                  aria-label="上一頁"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goNext}
                  disabled={pageClamped >= totalPages}
                  aria-label="下一頁"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goLast}
                  disabled={pageClamped >= totalPages}
                  aria-label="最末頁"
                >
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground text-center md:text-left px-1">點選列可進入個案總覽與歷程功能（示意）。</p>
      </div>
    </div>
  );
}
