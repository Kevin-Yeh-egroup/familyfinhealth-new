import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/about-page-content';
import { PublicMarketingNav } from '@/components/public-marketing-nav';

export const metadata: Metadata = {
  title: '認識好理家在｜好理家在財務健檢網',
  description:
    '我們的服務、獲獎殊榮與媒體報導，認識好理家在財務健檢網如何陪伴您的財務健康之路。',
};

export default function AboutPage() {
  return (
    <>
      <PublicMarketingNav current="about" />
      <AboutPageContent />
    </>
  );
}
