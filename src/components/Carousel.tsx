import { useEffect, useState } from 'react'
import Card from './Card'
import '../styles/components/carousel.scss';
import type { FilmCard } from '../lib/types'
import { GENRES, fetchMoviesByGenre } from '../lib/api'

type Props = {
    title: string
    category: 'adventure' | 'history' | 'animation'
}

export default function Carousel({ title, category }: Props) {
    const [items, setItems] = useState<FilmCard[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let active = true
        setLoading(true)
        setError(null)

        fetchMoviesByGenre(GENRES[category])
            .then((list) => {
                if (!active) return
                setItems(list)
            })
            .catch((e) => {
                if (!active) return
                setError(String(e))
            })
            .finally(() => active && setLoading(false))

        return () => { active = false }
    }, [category])

    return (
        <div className="carousel">
            <h3>{title}</h3>
            <div className="carousel-items">
                {loading && <div className="loading">Loading…</div>}
                {error && <div className="error">{error}</div>}
                {items.map((film) => (
                    <Card
                        key={film.id}
                        film={film}
                        to={`/film/${film.id}?category=${category}`}
                    />
                ))}
            </div>
        </div>
    )
}
