import { useEffect, useState } from 'react'
import Card from './Card'
import '../styles/components/carousel.scss'
import type { FilmCard } from '../lib/types'
import { fetchMoviesByGenre } from '../lib/api'

type Props = {
    title: string
    category: 'adventure' | 'history' | 'animation'
}

export default function Carousel({ title, category }: Props) {
    const [items, setItems] = useState<FilmCard[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let cancelled = false
        async function run() {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchMoviesByGenre(category)
                if (!cancelled) setItems(data)
            } catch (e: unknown) {
                if (!cancelled) {
                    if (e instanceof Error) {
                        setError(e.message)
                    } else {
                        setError('Error loading movies')
                    }
                }
            }
            finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => {
            cancelled = true
        }
    }, [category])

    return (
        <div className="carousel">
            <div className="carousel-header">
                <h3>{title}</h3>
            </div>
            <div className="carousel-items">
                {loading && <div className="loading">Loading…</div>}
                {error && <div className="error">{error}</div>}
                {items.map((film) => (
                    <Card key={film.id} film={film} to={`/film/${film.id}?category=${category}`} />
                ))}
            </div>
        </div>
    )
}
