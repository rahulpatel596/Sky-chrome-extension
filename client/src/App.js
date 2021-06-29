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

  const handlePreferences = () => {
    setPreferences(preferences);
  }

  setInterval(function () {
    setMinute(new Date().getMinutes());
    if (minute < 10) {
      setFinalMinute("0" + minute);
    } else {
      setFinalMinute(minute);
    }
  }, 10000);

  useEffect(() => {
    // chrome.storage.sync.get('preferences', function (data) {
    //   if (!chrome.runtime.error) {
    //     setPreferences(data);
    //     setIfPreferenceSet(true)
    //   }
    // })
    // if (!isPreferenceSet) {
    //   chrome.storage.sync.set({ [preferences]: preferences }, function () {
    //     console.log("new preferences set")
    //   })
    // }
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
    let key = 'preferences';
    // chrome.storage.sync.set({ [key]: preferences }, function () {
    //   console.log("Preferences set")
    // })
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
          {new Date().getHours()}:{minute}
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
