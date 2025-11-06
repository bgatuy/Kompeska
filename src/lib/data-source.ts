import type { DataModel } from '@/types/models'
import localData from '@/data/kompeska.json'

const LS_KEY = 'kompeska.data'

export function hasLocalOverride() {
  try { return typeof localStorage !== 'undefined' && !!localStorage.getItem(LS_KEY) } catch { return false }
}

export function clearLocalOverride() {
  try { if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_KEY) } catch {}
}

export function saveLocalOverride(data: DataModel) {
  try { if (typeof localStorage !== 'undefined') localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}

export async function loadData(): Promise<DataModel> {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) return JSON.parse(raw) as DataModel
    }
  } catch {}
  return Promise.resolve(localData as DataModel)
}
