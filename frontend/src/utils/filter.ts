import type { Listing } from '../types'

export function filterListings(items: Listing[], q: string): Listing[] {
  const qq = q.trim().toLowerCase()
  if (!qq) return items
  return items.filter(l => 
    l.title.toLowerCase().includes(qq) ||
    l.location.toLowerCase().includes(qq) ||
    l.description.toLowerCase().includes(qq) ||
    String(l.price).includes(qq)
  )
}
