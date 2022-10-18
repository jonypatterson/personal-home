import React, { useEffect } from "react"
import axios from "axios"
import { GrClose } from "react-icons/gr"

const Settings = ({
  settingsStatus,
  setSettingsStatus,
  setTweetSearch,
  tweetSearch,
  setTweets,
  tweets,
  name,
  setName,
  newsSearch,
  setNewsSearch,
  news,
  setNews,
}) => {
  // Functions
  const updateTweetSearchHandler = (e) => {
    setTweetSearch(e.target.value)
  }

  const refreshNewsHandler = (e) => {
    if (e.target.value === "") {
      setNewsSearch("cybersecurity")
    }
    e.preventDefault()
    const cachedSearch = localStorage.getItem("newsSearch")
    console.log("Cached news search")
    console.log(cachedSearch)
    if (newsSearch === JSON.parse(cachedSearch)) {
      console.log("New = old. Will not search again")
      localStorage.setItem("newsSearch", JSON.stringify(newsSearch))
      setSettingsStatus(!settingsStatus)
    } else {
      console.log("GEtting new data...")
      axios
        .get(`/api/news-search?search=${newsSearch}`)
        .then((data) => {
          if (data) {
            console.log("THIS IS THE DATA FROM REFRESH")
            console.log(data.data)
            setNews(data.data)
            localStorage.setItem("news", JSON.stringify(data.data))
            localStorage.setItem("news-time", JSON.stringify(new Date()))
            localStorage.setItem("newsSearch", JSON.stringify(newsSearch))
            setSettingsStatus(!settingsStatus)
          } else {
            setNews([])
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const updateNewsHandler = (e) => {
    setNewsSearch(e.target.value)
  }

  const changeNameHandler = (e) => {
    e.preventDefault()
    setName(e.target.value)
    localStorage.setItem("name", JSON.stringify(e.target.value))
  }

  const setSettingStatusHandler = () => {
    setSettingsStatus(!settingsStatus)
  }

  const refreshTweetHandler = (e) => {
    if (e.target.value === "") {
      setTweetSearch("sample%20search")
    }
    e.preventDefault()
    axios
      .get(`/api/twitter-search?search=${tweetSearch}`)
      .then((data) => {
        if (!data.data.tweets.data) {
          data.data.tweets.data = []
        }

        setTweets(data.data.tweets.data)
        setSettingsStatus(!settingsStatus)
        localStorage.setItem(
          "searchTerm",
          JSON.stringify(encodeURIComponent(tweetSearch.trim()))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div
      className={`fixed pt-5 pl-5 pr-5 top-0 left-0 w-full lg:w-1/2 xl:w-1/3 bg-gray-400/95 text-white h-screen shadow-sm overflow-auto transition-all duration-500 ease-in-out ${
        settingsStatus
          ? "opacity-100 translate-x-0 z-1"
          : "opacity-0 -translate-x-80 -z-10"
      }`}
    >
      <div className="px-2 font-body">
        <div className="flex items-center justify-between mb-4 text-white">
          <h1 className=" text-xl font-medium">Settings</h1>
          <GrClose className="link" onClick={setSettingStatusHandler} />
        </div>

        <div className="divide-y">
          <div></div>
          <div></div>
        </div>
        <div>
          <div className="pt-5">
            <h2 className="mb-2">What&apos;s your name?</h2>

            <input
              className="py-2 pl-3 rounded-md text-gray-700"
              type="text"
              value={name}
              onChange={changeNameHandler}
            />
          </div>
          <div className="pt-5">
            <h2>Twitter search</h2>
            <form className="mt-2 w-fit" onSubmit={refreshTweetHandler}>
              <div className="flex">
                <input
                  className="py-2 pl-3 rounded-md text-gray-700"
                  type="text"
                  value={decodeURIComponent(tweetSearch)}
                  onChange={updateTweetSearchHandler}
                />
                <button
                  className=" bg-secondary rounded-md p-2 ml-2 text-white"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="pt-5">
            <h2>News search</h2>
            <form className="mt-2 w-fit" onSubmit={refreshNewsHandler}>
              <div className="flex">
                <input
                  className="py-2 pl-3 rounded-md text-gray-700"
                  type="text"
                  value={decodeURIComponent(newsSearch)}
                  onChange={updateNewsHandler}
                />
                <button
                  className=" bg-secondary rounded-md p-2 ml-2 text-white"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
