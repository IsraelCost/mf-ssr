import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/share/:id', (req, res) => {
  global.window = {} as any
  const { id } = req.params
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${id}</title>
      <meta property="og:title" content="Mapa Interativo">
    </head>
    <body>
      <div id="app"></div>
      <script src="/public/main.js"></script>
    </body>
    </html>
  `
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(html)
})

app.use(express.static('dist'))

app.listen(80, () => {
  console.log(`Server running at 80`)
})