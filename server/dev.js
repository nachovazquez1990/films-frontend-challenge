import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()

    app.use('/api/tmdb', async (req, res) => {
        try {
            const subpath = req.originalUrl.replace(/^\/api\/tmdb/, '')
            const url = new URL('https://api.themoviedb.org/3' + subpath)
            const apiKey = process.env.TMDB_API_KEY
            if (!apiKey) return res.status(500).json({ error: 'Falta TMDB_API_KEY' })
            url.searchParams.set('api_key', apiKey)

            const r = await fetch(url, { headers: { accept: 'application/json' } })
            const text = await r.text()
            res
                .status(r.status)
                .type(r.headers.get('content-type') || 'application/json')
                .send(text)
        } catch (err) {
            res.status(500).json({ error: 'Proxy error' })
        }
    })

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
    })

    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        try {
            let template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)
            const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
            const { html } = await render(url)
            const htmlOut = template.replace('<!--app-html-->', html)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlOut)
        } catch (e) {
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    const port = 5173
    app.listen(port, () => {
        console.log(`SSR dev server: http://localhost:${port}`)
    })
}

createServer()
