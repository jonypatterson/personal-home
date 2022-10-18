import React, { useEffect } from "react"

const Greeting = ({ greeting, setGreeting, name, setName }) => {
  useEffect(() => {
    const setNameHandler = () => {
      const check = localStorage.getItem("name")
      console.log("Check:::")
      console.log(check)
      if (check) {
        setName(JSON.parse(check))
      } else {
        setName("you")
        localStorage.setItem("name", JSON.stringify("you"))
      }
    }
    const timeOfDayGreeting = () => {
      const d = new Date()
      let hour = d.getHours()
      console.log("Hour: ", hour)
      if (hour < 12) {
        setGreeting("Good morning")
      } else if (hour < 17) {
        setGreeting("Good afternoon")
      } else {
        setGreeting("Good evening")
      }
    }
    timeOfDayGreeting()
    setNameHandler()
  }, [])

  return (
    <h1 className="mt-2 md:pl-5 pr-2 text-center sm:text-left font-medium text-xl font-sans uppercase">
      {greeting}{" "}
      <span className="underline decoration-pink-500 decoration-2">{name}</span>
    </h1>
  )
}

export default Greeting
