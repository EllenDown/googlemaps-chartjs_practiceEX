var myChart;

var powerGraph = document.getElementById("powerGraph");

fetch('data.json').then(function(response) {
  return response.json()
}).then(function(data) {
  return data
}).then(createChartConfig)

function createChartConfig(data) {
  var powerData = data.samples.map((item) => {
    return [item.millisecondOffset, item.values.power]
  })

  var index = 0;
  var segmentSize = 10;

  var powerDataTime = powerData.map((item) => {
    return item[0]
  })

  var segmentsTime = [];

  for (index = 0; index < powerDataTime.length; index += segmentSize) {
    segmentTime = powerDataTime.slice(index, index + segmentSize).reduce((total, curr) => {
      return total + curr
    })
    segmentsTime.push(segmentTime / segmentSize);
  }

  var powerDataPower = powerData.map((item) => {
    return item[1]
  })

  var segmentsPower = [];

  for (index = 0; index < powerDataPower.length; index += segmentSize) {
    segmentPower = powerDataPower.slice(index, index + segmentSize).reduce((total, curr) => {
      return total + curr;
    })
    segmentsPower.push(segmentPower / segmentSize);
  }

  var result = [],
    i = -1;
  while (segmentsTime[++i]) {
    result.push([segmentsTime[i], segmentsPower[i]]);
  }

  var dataSyntax = result.map((item) => {
    return {
      x: ((item[0] / 1000) / 60),
      y: item[1]
    }
  })

  let graph = new Chart(powerGraph, {

    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Power Output',
          lineTension: 0,
          pointRadius: .1,
          borderWidth: 1,
          pointBackgroundColor: '#0066CC',
          pointBorderColor: '#0066CC',
          backgroundColor: '#0066CC',
          borderColor: '#0066CC',
          data: dataSyntax,
          fill: false,
          line: true
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: ' Your Workout Power Output',
        fontFamily: 'Exo',
        fontColor: 'black',
        fontSize: 22
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Time (minutes)',
              fontFamily: 'Exo',
              fontColor: 'black',
              fontSize: 16
            },
            ticks: {
              min: 0,
              max: 90,
              stepSize: 5
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Power (watts)',
              fontFamily: 'Exo',
              fontColor: 'black',
              fontSize: 16
            },
            ticks: {
              min: 0,
              max: 600,
              stepSize: 50
            },
            gridLines: {
              display: false
            }
          }
        ]
      },
      hover: {
        onHover: function(element) {
          if (element.length > 0) {
            findLatLng(data, element[0]._index)
          }
        }
      },
      tooltips: {
        mode: 'label',
        xPadding: 10,
        yPadding: 10,
        bodySpacing: 4,
        callbacks: {
          label: function(tooltipItem, data) {
            let labelX = 'Time'
            let valueX = Math.round(tooltipItem.xLabel)
            let labelY = 'Power'
            let valueY = Math.round(tooltipItem.yLabel)
            return [
              labelX + ': ' + valueX,
              labelY + ': ' + valueY
            ];
          }
        }
      }
    }
  })
}
