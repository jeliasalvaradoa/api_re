const express = require('express')
const consultar = require('./data_rep');
const { config } = require('./config/config.js');
const app = express()
const PORT = process.env.PORT ?? 31017
app.disable('x-powered-by')

app.use(express.json())
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'http://localhost:1234',

]

app.get('/:cedId',async (req, res) => {
  const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin)  {
        res.header('Access-Control-Allow-Origin', origin )

    }
    const cedula = req.params.cedId
    const configEnv = config
    data = await consultar(cedula, configEnv) ?? 'error'
   // console.log(data)
    res.json(data)
})

// la ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1>')
})
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
