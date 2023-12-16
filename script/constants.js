export const arrDataHour = []; // 
export const arrDataAllValue = [];
export let arrDataDay = [];
export const arrProductionForecast = [];

// export const arrDataTime = Array.from(Array(24).keys());
// console.log(Array.from(Array(24).keys()));
// console.log(arrDataTime);

// export const layout = {
//   // title: 'Скважина 1 - 1',
//   title: {
//     text: 'Скважина 1 - 1',
//     automargin: true,
//   },
//   showlegend: true,
//   legend: {
//     x: 0.3, 
//     y: -0.4,
//     orientation: 'h',
//   },
//   // paper_bgcolor: '#7279D8',
//   // bgcolor: '#7279D8',
//   // legend: {
//   // },
//   // plot_bgcolor: '#7279D8)',
//   // plot_bgcolor: "rgba(0,0,0,0)",
//   // width: 1000,
//   // height: 700,
//   // showlegend: false,
//   // autosize: true,
//   // annotations: [
//   //   {
//   //     xref: 'paper',
//   //     yref: 'paper',
//   //     x: 0.5,
//   //     y: -0.1,
//   //     xanchor: 'center',
//   //     yanchor: 'top',
//   //     text: 'Source: Pew Research Center & Storytelling with data',
//   //     showarrow: false,
//   //     font: {
//   //       family: 'Arial',
//   //       size: 12,
//   //       color: 'rgb(150,150,150)'
//   //     }
//   //   },
//   // ],
//   xaxis: { // X - линия
//     showgrod: false,
//     showline: true,
//     // range: [0, 200],
//     tick0: 0,
//     autotick: false,
//     ticks: 'outside',
//     // tick0: '2018-06-15 00:00',
//     // dtick: '2018-06-15 02:00',
//     showexponent: 'all',
//     exponentformat: 'e',
//     tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
//     // tickvals: [ 0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23, 24],
//     tickvals: [ 0 , 2, 4, 6, 8, 10 , 12, 14, 16, 18 , 20, 22, 24],
//     // tickvals: [ '2018-06-15 00:00' , '2018-06-15 01:00'],
//     // ticktext: ['15. Июнь', '01:00'],
//     // ticktext: ['15. Июнь','01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', "20:00", '21:00', "22:00", "23: 00", "16. Июнь"],
//     ticktext: ['15. Июнь',  '02:00', '04:00',  '06:00',  '08:00', '10:00',  '12:00', '14:00',  '16:00',  '18:00',  "20:00",  "22:00",  "16. Июнь"],
//   },
//   yaxis: { // Y - линия
//     // showexponent: 'all',
//     // exponentformat: 'e',
//     // tickformat: '%',
//     ticksuffix: 'тыс. m',
//     showline: false,
//   },
  
//   // tickmode: "linear", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
//   // tickvals: [1,2,3,4,5,6,7,8,9,10],
//   // ticktext: ['15. Июнь', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],

// };

// Array.from(Array(24)).forEach((el, i) => layout.xaxis.tickvals.push(`${i}:00`))
// Array.from(Array(24)).forEach((el, i) => layout.xaxis.ticktext.push(`${i}:00`))