import React from "react";
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from 'victory';

type Props = {
    /** Title of the section */
    title: string;

    onViewAll: () => void;

    chartData: {x : number, y: number}[]; // (quarter, earnings)

    chartTickValues: number[]; // [1, 2, 3, 4]

    chartLabelX: string[]; // ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]

    chartLabelYFunction: (x: any) => string;

    chartLabelY: string;
};

const TableDisplay: React.FC<Props> = (props: Props) => {

    const {title, onViewAll} = props;

    const chartStyle = {
        data: {
            fill: "#4e6ae0"
        },
        axisLabel: {
            padding: 35
        }
    };

    return (
        <section className={"section"}>

            <div className="columns">

                <div className="column is-10">
                    <h1 className={"title is-size-4"}>{title}</h1>
                </div>

                <div className="column">
                    <button
                        onClick={onViewAll}
                        className="button is-primary">View All
                    </button>
                </div>

            </div>

            <div className="container">
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                    width={550}>
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={props.chartTickValues}
                        tickFormat={props.chartLabelX}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={props.chartLabelYFunction}
                        label={props.chartLabelY}
                        style={chartStyle}
                    />
                    <VictoryBar
                        style={chartStyle}
                        data={props.chartData}
                        x="x"
                        y="y"
                    />
                </VictoryChart>
            </div>

        </section>
    );

};

export default TableDisplay;
