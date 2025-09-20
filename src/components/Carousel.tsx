import { useEffect, useState, useRef } from 'react'
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

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let cancelled = false
        async function run() {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchMoviesByGenre(category)
                if (!cancelled) setItems(data)
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : 'Error loading movies')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => {
            cancelled = true
        }
    }, [category])

    const scrollByCards = (dir: 'left' | 'right') => {
        const el = containerRef.current
        if (!el) return
        const cardWidth = el.firstElementChild instanceof HTMLElement
            ? el.firstElementChild.offsetWidth + 16
            : 200
        el.scrollBy({ left: dir === 'left' ? -cardWidth * 3 : cardWidth * 3, behavior: 'smooth' })
    }

    return (
        <div className="carousel">
            <h3>{title}</h3>
            <div className="carousel-wrapper">
                <button className="carousel-btn left" onClick={() => scrollByCards('left')}>‹</button>
                <div className="carousel-items" ref={containerRef}>
                    {loading && <div className="loading">Loading…</div>}
                    {error && <div className="error">{error}</div>}
                    {items.map((film) => (
                        <Card key={film.id} film={film} to={`/film/${film.id}?category=${category}`} />
                    ))}
                </div>
                <button className="carousel-btn right" onClick={() => scrollByCards('right')}>›</button>
            </div>
        </div>
    )
}
