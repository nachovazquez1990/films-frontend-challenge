import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import compression from 'compression'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(compression())
app.use(serveStatic(path.resolve(__dirname, '../dist/client'), { index: false }))

app.use('*', async (req, res) => {
    const url = req.originalUrl

    const template = fs.readFileSync(
        path.resolve(__dirname, '../dist/client/index.html'),
        'utf-8'
    )

    const { render } = await import(path.resolve(__dirname, '../dist/server/entry-server.js'))
    const { html } = await render(url)
    const out = template.replace('<!--app-html-->', html)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(out)
})

const port = 4173
app.listen(port, () => {
    console.log(`SSR prod server: http://localhost:${port}`)
})
