import { useEffect, useState, useRef } from 'react'
import Card from './Card'
import '../styles/components/carousel.scss'
import type { FilmCard } from '../lib/types'
import { fetchMoviesByGenre } from '../lib/api'

type Props = {
    title: string
    category?: 'adventure' | 'history' | 'animation'
    items?: FilmCard[]
}

export default function Carousel({ title, category, items: externalItems }: Props) {
    const [fetchedItems, setItems] = useState<FilmCard[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (externalItems && externalItems.length >= 0) {
            setLoading(false)
            setError(null)
            return
        }
        if (!category) return
        const cat = category as 'adventure' | 'history' | 'animation'

        let cancelled = false
        async function run() {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchMoviesByGenre(cat)
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
    }, [category, externalItems])


    const scrollByCards = (dir: 'left' | 'right') => {
        const el = containerRef.current
        if (!el) return
        const cardWidth = el.firstElementChild instanceof HTMLElement
            ? el.firstElementChild.offsetWidth + 16
            : 200
        el.scrollBy({ left: dir === 'left' ? -cardWidth * 3 : cardWidth * 3, behavior: 'smooth' })
    }

    const data = externalItems ?? fetchedItems

    return (
        <div className="carousel">
            <h3>{title}</h3>
            <div className="carousel-wrapper">
                <button className="carousel-btn left" onClick={() => scrollByCards('left')}>‹</button>
                <div className="carousel-items" ref={containerRef}>
                    {loading && <div className="loading">Loading…</div>}
                    {error && <div className="error">{error}</div>}
                    {data.map((film) => (
                        category ?
                            <Card key={film.id} film={film} to={`/film/${film.id}?category=${category}`} />
                            :
                            <Card key={film.id} film={film} to={`/film/${film.id}?category=${film.category}`} />
                    ))}
                </div>
                <button className="carousel-btn right" onClick={() => scrollByCards('right')}>›</button>
            </div>
        </div>
    )
}

