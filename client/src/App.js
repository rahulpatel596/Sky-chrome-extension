import React from "react";
import LoginPage from './components/LoginPage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import logo from "./logo.svg";
import "./App.css";
import Setting from "./assets/cog-solid.svg";
import PreferenceModal from "./components/PreferenceModal";
import { useEffect, useState } from "react";
import { changeConfirmLocale } from "antd/lib/modal/locale";

function App() {
  const [isPreferenceVisible, showPreferenceModal] = useState(false);
  let [minute, setMinute] = useState(new Date().getMinutes());
  let [finalMinute, setFinalMinute] = useState(minute);
  let [isPreferenceSet, setIfPreferenceSet] = useState(false);
  let [preferences, setPreferences] = useState([
    {
      name: "background",
      prefer: true,
    },
    {
      name: "dark",
      prefer: true,
    },
    {
      name: "nature",
      prefer: true,
    },
    {
      name: "tropical",
      prefer: true,
    },
    {
      name: "skyscrapper",
      prefer: true,
    },
    {
      name: "night",
      prefer: true,
    },
    {
      name: "mountains",
      prefer: true,
    },
    {
      name: "Sky",
      prefer: false,
    },
    {
      name: "ocean",
      prefer: true,
    },
    {
      name: "dark",
      prefer: true,
    },
  ]);

  const handlePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    chrome.storage.sync.set({ ['preferences']: newPreferences }, (data) => {
      console.log('Preferences updated', data);
    })
  }

  // setInterval(function () {
  //   setMinute(new Date().getMinutes());
  //   if (minute < 10) {
  //     setFinalMinute("0" + minute);
  //   } else {
  //     setFinalMinute(minute);
  //   }
  // });

  useEffect(() => {
    if (minute < 10) {
      setFinalMinute("0" + minute);
    } else {
      setFinalMinute(minute);
    }
  }, [minute])

  useEffect(() => {
    getUnsplashData();
  }, [preferences]);

  let getUnsplashData = () => {
    fetch(
      `https://source.unsplash.com/featured/${window.innerWidth}x${window.innerHeight
      }/?${preferences.join()}`
    )
      .then((res) => {
        window.document.querySelector(
          "#imgg"
        ).style.background = `url(${res.url})`;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const storedPreferences2 = new Promise((resolve, reject) => {
      chrome.storage.sync.get('preferences', data => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError)
        }
        resolve(data);
      })
    })
    console.log('104', storedPreferences2)
    storedPreferences2.then((data) => {
      console.log('103', data.preferences)
      if (data.preferences != undefined) {
        setPreferences(data.preferences);
      } else {
        chrome.storage.sync.set({ [preferences]: preferences }, function () {
          console.log("new Preferences set")
        })
      }
    })


  }, [])

  return (
    // <Router >
    //   <Switch>
    //     <Route exact path="/">
    <div className="App" style={{ background: "#f0f0f0" }}>
      <PreferenceModal
        handlePreferences={handlePreferences}
        modalVisible={isPreferenceVisible}
        preferences={preferences}
      />
      <header
        id="imgg"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className=""
          style={{ fontSize: "10rem", color: "white", fontWeight: "700" }}
        >
          {new Date().getHours()}:{finalMinute}
        </span>
      </header>
    </div>
    // </Route>
    // <Route path="/login" exact>
    // <LoginPage />
    // </Route>
    // </Switch>
    // </Router>
  );
}

export default App;
