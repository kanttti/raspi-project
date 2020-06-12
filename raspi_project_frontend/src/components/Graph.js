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

const Graph = ({ data, timeperiod }) => {

    const xy = data.map((data, i) => {
        return {
            x: i,
            y: Number.parseFloat(data.temperature)
        }
    })

    return (
        <XYPlot width={700} height={700} xDomain={[0, 49]} yDomain={[10, 40]}>
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
    );
}

export default Graph