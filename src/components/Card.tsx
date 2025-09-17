import { Link } from 'react-router-dom'
import '../styles/components/card.scss'

export type Film = { id: number; title: string; img: string }

export default function Card({ film }: { film: Film }) {
    return (
        <Link to={`/film/${film.id}`} className="card">
            <img src={film.img} alt={film.title} />
            <div className="title">{film.title}</div>
        </Link>
    )
}
