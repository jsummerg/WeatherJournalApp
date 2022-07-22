/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = 'fd2aa609c029175ea5cf40c8bc2e1a14'

// https://openweathermap.org/current#zip for more info
// https://openweathermap.org/weather-data data info

// https://api.openweathermap.org/data/2.5/weather?zip=3975,au&units=metric&appid=fd2aa609c029175ea5cf40c8bc2e1a14' (for me)


// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// Event on button click
document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
    const zipCode =  document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    getWeather(baseURL, zipCode, apiKey) // Get weather info through API Call
    .then(function(data){
        postData('/add', {temp:data.main.temp, date: newDate, feelings: feelings}) // Send data to the server to be added to the database
        updateUI() // Update UI to display the data
    })

}


//Get Data from weather api
const getWeather = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(`${baseURL}${zipCode},au&units=metric&appid=${apiKey}`) // Set to only seach in Australia and put the units in Metric
    try { //API call using the baseurl, zipcode and api key
        const data = await res.json()
        return data
    } catch(error) {
        console.log("error", error)
    }
}


// Data post
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    })
    try {
        const newData = await response.json()
        return newData // Sends data to the POST route in server.js
    } catch(error) {
        console.log("error", error)
    }
}


// Update UI
const updateUI = async () => {
    const request = await fetch('/data') // GET request from /data to access projectData object
    try{ //Edit innerhtml to fill each div with info from projectData
      const projectData = await request.json()
      document.getElementById('temp').innerHTML = `Temp: ${projectData.temperature}`
      document.getElementById('date').innerHTML = `Date: ${projectData.date}`
      document.getElementById('content').innerHTML = `Comment: ${projectData.userResponse}`
    }catch(error){
      console.log("error", error)
    }
  }