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
    let xy = [{}]

    switch(timeperiod) {
        case 0:
            xy = data.map((data, i) => {
                return {
                    x: i,
                    y: Number.parseFloat(data.temperature)
                }
            })
            break;
        case 2:
            break;
        default:
            console.log("no data to show")
            break;

    }
    console.log(xy)
    return (
        <XYPlot width={700} height={700} xDomain={[0, 60]} yDomain={[-5, 40]}>
            <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
            <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
            <XAxis
                title="Time"
                style={{
                    line: { stroke: '#ADDDE1' },
                    ticks: { stroke: '#ADDDE1' },
                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
            />
            <YAxis title="Temperature" />
            <LineSeries
                className="temperature-graph"
                curve={curveCatmullRom.alpha(0.5)}
                data={xy}
            />
        </XYPlot>
    );
}

export default Graph