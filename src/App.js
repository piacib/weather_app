// Let's import React, our styles and React Async
import React from 'react';
import './App.css';
import {WeatherTest} from './weatherTest.js'
import {Search} from './Search.js'

// Our App component
function App() {
  return (
    <div className="container">
      <Search/>
      <WeatherTest coordinates={{lat : 39.7456, lang : -97.0892}} />
      </div>
  )
}
export default App;
