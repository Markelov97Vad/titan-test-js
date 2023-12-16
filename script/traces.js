import { arrDataHour } from "../index.js";
import { getColorTrace } from "./utils.js";

export function renderDayTrace(newArrDataDay) {
  return {
    name: 'Добыто (сутки)',
    hoverinfo: 'none',
    type: "scatter",
    mode: "lines",
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

export function renderHourTrace() {
  return {
    name: 'Добыто (час)',
    hoverinfo: 'none',
    type: "bar",
    mode: "lines",
    x: renderPoint(setValuePerHour(arrDataHour), 'date'),
    y: renderPoint(setValuePerHour(arrDataHour), 'value'),
    width: 3600000,
    marker: {
      color: '#97E245',
      line: {
        color: '#FFFFFF',
        width: 1.5
      }
    }
  }
}

export function renderForecastTrace(dataForecast, plan = 0) {
  return {
    name: 'Прогноз добычи',
    x: renderPoint(dataForecast, 'date'),
    y: renderPoint(dataForecast, 'value'),
    mode: 'lines+markers',
    hoverinfo: 'none',
    line: {
      color: dataForecast.length > 0 ? getColorTrace(dataForecast, plan) : '#DEB887',
      dash: 'dot',
      width: 4
    },
    showarrow: false
  };
}

export function renderProductionPlan(date, plan = 0) {
  const x = [`${date} 12:00`];
  const y = [plan, plan];

  const trace = {
    name: 'План добычи',
    x: x,
    y: y,
    width: 86400000, // сутки (миллисекунд)
    hoverinfo: 'none',
    marker: {
      color: ` ${plan === 0 ? 'rgba(0, 0, 0, 0.25)' : 'rgba(55,128,191,0.4)'}`,
    },
    type: 'bar',
  };
  return trace;
}

function renderPoint(data, key) {
  return data.map(el => {
    return el[key];
  })
}

function setValuePerHour(arrValueDay) {
  let arrHour = arrValueDay.map(data => data.date.split(' ')[1].split(':')[0]);
  let newArr = [];
  let count = 0;
  arrValueDay.forEach((dateVal, i) => {
    const { date, value } = dateVal;
    const time = date.split(' ')[1];
    const currentDate = date.split(' ')[0];
    const hour = time.split(':')[0];

    if (hour === arrHour[i + 1]) {
      count += +value
      return
    }
    count += +value
    newArr.push({ date: `${currentDate} ${hour}:00`, value: count })
    count = 0
  });

  return newArr
}
