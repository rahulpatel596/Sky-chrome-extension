import React, { useState } from 'react';
import { Switch, Modal, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import Setting from '../assets/cog-solid.svg'
const PreferenceModal = () => {
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
  const handlePreference =(e)=>{

  }

  return (
    <>
      <button style={{ height: "30px", width: "30px" }} 
      className="absolute p-1 flex ml-98 z-50"
      onClick={showModal}
      >
      <img
        alt="Preference"
        src={Setting}
      />
      </button>
      <Modal className="z-50 absolute" title="Preferences" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Sky</label><Switch className="w-1"/></div>
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Mountains</label><Switch className="w-1"/></div>
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Tropical</label><Switch className="w-1"/></div>
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Nature</label><Switch className="w-1"/></div>
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Night</label><Switch className="w-1"/></div>
        <div className="grid grid-cols-4 gap-1 pb-2"><label>Ocean</label><Switch  className="w-1"/></div>
      </Modal>
    </>
  );
};

export default PreferenceModal;