import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import './index.css';

const ENDPOINT_SERVER = 'http://localhost:3001'
const socket = socketIOClient(ENDPOINT_SERVER);

function App() {
  const [value, setValue] = useState("Input values you want calculate");

  const onClick = () => {
    const input = document.getElementById("input");
    socket.emit('client-sent-data', (input.value));
  }
  useEffect(() => {
    socket.on("server-sent-data", (data) => {
      setValue(data);
    });
  }, [])

  return (
    <div className="form">
      <form >
        <input
          id="input"
          type="text"
        ></input>
        <input
          type="button"
          onClick={onClick}
          value="Calculate"
        ></input>
      </form>
      <div>
        {value}
      </div>
    </div>
  );
}

export default App;
