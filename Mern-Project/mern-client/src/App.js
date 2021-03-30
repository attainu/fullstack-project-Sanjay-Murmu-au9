import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import { DetaProvider } from './GlobalState'
import Header from './component/header/Header'
import Pages from './component/mainpage/Pages'
function App() {
  return (
      <DetaProvider>
        <Router>
        <div className="App">
          <Header/>
          <Pages/>
          

        </div>
        </Router>
       </DetaProvider>
    
  );
}

export default App;

