import React from "react"

const DataTable = ({ data }) => {
    const rows = data.map((data, i) => {
        return (
            <tr key={i}>
                <th>{data.Date}</th>
                <th>{data.Temperature}</th>
                <th>{data.Humidity}</th>
            </tr>
        )
    })

    return (
        <div className="table-div">
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
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