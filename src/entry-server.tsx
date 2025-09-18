import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import './styles/globals.scss'

export async function render(url: string) {
    const html = renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    )
    return { html }
}
