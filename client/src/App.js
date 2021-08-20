import React from "react";
import LoginPage from './components/LoginPage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import logo from "./logo.svg";
import "./App.css";
import Setting from "./assets/cog-solid.svg";
import PreferenceModal from "./components/PreferenceModal";
import { useEffect, useState } from "react";
import { useDate } from "./components/useDate";
require('dotenv').config();

const openWeatherAPIKey = process.env.openWeatherAPIKey;


function App() {

  const [isPreferenceVisible, showPreferenceModal] = useState(false);
  let [preferences, setPreferences] = useState([]);
  let [location, setLocation] = useState({});
  let [weatherData, setWeatherData] = useState({})
  let { date, time, wish } = useDate();
  const [photoInfo, setPhotoInfo] = useState({});

  // Handle preferences
  const handlePreferences = (newPreferences) => {
    console.log('called handlePreferences', newPreferences)
    setPreferences(newPreferences)
    chrome.storage.sync.set({ 'preferences': newPreferences }, (data) => {
      console.log('Preferences updated', data);
    })
  }

  // OnLoad useEffect
  // Get Image and Preferences from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get('nextImage', (data) => {
      if (data.nextImage) {
        window.document.querySelector(
          "#imgg"
        ).style.background = `url(${data.nextImage})`;

        window.document.querySelector(
          "#imgg"
        ).style.backgroundRepeat = `no-repeat`;

        window.document.querySelector(
          "#imgg"
        ).style.backgroundSize = `cover`;
        window.document.querySelector(
          "#imgg"
        ).style.backgroundPosition = `center center`;
      }
    });

    chrome.storage.sync.get('photoInfo', data => {
      if (data.photoInfo) {
        console.log('photoInfo ', data.photoInfo)
        setPhotoInfo(data.photoInfo);
      }
    })

    // Get Location from chrome.storage
    chrome.storage.sync.get('location', (data) => {
      if (data.location.latitude && data.location.longitude) {
        console.log("Location found")
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude })
          chrome.storage.sync.set({ location: { latitude: latitude, longitude: longitude } })
          // Show a map centered at latitude / longitude.
        }, (error) => {
          console.log(error)
        });
      }
    });

    // Getting User background preferences from chrome.storage
    chrome.storage.sync.get('preferences', data => {
      console.log('preferences', data);
      if (data.preferences) {
        setPreferences(data.preferences)
      }
    })

    // Getting weatherData from chrome.storage
    chrome.storage.sync.get('weatherData', data => {
      if (data.weatherData) {
        console.log('weather data 71', data.weatherData.main.temp)
        setWeatherData(data.weatherData)
      }
    })


  }, [])

  useEffect(() => {
    if (weatherData && weatherData.main) {
      document.querySelector('.weather-icon').style.background = `url(http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png)`;
    }
  }, [weatherData])

  return (
    <div className="App" style={{ background: "#f0f0f0" }}>
      <PreferenceModal
        handlePreferences={handlePreferences}
        modalVisible={isPreferenceVisible}
        preferences={preferences}
      />

      <div
        id="imgg"
        style={{
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          margin: "auto",
          padding: "0"
        }}
      >
        <div className="text-white flex self-start p-4" style={{ backdropFilter: "blur(2px)", width: "10%", borderRadius: "100px" }}>
          <span className="flex flex-col">
            <span className="flex" style={{ fontSize: "1.5rem" }}><span>{weatherData.main && Math.round(weatherData.main.temp)}</span><span className={`${weatherData.name ? "" : "hidden"}`}>&#8451;</span></span>
            <span className="" style={{ fontSize: "1rem" }}>
              {weatherData && weatherData.name}
            </span>
          </span>
          <span className="weather-icon h-12 w-12"></span>
        </div>
        <span
          className="self-center mt-56 flex flex-col items-center justify-center space-y-0"
        >
          <span style={{ fontSize: "13rem", color: "white", fontWeight: "600", verticalAlign: "bottom" }}>{time.slice(0, -2)}</span>
          <span style={{ fontSize: "2rem", color: "white", fontWeight: "600", marginTop: "-35px" }}>{wish}</span>
        </span>
        <div className="flex h-2/6 ml-2">
          <span className="flex self-end relative text-white" >
            Photo by &nbsp;<a href={photoInfo && photoInfo.link}>{photoInfo && photoInfo.userName}</a><span> &nbsp; / &nbsp; </span> <a href="https://unsplash.com/"> Unsplash</a>
          </span>
        </div>
      </div>

    </div>

  );
}

export default App;
