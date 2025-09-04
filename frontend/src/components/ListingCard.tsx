import { Link } from 'react-router-dom'
import type { Listing } from '../types'

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>{listing.title}</h3>
        <strong>${listing.price.toLocaleString()}</strong>
      </div>
      <div style={{color:'#4b5563'}}>{listing.location}</div>
      <p style={{marginTop:8}}>{listing.description}</p>
      <Link to={`/listings/${listing.id}`}><button className="btn secondary" style={{marginTop:8}}>View</button></Link>
    </div>
  )
}
