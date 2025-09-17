import { Link } from 'react-router-dom'
import '../styles/components/card.scss'
import type { FilmCard } from '../lib/types.ts'

export type Film = { id: number; title: string; img: string }

type Props = { film: FilmCard }

export default function Card({ film }: Props) {
    return (
        <Link to={`/film/${film.id}`} state={{ film }} className="card">
            <img src={film.img} alt={film.title} />
            <div className="title">{film.title}</div>
        </Link>
    )
}
