import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddListingPage from './pages/AddListingPage'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <div>
      <header>
        <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Link to="/"><h2>Newmark Listings</h2></Link>
          <nav style={{display:'flex', gap:12}}>
            <Link to="/add"><button className="btn">Add Listing</button></Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddListingPage />} />
          <Route path="/listings/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
