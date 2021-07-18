import React, { useState } from "react";
import { Switch, Modal, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Setting from "../assets/cog-solid.svg";
import './PreferenceModal.css';
import CloseIcon from '../assets/closeIcon.svg'

const PreferenceModal = ({ preferences, handlePreferences }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonText, changeButtonText] = useState("Save")
  const handlePreference = (value) => {
    console.log(value)
    let preferenceIndex = preferences.findIndex(x => x.name == value.name);
    preferences[preferenceIndex].prefer = !preferences[preferenceIndex].prefer;
    console.log(preferences)
  };

  return (
    <>
      <input type="checkbox" id="active"
        className="absolute p-1 flex ml-98 z-50" onClick={() => setIsModalVisible(!isModalVisible)} />
      <label htmlFor="active" className="menu-btn flex p-4">
        {isModalVisible ? <img src={CloseIcon} /> : <img src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png" />}
      </label>
      <div className="wrapper">
        <h1 className="text-white text-2xl mt-12 text-bold">Your background preferences</h1>
        <div className="flex flex-col justify-center align-center mt-24 ml-24">
          <div className="grid grid-cols-2 text-white px-96">
            {preferences.map((value) => (
              <div className="grid grid-cols-2 pb-6">
                <label className="text-white text-2xl text-left">
                  {value.name.charAt(0).toUpperCase()}
                  {value.name.slice(1)}
                </label>
                <div>
                  <Switch
                    className="w-1 ml-2 border-2 border-white-200"
                    defaultChecked={value.prefer}
                    onChange={() => handlePreference(value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                changeButtonText("Saved");
                setTimeout(() => { changeButtonText("Save") }, 1000);
                handlePreferences(preferences)
              }}
              className="saveButton text-white border-2 border-white-200 h-12 w-3/12 rounded-sm">
              <span className="saveButton-text">{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferenceModal;
