'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { UserDashboard } from '@/components/user-dashboard';
import { SocialWorkerDashboard } from '@/components/social-worker-dashboard';
import { IdentitySelection } from '@/components/identity-selection';
import { FeatureGuidePage } from '@/components/feature-guide-page';
import { SocialWorkerGuest } from '@/components/social-worker-guest';
import { Button } from '@/components/ui/button';
import { recordEntryRole } from '@/lib/entry-returning';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';
import { LogIn, LogOut, RotateCcw } from 'lucide-react';

type Role = 'public' | 'worker';

export default function Home() {
  const [role, setRole] = useState<Role | null>(null);
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const { tools, events } = familyFinHealthUrls;

  const resetFlow = () => {
    setRole(null);
    setDemoLoggedIn(false);
  };

  const handleSelectRole = (r: Role) => {
    recordEntryRole(r);
    setRole(r);
  };

  return (
    <div>
      <nav
        className={cn(
          'sticky top-0 z-50 border-b shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/80',
          role === null
            ? 'border-[oklch(0.88_0.04_350_/_0.45)] bg-[oklch(0.99_0.015_85)]/92 supports-[backdrop-filter]:bg-[oklch(0.99_0.015_85)]/85'
            : 'border-border/40 bg-card/90 supports-[backdrop-filter]:bg-card/80'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 md:py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4 min-w-0">
            <h1 className="m-0 shrink-0 min-w-0">
              <Image
                src="/logo-family-financial-health.png"
                alt="好理家在財務健檢網"
                width={320}
                height={72}
                className="h-9 w-auto md:h-11 max-w-[min(100%,280px)] object-contain object-left"
                priority
              />
            </h1>
            {role !== null && (
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 text-muted-foreground min-h-10"
                onClick={resetFlow}
              >
                <RotateCcw className="h-4 w-4 mr-1.5 shrink-0" />
                返回首頁
              </Button>
            )}
          </div>

          {role === null && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium justify-end">
              <a
                href={tools.askIvy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.38_0.06_290)] hover:text-[oklch(0.52_0.14_280)] transition-colors"
              >
                問問 AI
              </a>
              <a
                href={tools.calculator.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.38_0.06_290)] hover:text-[oklch(0.52_0.14_280)] transition-colors"
              >
                工具箱
              </a>
              <Link
                href="/about"
                className="text-[oklch(0.38_0.06_290)] hover:text-[oklch(0.52_0.14_280)] transition-colors"
              >
                認識好理家在
              </Link>
              <a
                href={events.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.38_0.06_290)] hover:text-[oklch(0.52_0.14_280)] transition-colors"
              >
                活動
              </a>
              <a
                href={tools.personalCenter.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-[oklch(0.62_0.16_25)] to-[oklch(0.68_0.14_45)] px-4 py-2 text-white text-sm shadow-sm hover:opacity-95 transition-opacity"
              >
                登入／註冊
              </a>
            </div>
          )}

          {role !== null && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-muted-foreground leading-snug hidden sm:inline max-w-[10rem]">
                登入狀態
                <span className="block text-[10px] font-normal opacity-80">（示意）</span>
              </span>
              <div
                className="flex flex-1 sm:flex-initial rounded-lg border border-border/60 bg-muted/40 p-1 gap-1 min-w-0"
                role="group"
                aria-label="切換登入狀態示意"
              >
                <Button
                  type="button"
                  size="sm"
                  variant={demoLoggedIn ? 'ghost' : 'default'}
                  onClick={() => setDemoLoggedIn(false)}
                  className="flex-1 sm:flex-initial min-h-9 px-3 sm:px-4 shadow-none"
                >
                  <LogOut className="h-4 w-4 mr-1.5 shrink-0" />
                  未登入
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={demoLoggedIn ? 'default' : 'ghost'}
                  onClick={() => setDemoLoggedIn(true)}
                  className="flex-1 sm:flex-initial min-h-9 px-3 sm:px-4 shadow-none"
                >
                  <LogIn className="h-4 w-4 mr-1.5 shrink-0" />
                  已登入
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {role === null && <IdentitySelection onSelectRole={handleSelectRole} />}

      {role === 'public' && !demoLoggedIn && (
        <FeatureGuidePage onSimulateLoggedIn={() => setDemoLoggedIn(true)} />
      )}

      {role === 'public' && demoLoggedIn && <UserDashboard />}

      {role === 'worker' && !demoLoggedIn && (
        <SocialWorkerGuest onSimulateLoggedIn={() => setDemoLoggedIn(true)} />
      )}

      {role === 'worker' && demoLoggedIn && <SocialWorkerDashboard />}
    </div>
  );
}
