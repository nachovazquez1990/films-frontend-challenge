import '../styles/components/header.scss';

export default function Header() {
    return (
        <div className="header">
            <h1>Films</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/whistlist">Whistlist</a>
            </nav>
        </div>
    )
}