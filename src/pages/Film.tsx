import { useParams, useLocation } from 'react-router-dom'
import type { Film as FilmType } from '../components/Card'
import { useWishlist } from '../state/wishlistStore'
import '../styles/components/film.scss';

export default function Film() {
    const { id } = useParams()
    const location = useLocation()
    const film = (location.state as { film?: FilmType })?.film

    const add = useWishlist((s) => s.add)
    const remove = useWishlist((s) => s.remove)
    const has = useWishlist((s) => s.has)
    const inWishlist = id ? has(Number(id)) : false

    if (!film) {
        return (
            <div>
                <p>No data, sorry</p>
            </div>
        )
    }

    return (
        <div className="film">
            <div>
                <img src={film.img} alt={film.title} />
            </div>
            <div>
                <h2>{film.title}</h2>
                <p>Description....</p>

                {!inWishlist ? (
                    <button onClick={() => add({ id: film.id, title: film.title, img: film.img })}> Add to wishlist </button>
                ) : (
                    <button onClick={() => remove(film.id)}> Remove from wishlist </button>
                )}
            </div>
        </div>
    )
}
