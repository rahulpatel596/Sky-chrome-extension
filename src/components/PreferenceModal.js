import React, { useState } from "react";
import { Switch, Modal, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Setting from "../assets/cog-solid.svg";

const PreferenceModal = ({ preferences }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handlePreference = (checked, event, value) => {
    preferences.filter();
  };

  return (
    <>
      <button
        style={{ height: "30px", width: "30px" }}
        className="absolute p-1 flex ml-98 z-50"
        onClick={showModal}
      >
        <img alt="Preference" src={Setting} />
      </button>
      <Modal
        className="z-50"
        title="Preferences"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="grid grid-cols-2">
          {preferences.map((value) => (
            <div className="flex justify-between mr-24 pb-2">
              <label>
                {value.name.charAt(0).toUpperCase()}
                {value.name.slice(1)}
              </label>
              <Switch
                className="w-1"
                defaultChecked={value.prefer}
                onChange={handlePreference(value)}
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default PreferenceModal;
