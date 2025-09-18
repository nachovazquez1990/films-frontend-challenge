import { Link } from 'react-router-dom'
import '../styles/components/card.scss';
import type { FilmCard } from '../lib/types'

export default function Card({ film, to, className }: { film: FilmCard; to?: string; className?: string }) {
    const href = to ?? `/film/${film.id}`
    return (
        <Link to={href} state={{ film }} className={`card ${className ?? ''}`}>
            {film.img && <img src={film.img} alt={film.title} />}
            <div className="title">{film.title}</div>
        </Link>
    )
}
