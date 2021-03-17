
// Personal API Key for OpenWeatherMap API
const urlBase = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'dc282be1a92d9f4a5f31d85a58fdb3cb'
const urlParams = ',us&units=imperial&appid='

// global variables for user inputs
const zipCode = document.getElementById('zip')
const feelings = document.getElementById('feelings')
const generate = document.getElementById('generate')

// global variable for outputs
const entryBox = document.getElementById('entryHolder')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

/* Function to GET Web API Data */
const performAction = async (event) => {
  event.preventDefault();

  const weatherData = await getWeatherData(urlBase, zipCode.value, apiKey);
  const newData = {
    temperature: weatherData.main.temp,
    date: dateBuilder(),
    content: feelings.value
  }
  await addWeatherData('/add', newData);
  updateHTML();
}

/* Function to update HTML to parse data from OpenWeather API */
updateHTML = async () => {
  const res = await fetch('/all');
  try {
    const jsonRes = await res.json();
    console.log(jsonRes);
  
    entryBox.style.display = 'block';
    temp.innerHTML = Math.floor(jsonRes.temperature) + '°F';
    content.innerHTML = jsonRes.content;
    date.innerHTML = jsonRes.date;    
  } catch(error) {
    console.log(`Error: ${error}`);
  }
}

/* Function to POST data */
const addWeatherData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log(`Error: ${error}`);
  }
}

/* Function to GET Project Data */
const getWeatherData = async (url, zipCode, apiId) => {
  const res = await fetch(`${url}${zipCode}${urlParams}${apiId}`);
  try {
      const data = await res.json();
      console.log(data);
      return data;
  } catch(error) {
      console.log(`Error: ${error}`);
  }
}

/* additional functionalities */
/* Function to construct current date */
const dateBuilder = () => {
  let d = new Date();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  let currentDate = `${day} ${month} ${date}, ${year}`
  return currentDate;
}

/* Function called by event listener */
generate.addEventListener('click', performAction);