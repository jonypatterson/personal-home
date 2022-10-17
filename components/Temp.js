import React, { useEffect } from "react"

const Temp = ({ temp, setTemp, xCoord, yCoord }) => {
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => locationLookup(newPos),
      console.error
    )

    const locationLookup = (position) => {
      const { latitude, longitude } = position.coords
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTemp(Math.round(data.main.temp * 10) / 10 || "N/A")
        })
    }
  }, [])

  return <li className="text-sm font-light">{temp}°C</li>
}

export default Temp
