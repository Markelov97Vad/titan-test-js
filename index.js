import Form from "./script/Form.js";
import { arrDataAllValue, arrDataHour, arrProductionForecast } from "./script/constants.js";
import { getForecastValue, getFormattedDate, setDataForForecast, sortDataDay } from "./script/utils.js";
import { renderLayout } from "./script/layout.js";
import { renderDayTrace, renderHourTrace, renderProductionPlan, renderForecastTrace } from "./script/traces.js";
const myDivContainer = document.querySelector('.myDiv');

let allValue = 0;
let planValue = 0;
let currentDate
let arrDataTime = []
let arrDataDay = []
let select = document.querySelector('#time');

const formMenu = new Form('menu', handleFormSubmit, handleButtonPlan);
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
function renderChart(dataDay) {
  console.log(dataDay,"DATEEE");
  console.log(planValue,"VALUEE");
  // const dataTrace = [
  //   renderDayTrace(dataDay),
  //   renderHourTrace(),
  //   renderForecastTrace(setDataForForecast(dataDay, currentDate), plan),
  //   renderProductionPlan(currentDate, plan)
  // ]
  const dataTrace = [
    renderDayTrace(sortDataDay(dataDay)),
    renderHourTrace(),
    renderForecastTrace(setDataForForecast(sortDataDay(dataDay), currentDate), planValue),
    renderProductionPlan(currentDate, planValue)
  ]

  // if (dataDay.length >= 2) {
  //   dataTrace.push(renderProductionTrace(dataProd))
  // }

  const options = {
    scrollZoom: true,
    // editable: true
    // showSendToCloud: true,
    responsive: true,
    showSendToCloud: true
  }
  console.log('Все пути', dataTrace);

  Plotly.newPlot('myDiv', dataTrace, renderLayout(currentDate, planValue, setDataForForecast(sortDataDay(dataDay), currentDate)), options);

  myDivContainer.on('plotly_click', function (data) {
    const point = data.points[0]

    const newAnnotation = {
      x: point.x,
      y: point.y,
      text: `<i>${getFormattedDate(point.x, { all: true })}</i><br>` +
        `<i>${point.data.name}: ${point.y}${point.y >= 1000 ? 'm. m' : 'тыс. m'}</i> `,
      // arrowcolor: '#DEB887',
      arrowcolor: point.fullData?.marker?.color === undefined ? ' rgba(226, 39, 245, 1)' : point.fullData.marker.color,
      bordercolor: point.fullData?.marker?.color === undefined ? ' rgba(226, 39, 245, 1)' : point.fullData.marker.color,
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      borderwidth: 3,
      borderpad: 7,
      ax: 10,
      arrowhead: 6,
      ax: 0,
      ay: -50,
      font: {
        family: 'Arial',
        size: 12,
        color: 'black'
      }
    };

    const divid = document.getElementById('myDiv');
    const newIndex = (divid.layout.annotations || []).length;

    if (newIndex) {
      var foundCopy = false;
      divid.layout.annotations.forEach(function (ann, sameIndex) {
        console.log('Ann', ann);
        if (ann.text === newAnnotation.text) {
          Plotly.relayout('myDiv', 'annotations[' + sameIndex + ']', 'remove');
          foundCopy = true;
        }
      });
      if (foundCopy) return;
    }
    Plotly.relayout('myDiv', 'annotations[' + newIndex + ']', newAnnotation);
  }).on('plotly_clickannotation', function (event, data) {
    Plotly.relayout('myDiv', 'annotations[' + data.index + ']', 'remove');
  });
}

renderChart(arrDataDay);

function handleFormSubmit(inputData) {
  if (!currentDate) {
    currentDate = inputData.date
  }
  const { date = currentDate, time, value, plan } = inputData;
  allValue = +value + allValue

  arrDataAllValue.push(allValue)
  arrDataDay.push({ date: `${date} ${time}`, value: allValue + '' });

  // 
  arrDataHour.push({ date: `${date} ${time}`, value }) // {date: '2015-06-15 12:00', value: 113}
  arrDataHour.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });
  // if (arrProductionForecast.length === 0) {
  //   arrProductionForecast.push({ date: `${date} 23:59`, value: plan })
  // }

  // arrDataDay.sort((dateA, dateB) => {
  //   return new Date(dateA.date) - new Date(dateB.date)
  // });
  // arrDataDay = arrDataDay.map((dataDay, i) => {
  //   let date = dataDay.date
  //   return { date, value: arrDataAllValue[i] }
  // })

  // sortDataDay(arrDataDay);

  // let arrForTheForecastTrace = []
  // if (arrDataDay.length >= 2) {
  //   console.log('ArrDataDayAAAAA', arrDataDay);
  //   arrForTheForecastTrace.push(arrDataDay[arrDataDay.length - 1]);
  //   arrForTheForecastTrace.push({ date: `${date} 23:59`, value: getForecastValue(arrDataDay) })
  // }
  // renderChart(arrDataDay, date, time, Number(plan))
  renderChart(arrDataDay)
}

function handleButtonPlan(inputData) {
  const { plan } = inputData;
  planValue = Number(plan)
  console.log('PLAN',planValue);
  arrProductionForecast.push({ date: `${currentDate} 23:59`, value: planValue })
  console.log('Current DATA DAY',arrDataDay);
  renderChart(arrDataDay)
}


