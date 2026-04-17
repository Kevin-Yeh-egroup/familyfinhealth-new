/** 本機入口頁：記住使用者曾進入民眾／社工流程，以便下次顯示工作站捷徑 */

const KEY_USED_PUBLIC = 'ffh-entry-used-public';
const KEY_USED_WORKER = 'ffh-entry-used-worker';
const KEY_LAST_ROLE = 'ffh-entry-last-role';

export type EntryRole = 'public' | 'worker';

export type EntryReturnHints = {
  usedPublic: boolean;
  usedWorker: boolean;
  lastRole: EntryRole | null;
};

export function recordEntryRole(role: EntryRole): void {
  if (typeof window === 'undefined') return;
  if (role === 'public') localStorage.setItem(KEY_USED_PUBLIC, '1');
  if (role === 'worker') localStorage.setItem(KEY_USED_WORKER, '1');
  localStorage.setItem(KEY_LAST_ROLE, role);
}

export function getEntryReturnHints(): EntryReturnHints {
  if (typeof window === 'undefined') {
    return { usedPublic: false, usedWorker: false, lastRole: null };
  }
  const last = localStorage.getItem(KEY_LAST_ROLE);
  const lastRole: EntryRole | null = last === 'public' || last === 'worker' ? last : null;
  return {
    usedPublic: localStorage.getItem(KEY_USED_PUBLIC) === '1',
    usedWorker: localStorage.getItem(KEY_USED_WORKER) === '1',
    lastRole,
  };
}
