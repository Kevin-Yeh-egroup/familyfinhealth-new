'use client';

import Image from 'next/image';
import Link from 'next/link';
import { familyFinHealthUrls } from '@/lib/familyfinhealth-urls';
import { cn } from '@/lib/utils';

type PublicMarketingNavProps = {
  /** 目前所在行銷內頁（首頁不傳即可） */
  current?: 'about';
};

const linkClass =
  'text-[oklch(0.38_0.06_290)] hover:text-[oklch(0.52_0.14_280)] transition-colors';
const linkActiveClass = 'text-[oklch(0.52_0.14_280)] font-semibold';

export function PublicMarketingNav({ current }: PublicMarketingNavProps) {
  const { tools, events } = familyFinHealthUrls;

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/80',
        'border-[oklch(0.88_0.04_350_/_0.45)] bg-[oklch(0.99_0.015_85)]/92 supports-[backdrop-filter]:bg-[oklch(0.99_0.015_85)]/85'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 md:py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <h1 className="m-0 shrink-0 min-w-0">
            <Link href="/" className="block">
              <Image
                src="/logo-family-financial-health.png"
                alt="好理家在財務健檢網"
                width={320}
                height={72}
                className="h-9 w-auto md:h-11 max-w-[min(100%,280px)] object-contain object-left"
                priority
              />
            </Link>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium justify-end">
          <a
            href={tools.askIvy.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            問問 AI
          </a>
          <a
            href={tools.calculator.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            工具箱
          </a>
          <Link
            href="/about"
            className={cn(linkClass, current === 'about' && linkActiveClass)}
          >
            認識好理家在
          </Link>
          <a
            href={events.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
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
      </div>
    </nav>
  );
}
