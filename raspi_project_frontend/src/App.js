import React, { useState, useEffect } from 'react';
import DataTable from "./components/DataTable"
import Graph from "./components/Graph"
import dataService from "./services/data"

function App() {
  const [data, setData] = useState([])

  // Call this function once with useEffect to 
  // get all data from database.
  const getAllData = () => {

    dataService
      .getAll()
      .then(data => {
        console.log("Updating data!")
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
      <Graph data={data}/>
      <DataTable data={data} />
    </div>
  );
}

export default App;
