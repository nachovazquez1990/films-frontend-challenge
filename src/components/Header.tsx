import { NavLink } from 'react-router-dom'
import '../styles/components/header.scss';

export default function Header() {
    return (
        <nav className="header">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>
    )
}