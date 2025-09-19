import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import compression from 'compression'
import serveStatic from 'serve-static'
import { fileURLToPath, pathToFileURL } from 'node:url'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(compression())
app.use(serveStatic(path.resolve(__dirname, '../dist/client'), { index: false }))

// Proxy TMDB (igual que antes)
app.use('/api/tmdb', async (req, res) => {
    try {
        const subpath = req.originalUrl.replace(/^\/api\/tmdb/, '')
        const url = new URL('https://api.themoviedb.org/3' + subpath)
        const apiKey = process.env.TMDB_API_KEY
        if (!apiKey) return res.status(500).json({ error: 'Falta TMDB_API_KEY' })
        url.searchParams.set('api_key', apiKey)

        const r = await fetch(url, { headers: { accept: 'application/json' } })
        const text = await r.text()
        res.status(r.status).type(r.headers.get('content-type') || 'application/json').send(text)
    } catch {
        res.status(500).json({ error: 'Proxy error' })
    }
})

app.use('*', async (req, res) => {
    const url = req.originalUrl

    const template = fs.readFileSync(
        path.resolve(__dirname, '../dist/client/index.html'),
        'utf-8'
    )

    const serverEntryPath = path.resolve(__dirname, '../dist/server/entry-server.js')
    const { render } = await import(pathToFileURL(serverEntryPath).href)

    const { html } = await render(url)
    const out = template.replace('<!--app-html-->', html)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(out)
})

const port = 4173
app.listen(port, () => {
    console.log(`SSR prod server: http://localhost:${port}`)
})
