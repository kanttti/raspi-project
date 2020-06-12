import React, { useState, useEffect } from 'react';
import DataTable from "./components/DataTable"
import Graph from "./components/Graph"
import dataService from "./services/data"
import Btn_Timeperiod from './components/Btn_Timeperiod';

function App() {

  const [data, setData] = useState([])
  const [timeperiod, setTimeperiod] = useState(0)

  const onClickHandlerTimeperiod = () => {
    setTimeperiod(2)
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
  // Then update data 100 times/hour (every 36 sec).
  useEffect(getAllData, [])
  useEffect(() => {
    const interval = setInterval(() => {
      getAllData()
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
      <Btn_Timeperiod onClickHandler={onClickHandlerTimeperiod}/>
      <Graph data={data} timeperiod={timeperiod}/>
      <DataTable data={data} />
    </div>
  );
}

export default App;
