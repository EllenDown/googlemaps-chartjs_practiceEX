fetch('data.json').then(function(response) {
  return response.json()
}).then(function(data) {
  return data
}).then(function(data) {
  bestOne = getBestEffort(data, 60)
  bestFive = getBestEffort(data, 300)
  bestTen = getBestEffort(data, 600)
  bestFifteen = getBestEffort(data, 900)
  bestTwenty = getBestEffort(data, 1200)

  var onePowerAvg = document.createElement('p')
  var oneStart = document.createElement('p')
  var oneEnd = document.createElement('p')
  var onePowerAvgValue = document.createTextNode('Average Power: ' + (Math.round(bestOne[0])) + ' watts')
  var oneStartValue = document.createTextNode('Start Time: ' + bestOne[1] + ' minutes')
  var oneEndValue = document.createTextNode('End Time: ' + bestOne[2] + ' minutes')

  onePowerAvg.appendChild(onePowerAvgValue)
  oneStart.appendChild(oneStartValue)
  oneEnd.appendChild(oneEndValue)

  document.getElementById('oneMinute').appendChild(onePowerAvg)
  document.getElementById('oneMinute').appendChild(oneStart)
  document.getElementById('oneMinute').appendChild(oneEnd)

  var fivePowerAvg = document.createElement('p')
  var fiveStart = document.createElement('p')
  var fiveEnd = document.createElement('p')
  var fivePowerAvgValue = document.createTextNode('Average Power: ' + (Math.round(bestFive[0])) + ' watts')
  var fiveStartValue = document.createTextNode('Start Time: ' + bestFive[1] + ' minutes')
  var fiveEndValue = document.createTextNode('End Time: ' + bestFive[2] + ' minutes')

  fivePowerAvg.appendChild(fivePowerAvgValue)
  fiveStart.appendChild(fiveStartValue)
  fiveEnd.appendChild(fiveEndValue)

  document.getElementById('fiveMinute').appendChild(fivePowerAvg)
  document.getElementById('fiveMinute').appendChild(fiveStart)
  document.getElementById('fiveMinute').appendChild(fiveEnd)

  var tenPowerAvg = document.createElement('p')
  var tenStart = document.createElement('p')
  var tenEnd = document.createElement('p')
  var tenPowerAvgValue = document.createTextNode('Average Power: ' + (Math.round(bestTen[0])) + ' watts')
  var tenStartValue = document.createTextNode('Start Time: ' + bestTen[1] + ' minutes')
  var tenEndValue = document.createTextNode('End Time: ' + bestTen[2] + ' minutes')

  tenPowerAvg.appendChild(tenPowerAvgValue)
  tenStart.appendChild(tenStartValue)
  tenEnd.appendChild(tenEndValue)

  document.getElementById('tenMinute').appendChild(tenPowerAvg)
  document.getElementById('tenMinute').appendChild(tenStart)
  document.getElementById('tenMinute').appendChild(tenEnd)

  var fifteenPowerAvg = document.createElement('p')
  var fifteenStart = document.createElement('p')
  var fifteenEnd = document.createElement('p')
  var fifteenPowerAvgValue = document.createTextNode('Average Power: ' + (Math.round(bestFifteen[0])) + ' watts')
  var fifteenStartValue = document.createTextNode('Start Time: ' + bestFifteen[1] + ' minutes')
  var fifteenEndValue = document.createTextNode('End Time: ' + bestFifteen[2] + ' minutes')

  fifteenPowerAvg.appendChild(fifteenPowerAvgValue)
  fifteenStart.appendChild(fifteenStartValue)
  fifteenEnd.appendChild(fifteenEndValue)

  document.getElementById('fifteenMinute').appendChild(fifteenPowerAvg)
  document.getElementById('fifteenMinute').appendChild(fifteenStart)
  document.getElementById('fifteenMinute').appendChild(fifteenEnd)

  var twentyPowerAvg = document.createElement('p')
  var twentyStart = document.createElement('p')
  var twentyEnd = document.createElement('p')
  var twentyPowerAvgValue = document.createTextNode('Average Power: ' + (Math.round(bestTwenty[0])) + ' watts')
  var twentyStartValue = document.createTextNode('Start Time: ' + bestTwenty[1] + ' minutes')
  var twentyEndValue = document.createTextNode('End Time: ' + bestTwenty[2] + ' minutes')

  twentyPowerAvg.appendChild(twentyPowerAvgValue)
  twentyStart.appendChild(twentyStartValue)
  twentyEnd.appendChild(twentyEndValue)

  document.getElementById('twentyMinute').appendChild(twentyPowerAvg)
  document.getElementById('twentyMinute').appendChild(twentyStart)
  document.getElementById('twentyMinute').appendChild(twentyEnd)

})

function getBestEffort(data, k) {
  var dataFilter = data.samples.filter((item) => {
    if (item.values.power !== undefined) {
      return item
    }
  })

  var powerArray = dataFilter.map((item) => {
    return [item.values.power, item.millisecondOffset]
  })

  var startIndex = 0
  var endIndex = k - 1

  var currMax = 0;

  for (var i = 0; i < k; i++) {
    currMax += powerArray[i][0];
  }

  var maxSoFar = currMax;
  var bestEffort

  for (var j = k; j < powerArray.length; j++) {
    currMax += (powerArray[j][0] - powerArray[j - k][0]);
    maxSoFar = Math.max(currMax, maxSoFar);
    if (maxSoFar > currMax) {
      startIndex += 1
      endIndex += 1
    }
  }
  let time1 = Math.round(((powerArray[startIndex][1]) / 1000) / 60)
  let time2 = Math.round(((powerArray[endIndex][1]) / 1000) / 60)
  bestEffort = maxSoFar / k
  return [bestEffort, time1, time2]
}
