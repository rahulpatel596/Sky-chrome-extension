import React, { useState } from "react";
const axios = require('axios');
const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, password, email)
        axios({method: 'post',url:'http://localhost:5000/user', data:{
            name: name,
            email: email,
            password: password
        }}).then((res) => { console.log(res) }).catch((err) => console.error(err));
    }
  return (
      <>
          <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" name="input" onChange={(e) => {setName(e.target.value)}}/>
              <input type="text" name="name" onChange={(e) => {setEmail(e.target.value)}}/>
              <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
          <button type="submit">Submit</button>
          </form>

    </>
  );
};

export default LoginPage;
