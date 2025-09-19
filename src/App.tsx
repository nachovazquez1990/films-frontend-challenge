import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Film from './pages/Film'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/404'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<Film />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
