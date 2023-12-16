import { arrDataHour } from "./constants.js";
import { getColorTrace } from "./utils.js";

export function renderDayTrace(newArrDataDay) {

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
  // console.log('Data Hour',new Date(renderPoint(setValuePerHour(arrDataHour), 'date'))?.getTime());
  // console.log('Data Hour',renderPoint(setValuePerHour(arrDataHour), 'value'));
  return {
    name: 'Добыто (час)',
    hoverinfo: 'none',
    type: "bar",
    mode: "lines",
    // x: renderPoint(arrDataHour, 'time'),
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
  // getColorTrace(dataForecast, plan)
  console.log(dataForecast);
  return {
    name: 'Прогноз добычи',
    x: renderPoint(dataForecast, 'date'),
    y: renderPoint(dataForecast, 'value'),
    // mode: 'lines+markers',
    mode: 'lines+markers',
    hoverinfo: 'none',
    line: {
      color: dataForecast.length > 0 ? getColorTrace(dataForecast, plan) : '#DEB887',
      dash: 'dot',
      width: 4
    },
    // text: dataForecast[dataForecast.length - 1]?.value,
    // text: dataForecast[1]?.value + '',
    // ax: 20,
    // ay: -30,
    // align: 'center',
    // font: {
    //   family: 'Courier New, monospace',
    //   size: 16,
    //   color: 'black',
    //   weight: 16
    // },
    showarrow: false
  };
}

export function renderProductionPlan(date = '2018-06-15', plan = 0) {
  const x = [`${date} 12:00`];
  const y = [plan, plan];

  const trace = {
    name: 'План добычи',
    x: x,
    y: y,
    width: 86400000, // ширина сутки (миллисекунд)
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
    return el[key] // ["2018-06-15 05:00"] || ["0"]
  })
}

function setValuePerHour(arrValueDay) {
  let arrHour = arrValueDay.map(data => data.date.split(' ')[1].split(':')[0]) // '06'
  let newArr = [];
  let count = 0
  arrValueDay.forEach((dateVal, i) => {
    const { date, value } = dateVal; // 122, 31
    const time = date.split(' ')[1]; // '06:13'
    const currentDate = date.split(' ')[0]; // '2015-06-15'
    const hour = time.split(':')[0]; // '06'
    if (hour === arrHour[i + 1]) {
      count += +value
      return
    }
    count += +value
    newArr.push({ date: `${currentDate} ${hour}:00`, value: count })
    count = 0
  })

  console.log("NEW Arr", newArr);
  return newArr

}
