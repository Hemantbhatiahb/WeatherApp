import React from "react";

const cities = [
  {
    id: "c1",
    title: "Bangalore",
  },
  {
    id: "c2",
    title: "Paris",
  },
  {
    id: "c3",
    title: "London",
  },
  {
    id: "c4",
    title: "Toronto",
  },
  {
    id: "c5",
    title: "Tokyo",
  },
];

function TopButtons({ changeCity }) {
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => changeCity({ q: city.title })}
          className="text-lg font-medium text-white"
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
