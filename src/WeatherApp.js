import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { WeatherDisplay } from "./weatherDisplay.js";
import placeholder from "./placeholder.svg";
import "./searchbar.css";
const cityOptions = require("./input.json");

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lang: null });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const option = cityOptions.filter((cityChoice) => cityChoice.text === city);
    setCoordinates({ lat: option[0].latitude, long: option[0].longitude });
  };
  const filterOptions = createFilterOptions({
    limit: 25,
  });
  return (
    <>
      <form
        className={Boolean(coordinates.lat) ? "" : "searchbar__no__results"}
        onSubmit={handleSubmit}
        id="searchbar"
      >
        <img id="geotag" src={placeholder} alt="" />

        <Autocomplete
          onChange={(event) => {
            setCity(event.target.innerText);
          }}
          style={{ fontFamily: "Roboto" }}
          filterOptions={filterOptions}
          className="search"
          options={cityOptions}
          getOptionLabel={(option) => option.text}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ fontFamily: "Roboto" }}
              label="Search Here"
              variant="outlined"
            />
          )}
        />
        <input
          id="submit"
          type="submit"
          value="Submit"
          disabled={!Boolean(city)}
        />
      </form>
      <WeatherDisplay coordinates={coordinates} />
    </>
  );
};
