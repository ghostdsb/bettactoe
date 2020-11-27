import React, { useEffect } from 'react';
import Routes from "./routes";

import './App.css';

// import { channel } from './services/network';

const App: React.FC = () =>  {

  // useEffect(() => {
  //   channel.join().receive("ok", (msg) => {
  //     console.log("DSB: msg", msg);
  //   });
  // }, [])

  return (
    <div className="App">
      <Routes/>
    </div>
  )
}

export default App;
