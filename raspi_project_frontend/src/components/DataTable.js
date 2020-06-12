import React from "react"

const DataTable = ({ data }) => {
    const rows = data.map((data, i) => {
        return (
            <tr key={i}>
                <th>{data.date}</th>
                <th>{data.time}</th>
                <th>{data.temperature}</th>
                <th>{data.humidity}</th>
            </tr>
        )
    })

    return (
        <div className="table-div">
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable