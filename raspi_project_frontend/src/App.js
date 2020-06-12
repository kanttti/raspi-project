import React, { useState, useEffect } from 'react';
import DataTable from "./components/DataTable"
import Graph from "./components/Graph"
import dataService from "./services/data"
import BtnTimeperiod from './components/BtnTimeperiod';

function App() {

  const [data, setData] = useState([])
  const [timePeriod, setTimePeriod] = useState(0)

  const onClickHandlerPastDay = () => {
    dataService
      .getPastDay()
      .then(data => {
        setData(data)
      })
    setTimePeriod(1)
  }

  const onClickHandlerPastWeek = () => {
    dataService
      .getPastWeek()
      .then(data => {
        setData(data)
      })
    setTimePeriod(1)
  }


  const onClickHandlerAllData = () => {
    dataService
      .getAll()
      .then(data => {
        setData(data)
      })
    setTimePeriod(0)
  }

  // Call this function once with useEffect to 
  // get all data from database.
  const getAllData = () => {

    dataService
      .getAll()
      .then(data => {
        setData(data)
      })

  }

  // First get all data once.
  // Then update data 100 times/hour (every 36 sec)
  useEffect(getAllData, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (timePeriod === 0) {
        getAllData()
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
      <div>
      <BtnTimeperiod txt="Past week" onClickHandler={onClickHandlerPastWeek} />
      <BtnTimeperiod txt="Past day" onClickHandler={onClickHandlerPastDay} />
      <BtnTimeperiod txt="All data" onClickHandler={onClickHandlerAllData} />
      </div>
      <Graph data={data} />
      <DataTable data={data} />
    </div>
  );
}

export default App;
