import Card from './Card'
import '../styles/components/carousel.scss';

const dummyFilms = [
    { id: 1, title: 'Jurassic Park', img: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/files/jurassicpark.mpw_500x749.jpg?v=1713805481' },
    { id: 2, title: 'Gladiator', img: 'https://www.movieposters.com/cdn/shop/files/Gladiator.mpw.102813_480x.progressive.jpg?v=1707500493' },
    { id: 3, title: 'Back To The Future', img: 'https://www.movieposters.com/cdn/shop/files/backtofuture.mpw_480x.progressive.jpg?v=1708444122' },
]

type Props = {
    title: string
    category: 'adventure' | 'action' | 'fantasy'
}

export default function Carousel({ title, category }: Props) {
    return (
        <div className="carousel">
            <h3>{title}</h3>
            <div className="carousel-items">
                {dummyFilms.map((film) => (
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
