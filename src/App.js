import logo from "./logo.svg";
import "./App.css";
import Setting from "./assets/cog-solid.svg";

import { useEffect, useState } from "react";

function App() {
  let [minute, setMinute] = useState(new Date().getMinutes());
  let [preferences, setPreference] = useState([
    "background",
    "dark",
    "nature",
    "tropical",
    "skyscrapper",
    "mountain",
    "ocean",
    "night",
    "sky",
  ]);

  setInterval(function () {
    setMinute(new Date().getMinutes());
  }, 10000);

  useEffect(() => {
    getUnsplashData();
  }, [preferences]);

  let getUnsplashData = () => {
    fetch(
      `https://source.unsplash.com/featured/${window.innerWidth}x${
        window.innerHeight
      }/?${preferences.join()}`
    )
      .then((res) => {
        window.document.querySelector(
          "#imgg"
        ).style.background = `url(${res.url})`;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App" style={{ background: "#f0f0f0" }}>
      <img
        alt="Preference"
        src={Setting}
        style={{ height: "30px", width: "30px" }}
        className="absolute mr-{10vw} z-10 "
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
  );
}

export default App;
