import React, {useState, } from 'react'
import { Async } from "react-async"
import './weather.css'
// This is the API we'll use to request user data

const WeatherDisplay = ({data}) => {
    return (
        <div className='weather__display'>
        <div className='quick__info'>
            <h2>{data.name}</h2>
            <img src={data.icon} alt={data.shortForecast + ' image'} />
            <h3>{`Temperature: ${data.temperature}`} <span>&#176;</span>{`${data.temperatureUnit}`}</h3>
            <h3>{`Wind: ${data.windSpeed}`} {`${data.windDirection}`}</h3>
        </div>
        <h3 className='forecast'>{data.detailedForecast}</h3>
        {/* <h3>{data.shortForecast}</h3> */}

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      </div>
    )
}
const Weather = ({coordinates}) => {
  const [grid,setGrid] = useState({X: 31, Y: 80, ID: 'TOP'})
  const headers = { 'User-Agent': 'myweatherapp.com, contact@myweatherapp.com' }
  const latLangURL = ({coordinates}) => {
    return `https://api.weather.gov/points/${coordinates.lat},${coordinates.lang}`
  }


    const loadWeather = async () => {
      const latLangRes = await fetch(latLangURL({coordinates}), {header:{headers}})
      if (!latLangRes.ok) throw new Error(latLangRes.statusText)
      const respBody = await latLangRes.json()
      setGrid({X:respBody.properties.gridX,Y:respBody.properties.gridY,ID:respBody.properties.gridId})
      console.log({X:respBody.properties.gridX,Y:respBody.properties.gridY,ID:respBody.properties.gridId})
      
      if (!respBody) {return}
      const gridRes = await fetch(`https://api.weather.gov/gridpoints/${grid.ID}/${grid.X},${grid.Y}/forecast`, {header:{headers}})
      
      
      if (!gridRes.ok) throw new Error(gridRes.statusText)
      return gridRes.json()
    } 

     
return (
        <Async promiseFn={loadWeather}>
          <Async.Loading>
          loading...
          {/* <svg  xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-refresh" viewBox="0 0 32 32">
              <path class="spinner" 
              d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"/>
            </symbol>
          </svg> */}
        </Async.Loading>
          <Async.Fulfilled>
          {data => data.properties.periods.slice(0,10).map(data => {
            return (
              <WeatherDisplay data={data}/>
            )})
          }
        </Async.Fulfilled>
          <Async.Rejected>
          {error => `Something went wrong: ${error.message}`}
        </Async.Rejected>
        </Async>
    )
}
export const MemoizedWeather = React.memo(Weather)