import Form from "./script/Form.js";
import { arrDataAllValue, arrDataHour, arrProductionForecast } from "./script/constants.js";
import { getForecastValue, getFormattedDate, setDataForForecast, sortDataDay } from "./script/utils.js";
import { renderLayout } from "./script/layout.js";
import { renderDayTrace, renderHourTrace, renderProductionPlan, renderForecastTrace } from "./script/traces.js";
const chartContainer = document.querySelector('.chart');

let allValue = 0;
let planValue = 0;
let currentDate
let arrDataTime = []
let arrDataDay = []
let select = document.querySelector('#time');

const formMenu = new Form('menu', handleFormSubmit, handleButtonPlan);
formMenu.setEventListeners();


function renderChart(dataDay) {

  const dataTrace = [
    renderDayTrace(sortDataDay(dataDay)),
    renderHourTrace(),
    renderForecastTrace(setDataForForecast(sortDataDay(dataDay), currentDate), planValue),
    renderProductionPlan(currentDate, planValue)
  ]

  const options = {
    scrollZoom: true,
    // editable: true
    // showSendToCloud: true,
    responsive: true,
    showSendToCloud: true
  }
  console.log('Все пути', dataTrace);

  Plotly.newPlot('chart', dataTrace, renderLayout(currentDate, planValue, setDataForForecast(sortDataDay(dataDay), currentDate)), options);

  chartContainer.on('plotly_click', function (data) {
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

    const divid = document.getElementById('chart');
    const newIndex = (divid.layout.annotations || []).length;

    if (newIndex) {
      var foundCopy = false;
      divid.layout.annotations.forEach(function (ann, sameIndex) {
        console.log('Ann', ann);
        if (ann.text === newAnnotation.text) {
          Plotly.relayout('chart', 'annotations[' + sameIndex + ']', 'remove');
          foundCopy = true;
        }
      });
      if (foundCopy) return;
    }
    Plotly.relayout('chart', 'annotations[' + newIndex + ']', newAnnotation);
  }).on('plotly_clickannotation', function (event, data) {
    Plotly.relayout('chart', 'annotations[' + data.index + ']', 'remove');
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
  arrDataHour.push({ date: `${date} ${time}`, value })
  arrDataHour.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });

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


