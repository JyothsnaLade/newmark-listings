import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addListing } from '../api'

export default function AddListingPage() {
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setErr(null)
    const p = parseFloat(price)
    if (!title || !location || !description || isNaN(p) || p < 0) {
      setErr('Please fill all fields; price must be a non-negative number.')
      return
    }
    try {
      const created = await addListing({ title, price: p, location, description })
      nav(`/listings/${created.id}`)
    } catch (e: any) {
      setErr(e.message || 'Failed to create listing')
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Add Listing</h3>
      <div className="row">
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Cozy Studio" />
        </div>
        <div>
          <label>Price (USD)</label>
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="1500" />
        </div>
      </div>
      <div>
        <label>Location</label>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, ST" />
      </div>
      <div>
        <label>Description</label>
        <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the property..." />
      </div>
      {err && <div style={{color:'#b91c1c'}}>{err}</div>}
      <div style={{marginTop:12}}>
        <button className="btn" type="submit">Create</button>
      </div>
    </form>
  )
}
