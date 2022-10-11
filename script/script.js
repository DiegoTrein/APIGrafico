let datas = new Array()
let values = new Array()

const resp = fetch('https://www.econdb.com/api/series/IPUS/?format=json')
  .then(resp => resp.json())
  .then(resp => {
    for (i = 0; i < resp.data.dates.length; i++) {
      console.log(resp.data.dates[i] + "-" + resp.data.values[i])
      datas.push([resp.data.dates[i], resp.data.values[i]])
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      if (datas.length > 0) {
        let data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ...datas

        ]);

        let options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
      }
    }

  })