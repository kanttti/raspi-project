const express = require('express')
const morgan = require("morgan")
const cors = require('cors')


const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))
app.use(cors())






const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})