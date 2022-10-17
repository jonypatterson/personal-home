import React, { useEffect } from "react"
import { resolve } from "styled-jsx/css"
import Tweet from "../components/Tweet"
import axios from "axios"

const Tweets = ({ tweetSearch, setTweetSearch, setTweets, tweets }) => {
  useEffect(() => {
    const check = localStorage.getItem("searchTerm")
    if (check) {
      if (JSON.parse(check) === "") {
        setTweetSearch("default search")
        localStorage.setItem("searchTerm", JSON.stringify("default search"))
      }
      setTweetSearch(JSON.parse(decodeURIComponent(check)))
    } else {
      setTweetSearch("default search")
      localStorage.setItem("searchTerm", JSON.stringify("default search"))
    }
    const myInterval = setInterval(fetchTweets, 300000)
    fetchTweets()

    return () => {
      clearInterval(myInterval)
    }
  }, [])

  const fetchTweets = () => {
    axios
      .get(
        `/api/twitter-search?search=${
          tweetSearch || localStorage.getItem("searchTerm")
        }`
      )
      .then((data) => {
        if (data.data.tweets.data) {
          setTweets(data.data.tweets.data)
        } else {
          setTweets([])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="flex flex-col">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}

export default Tweets
