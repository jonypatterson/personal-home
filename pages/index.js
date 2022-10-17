import Image from "next/image"
import Link from "next/link"

import React, { useState, useEffect } from "react"

import { FaCog } from "react-icons/fa"
import Head from "next/head"
import Temp from "../components/Temp"
import Location from "../components/Location"
import Greeting from "../components/Greeting"
import Tweets from "../components/Tweets"
import Settings from "../components/Settings"
import News from "../components/News"

export default function Home() {
  // State
  const [name, setName] = useState("")
  const [temp, setTemp] = useState("")
  const [location, setLocation] = useState("")
  const [xCoord, setXCoord] = useState("")
  const [yCoord, setYCoord] = useState("")
  const [tweets, setTweets] = useState([])
  const [greeting, setGreeting] = useState("")
  const [tweetSearch, setTweetSearch] = useState()
  const [settingsStatus, setSettingsStatus] = useState(false)
  const [news, setNews] = useState([])
  const [newsSearch, setNewsSearch] = useState("")

  const setSettingStatusHandler = () => {
    setSettingsStatus(!settingsStatus)
  }

  return (
    <div className=" bg-background">
      <Head>
        <title>🦸🏻‍♂️ {name}&apos;s Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="p-5  md:h-screen w-screen bg-background">
        <section className="p-5 h-full w-full">
          <nav className="bg-background">
            <ul className="items-center sm:flex sm:text-right">
              <li className="flex justify-center items-center">
                <img
                  className="w-10 h-10 rounded-full mx-2"
                  src="https://www.gravatar.com/avatar/fa018b4dfe1c5ad9ec659e4be2e2c887"
                />
              </li>
              <li className="">
                <Greeting
                  greeting={greeting}
                  setGreeting={setGreeting}
                  name={name}
                  setName={setName}
                />
              </li>
            </ul>

            <ul className="flex flex-col text-center sm:text-right font-sans">
              <div
                className="justify-center sm:justify-end flex mb-2"
                onClick={setSettingStatusHandler}
              >
                <FaCog className="link duration-700 hover:text-secondary" />
              </div>
              <Location
                className="text-sm"
                location={location}
                setLocation={setLocation}
                xCoord={xCoord}
                setXCoord={setXCoord}
                yCoord={yCoord}
                setYCoord={setYCoord}
              />
              <Temp
                temp={temp}
                setTemp={setTemp}
                xCoord={xCoord}
                yCoord={yCoord}
              />
            </ul>
          </nav>
          <div className="bg-background h-6/6 md:h-5/6 flex flex-col md:flex-row w-full">
            {/* tweet div */}
            <div className="bg-background w-full lg:w-1/2 xl:w-1/3 h-full max-h-full overflow-y-auto md:mr-5 snap-y">
              <h4 className="">
                <span className="pl-5 underline decoration-pink-500 decoration-2">
                  {decodeURIComponent(tweetSearch)}
                </span>{" "}
                <span className="">tweets</span>
              </h4>
              <Tweets
                className=""
                tweetSearch={tweetSearch}
                setTweetSearch={setTweetSearch}
                setTweets={setTweets}
                tweets={tweets}
              />
            </div>
            <div className="lg:w-1/2 xl:w-2/3 w-full">
              <div className="h-auto w-full">
                <News
                  news={news}
                  setNews={setNews}
                  newsSearch={newsSearch}
                  setNewsSearch={setNewsSearch}
                />
              </div>
              <div className="md:flex md:justify-between">
                <div className="quote">
                  <p></p>
                </div>
                <div className="Stocks">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Settings
          settingsStatus={settingsStatus}
          setSettingsStatus={setSettingsStatus}
          setTweetSearch={setTweetSearch}
          tweetSearch={tweetSearch}
          setTweets={setTweets}
          tweets={tweets}
          name={name}
          setName={setName}
          newsSearch={newsSearch}
          setNewsSearch={setNewsSearch}
          news={news}
          setNews={setNews}
        />
      </main>
    </div>
  )
}
