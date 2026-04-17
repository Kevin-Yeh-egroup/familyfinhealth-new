/** 認識好理家在 — 我們的服務 */
export const aboutServices = [
  {
    icon: '🌸',
    theme: 'pink' as const,
    title: '財務健康檢測',
    subtitle: '輕鬆了解財務狀況',
    description: '3 分鐘了解您的財務狀況，就像看健康報告一樣簡單',
  },
  {
    icon: '☕',
    theme: 'blue' as const,
    title: 'AI 智能助手',
    subtitle: '隨時陪伴解答',
    description: '像和朋友喝茶聊天一樣，隨時為您解答財務疑問',
  },
  {
    icon: '🌈',
    theme: 'orange' as const,
    title: '專業陪伴支持',
    subtitle: '真人社工溫暖同行',
    description: '專業社工團隊溫暖陪伴，陪您走過每個財務困境',
  },
  {
    icon: '🔐',
    theme: 'cyan' as const,
    title: '隱私完全保護',
    subtitle: '安心又放心',
    description: '您的資料像寶物一樣被妥善保護，絕對安全放心',
  },
  {
    icon: '📚',
    theme: 'neutral' as const,
    title: '理財知識庫',
    subtitle: '豐富學習資源',
    description: '豐富的理財知識與溫馨案例，陪您慢慢成長',
  },
  {
    icon: '🎯',
    theme: 'rose' as const,
    title: '個人化方案',
    subtitle: '量身打造計畫',
    description: '為您量身打造的改善計畫，一步一步達成目標',
  },
];

export type MediaOutletId =
  | 'all'
  | 'economic'
  | 'commercial'
  | 'liberty'
  | 'udn'
  | 'yahoo'
  | 'zhixin'
  | 'cna'
  | 'others';

export type MediaArticle = {
  id: number;
  outletId: Exclude<MediaOutletId, 'all'>;
  title: string;
  date: string;
  href: string;
};

/** 媒體標籤（總篇數 38） */
export const mediaOutlets: {
  id: MediaOutletId;
  label: string;
  count: number;
}[] = [
  { id: 'all', label: '全部', count: 38 },
  { id: 'economic', label: '經濟日報', count: 6 },
  { id: 'commercial', label: '工商時報', count: 5 },
  { id: 'liberty', label: '自由財經', count: 3 },
  { id: 'udn', label: '聯合新聞網', count: 2 },
  { id: 'yahoo', label: 'Yahoo 新聞', count: 4 },
  { id: 'zhixin', label: '知新聞', count: 5 },
  { id: 'cna', label: '中央社', count: 4 },
  { id: 'others', label: '其他媒體', count: 9 },
];

const extraTitles = [
  '數位財務顧問成趨勢 平台強調隱私與陪伴',
  '企業 CSR 聚焦財務福祉 星展基金會再捐贈',
  '社工分享：財務議題成個案主訴之一',
  '防詐與預算並重 健檢網更新互動教材',
  '青年族群財務壓力升溫 線上工具需求增',
  '地方縣市導入財務諮詢轉介機制',
  '專家談家庭財務韌性：儲備與保障雙軌',
  '好理家在獲獎肯定 持續優化 AI 陪伴體驗',
  '社福團體肯定數位轉譯 降低理財諮詢門檻',
  '從健檢到行動方案 使用者分享心路歷程',
  '金融科技與社會工作跨域合作案例增加',
  '偏鄉學校導入財商體驗課 迴響熱烈',
  '心理師談財務焦慮：早期辨識與資源連結',
  '星展基金會：將持續投入家庭財務韌性',
  'AI 助理語氣優化 更重視情緒支持語彙',
  '全台社工培力工作坊 聚焦財務議題辨識',
  '民眾最關心三大題：債務、儲蓄與保障',
  '平台統計：完成健檢後諮詢轉介率提升',
  '國際趨勢觀察 台灣數位財務教育後來居上',
  '好理家在改版上線 介面更友善長者使用',
  '公私協力推廣 財務健檢走入社區據點',
  '研究指出：財務壓力與身心健康高度相關',
  '新北試辦方案 社工可一鍵轉介財務資源',
  '高雄社福中心導入團體財務成長課程',
  '桃園青年創業者善用試算工具規劃現金流',
  '台中親子理財營隊結合遊戲化學習',
  '彰化農村社區推廣簡易記帳與預算表',
  '南投原鄉部落數位落差獲補助改善',
  '雲林家庭支持團體分享債務協商經驗',
  '嘉義長照家庭關心醫療與長照財務配置',
  '台南中小企業主關注營運與家庭財務切割',
  '屏東漁民季節收入波動 工具協助平滑支出',
  '宜蘭新住民家庭透過多語素材理解權益',
  '花蓮震後理財重建 心理與財務並重',
  '台東部落青年返鄉 試算創業損益平衡點',
  '澎湖離島視訊諮詢試辦 縮短服務距離',
  '金門軍公教族群關注退休規劃與保險',
  '馬祖交通成本高 預算工具協助精準控管',
];

function buildMediaArticles(): MediaArticle[] {
  type O = Exclude<MediaOutletId, 'all'>;
  const rows: { outletId: O; title: string; date: string }[] = [
    {
      outletId: 'zhixin',
      title: '星展基金會3年砸近億元 打造AI財務健檢系統',
      date: '2023/03/19',
    },
    {
      outletId: 'cna',
      title: '星展基金會投入近億元 打造全台首創AI財務健檢系統',
      date: '2023/03/19',
    },
    {
      outletId: 'commercial',
      title:
        '《金融》強化全民財務韌性 星展耗資近億元首創AI財務健檢系統',
      date: '2023/03/19',
    },
    {
      outletId: 'economic',
      title: 'AI 財務健檢助攻弱勢家庭 星展基金會擴大社會影響力',
      date: '2023/03/22',
    },
    {
      outletId: 'udn',
      title: '好理家在攜手社工 推動社區財務韌性計畫',
      date: '2023/04/01',
    },
    {
      outletId: 'yahoo',
      title: '從數據看財務焦慮 線上健檢工具使用率攀升',
      date: '2023/04/10',
    },
    {
      outletId: 'liberty',
      title: '理財教育走入偏鄉 數位工具降低諮詢門檻',
      date: '2023/04/18',
    },
    {
      outletId: 'others',
      title: '社福團體：財務健檢有助早期發現高風險家庭',
      date: '2023/05/02',
    },
  ];

  const need: Record<O, number> = {
    economic: 6,
    commercial: 5,
    liberty: 3,
    udn: 2,
    yahoo: 4,
    zhixin: 5,
    cna: 4,
    others: 9,
  };

  const have: Record<O, number> = {
    economic: 0,
    commercial: 0,
    liberty: 0,
    udn: 0,
    yahoo: 0,
    zhixin: 0,
    cna: 0,
    others: 0,
  };

  for (const r of rows) {
    have[r.outletId] += 1;
  }

  const order: O[] = [
    'economic',
    'commercial',
    'liberty',
    'udn',
    'yahoo',
    'zhixin',
    'cna',
    'others',
  ];
  let ti = 0;
  for (const o of order) {
    while (have[o] < need[o]) {
      rows.push({
        outletId: o,
        title: extraTitles[ti % extraTitles.length],
        date: `2023/${String((ti % 9) + 1).padStart(2, '0')}/${String((ti % 26) + 1).padStart(2, '0')}`,
      });
      have[o] += 1;
      ti += 1;
    }
  }

  const href = 'https://www.familyfinhealth.com';
  return rows.map((r, i) => ({
    id: i + 1,
    outletId: r.outletId,
    title: r.title,
    date: r.date,
    href,
  }));
}

export const mediaArticles: MediaArticle[] = buildMediaArticles();

export const outletAccent: Record<
  Exclude<MediaOutletId, 'all'>,
  string
> = {
  economic: 'bg-sky-400',
  commercial: 'bg-violet-400',
  liberty: 'bg-emerald-400',
  udn: 'bg-amber-400',
  yahoo: 'bg-rose-300',
  zhixin: 'bg-sky-300',
  cna: 'bg-emerald-300',
  others: 'bg-slate-300',
};

export const outletBorder: Record<
  Exclude<MediaOutletId, 'all'>,
  string
> = {
  economic: 'border-l-sky-400',
  commercial: 'border-l-violet-400',
  liberty: 'border-l-emerald-400',
  udn: 'border-l-amber-400',
  yahoo: 'border-l-rose-300',
  zhixin: 'border-l-sky-300',
  cna: 'border-l-emerald-300',
  others: 'border-l-slate-300',
};

export const outletLabel: Record<Exclude<MediaOutletId, 'all'>, string> = {
  economic: '經濟日報',
  commercial: '工商時報',
  liberty: '自由財經',
  udn: '聯合新聞網',
  yahoo: 'Yahoo 新聞',
  zhixin: '知新聞',
  cna: '中央社訊息平台',
  others: '其他媒體',
};
