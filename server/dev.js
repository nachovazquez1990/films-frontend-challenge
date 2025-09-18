import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
    })

    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        try {
            const url = req.originalUrl
            const indexHtmlPath = path.resolve(__dirname, '../index.html')
            let template = fs.readFileSync(indexHtmlPath, 'utf-8')
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
