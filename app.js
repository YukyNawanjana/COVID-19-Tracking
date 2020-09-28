//const countrys =["USA","Spain","Italy", "France","Sri Lanka","UK","Russia","Greenland"];
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
        globalDisplayMap('NewConfirmed', 'New Confirmed', {colors:['#ADD5FF', '#007BFF']});
        displayCountryList();
    });
}

mapBtn.addEventListener('click', function(e){
    
    const value = e.target.value;
    if(value ==='confirmed'){
        globalDisplayMap('NewConfirmed', 'New Confirmed', {colors:['#ADD5FF', '#007BFF']});
    }else if(value ==='recovered'){
        globalDisplayMap('NewRecovered', 'New Recovered', {colors: ['#A0E4C1', '#109618']});
    }else{
        globalDisplayMap('NewDeaths', 'New Deaths', {colors: ['#FFD6D9', '#F2022A']});
    }
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
            //console.log(countrys);

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


function displayCountryList(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET','https://api.covid19api.com/summary', true);
    xhr.setRequestHeader("x-rapidapi-host", "covid-19-tracking.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "40abbeb59dmsh31789adfc7679d8p1abb39jsn6b5161e25af2");

    xhr.onload = function(){

        if(this.status === 200){

            let responseList = JSON.parse(this.responseText);
                responseList = responseList.Countries;
                //console.log(responseList);

            let countrys = [];
            responseList.forEach(response=>{
                countrys.push({country : `${response.Country}`, code : `${response.CountryCode}`})
                
            });

            // Display country list in HTML
            countrys.forEach(country =>{
                const option = document.createElement('option');
                option.value = country['code'];
                option.textContent = `${country['country']}`;
                countryList.appendChild(option);     
            });

                /*
                // country Arry objects sorting
                countrys.sort((a, b) => (a.country > b.country) ? 1 : -1);   
                */

        }else{
            console.log("Error");
        }

    }

    xhr.send();


}


form.addEventListener('submit', function(e){
e.preventDefault();
const counterCode = countryList.value;
const url = `https://api.covid19api.com/summary`;

let xhr = new XMLHttpRequest();


xhr.open('GET', url, true);


xhr.onload = function(){

    if(this.status === 200){
        // const date = Date();
        // const month =date.getMonth();
        // console.log(month);
        let result= (JSON.parse(this.responseText));
        //const resultLength = (result.length) - 1;
        //console.log(result[resultLength]);
        result = result.Countries;
        result.forEach(country=>{
            //console.log(country);
            if(country.CountryCode == counterCode ){
                const countryDetails = country;
                
                let date = (countryDetails.Date).substring(0,10);
               //console.log(date.substring(11,16));

                const htmlResult =`
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title d-flex justify-content-between align-items-center">
                                            <img src="https://www.countryflags.io/${countryDetails['CountryCode']}/flat/64.png" class="img-fluid">
                                            <h3 class="text-center text-primary mb-1">${countryDetails['Country']}</h3>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item text-primary"><i class="fas fa-virus mr-2"></i>New Confirmed <strong class=" ml-2">  ${countryDetails['NewConfirmed']} </strong></li>
                                            <li class="list-group-item text-primary"><i class="fas fa-virus mr-2"></i>Total Confirmed <strong class=" ml-2"> ${countryDetails['TotalConfirmed']} </strong></li>
                                            <li class="list-group-item text-success"><i class="fas fa-virus mr-2"></i>New Recovered <strong class=" ml-2"> ${countryDetails['NewRecovered']} </strong></li>
                                            <li class="list-group-item text-success"><i class="fas fa-virus mr-2"></i>Total Recovered <strong class=" ml-2">  ${countryDetails['TotalRecovered']} </strong></li>     
                                            <li class="list-group-item text-danger"><i class="fas fa-virus mr-2"></i>New Deaths <strong class=" ml-2">  ${countryDetails['NewDeaths']} </strong></li>
                                            <li class="list-group-item text-danger"><i class="fas fa-virus mr-2"></i>Total Deaths <strong class=" ml-2"> ${countryDetails['TotalDeaths']} </strong></li>
                                        </ul> 
                                        <p class="text-center text-dark font-weight-bold mt-2"> Last Update :  ${countryDetails['Date'].substring(0,10)} - ${countryDetails['Date'].substring(11,16)}:AM </p>   
                                    </div>
                                </div>
                `;

                resultDiv.innerHTML = htmlResult;

               //displaychart(countryDetails, piechart);
            
            }
        });
        
    }else{

    }
}

xhr.send();

});


