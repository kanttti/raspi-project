require("dotenv").config()
const express = require('express')
const morgan = require("morgan")
const cors = require('cors')
const moment = require("moment")
const Data = require("./models/Data")


const app = express()

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

// GET - /tempsensor/data - ALL DATA
app.get("/tempSensor/data", (request, response, next) => {

  Data.find({})
    .then(allData => {
      response.send(allData)
    })

})

// GET - /tempSensor/data/past_week - Get the past week from last sunday to next saturday
app.get("/tempSensor/data/past_week", (request, respone, next) => {

  const past_week_start = moment().subtract(0, 'weeks').startOf('week').format('YYYY/MM/DD')
  const past_week_end = moment().subtract(0, 'weeks').endOf('week').format('YYYY/MM/DD')

  Data.find({
    date: {
      $gte: past_week_start,
      $lt: past_week_end
    }
  })
  .then(data => {
    respone.send(data)
  })
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})