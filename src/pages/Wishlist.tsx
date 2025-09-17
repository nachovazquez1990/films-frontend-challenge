import { useWishlist } from '../state/wishlistStore'
import '../styles/components/wishlist.scss';
import Card from '../components/Card'

export default function Wishlist() {
    const items = useWishlist((s) => s.items)
    const remove = useWishlist((s) => s.remove)

    return (
        <div className='wishlist' style={{ marginTop: '1rem' }}>
            <h2>Wishlist</h2>

            {items.length === 0 ? (
                <p>No movies on your wishlist yet</p>
            ) : (
                <ul >
                    {items.map((film) => (
                        <li key={film.id}>
                            <Card film={film} />
                            <button onClick={() => remove(film.id)} >Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
