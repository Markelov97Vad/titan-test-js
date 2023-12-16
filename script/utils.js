import { arrDataAllValue, arrDataDay } from "./constants.js";

export function getForecastValue(arrValuesDay,) {
  const firstData = arrValuesDay[arrValuesDay.length - 2]
  const secondData = arrValuesDay[arrValuesDay.length - 1]
  const firstDateDay = firstData.date;
  const secondDateDay = secondData.date;
  const currentDate = firstData?.date.split(' ')[0] // 01:01

  function getTimeDifference(date, date2) {
    const fD = new Date(date).getTime();
    const sD = new Date(date2).getTime();
    return `${new Date(fD - sD).toISOString().slice(11,16)}` // 01:01
  }

  const averageValOverPeriodOfTime = secondData.value - firstData.value;
  const hour = getTimeDifference(secondDateDay, firstDateDay).split(':')[0]
  const minutes = getTimeDifference(secondDateDay, firstDateDay).split(':')[1]
  const hourEndOfDay = getTimeDifference(`${currentDate} 23:59`, secondDateDay).split(':')[0]
  const minutesEndOfDay = getTimeDifference(`${currentDate} 23:59`, secondDateDay).split(':')[1]
  const numberOfMinutesPerPeriod = (+hour * 60) + +minutes; // добыто за минут
  const restOfTimeUntilEnd = (+hourEndOfDay * 60) + +minutesEndOfDay; // сколько минут осталось до 23:59 // 
  const result = (averageValOverPeriodOfTime * restOfTimeUntilEnd) / numberOfMinutesPerPeriod

  return Math.round(result + Number(secondData.value));
}

export function getFormattedDate(date, { month, all }) {
  console.log("dateLOG",date);
  const userLocale = 'ru-RU';
  const ArrMonths = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь'];

  const dateFormatter = new Intl.DateTimeFormat(userLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    formatMatcher: "basic"
  });

  if(month === 1) {
    const resultFormatted = getUpperCase(date , dateFormatter);
    return `${(+resultFormatted[1])}. ${ArrMonths[+(date.substring(5,7)) - 1]}`
  }
  if(month === 2) {
    const resultFormatted = getUpperCase(date , dateFormatter);
    return `${(+resultFormatted[1] + 1)}. ${ArrMonths[+(date.substring(5,7)) - 1]}`
  }
  if(all) {
    const resultFormatted = dateFormatter.format(new Date(date)).split(' ').filter(el => el !== 'в').map(el => {
      const firstLetter = el.charAt(0).toLocaleUpperCase();
      return `${firstLetter}${el.slice(1)}`
    })
    return `${resultFormatted[0]} ${ArrMonths[+(date.substring(5,7)) - 1]} ${resultFormatted[1]},  ${resultFormatted[3]}`
  }
  return dateFormatter.format(new Date(date));
}

function getUpperCase(date, formatter) {
  console.log('Upper', date, formatter);
  const result = formatter.format(new Date(date)).split(' ').filter(el => el !== 'в').map(el => {
    const firstLetter = el.charAt(0).toLocaleUpperCase();
    return `${firstLetter}${el.slice(1)}`
  })
  return result
}

export function getColorTrace(dataForecast, plan) {
  const forecastValue = dataForecast[dataForecast.length - 1].value;
  return Number(plan) < Number(forecastValue) ? '#DEB887' : 'rgba(255, 6, 6, 1)';
}

export function sortDataDay(data) {
  let result = data.sort((dateA, dateB) => {
    return new Date(dateA.date) - new Date(dateB.date)
  });
  console.log('Arr Data VAlue',arrDataAllValue);
  result = data.map((dataDay, i) => {
    let date = dataDay.date
    return { date, value: arrDataAllValue[i] }
  })
  console.log('SORT DATA', result);
  return result
}

export function setDataForForecast(dataDay, currentDate) {
  let arrForTheForecastTrace = []
  if (dataDay?.length >= 2) {
    arrForTheForecastTrace.push(dataDay[dataDay.length - 1]);
    arrForTheForecastTrace.push({ date: `${currentDate} 23:59`, value: getForecastValue(dataDay) })
  }
  console.log('TEST',arrForTheForecastTrace);
  return arrForTheForecastTrace
}
