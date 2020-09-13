const countrys =["USA","Spain","Italy", "France","Sri Lanka","UK","Russia","Greenland"];
const form = document.getElementById('request-quote');
const countryList = document.getElementById('country-list');
const resultDiv = document.getElementById('display-result');
const globalDetails = document.querySelector('.globaldetails');

eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        globalSituationDetails();
        displayCountryList();
    });
}

function globalSituationDetails(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET','https://api.covid19api.com/summary', true);
    xhr.setRequestHeader("x-rapidapi-host", "covid-19-tracking.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "40abbeb59dmsh31789adfc7679d8p1abb39jsn6b5161e25af2");

    xhr.onload = function(){

        if(this.status === 200){
            const result= (JSON.parse(this.responseText)).Global;
            console.log(result);

            const htmlResult =`
                <div class='card-body'>
                    <h5> New Confirmed : ${result['NewConfirmed']} </h5>
                    <h5> New Deaths :  ${result['NewDeaths']} </h5>
                    <h5> New Recovered :  ${result['NewRecovered']} </h5>
                    <h5> Total Confirmed :  ${result['TotalConfirmed']} </h5>
                    <h5> Total Deaths :  ${result['TotalDeaths']}</h5>
                    <h5> Total Recovered :  ${result['TotalRecovered']}</h5>
                </div>
            `;

            globalDetails.innerHTML = htmlResult;

           globaldisplaychart(result, 'globelpiechart');
          

            
        }else{
            console.log("error");
        }
    }


    xhr.send();
 
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

           displaychart(result);
          

            
        }else{
            console.log("error");
        }
    }


    xhr.send();



});

function globaldisplaychart(result, displayDiv){
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    let totalDeaths = result.TotalDeaths;
   let totalRecovered = result.TotalRecovered;
   


    // Draw the chart and set the chart values
    function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Recovery', totalRecovered],
    ['Deth', totalDeaths]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
        'title':'Global Situation',
         'width':550, 
         'height':400,
         colors: ['#3498DB','#E74C3C']
        };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById(`${displayDiv}`));
    chart.draw(data, options);
    }

}