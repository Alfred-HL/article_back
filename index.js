const cors = require('cors')
const express = require('express')

const app = express()
const PORT = 5000

const router = require('./routes')


app.use(cors())

// app.use(express.json())

app.use(router)

app.get('/', (req, res) =>{
  res.send("Articlecamp")
})

app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})
