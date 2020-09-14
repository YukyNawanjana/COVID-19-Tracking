
   

      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]
        ]);

        var options = {
          'title':'Global Situation',
            colorAxis: {colors: ['#AED6F1', '#2874A6']},
          };
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }


      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'Global Situation'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }


      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(drawBasic);
      
      function drawBasic() {
      
            var data = google.visualization.arrayToDataTable([
              ['City', '2010 Population',],
              ['New York City, NY', 8175000],
              ['Los Angeles, CA', 3792000],
              ['Chicago, IL', 2695000],
              ['Houston, TX', 2099000],
              ['Philadelphia, PA', 1526000]
            ]);
      
            var options = {
              title: 'Population of Largest U.S. Cities',
              chartArea: {width: '50%'},
              hAxis: {
                title: 'Total Population',
                minValue: 0
              },
              vAxis: {
                title: 'City'
              }
            };
      
            var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      
            chart.draw(data, options);
          }