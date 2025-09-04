import { describe, it, expect } from 'vitest'
import { filterListings } from '../utils/filter'

const items = [
  { id:1, title:'Sunny 2BR', price:2000, location:'Jersey City, NJ', description:'Near PATH' },
  { id:2, title:'Loft', price:3500, location:'San Francisco, CA', description:'Exposed brick' },
]

describe('filterListings', () => {
  it('returns all when empty query (happy path)', () => {
    const out = filterListings(items as any, '')
    expect(out.length).toBe(2)
  })
  it('filters by keyword (edge case: numeric match)', () => {
    const out = filterListings(items as any, '3500')
    expect(out.length).toBe(1)
    expect(out[0].id).toBe(2)
  })
})
