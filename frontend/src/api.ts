import type { Listing, SummaryResponse } from './types'

export async function getListings(q?: string): Promise<Listing[]> {
  const url = q ? `/listings?q=${encodeURIComponent(q)}` : '/listings'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch listings')
  return res.json()
}

export async function addListing(data: Omit<Listing,'id'>): Promise<Listing> {
  const res = await fetch('/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to add listing')
  return res.json()
}

export async function getListing(id: number): Promise<Listing> {
  const res = await fetch(`/listings/${id}`)
  if (!res.ok) throw new Error('Listing not found')
  return res.json()
}

export async function summarize(id: number): Promise<SummaryResponse> {
  const res = await fetch(`/listings/${id}/summary`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to get summary')
  return res.json()
}
