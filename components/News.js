import React, { useEffect } from "react"
import NewsArticle from "../components/NewsArticle"
import axios from "axios"

const News = ({ news, setNews, newsSearch, setNewsSearch }) => {
  const fetchNews = () => {
    const cachedNews = localStorage.getItem("newsSearch")
    if (cachedNews === newsSearch) {
      // cached is same as new search
      console.log("same news found...")
    } else {
      axios
        .get(`/api/news-search`)
        .then((data) => {
          if (data) {
            console.log("THIS IS THE DATA")
            console.log(data.data)
            setNews(data.data)
            localStorage.setItem("news", JSON.stringify(data.data))
            localStorage.setItem("news-time", JSON.stringify(new Date()))
          } else {
            setNews([])
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    const defaultNews = "cybersecurity"
    const check = localStorage.getItem("newsSearch")
    console.log("Check:")
    console.log(check)
    console.log(typeof check)
    if (check === "undefined") {
      check = JSON.stringify(defaultNews)
      localStorage.setItem("newsSearch", JSON.stringify(defaultNews))
    }
    if (check) {
      if (JSON.parse(check) === "") {
        setNewsSearch(defaultNews)
        localStorage.setItem("newsSearch", JSON.stringify(defaultNews))
      }
      setNewsSearch(JSON.parse(decodeURIComponent(check)))
    } else {
      setNewsSearch(defaultNews)
      localStorage.setItem("newsSearch", JSON.stringify(defaultNews))
    }
    const myInterval = setInterval(fetchNews, 3600000)
    fetchNews()

    return () => {
      clearInterval(myInterval)
    }
  }, [])

  return (
    <div className="h-3/4 w-full ">
      <div className="flex flex-col xl:flex-row w-full justify-center md:gap-10 text-lg">
        {news.map((article) => (
          <NewsArticle
            key={article.publishedAt}
            article={article}
            className=""
          ></NewsArticle>
        ))}
      </div>
    </div>
  )
}

export default News
