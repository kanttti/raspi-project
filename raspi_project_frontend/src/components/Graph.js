import React from "react"
import { curveCatmullRom } from "d3-shape"

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';

const Graph = ({ data }) => {

    let timeMin = 24
    let timeMax = 0

    const xy = data.map((data, i) => {
        const splitTime = data.time.split(":")
        const time = Number.parseFloat(splitTime[0] + "." + splitTime[1])
        if (time <= timeMin) {
            timeMin = time
        } else if (time >= timeMax) {
            timeMax = time
        }
        return {
            x: time,
            y: Number.parseFloat(data.temperature)
        }
    })

    const div_style = {
        display: "inline-block",
        margin: "0%",
        border: "1px solid black"
    }

    return (
        <div style={div_style}>

            <XYPlot width={700} height={700} xDomain={[timeMin, timeMax]} yDomain={[10, 40]}>
                <HorizontalGridLines style={{ stroke: '#858585' }} />
                <VerticalGridLines style={{ stroke: '#858585' }} />
                <XAxis
                    title="Time"
                    style={{
                        line: { stroke: '#000000' },
                        ticks: { stroke: '#ff5a00' },
                        text: { stroke: 'none', fill: '#000000', fontWeight: 800 }
                    }}
                />
                <YAxis
                    title="Temperature"
                    style={{
                        line: { stroke: '#000000' },
                        ticks: { stroke: '#ff5a00' },
                        text: { stroke: 'none', fill: '#000000', fontWeight: 800 }
                    }}
                />
                <LineSeries
                    className="temperature-graph"
                    curve={curveCatmullRom.alpha(0.5)}
                    data={xy}
                    color="#ff5a00"
                />
            </XYPlot>
        </div>
    );
}

export default Graph