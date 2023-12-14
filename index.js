import Form from "./script/Form.js";
import { arrDataAllValue, arrDataDay, arrDataHour, arrProductionForecast} from "./script/constants.js";
import { getForecastValue } from "./script/functions.js";
import { layout, renderLayout } from "./script/layout.js";
import { renderDayTrace, renderHourTrace, renderProductionPlan, renderForecastTrace } from "./script/traces.js";
const myDivContainer = document.querySelector('.myDiv');

let allValue = 0;
let currentDate
let arrDataTime = []
let select =  document.querySelector('#time');

const formMenu = new Form('menu', handleFormAddPoint);
formMenu.setEventListeners();

// Array.from(Array(24)).forEach((el, i) => {
//   if(i === 23){
//     return arrDataTime.push(`23:59`)
//   }
//   arrDataTime.push(`${i < 9 ? 0 : ''}${i + 1}:00`)
// })

// function renderTimeForSelector(time) {
//   arrDataTime = arrDataTime.filter(timeFromSelect => {
//     return timeFromSelect !== time
//   })
//   select.innerHTML = ''
//   arrDataTime.forEach((el,i) => {
//     select.insertAdjacentHTML('afterbegin', `<option value="${el}">${el}</option>`)
//   })
// }
// renderTimeForSelector();

//! отрисовывает уже готовый макет
function renderChart(dataDay, dataProd, date, time, plan) {
// function renderChart(plan, newArrDataDay) {
  // var x = ['2018-06-15'];
  // var y = [5];
  var x = [1,4];
  var y = [0,30];
  let trace1 = {
    x: x,
    y: y,
    type: 'scatter'
  }
  let trace2 ={
    name: 'План добычи',
    // x: [ 0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23, 24],
    x: [12],
    y: [100],
    // base: 100,
    // offset: 12,
    // xaxis: {
    //   // showline: true,
    // },
    error_x: { // лияния над Баром
      type: "constant",
      value: 12,
      visible: true,
      width: 2,
      color: '#1924B1',
    },
    // selected: {
    //   marker: {
    //     color: '#DEB887',
    //   }
    // },
    // x0: 0,
    // dx: 24,
    width: [24],
    // xline: {
    //   color: '#DEB887',
    //   width: 4,
    //   dash: 'dash',
    // },
    // hoverinfo: 'none',
    marker:{
     color: 'rgba(55,128,191,0.4)',
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
};

let trace3 = {
  // x: [ 0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23, 24],
  // name: 'План добычи',
  x: [0, 24],
  y: [100,100],
  // width: [24],
  // xline: {
  //   color: '#DEB887',
  //   width: 4,
  //   dash: 'dash',
  // },
  hoverinfo: 'none',
  marker:{
   color: '#1924B1',
   size: 30,
  },
  type: 'scatter',
  mode: 'lines',
};

  // var data = [trace1, trace2];

  // renderDayTrace(dataDay);
  const dataTrace = [
    renderDayTrace(dataDay),
    renderHourTrace(),
    renderProductionPlan(date, time , plan)
  ]

  // if (dataDay.length >= 2) {
  //   dataTrace.push(renderProductionTrace(dataProd))
  // }

  const options = {
    scrollZoom: true,
    // editable: true
    // showSendToCloud: true,
    responsive: true,
    showSendToCloud:true
  }
  console.log(dataTrace);
  Plotly.newPlot('myDiv', dataTrace, renderLayout(date), options);
  myDivContainer.on('plotly_click', function(data) {

    //!!
    // console.log('Ckick',data);
    const point = data.points[0]
    // console.log('Point X',point.xaxis.d2l(point.x));
    // console.log('Point Y',point.yaxis.d2l(point.y));
    const time = point.x.split(" ")[1];
    const date = point.x.split(" ")[0];

  const userLocale = 'ru-RU';
  
  // Create a date formatter
  const dateFormatter = new Intl.DateTimeFormat(userLocale, {
    //  year: 'numeric',
    weekday: 'long',
     day: 'numeric',
     month: 'long', // Use 'long' for full month names, or 'short' for abbreviated names
     hour: 'numeric', // Use 'long' for full month names, or 'short' for abbreviated names
     minute: 'numeric', // Use 'long' for full month names, or 'short' for abbreviated names
     formatMatcher: "basic"
  });
  
  // Format the date
  const formattedDate = dateFormatter.format(new Date(point.x));
  let resultFormatted = formattedDate.split(' ').filter(el => el !== 'в').map(el => {
    const firstLetter = el.charAt(0).toLocaleUpperCase();
    return `${firstLetter}${el.slice(1)}`
  }).join(' ');
  // const formattedDate2 = dateFormatter.format(new Date(point.x));
  // console.log('Formated d',split);


    // console.log(point.fullData);
    const newAnnotation = {
      // xref: 'paper',
      // x: point.xaxis.d2l(point.x),
      x: point.x,
      // x: -1,
      // y: point.yaxis.d2l(point.y),
      y: point.y,
      // xref: 'x',
      // yref: 'y',
      // y: +point.y,
      // xanchor: 'right',
      // yanchor: 'middle',
      // text: dataProd[1]?.value + '',
      // text: `<i>Пятница, Июнь 15, ${point.x.split(" ")[1]}</i><br>` + 
      text: `<i>${resultFormatted}</i><br>` + 
      `<i>${point.data.name}: </i> `+(point.y),
      // arrowcolor: '#DEB887',
      arrowcolor: point.fullData?.marker?.color === undefined ?' rgba(226, 39, 245, 1)' : point.fullData.marker.color,
      bordercolor: point.fullData?.marker?.color === undefined ?' rgba(226, 39, 245, 1)' : point.fullData.marker.color,
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      borderwidth: 3,
      borderpad: 7,
      // captureevents: true,
      // arrowsize: 0.1,
      ax: 10,
      // showarrow: false,
      arrowhead: 6,
      ax:  0,
      ay: -50,
      font: {
        family: 'Arial',
        size: 12,
        color: 'black'
      }
    };
    const divid = document.getElementById('myDiv');
    const newIndex = (divid.layout.annotations || []).length;
    // console.log('annotation',divid.layout.annotations);
    // console.log('point.pointNumber',point.pointNumber);
    if(newIndex) {
      var foundCopy = false;
      divid.layout.annotations.forEach(function(ann, sameIndex) {
        if(ann.text === newAnnotation.text ) {
          Plotly.relayout('myDiv', 'annotations[' + sameIndex + ']', 'remove');
          foundCopy = true;
        }
      });
      if(foundCopy) return;
    }
    Plotly.relayout('myDiv', 'annotations[' + newIndex + ']', newAnnotation);
  }).on('plotly_clickannotation', function(event, data) {
    Plotly.relayout('myDiv', 'annotations[' + data.index + ']', 'remove');
  });
}

renderChart(arrDataDay, arrProductionForecast)



function handleFormAddPoint(data) {
  if(!currentDate) {
    currentDate = data.date
  }
  const {date = currentDate, time, value, plan} = data;
  allValue = +value + allValue

  // console.log(plan);

  // renderTimeForSelector(time);

  arrDataAllValue.push(allValue)  
  arrDataDay.push({date: `${date} ${time}`, value: allValue + ''});

  // 
  arrDataHour.push({date: `${date} ${time}`, value}) // {date: '2015-06-15 12:00', value: 113}
  arrDataHour.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });
  if (arrProductionForecast.length === 0) {
    arrProductionForecast.push({date: `${date} 23:59`, value: plan})
  }
    // arrProductionForecast.push({date: `${time} 23:59`, value: plan})



  // console.log('arr Prod',arrProductionForecast);
  arrDataDay.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });
  const newArrDataDay = arrDataDay.map((dataDay, i) => {
    let date = dataDay.date
    return { date, value: arrDataAllValue[i]}
  })
  // setValuePerHour(arrDataHour);
  let arrForPlan = [newArrDataDay[newArrDataDay.length - 1]]
  // console.log('arrForPlan',arrForPlan );
  
  const newArrProductionForecast = arrForPlan.concat(arrProductionForecast)
  console.log('ArrPlan', arrForPlan);
  console.log('newArrProductionForecast',newArrProductionForecast );
  if (newArrDataDay.length >= 2) {
    
    getForecastValue(newArrDataDay)
  }
  renderChart(newArrDataDay, newArrProductionForecast, date, time, Number(plan))
  // const {date = currentDate, time, value, plan} = data;
  // console.log(date,time, value, plan);
  // allValue = +value + allValue

  // arrDataAllValue.push(allValue) 
  // arrDataDay.push({time, value: allValue + ''});
  // arrDataHour.push({time, value});

  // arrDataDay.sort((timeA, timeB) => {
  //   // console.log(timeA.time, typeof timeA.time);
  //   return timeA.time - timeB.time
  // });

  // // сортированные даты + значения по возрастанию
  // const newArrDataDay = arrDataDay.map((dataDay, i) => {
  //   let time = dataDay.time
  //   return { time, value: arrDataAllValue[i]}
  // })
  // console.log('ARR DAy',newArrDataDay)

  // renderProductionPlan({ plan })


  // renderChart(newArrDataDay, newArrProductionForecast)
  // renderChart(plan, newArrDataDay)
}


