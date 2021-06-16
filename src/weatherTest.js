import React, {useState, useEffect} from 'react'
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


      </div>
    )
}
const headers = { Accept: "application/json" }
const latLangURL = ({coordinates}) => {
    //console.log(`https://api.weather.gov/points/${coordinates.lat},${coordinates.lang}`)
    return `https://api.weather.gov/points/${coordinates.lat},${coordinates.lang}`
}

export const WeatherTest = React.memo(({coordinates}) => {
    const [weather,setWeather] = useState([])
    useEffect(() => {
        const apiCalls = async () => {
            const gridFetch = await fetch(latLangURL({coordinates}), {header:{headers}})
            const gridJSON = await gridFetch.json();        
            const weatherFetch = await fetch(`https://api.weather.gov/gridpoints/${gridJSON.properties.gridId}/${gridJSON.properties.gridX},${gridJSON.properties.gridY}/forecast`, {header:{headers}})
            const weatherJSON = await weatherFetch.json();
            console.log(weatherJSON.properties.periods)
            setWeather(weatherJSON.properties.periods)
        }
        apiCalls()
    },[coordinates]
    )

    return (
        <div>
            {weather.map(day => 
                <WeatherDisplay data={day}/>
            
            )}
        </div>
        
    )
}
)