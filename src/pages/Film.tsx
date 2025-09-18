import { useSearchParams, useLocation } from 'react-router-dom'
import '../styles/components/film.scss'

type FilmCard = { id: number; title: string; img?: string }

export default function Film() {
    const [sp] = useSearchParams()
    const category = (sp.get('category') ?? 'adventure') as 'adventure' | 'action' | 'fantasy'

    const location = useLocation()
    const film = (location.state as { film?: FilmCard })?.film

    if (!film) {
        return (
            <div className="film">
                <p>No data, sorry</p>
            </div>
        )
    }

    return (
        <div className={`film film--${category}`}>
            <div className="film__media">
                {film.img && <img src={film.img} alt={film.title} />}
            </div>
            <div className="film__body">
                <h2 className="film__title">{film.title}</h2>
                <p className="film__overview">Descripción placeholder (más tarde vendrá de la API).</p>

                <div className="film__actions">
                    <button className="btn btn--primary">Add to wishlist</button>
                </div>
            </div>
        </div>
    )
}
