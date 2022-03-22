const api = {
    key: '63bf289f0a05fdfa5b1002c77f53563c',
    baseurl: 'https://api.openweathermap.org/data/2.5/'

}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchbox.value);
        searchbox.value ='';

    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML =`${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

   changeBg(weather.weather[0].id);
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
function changeBg(weatherCode){
    if(weatherCode >= 200 && weatherCode <= 232) document.body.style.backgroundImage = "url('bgs/thunderstorm.jpg')";
    if(weatherCode >= 300 && weatherCode <= 321) document.body.style.backgroundImage = "url('bgs/drizzle.jpg')";
    if(weatherCode >= 500 && weatherCode <= 531) document.body.style.backgroundImage = "url('bgs/rain.jpg')";
    if(weatherCode >= 600 && weatherCode <= 622) document.body.style.backgroundImage = "url('bgs/snow.jpg')";
    if(weatherCode >= 700 && weatherCode <= 799) document.body.style.backgroundImage = "url('bgs/mist.jpg')";
    if(weatherCode == 800) document.body.style.backgroundImage = "url('bgs/clear.jpg')";
    if(weatherCode > 800 && weatherCode <= 899) document.body.style.backgroundImage = "url('bgs/clouds.jpg')";
    
    
}

document.body.style.backgroundImage = "url('bgs/bg.jpg')";