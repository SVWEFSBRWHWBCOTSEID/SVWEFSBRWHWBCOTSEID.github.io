'use client'

import {DateTime} from 'luxon';
import Highcharts from 'highcharts/highstock';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import type {GameInfo} from '../game/[id]/page';

// https://github.com/highcharts/highcharts-react#highcharts-with-nextjs
if (typeof Highcharts === 'object') {
    HighchartsAccessibility(Highcharts);
    HighchartsExporting(Highcharts);
}


const text = {
    weak: '#707070',
    strong: '#a0a0a0'
}

const line = {
    weak: '#404040',
    strong: '#606060',
    accent: '#d85000',
    white: '#ffffff',
    black: '#333333',
    grey: '#777777',
}

Highcharts.setOptions({
    chart: {
        // @ts-ignore
        backgroundColor: null,
        borderWidth: 0,
        borderRadius: 0,
        // @ts-ignore
        plotBackgroundColor: null,
        plotShadow: false,
        plotBorderWidth: 0,
    },
    title: {
        style: {
            font: '13px',
            color: text.strong,
        },
    },
    xAxis: {
        gridLineWidth: 0,
        gridLineColor: line.weak,
        lineColor: line.strong,
        tickColor: line.strong,
        labels: {
            style: {
                color: text.weak,
                fontWeight: 'bold',
            },
        },
        title: {
            style: {
                color: text.weak,
                font: '12px',
            },
        },
        crosshair: {
            color: line.weak,
        },
    },
    // @ts-ignore
    yAxis: {
        alternateGridColor: null,
        minorTickInterval: null,
        gridLineColor: line.weak,
        minorGridLineColor: null,
        lineWidth: 0,
        tickWidth: 0,
        labels: {
            style: {
                color: text.weak,
                fontSize: '10px',
            },
        },
        title: {
            style: {
                color: text.weak,
                font: '12px',
            },
        },
    },
    legend: {
        itemStyle: {
            color: text.strong,
        },
        itemHiddenStyle: {
            color: text.weak,
        },
    },
    /*
    labels: {
        style: {
            color: text.strong,
        },
    },
    */
    lang: {
        thousandsSep: '',
    },
    tooltip: {
        backgroundColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
            },
            stops: [
                [0, 'rgba(56, 56, 56, .8)'],
                [1, 'rgba(16, 16, 16, .8)'],
            ],
        },
        borderWidth: 0,
        style: {
            fontWeight: 'bold',
            color: text.strong,
        },
    },
    plotOptions: {
        series: {
            shadow: false,
            // nullColor: '#444444',
        },
        line: {
            dataLabels: {
                color: text.strong,
            },
            marker: {
                lineColor: text.weak,
            },
        },
        spline: {
            marker: {
                lineColor: text.weak,
            },
        },
        scatter: {
            marker: {
                lineColor: text.weak,
            },
        },
        candlestick: {
            lineColor: text.strong,
        },
    },

    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC',
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white',
                    },
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white',
                    },
                },
            },
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver',
        },
        labelStyle: {
            color: 'silver',
        },
    },

    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA',
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255, 255, 255, 0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED',
        },
        xAxis: {
            gridLineColor: '#505053',
        },
    }
})


type ProfileEloChartProps = {username: string, games: GameInfo[]}
export default function ProfileEloChart(props: ProfileEloChartProps) {
    const options: Highcharts.Options = {
        legend: { enabled: false },
        credits: { enabled: false },
        scrollbar: { enabled: false },
        yAxis: {
            title: { text: null }
        },
        xAxis: {
            title: { text: null },
            labels: { enabled: false },
            lineWidth: 0,
            tickWidth: 0,
        },
        rangeSelector: {
            enabled: true,
            selected: 1,
            inputEnabled: false,
            labelStyle: {
                display: 'none',
            },
        },
        tooltip: {
            valueDecimals: 0,
        },
        series: [{
            type: 'line',
            data: props.games.sort((gameA, gameB) => DateTime.fromSQL(gameA.createdAt).valueOf() - DateTime.fromSQL(gameB.createdAt).valueOf()).map(game => ({
                x: DateTime.fromSQL(game.createdAt).valueOf(),
                y: game.first.username === props.username ? game.first.rating : game.second.rating,
                name: DateTime.fromSQL(game.createdAt).toLocaleString()
            })),
            marker: { enabled: false }
        }],
    }

    return (
        <HighchartsReact
            className="border-y border-tertiary flex items-center justify-center text-secondary py-12"
            highcharts={Highcharts}
            constructorType="stockChart"
            options={options}
        />
    )
}
