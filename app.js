const countrys =["USA","Spain","Italy", "France","Sri Lanka","UK","Russia","Greenland"];
const form = document.getElementById('request-quote');
const countryList = document.getElementById('country-list');
const resultDiv = document.getElementById('display-result');
const mapBtn = document.querySelector('.map-button');

// New variabels
const globalDetails = document.querySelector('.globaldetails');
const globalInfo = document.querySelector('.global-info');



eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        globalSituationDetails();
        globalDisplayMap('NewDeaths', 'new deths', {colors: ['#DBF1FB', '#003D7A']});
        displayCountryList();
    });
}

mapBtn.addEventListener('click', function(e){
    console.log(e.target);
});



function globalSituationDetails(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET','https://api.covid19api.com/summary', true);
    xhr.setRequestHeader("x-rapidapi-host", "covid-19-tracking.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "40abbeb59dmsh31789adfc7679d8p1abb39jsn6b5161e25af2");

    xhr.onload = function(){

        if(this.status === 200){
            const result = (JSON.parse(this.responseText)).Global;
            const date = JSON.parse(this.responseText).Date;

            const htmlResult =`
                    <div class="card">
                        <div class="card-body">
                            <h3 class="text-center text-primary mb-1">Global Situation</h3>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item text-primary"><i class="fas fa-virus mr-2"></i>New Confirmed <strong class=" ml-2"> ${result['NewConfirmed']} </strong></li>
                                <li class="list-group-item text-primary"><i class="fas fa-virus mr-2"></i>Total Confirmed <strong class=" ml-2"> ${result['TotalConfirmed']} </strong></li>
                                <li class="list-group-item text-success"><i class="fas fa-virus mr-2"></i>New Recovered <strong class=" ml-2"> ${result['NewRecovered']} </strong></li>
                                <li class="list-group-item text-success"><i class="fas fa-virus mr-2"></i>Total Recovered <strong class=" ml-2"> ${result['TotalRecovered']} </strong></li>     
                                <li class="list-group-item text-danger"><i class="fas fa-virus mr-2"></i>New Deaths <strong class=" ml-2"> ${result['NewDeaths']} </strong></li>
                                <li class="list-group-item text-danger"><i class="fas fa-virus mr-2"></i>Total Deaths <strong class=" ml-2"> ${result['TotalDeaths']} </strong></li>
                            </ul>    
                        </div>
                    </div>
            `;

            globalDetails.innerHTML = htmlResult;
            globalInfo.innerHTML = `Globally, as of <span class='text-info'> ${date.substring(0,10)} </span>, there have been <span class="text-primary"> ${result['NewConfirmed']} </span> New Confirmed cases of COVID-19, including <span class="text-danger"> ${result['TotalDeaths']}</span> deaths.`;
            
            globaldisplaychart(result, 'globelpiechart');
          
            
        }else{
            console.log("error");
        }
    }


    xhr.send();
 
}

function globaldisplaychart(result, displayDiv){
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    let totalDeaths = result.TotalDeaths;
    let totalRecovered = result.TotalRecovered;
    let totalConfirmed = result.TotalConfirmed;
   


    // Draw the chart and set the chart values
    function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Recovery', totalRecovered],
    ['Confirmed', totalConfirmed],
    ['Deth', totalDeaths]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
        'title':'Global Situation',
         colors: ['#03c956','#0070e0', '#F40119']
        };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById(`${displayDiv}`));
    chart.draw(data, options);
    }

}

function globalDisplayMap(propertyName, name , color){

    
    let xhr = new XMLHttpRequest();

    xhr.open('GET','https://api.covid19api.com/summary', true);
    xhr.setRequestHeader("x-rapidapi-host", "covid-19-tracking.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "40abbeb59dmsh31789adfc7679d8p1abb39jsn6b5161e25af2");

    xhr.onload = function(){

        if(this.status === 200){
            // Mapp
            const countrys = JSON.parse(this.responseText).Countries;
            
            const displayName = name;
            const property = propertyName;
            const colors = color;
            google.charts.load('current', {
                'packages':['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            
            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                ['Country','Name', `${displayName}`],
                ['','', 0]
                ]);
                
                countrys.forEach(country =>{
                let newData = `${country[`${property}`]}`;
                newData = parseInt(newData);
                var arraynew1 = {
                    'c' : [{v: `${country.CountryCode}`},{v: `${country.Country}`} ,{v : newData}],
                    'p': undefined
                };
                data['fg'].push(arraynew1);
                });
                
                //console.log(data.fg);
                var options = {
                'title':'Global Situation',
                colorAxis: colors
                };
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            
                chart.draw(data, options);
            }
        

        }else{
            console.log("error");
        }
    }


    xhr.send();
}



// Google Map
function globalMap(countryList, propertyName, displayName, color){

        

}

function displayCountryList(){

    countrys.forEach(country=>{
        const option = document.createElement('option');
        option.value = country;
        option.textContent = `${country}`;
        countryList.appendChild(option);     
    });



}

form.addEventListener('submit', function(e){
e.preventDefault();
const counterName = countryList.value;
const url = `https://covid-19-tracking.p.rapidapi.com/v1/${counterName}`;

let xhr = new XMLHttpRequest();


xhr.open('GET', url, true);
xhr.setRequestHeader("x-rapidapi-host", "covid-19-tracking.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "40abbeb59dmsh31789adfc7679d8p1abb39jsn6b5161e25af2");

xhr.onload = function(){

    if(this.status === 200){
        const result= (JSON.parse(this.responseText));
        console.log(result);

        const htmlResult =`
            <h5> Active Cases : ${result['Active Cases_text']} </h5>
            <h5> Country :  ${result['Country_text']} </h5>
            <h5> Last Update :  ${result['Last Update']} </h5>
            <h5> New Cases :  ${result['New Cases_text']}</h5>
            <h5> New Deaths :  ${result['New Deaths_text']}</h5>
            <h5> confirmed cases :  ${result['Total Cases_text']}</h5>
            <h5> Total Deaths :  ${result['Total Deaths_text']}</h5>
            <h5> Total Recovered :  ${result['Total Recovered_text']}</h5>
        `;

        resultDiv.innerHTML = htmlResult;
       // displaychart(result);
      

        
    }else{
        console.log("error");
    }
}


xhr.send();


});


