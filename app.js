const countrys =["USA","Spain","Italy", "France","Sri Lanka","UK","Russia","Greenland"];
const form = document.getElementById('request-quote');
const countryList = document.getElementById('country-list');
const resultDiv = document.getElementById('display-result');

eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        displayCountryList();
    });
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

            
        }else{
            console.log("error");
        }
    }


    xhr.send();



});



