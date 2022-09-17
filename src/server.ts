import React from 'react'
// @ts-ignore
import App from './app.tsx'
import express from 'express'
import ReactDOMServer from 'react-dom/server'

const app = express()

app.use(express.static('dist'))

app.get('/share/:id', (req, res) => {
  global.window = {} as any
  // const component = ReactDOMServer.renderToString(React.createElement(App))
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
      <script src="http://localhost/main.js"></script>
    </body>
    </html>
  `
  return res.send(html)
})

app.listen(80, () => {
  console.log(`Server running at 80`)
})