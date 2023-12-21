import Form from "./script/Form.js";
import { handlePlotlyClick, setDataForForecast, sortDataDay } from "./script/utils.js";
import { renderLayout } from "./script/layout.js";
import { renderDayTrace, renderHourTrace, renderProductionPlan, renderForecastTrace } from "./script/traces.js";
const chartContainer = document.querySelector('.chart');

export const arrDataHour = [];
export const arrProductionForecast = [];
let planValue = 0;
let currentDate = '2023-12-21'
let arrDataDay = [];
let minutes = 0

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
    responsive: true,
    showSendToCloud: true
  }

  Plotly.newPlot('chart', dataTrace, renderLayout(currentDate, planValue, setDataForForecast(sortDataDay(dataDay), currentDate)), options);
  handlePlotlyClick(chartContainer);
}

function getHour(data) {
  if(data <= 1440) {
    return new Date(data * 60 * 1000).toISOString().substring(11, 16)
  } else {
    clearInterval(interval);
  }
}

const buttonStop =  document.querySelector('#button-stop')
const buttonActiv =  document.querySelector('#button-active')

let interval

buttonActiv.addEventListener('click', () => {
  let date = document.querySelector('#date');
  date.setAttribute('disabled', '')

  interval = setInterval(() => {

    let value = Math.floor(Math.random() * 50);
  
    minutes += 1;
  
    arrDataDay.push({ date: `${currentDate} ${getHour(minutes)}`, value: value});
    arrDataHour.push({ date: `${currentDate} ${getHour(minutes)}`, value: value });
  
    const dataTrace = [
      renderDayTrace(sortDataDay(arrDataDay)),
      renderHourTrace(),
      renderForecastTrace(setDataForForecast(sortDataDay(arrDataDay), currentDate), planValue),
    ];
  
    const options = {
      scrollZoom: true,
      responsive: true,
      showSendToCloud: true
    }
  
    Plotly.newPlot('chart', dataTrace, renderLayout(currentDate, planValue, setDataForForecast(sortDataDay(arrDataDay), currentDate)), options);
    handlePlotlyClick(chartContainer);
  }, 100);
})
buttonStop.addEventListener('click', () => {
  clearInterval(interval)
})

renderChart(arrDataDay);

function handleFormSubmit(inputData) {
  const { time, value} = inputData;
  if (inputData?.date) {
    currentDate = inputData?.date;
  }


  arrDataDay.push({ date: `${currentDate} ${time}`, value: Number(value) });
  arrDataHour.push({ date: `${currentDate} ${time}`, value: Number(value) });

  arrDataHour.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });

  renderChart(arrDataDay)
}

function handleButtonPlan(inputData) {
  const { plan } = inputData;

  planValue = Number(plan);

  arrProductionForecast.push({ date: `${currentDate} 23:59`, value: planValue });

  renderChart(arrDataDay)
}


