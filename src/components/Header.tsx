import { Link, NavLink } from 'react-router-dom'
import '../styles/components/header.scss';

export default function Header() {
    return (
        <div className="header">
            <Link to="/" className="logo"><h1>Films</h1></Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
            </nav>
        </div>
    )
}