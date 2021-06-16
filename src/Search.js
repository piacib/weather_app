import React, {useState} from 'react';
import { useInput } from './useInput';
// import {MemoizedWeather} from './weather.js'

import placeholder from './placeholder.svg'
import './searchbar.css'
const geoLocationUrl = (city) => {
    let baseURL = 'https://maps.googleapis.com/maps/api/geocode/'
    let format = 'json'
    let address = city.split(' ').join('%20')
    let key = 'AIzaSyA3sNFJ8c8l_ppRq9TTnWQolclxTSlNajY'
    let finalURL = `${baseURL}${format}?&address=${address}&key=${key}`
    return finalURL
  }
  
  
  
  export const Search = () => {
      const { value, bind, reset } = useInput('');
      const [coordinates, setCoordinates] = useState({lat : 39.7456, lang : -97.0892})
      const [, setLoad] = useState(false);
      const fetchLatLngData = async (city) => {
          let url = geoLocationUrl(city)
          const res = await fetch(url);
          const json = await res.json();
          setLoad(true)
          setCoordinates( {lat:json.results[0].geometry.location.lat,
                  lang:json.results[0].geometry.location.lng
              })
      }
      const handleSubmit = (evt) => {
          evt.preventDefault();
          let fetchedCoordinates = fetchLatLngData(value)
          console.log(coordinates)
          setCoordinates(fetchedCoordinates);
        //   console.log('coords',coordinates)
          reset();
        }
    return (
        <>
        <form onSubmit={handleSubmit} id='searchbar'>
            <img src={placeholder} alt="" />
            <input type="text" placeholder='Search Location...' {...bind}/>
            <input id='submit' type='submit' value='Submit'/>
        </form>
        {/* <MemoizedWeather coordinates={coordinates}/> */}
        </>
    )
}
