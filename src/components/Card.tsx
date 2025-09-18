import { Link } from 'react-router-dom'
import '../styles/components/card.scss';

type FilmCard = { id: number; title: string; img: string }

export default function Card({ film, to }: { film: FilmCard; to?: string }) {
    const href = to ?? `/film/${film.id}`
    return (
        <Link to={href} state={{ film }} className="card">
            <img src={film.img} alt={film.title} />
            <div className="title">{film.title}</div>
        </Link>
    )
}

