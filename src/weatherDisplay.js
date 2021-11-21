import React, {useState, useEffect} from 'react';
import './weather.css'
import loading from './loading.svg'

const WeatherCard = ({data}) => {
    return (
        <div className='weather__display'>
        <div className='quick__info'>
            <h2>{data.name}</h2>
            <div className='image_container'>
            <img src={data.icon} alt={data.shortForecast + ' image'} />
            </div>
            <h3>{`Temperature: ${data.temperature}`} <span>&#176;</span>{`${data.temperatureUnit}`}</h3>
            <h3>{`Wind: ${data.windSpeed}`} {`${data.windDirection}`}</h3>
        </div>
        <p className='forecast'>{data.detailedForecast}</p>


      </div>
    )
}
const headers = { Accept: "application/json" }
const latLangURL = ({coordinates}) => {
    console.log(`https://api.weather.gov/points/${coordinates.lat},${coordinates.long}`)
    return `https://api.weather.gov/points/${coordinates.lat},${coordinates.long}`
}
const idle = 'idle';
const searching = 'searching';
const loaded = 'loaded'; 
const failed = 'failed'; 
export const WeatherDisplay = React.memo(({coordinates}) => {
    const [weather,setWeather] = useState([])
    const [status,setStatus] = useState(idle)
    useEffect(() => {
        const apiCalls = async () => {
            if (!coordinates.lat ||  !coordinates.long) {return}
            setStatus(searching)
            const gridFetch = await fetch(latLangURL({coordinates}), {header:{headers}})
            if (gridFetch.status === 500) {
                setStatus(failed)
            }
            if (gridFetch.ok) {
                const gridJSON = await gridFetch.json(); 
                const weatherFetch = await fetch(`https://api.weather.gov/gridpoints/${gridJSON.properties.gridId}/${gridJSON.properties.gridX},${gridJSON.properties.gridY}/forecast`, {header:{headers}})
                if (weatherFetch.status === 500) {
                    setStatus(failed)
                }
                if (weatherFetch.ok) {
                    const weatherJSON = await weatherFetch.json();
                    setWeather(weatherJSON.properties.periods)
                    setStatus(loaded)
                }
            }
        }
            apiCalls()
    },[coordinates]
    )
    return (
        <div id='weather__container'>
            {status === searching && <img id="loading" alt='loading' className='spin' src={loading}/>}
            {status === loaded &&  
            (weather.map(day => 
                <WeatherCard key={day.name} data={day}/>) 
            )}
            {status === failed && 
             <div>
                <h1>
                Something sent wrong...
                </h1>
                <h3>Some remote locations do not have weather data on the weather.gov api  </h3>
             </div>}
        </div>
        
    )
}
)
