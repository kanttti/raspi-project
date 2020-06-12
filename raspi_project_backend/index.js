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

// Calculates date given parameter ago
const getPastDate = (daysAgo) => {

  const date = new Date();
  const last = new Date(date.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  let day = last.getDate();
  let month = last.getMonth() + 1;
  const year = last.getFullYear();

  if (day < 10) {
    day = "0" + day
  }

  if (month < 10) {
    month = "0" + month
  }

  return `${year}/${month}/${day}`
}

// GET - /tempsensor/data - ALL DATA
app.get("/tempSensor/data", (request, response, next) => {

  Data.find({})
    .then(allData => {
      response.send(allData)
    })

})

// GET - /tempSensor/data/past_week - Get the past week from last sunday to next saturday
app.get("/tempSensor/data/past_week", (request, respone, next) => {

  const current_date = moment().format("YYYY/MM/DD")
  const past_date = getPastDate(7) // Returns date 7 days ago

  console.log(current_date)
  console.log(past_date)

  Data.find({
    date: {
      $gte: past_date,
      $lte: current_date
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