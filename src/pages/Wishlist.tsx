import Carousel from '../components/Carousel'
import { useWishlist } from '../state/wishlistStore'

export default function Wishlist() {
    const items = useWishlist((s) => s.items)

    return (
        <div>
            {items.length === 0 ? (
                <p>No movies on your wishlist yet</p>
            ) : (
                <Carousel title="Wishlist" items={items} />
            )}
        </div>
    )
}
