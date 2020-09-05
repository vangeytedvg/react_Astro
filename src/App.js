import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/pages/Home.jsx'
import New from './components/pages/New'
import About from './components/pages/About'
import MoonSun from './components/pages/MoonSun'
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/new" component={New} />
          <Route path="/moonsun" component={MoonSun} />
          <Route path="/about" component={About}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
