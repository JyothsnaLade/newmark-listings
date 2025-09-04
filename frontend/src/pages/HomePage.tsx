import { useEffect, useState } from 'react'
import { getListings } from '../api'
import ListingCard from '../components/ListingCard'
import type { Listing } from '../types'

export default function HomePage() {
  const [items, setItems] = useState<Listing[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  async function load(query?: string) {
    try {
      setLoading(true)
      setErr(null)
      const data = await getListings(query)
      setItems(data)
    } catch (e: any) {
      setErr(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const id = setTimeout(() => load(q), 250)
    return () => clearTimeout(id)
  }, [q])

  return (
    <div>
      <div className="card">
        <input placeholder="Search by keyword..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {loading && <div className="card">Loading...</div>}
      {err && <div className="card" style={{color:'#b91c1c'}}>Error: {err}</div>}
      {!loading && !err && items.map(l => <ListingCard key={l.id} listing={l} />)}
    </div>
  )
}
