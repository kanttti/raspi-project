require("dotenv").config()
const express = require('express')
const morgan = require("morgan")
const cors = require('cors')
const Data = require("./models/Data")


const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

// GET - /tempsensor/data 
app.get("/tempSensor/data", (request, response, next) => {

  Data.find({})
    .then(allData => {
      response.send(allData)
    })
    
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})