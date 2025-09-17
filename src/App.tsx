import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Film from './pages/Film'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  )
}
