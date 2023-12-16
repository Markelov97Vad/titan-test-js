import { getFormattedDate, setDataForForecast } from "./utils.js";

export function renderLayout(date = '2018-06-15', plan = 0, arrValueForecast) { // > 1000 = 1 м. m
  console.log('DATE',date);
  console.log(plan);
  console.log('arrValueForecast',arrValueForecast);
  // const dataForecast = setDataForForecast()
  // console.log('Данные для Лэйаута',dataForecast);
  const firstValue = arrValueForecast[arrValueForecast.length - 2];
  const secondValue = arrValueForecast[arrValueForecast.length - 1];
  const xValFirst = firstValue?.date
  const yValFirst = firstValue?.value
  const xValSecond = secondValue?.date
  const yValSecond = secondValue?.value

  // console.log('DATA FORECAST', dataForecast);
  const layout = {
    // title: 'Скважина 1 - 1',
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
    // automargin: true,
    margin: {
      l: 130,
      r: 100,
      b: 100,
      t: 200,
      pad: 4
   },
    // hovermode:'closest',
    legend: {
      x: 0.15,
      y: -0.34,
      // width: 100,
      xanchor: 'left',
      yanchor: 'left',

      // yref: 'paper',
      orientation: 'h',
    },
  
    // paper_bgcolor: '#7279D8',
    // bgcolor: '#7279D8',

    // plot_bgcolor: '#7279D8)',
    // plot_bgcolor: "rgba(0,0,0,0)",
    // width: 1000,
    // height: 500,
    // showlegend: false,
    autosize: true,
    annotations: [arrValueForecast.length < 2 ? '' :
      {
        // xref: 'paper',
        // yref: 'paper',
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
        // xref: 'paper',
        // yref: 'paper',
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
    xaxis: { // X - линия
      showgrod: false,
      showline: true,
      // type: 'category', // array, date , category
      // autorange:true,
      // tickformat: '%d, %b',
      // tickangle: 90,
      type: 'date',
      minallowed: 16643,
      maxallowed: 16989,
      // range: [3600000, 86400000],
      // range: [new Date(1529038860000).toISOString(), new Date(1529193540000).toISOString()],
      // categoryorder : "array",
      // rangebreaks: [
      //   // enabled: true,
      //   // bounds: ['2018-06-15 00:00', '2018-06-16 23:59'],
      //   // dvalue: 7200000,
      //   // pattern: 'hour',
      //   {values: ['2018-06-15 00:00', '2018-06-16 23:59']},
      // ],

      // tickson: "boundaries",
      // ticklen: 15,
      // showdividers: true,
      // dividercolor: 'grey',
      // dividerwidth: 2,

      // tickmode: "linear", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
      // tickmode: "linear",// "auto" | "linear" | "array" | "sync"

      // tickformatstops: {
      //   dtickrange: [null, 720000000],
      //   value: '2018-06-15 00:00',
      //   // tickformat: "%H:%M",
      // },
      // autotick: false,
      ticks: 'outside',
      // tick0: '2018-06-15',


      // tick0: '15 июня',
      // dtick: '2018-06-16 23:59',
      // dtick: 1000,
      // tickformatstops: [
      //   {
      //         "dtickrange": ['2018-06-15 00:00', '2018-06-16 23:59'],
      //         "value": "%H:%M:%S"
      //       },
      // ],
      // nticks: '2018-06-15 00:00',
      // dtick:  '2018-06-16',
      // minor: {
      // tick0: '2018-06-15 00:00',
      // nticks: '2018-06-16 23:59',
      // dtick:  7200000,

      // },
      // labelalias: {
      //   [new Date(1529038860000).toISOString()]: '15. Июнь',
      // //   US: '🇺🇸 United States',
      // //   Germany: '🇩🇪 Germany',
      // //   France: '🇫🇷 France'
      // }
      // showexponent: 'all',
      // exponentformat: 'e',
      // tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
      // tickvals: [ 0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23, 24],
      // tickvals: [ 1, 2, 4, 6, 8, 10 , 12, 14, 16, 18 , 20, 22, 24],
      // tickvals: [ new Date('2018-06-15 05:01:00.000Z').toUTCString(), new Date('2018-06-15 23:59:00.000Z').toUTCString()],
      tickvals: [],
      // tickvals: [ '2018-06-15 00:00' , '2018-06-15 01:00'],
      // ticktext: [],
      // ticktext: [ new Date('2018-06-15 05:01:00.000Z').toUTCString(), new Date('2018-06-15 23:59:00.000Z').toUTCString()],
      // ticktext: ['15. Июнь','01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', "20:00", '21:00', "22:00", "23: 00", "16. Июнь"],
      // tickvals:['2018-06-15 00:00', '2018-06-15 02:00', '2018-06-15 04:00', '2018-06-15 06:00', '2018-06-15 08:00', '2018-06-15 10:00', '2018-06-15 12:00', '2018-06-15 14:00', '2018-06-15 16:00', '2018-06-15 18:00', '2018-06-15 20:00', '2018-06-15 22:00', '2018-06-15 23:59'],
      // ticktext: ['15. Июнь',  '02:00', '04:00',  '06:00',  '08:00', '10:00',  '12:00', '14:00',  '16:00',  '18:00',  "20:00",  "22:00",  "16. Июнь"],
      // tickvals:['2018-06-15 00:00', '2018-06-15 23:59'],
      ticktext: []
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
      //     tickformatstops: [{
      //       // "dtickrange": [null, 999],
      //       range: [0, 999],
      //       ticksuffix: ' тыс. m',
      //       // "value": "%H:%M:%S.%L ms"
      //     },
      //     {
      //       // "dtickrange": [1000, 9999],
      //       range: [1000, 9999],
      //       // "value": "%H:%M:%S s",
      //       ticksuffix: ' m. m',
      //    },
      //    // ... (additional formatting options)
      // ]
    },

    // tickmode: "linear", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
    // tickvals: [1,2,3,4,5,6,7,8,9,10],
    // ticktext: ['15. Июнь', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],

  };

  // console.log(layout.xaxis.tickvals.length);
  // Array.from(Array(13)).forEach((el,i) => {
  //   layout.xaxis.tickvals.push(`${data} ${i < 10 ? 0 : ''}${i + 2}:00`)
  // })
  // layout.xaxis.ticktext.push(`${Number(date.substring(8,11))}. Июнь`)
  layout.xaxis.ticktext.push(getFormattedDate(`${date} 00:00`, { month: 1 }))
  for (let i = 0; i < 23; i += 2) {
    layout.xaxis.tickvals.push(`${date} ${i < 10 ? 0 : ''}${i}:00`)
    if (i >= 2) {
      layout.xaxis.ticktext.push(`${i < 10 ? 0 : ''}${i}:00`)
    }
  }
  layout.xaxis.ticktext.push(getFormattedDate(`${date} 00:00`, { month: 2 }))
  layout.xaxis.tickvals.push(`${date} 23:59`)
  return layout;
}

// renderLayout();
