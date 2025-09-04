import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListing, summarize } from '../api'
import type { Listing } from '../types'

export default function DetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [bullets, setBullets] = useState<string[]>([])
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        setErr(null)
        const data = await getListing(Number(id))
        setListing(data)
      } catch (e: any) {
        setErr(e.message || 'Error')
      }
    })()
  }, [id])

  async function onSummarize() {
    if (!id) return
    try {
      setErr(null)
      const res = await summarize(Number(id))
      setBullets(res.bullets)
    } catch (e: any) {
      setErr(e.message || 'Error')
    }
  }

  if (err) return <div className="card" style={{color:'#b91c1c'}}>Error: {err}</div>
  if (!listing) return <div className="card">Loading...</div>

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>{listing.title}</h2>
      <div><strong>${listing.price.toLocaleString()}</strong> — {listing.location}</div>
      <p style={{marginTop:8}}>{listing.description}</p>
      <button className="btn" onClick={onSummarize}>Generate AI Summary</button>
      {bullets.length > 0 && (
        <ul>
          {bullets.map((b,i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  )
}
