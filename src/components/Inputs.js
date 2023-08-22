import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (city.trim().length > 0 && city !== "") {
      setQuery({ q: city.trim() });
    }
    setCity("");
  };
  
  const locationClickSearchHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const unitChangeHandler = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            value={city}
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
            placeholder="search for city..."
            onChange={(event) => setCity(event.target.value)}
          />
        </form>
        <Unicons.UilSearch
          size={30}
          className="text-white cursor-pointer transition ease-in-out hover:scale-125"
          onClick={formSubmitHandler}
        />
        <Unicons.UilLocationPoint
          size={30}
          className="text-white cursor-pointer transition ease-in-out hover:scale-125"
          onClick={locationClickSearchHandler}
        />
      </div>
      <div className="flex items-center justify-center w-1/4 gap-2">
        <button
          name="metric"
          className="text-white text-xl font-light transition ease-out cursor-pointer hover:scale-125"
          onClick={unitChangeHandler}
        >
          °C
        </button>
        <span className="text-white text-xl">|</span>
        <button
          name="imperial"
          className="text-white text-xl font-light transition ease-out cursor-pointer  hover:scale-125"
          onClick={unitChangeHandler}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
