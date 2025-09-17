import '../styles/components/card.scss';

export default function Card({ title, img }: { title: string; img: string }) {
    return (
        <div className="card">
            <img src={img} alt={title} />
            <div className="title">{title}</div>
        </div>
    )
}