import express from 'express'
import cors from 'cors'

const app = express()

const getHTML = (id: string = 'Hello') => `
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

app.use(cors())

app.use((req, res, next) => {
  global.window = {} as any
  next()
})

app.get('/', (req, res) => {
  res.send(getHTML())
})

app.get('/share/:id', (req, res) => {
  const { id } = req.params
  res.send(getHTML(id))
})

app.get('/share', (req, res) => {
  res.send(getHTML())
})
app.use(express.static('dist'))

app.listen(80, () => {
  console.log(`Server running at 80`)
})