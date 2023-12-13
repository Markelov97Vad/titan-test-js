import { arrDataHour} from "./constants.js";
import { layout } from "./layout.js";
// const myDivContainer = document.querySelector('.myDiv');
// console.log(myDivContainer);

export function renderDayTrace(newArrDataDay) {
  console.log(newArrDataDay);
  console.log('OOOO',renderPoint(newArrDataDay, 'date'));
  return {
    name: 'Добыто (сутки)',
    hoverinfo: 'none',
    type: "scatter",
    mode: "lines",
    // x: renderPoint(newArrDataDay, 'time'),
    x: renderPoint(newArrDataDay, 'date'),
    y: renderPoint(newArrDataDay, 'value'),
    color: 'rgba(226, 39, 245, 1)',
    marker: {
      color: 'rgba(226, 39, 245, 1)',
    },
    line: {
      color: '#rgba(226, 39, 245, 0.8)',
      dash: 'solid',
      width: 4
    }
  
  }
}

//Декомпозировать
export function renderHourTrace() {
  // console.log('Data Hour',renderPoint(setValuePerHour(arrDataHour), 'date'));
  // console.log('Data Hour',renderPoint(setValuePerHour(arrDataHour), 'value'));
  return {
    name: 'Добыто (час)',
    hoverinfo: 'none',
    type: "bar",
    mode: "lines",
    // x: renderPoint(arrDataHour, 'time'),
    x: renderPoint(setValuePerHour(arrDataHour), 'date'),
    y: renderPoint(setValuePerHour(arrDataHour), 'value'),
    width: '3600000',
    marker: {
      color: '#97E245',
      line: {
        color: '#FFFFFF',
        width: 1.5
      }
    }
  }
}

export function renderProductionTrace(dataProd) {
  console.log('dataProd',dataProd);
  console.log('dsdsd',typeof dataProd[1]?.date.split(' ')[0] + '');
  console.log('Date',dataProd[1]?.date);

  // const result = {
  //   xref: 'paper',
  //   // x: 0.95,
  //   // y: dataProd[1]?.value, "2017-03-20"
  //   // x: dataProd[1]?.date.split(' ')[0],
  //   x: dataProd[1]?.date,
  //   y: dataProd[1]?.value,
  //   xanchor: 'right',
  //   yanchor: 'middle',
  //   // text: dataProd[1]?.value + '',
  //   text: '<i>Пятница, Июнь 15, 05:01</i><br>' + 
  //   '<i>Добыто (сутки): </i> '+(dataProd[1]?.value),
  //   arrowcolor: '#DEB887',
  //   bordercolor: '#DEB887',
  //   bgcolor: 'rgba(255, 255, 255, 0.9)',
  //   borderwidth: 3,
  //   borderpad: 4,
  //   // showarrow: false,
  //   arrowhead: 6,
  //   ax: 0,
  //   ay: -80,
  //   font: {
  //     family: 'Arial',
  //     size: 16,
  //     color: 'black'
  //   }
  // }
  // const result2 = {
  //   xref: 'paper',
  //   // x: 0.95,
  //   // y: dataProd[1]?.value, "2017-03-20"
  //   x: 0.95,
  //   y: dataProd[0]?.value,
  //   xanchor: 'left',
  //   yanchor: 'auto',
  //   // text: labels[i] + ' ' + yData[i][0] +'%',
  //   text: dataProd[0]?.value + ' ',
  //   showarrow: false,
  //   font: {
  //     family: 'Arial',
  //     size: 16,
  //     color: 'black'
  //   }
  // }
  // layout.annotations.push(result)
  return {
    name: 'Прогноз добычи',
    x: renderPoint(dataProd, 'time'),
    y: renderPoint(dataProd, 'value'),
    // mode: 'lines+markers',
    mode: 'lines+markers+text',
    line: {
      color: '#DEB887',
      dash: 'dot',
      width: 4
    },
    // text: dataProd[dataProd.length - 1]?.value,
    text: dataProd[1]?.value + '',
    ax: 20,
    ay: -30,
    align: 'center',
    font: {
      family: 'Courier New, monospace',
      size: 16,
      color: 'black',
      weight: 16
    },
    showarrow: false
  };
}

export function renderProductionPlan(date = '2018-06-15', time, plan = 40) {
  // const date = '2018-06-15 00:00';
  // const date2 = '2018-06-16 23:59';

  // // Get the user's locale or set it to a specific one (e.g., 'ru-RU' for Russian)
  // const userLocale = 'ru-RU';
  
  // // Create a date formatter
  // const dateFormatter = new Intl.DateTimeFormat(userLocale, {
  //   //  year: 'numeric',
  //    day: 'numeric',
  //    month: 'long', // Use 'long' for full month names, or 'short' for abbreviated names
  //   //  hour: 'numeric', // Use 'long' for full month names, or 'short' for abbreviated names
  //   //  minute: 'numeric', // Use 'long' for full month names, or 'short' for abbreviated names
  // });
  
  // // Format the date
  // const formattedDate = dateFormatter.format(new Date(date));
  // const formattedDate2 = dateFormatter.format(new Date(date2));
  // console.log(formattedDate);

  // // const { plan, data, time } = dataPlan
  // // console.log('plan',plan);
  console.log('All data', date, time, plan); 
  //{plan: '222', date: '2023-12-11', time: '01:00'}
  // var x = ['2018-06-15 00:00', '2018-06-15 23:59'];
  // const x = [];
  // const x = [`${date} 00:00`, `${date} 23:59`];
  const x = [`${date} 12:00`];
  // var x = ['2018-06-15 00:00' , '2018-06-15 21:10', '2018-06-15 12:10'];
  // var x = ['2018-06-15'];
  // var x = ['2018-06-15 12:00' ];
  const y = [plan, plan];
// var y = [100];

  const trace = {
    name: 'План добычи',
    // x: [ 0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23, 24],
    // x: `${dataPlan?.date} ${dataPlan?.time}`,
    // x: [`${dataPlan?.date}`],
    // x: [ new Date("2018-06-15 00:00"),  new Date("2018-06-16 23:59")],
    // x: [],
    // // y: [0,dataPlan?.plan], //? value
    // y: [100], //? value
    x: x,
    y: y,
    base: '2018-06-15 12:00',
    // offset: '2018-06-15 01:00',
    // xaxis: {
    //   // showline: true,
    // },
    // offsetgroup: '2018-06-15 12:00',
    // xperiod: '72000000',
    // xperiod0: '2018-06-15 00:00',
    width: '86400000', // ширина сутки (миллисекунд)
    error_x: { // лияния над Баром
      type: "constant",
      value: "2018-06-15 12:00",
      visible: true,
      width: "2018-06-15 12:00",
      // color: '#1924B1',
      color: 'rgba(55,128,191,1)',
    },
    // selected: {
    //   marker: {
    //     color: '#DEB887',
    //   }
    // },
    // x0: '2018-06-15 12:00',
    // dx:'2018-06-15',
    // width: [24],
    // xline: {
    //   color: '#DEB887',
    //   width: 4,
    //   dash: 'dash',
    // },
    hoverinfo: 'none',
    marker:{
     color: ` ${plan === 0 ? 'rgba(0, 0, 0, 0.25)' : 'rgba(55,128,191,0.4)'}`,
    //  line: {
    //     coloraxis: 'rgba(50,171,96,1.0)',
    //     colorscale: 'rgba(50,171,96,1.0)',
    //     reversescale: true,
    //     autocolorscale: false,
    //     cmax: 3,
    //     cmid: 3,
    //     cmin: 3,
    //     color: '#DEB887',
    //     width: 5
    //   },
    },
    type: 'bar',
    // type: 'scatter',
};

  // for (let h = 0; h < 24; h++) {
  //   // arr.push(`${i < 9 ? 0 : ''}${i}:00`)
  //   for (let m = 0; m < 60; m++) {
  //     if(m === 60) {
  //       continue
  //     }
  //     trace.x.push(`${date} ${h < 9 ? 0 : ''}${h}:${m < 10 ? 0 : ''}${m}`)
  //   }
  // }
  // for (let i = 0; i < 24; i++) {
  //   trace.y.push(plan)
    
  // }
  // console.log('Trace',trace.x);
  // console.log('TraceY',trace.y);

  return trace;

}

function renderPoint(data, key) {
  // if (data.length === 0 && key === "date") {
  //   return ["2023-12-09 05:00"]
  // }
  // if (data.length === 0 && key === "value") {
  //   return ["0"]
  // }

  return data.map(el => {
    console.log('render point',el, key);
    return el[key] // ["2018-06-15 05:00"] || ["0"]
  })
}

function setValuePerHour (arrValueDay) {
  // [{date: '2015-06-15 06:13', value: 113} , {date: '2015-06-15 06:16', value: 100}, {date: '2015-06-15 16:56', value: 180}]
  console.log('Исходный массив',arrValueDay);
  let arrHour = arrValueDay.map(data => data.date.split(' ')[1].split(':')[0]) // '06'
  console.log('ArrHOUR',arrHour);
  let newArr = [];
  let count = 0
  arrValueDay.forEach((dateVal, i , arr) => {
    const { date, value } = dateVal; // 122, 31
    const time = date.split(' ')[1]; // '06:13'
    const currentDate = date.split(' ')[0]; // '2015-06-15'
    const hour = time.split(':')[0]; // '06'
    // count = +value
    console.log('Count',count);
    if(hour === arrHour[i + 1]) {
      count += +value
      return
    }
    console.log('IIII', count);
    count += +value
    // newArr.push({date: `${currentDate} ${Number(hour) + 1}:00`, value: count})
    newArr.push({date: `${currentDate} ${hour}:00`, value: count})
    count = 0
  })

  console.log("NEW Arr",newArr);
  return newArr

  // let newArr = arrValueDay.reduce((prevVal,dateVal,i, arr) => {
  //   const { date, value } = dateVal;
  //   const time = date.split(' ')[1]; // '06:13'
  //   const hour = time.split(':')[0]; // '06'
  //   if(Number(hour) === ) {

  //   }
  // },[])
  // arrDataHour.push({date: `${date} ${time}`, value})
}
// myDivContainer.on('plotly_click', function(data) {
//   const point = data.points[0]
//   const newAnnotation = {
//     xref: 'paper',
//     // x: 0.95,
//     // y: dataProd[1]?.value, "2017-03-20"
//     // x: dataProd[1]?.date.split(' ')[0],
//     // x: dataProd[1]?.date,
//     // y: dataProd[1]?.value,
//     x: point.xaxis.d2l(point.x),
//     y: point.yaxis.d2l(point.y),
//     // xanchor: 'right',
//     // yanchor: 'middle',
//     // text: dataProd[1]?.value + '',
//     text: '<i>Пятница, Июнь 15, 05:01</i><br>' + 
//     '<i>Добыто (сутки): </i> '+(point.y),
//     arrowcolor: '#DEB887',
//     bordercolor: '#DEB887',
//     bgcolor: 'rgba(255, 255, 255, 0.9)',
//     borderwidth: 3,
//     borderpad: 4,
//     // showarrow: false,
//     arrowhead: 6,
//     ax: 0,
//     ay: -80,
//     font: {
//       family: 'Arial',
//       size: 16,
//       color: 'black'
//     }
//   };
//   const divid = document.getElementById('myDiv');
//   const newIndex = (divid.layout.annotations || []).length;
//   console.log(point.pointNumber);
//   if(newIndex) {
//     var foundCopy = false;
//     divid.layout.annotations.forEach(function(ann, sameIndex) {
//       if(ann.text === newAnnotation.text ) {
//         Plotly.relayout('myDiv', 'annotations[' + sameIndex + ']', 'remove');
//         foundCopy = true;
//       }
//     });
//     if(foundCopy) return;
//   }
//   Plotly.relayout('myDiv', 'annotations[' + newIndex + ']', newAnnotation);
// }).on('plotly_clickannotation', function(event, data) {
//   Plotly.relayout('myDiv', 'annotations[' + data.index + ']', 'remove');
// });