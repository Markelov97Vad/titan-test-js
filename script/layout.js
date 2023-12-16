import { getFormattedDate } from "./utils.js";

export function renderLayout(date, plan = 0, arrValueForecast) { // > 1000 = 1 м. m
  const firstValue = arrValueForecast[arrValueForecast.length - 2];
  const secondValue = arrValueForecast[arrValueForecast.length - 1];
  const xValFirst = firstValue?.date;
  const yValFirst = firstValue?.value;
  const xValSecond = secondValue?.date;
  const yValSecond = secondValue?.value;

  const layout = {
    title: {
      text: 'Скважина 1 - 1',
      font: {
        family: 'Courier New',
        size: 26,
        yref: 'paper',
        color: '#7f7f7f'
      }
    },
    showlegend: true,
    margin: {
      l: 130,
      r: 100,
      b: 100,
      t: 200,
      pad: 4
   },
    legend: {
      x: 0.15,
      y: -0.34,
      orientation: 'h',
    },
    autosize: true,
    annotations: [arrValueForecast.length < 2 ? '' :
      {
        x: xValFirst,
        y: yValFirst,
        xanchor: 'center',
        yanchor: 'top',
        text: yValFirst + '',
        showarrow: false,
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgba(6, 6, 6, 1)'
        }
      }, arrValueForecast.length < 2 ? '' :
      {
        x: xValSecond,
        y: yValSecond,
        xanchor: 'center',
        yanchor: 'top',
        text: yValSecond + '',
        showarrow: false,
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgba(6, 6, 6, 1)'
        }
      },
    ],
    shapes: [plan === 0 ? null :
      {
        type: 'line',
        x0: `${date} 00:00`,
        y0: plan,
        x1: `${date} 23:59`,
        y1: plan,
        line: {
          color: 'rgb(55, 128, 191)',
          width: 3
        }
      },
    ],
    xaxis: {
      showgrod: false,
      showline: true,
      type: 'date',
      minallowed: 16643,
      maxallowed: 16989,
      ticks: 'outside',
      tickvals: [],
      ticktext: [],
      linecolor:  'rgba(87, 144, 180, 1)',
    },
    yaxis: {
      ticksuffix: ' тыс. м',
      tickformat: ',.0f',
      showline: false,
      title: {
        text: 'Дебит',
        standoff: 12,
        font: {
          family: 'Courier New, monospace',
          size: 17,
          color: '#7f7f7f'
        }
      }
    },
  };

  layout.xaxis.ticktext.push(getFormattedDate(`${date} 00:00`, { month: 1 }));
  for (let i = 0; i < 23; i += 2) {
    layout.xaxis.tickvals.push(`${date} ${i < 10 ? 0 : ''}${i}:00`);
    if (i >= 2) {
      layout.xaxis.ticktext.push(`${i < 10 ? 0 : ''}${i}:00`);
    }
  }
  layout.xaxis.ticktext.push(getFormattedDate(`${date} 00:00`, { month: 2 }));
  layout.xaxis.tickvals.push(`${date} 23:59`);

  return layout;
}
