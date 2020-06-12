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

  const test = moment().subtract(0, 'weeks').startOf('week').format('YYYY/MM/DD')
  const test_1 = moment().subtract(0, 'weeks').endOf('week').format('YYYY/MM/DD')

  console.log(moment().subtract(0, 'weeks').startOf('week').format('YYYY/MM/DD'));
  console.log(moment().subtract(0, 'weeks').endOf('week').format('YYYY/MM/DD'));

  Data.find({
    date: {
      $gte: test_1
    }
  })
    .then(allData => {
      response.send(allData)
    })

})

app.get("/tempSensor/data/past_week", (request, respone, next) => {
  console.log(moment().subtract(0, 'weeks').startOf('week').format('YYYY/MM/DD'));
  console.log(moment().subtract(0, 'weeks').endOf('week').format('YYYY/MM/DD'));
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})