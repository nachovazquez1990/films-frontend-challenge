import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import type { FilmCard, TMDBMovieDetail } from '../lib/types'
import { fetchMovieDetail, imageUrl } from '../lib/api'
import { useWishlist } from '../state/wishlistStore'
import '../styles/components/film.scss'

export default function Film() {
    const { id } = useParams()
    const [sp] = useSearchParams()
    const category = (sp.get('category') ?? 'adventure') as 'adventure' | 'action' | 'fantasy'

    const location = useLocation()
    const filmFromState = (location.state as { film?: FilmCard })?.film

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [detail, setDetail] = useState<TMDBMovieDetail | null>(null)

    const add = useWishlist((s) => s.add)
    const remove = useWishlist((s) => s.remove)
    const has = useWishlist((s) => s.has)
    const inWishlist = id ? has(Number(id)) : false

    useEffect(() => {
        if (!id) return
        let active = true
        setLoading(true)
        setError(null)
        fetchMovieDetail(id)
            .then((d) => active && setDetail(d))
            .catch((e) => active && setError(String(e)))
            .finally(() => active && setLoading(false))
        return () => { active = false }
    }, [id])

    if (!id) return <div className="film"><p>Missing id</p></div>

    const title = detail?.title ?? filmFromState?.title ?? `Film ${id}`
    const poster = imageUrl(detail?.poster_path, 'w500') || filmFromState?.img
    const overview = detail?.overview ?? 'No description available yet'
    const tagline = detail?.tagline

    return (
        <div className={`film film--${category}`}>
            <div className="film__media">
                {poster && <img src={poster} alt={title} />}
            </div>
            <div className="film__body">
                <h2 className="film__title">{title}</h2>
                {tagline && <div className="film__tagline">“{tagline}”</div>}
                {loading ? <p>Loading…</p> : error ? <p>{error}</p> : <p className="film__overview">{overview}</p>}
                <div className="film__actions">
                    {!inWishlist ? (
                        <button className="btn btn--primary" onClick={() => add({ id: Number(id), title, img: poster })}>
                            Add to wishlist
                        </button>
                    ) : (
                        <button className="btn btn--danger" onClick={() => remove(Number(id))}>
                            Remove from wishlist
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
