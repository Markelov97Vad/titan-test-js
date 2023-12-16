import Form from "./script/Form.js";
import { handlePlotlyClick, setDataForForecast, sortDataDay } from "./script/utils.js";
import { renderLayout } from "./script/layout.js";
import { renderDayTrace, renderHourTrace, renderProductionPlan, renderForecastTrace } from "./script/traces.js";
const chartContainer = document.querySelector('.chart');

export const arrDataHour = [];
export const arrProductionForecast = [];
let planValue = 0;
let currentDate = '2018-06-15'
let arrDataDay = [];

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

renderChart(arrDataDay);

function handleFormSubmit(inputData) {
  const { date, time, value} = inputData;
  if (currentDate !== date) {
    currentDate = inputData.date;
  }

  arrDataDay.push({ date: `${date} ${time}`, value: Number(value) });
  arrDataHour.push({ date: `${date} ${time}`, value: Number(value) });

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


