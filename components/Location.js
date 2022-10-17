import React, { useEffect } from "react"

const Location = ({
  location,
  setLocation,
  xCoord,
  setXCoord,
  yCoord,
  setYCoord,
}) => {
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => locationLookup(newPos),
      console.error
    )

    const locationLookup = (position) => {
      const { latitude, longitude } = position.coords
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_GEO_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.results[0].components.road || "unknown location")
          setXCoord(latitude)
          setYCoord(longitude)
        })
    }
  }, [])

  return <li className="text-sm font-light">{location}</li>
}

export default Location
