import Form from "./script/Form.js";

let allValue = 0;
let currentDate

const layout = {
  title: 'Скважина 1 -1',
  width: 1000,
  height: 700,
};

// const arrData = [
//   {"Date": "2018-06-15 09:01:00", "point": "15000"},
//   {"Date": "2018-06-15 06:01:00", "point": "18000"},
//   {"Date": "2018-06-15 07:01:00", "point": "19000"},
//   {"Date": "2018-06-15 08:01:00", "point": "22000"},
// ]
// const arrData2 = [
//   {"Date": "2018-06-15 05:01:00", "point": "15000"},
//   {"Date": "2018-06-15 06:01:00", "point": "3000"},
//   {"Date": "2018-06-15 07:01:00", "point": "1000"},
//   {"Date": "2018-06-15 08:01:00", "point": "3000"},
// ]
// const arrDataHour = [
  
// ]

const arrDataDay = []

function renderPoint(data, key) {
  if (data.length === 0 && key === "date") {
    console.log('i');
    return ["2018-06-15 05:00"]
  }
  if (data.length === 0 && key === "value") {
    return ["0"]
  }
  return data.map(el => {
    console.log(el[key]);
    return el[key] // ["2018-06-15 05:00"] || ["0"]
  })
}

function renderChart(data) {
  const dataTrace = [renderTrace()]
  return Plotly.newPlot('chart', dataTrace, layout, {showSendToCloud: true});
}

renderChart(arrDataDay)

function renderTrace() {
  return {
    type: "scatter",
    mode: "lines+markers",
    name: 'Добыто (сутки)',
    x: renderPoint(arrDataDay, 'date'),
    y: renderPoint(arrDataDay, 'value'),
    line: {
      color: '#800080',
      dash: 'solid',
      width: 4
    }
  }
}

// const trace2 = {
//   type: "bar",
//   mode: "lines",
//   name: 'Добыто (час)',
//   x: renderPoint(arrData2, 'Date'),
//   y: renderPoint(arrData2, 'point'),
//   marker: {
//     color: '#97E245',
//     line: {
//       color: '#FFFFFF',
//       width: 1.5
//     }
//   }
// }


function handleFormAddPoint(data) {

  if(!currentDate) {
    currentDate = data.date
  }
  const {date = currentDate, time, value} = data;
  allValue = +value + allValue
  
  arrDataDay.push({date: `${date} ${time}`, value: allValue + ''})
  // let min = '00:00';
  // let max = '23:59';
  const dataTrace = [renderTrace()]
  renderChart(dataTrace)
}

const formMenu = new Form('menu', handleFormAddPoint);

formMenu.setEventListeners();


