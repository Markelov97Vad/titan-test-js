import Form from "./script/Form.js";

let allValue = 0;
let currentDate
const arrDataHour = []
const arrDataAllValue = []
const arrDataDay = []
let arrDataTime = []
let select =  document.querySelector('#time');

const formMenu = new Form('menu', handleFormAddPoint);
formMenu.setEventListeners();

const layout = {
  title: 'Скважина 1 - 1',
  width: 1000,
  height: 700,
};

Array.from(Array(24)).forEach((el, i) => arrDataTime.push(`${i}:00`))

function renderTimeForSelector(time) {
  arrDataTime = arrDataTime.filter(timeFromSelect => {
    return timeFromSelect !== time
  })
  select.innerHTML = ''
  arrDataTime.forEach((el) => {
    select.insertAdjacentHTML('afterbegin', `<option value="${el}">${el}</option>`)
  })
}

renderTimeForSelector();

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


function renderPoint(data, key) {
  if (data.length === 0 && key === "date") {
    return ["2018-06-15 05:00"]
  }
  if (data.length === 0 && key === "value") {
    return ["0"]
  }

  return data.map(el => {
    return el[key] // ["2018-06-15 05:00"] || ["0"]
  })
}

// отрисовывает уже готовый макет
function renderChart(dataDay) {
  const dataTrace = [renderDayTrace(dataDay),renderHourTrace()]
  return Plotly.newPlot('chart', dataTrace, layout, {showSendToCloud: true});
}

renderChart(arrDataDay)

// декомпозировать
function renderDayTrace(dataDay) {
  return {
    type: "scatter",
    mode: "lines",
    name: 'Добыто (сутки)',
    x: renderPoint(dataDay, 'date'),
    y: renderPoint(dataDay, 'value'),
    line: {
      color: '#800080',
      dash: 'solid',
      width: 4
    }
  }
}

//Декомпозировать
function renderHourTrace() {
  return {
    type: "bar",
    mode: "lines",
    name: 'Добыто (час)',
    x: renderPoint(arrDataHour, 'date'),
    y: renderPoint(arrDataHour, 'value'),
    marker: {
      color: '#97E245',
      line: {
        color: '#FFFFFF',
        width: 1.5
      }
    }
  }
}

function handleFormAddPoint(data) {
  if(!currentDate) {
    currentDate = data.date
  }
  const {date = currentDate, time, value} = data;
  allValue = +value + allValue

  renderTimeForSelector(time);

  arrDataAllValue.push(allValue)  
  arrDataDay.push({date: `${date} ${time}`, value: allValue + ''});
  arrDataHour.push({date: `${date} ${time}`, value})
  arrDataDay.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });
  let newArrDataDay = arrDataDay.map((dataDay, i) => {
    let date = dataDay.date
    return { date, value: arrDataAllValue[i]}
  })

  renderChart(newArrDataDay)
}

