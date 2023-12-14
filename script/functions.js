export function getForecastValue(arrValuesDay, arrValuesHour) {
  console.log('arrValueDay', arrValuesDay);
  // console.log('arrValuesHour', arrValuesHour);

  const firstData = arrValuesDay[arrValuesDay.length - 2]
  // {
  //   "date": "2023-12-14 01:01",
  //   "value": 55
  // }
  const secondData = arrValuesDay[arrValuesDay.length - 1]
  const firstDateDay = firstData.date;
  const secondDateDay = secondData.date;
  // {
    //   "date": "2023-12-14 12:01",
    //   "value": 100
    // }
  // const lastValue = firstData?.value // 100
  // const growth = arrValuesHour[arrValuesHour.length - 1]?.value // 77 прирост
  // const firstTime = firstData?.date.split(' ')[1] // 01:01
  const currentDate = firstData?.date.split(' ')[0] // 01:01
  // const secondTime = lastData?.date.split(' ')[1] // 12:01
  // const middleValue = ''
  // const timeDifference = secondTime - firstTime
  // const firstValue = 

  function getTimeDifference(date, date2) {
    const fD = new Date(date).getTime();
    const sD = new Date(date2).getTime();
    return `${new Date(fD - sD).toISOString().slice(11,16)}` // 01:01
  }

  // getTimeDifference(secondDateDay, firstDateDay);
  const averageValOverPeriodOfTime = secondData.value - firstData.value;
  const hour = getTimeDifference(secondDateDay, firstDateDay).split(':')[0]
  const minutes = getTimeDifference(secondDateDay, firstDateDay).split(':')[1]
  const hourEndOfDay = getTimeDifference(`${currentDate} 23:59`, secondDateDay).split(':')[0]
  const minutesEndOfDay = getTimeDifference(`${currentDate} 23:59`, secondDateDay).split(':')[1]
  // const allMin = (+('23:59'.split(':')[0]) * 60) + +('23:59'.split(':')[1]) //1439
  const numberOfMinutesPerPeriod = (+hour * 60) + +minutes; // добыто за минут
  const restOfTimeUntilEnd = (+hourEndOfDay * 60) + +minutesEndOfDay; // сколько минут осталось до 23:59 // 

  const result = (averageValOverPeriodOfTime * restOfTimeUntilEnd) / numberOfMinutesPerPeriod
  console.log('Get Forecast value', Math.round(result));
  return Math.round(result);

}


// [{
//   "date": "2023-12-14 01:01",
//   "value": 55
// },{
//   "date": "2023-12-14 12:01",
//   "value": 100
// }]