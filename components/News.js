import React, { useEffect } from "react"
import NewsArticle from "../components/NewsArticle"
import axios from "axios"

const News = ({ news, setNews, newsSearch, setNewsSearch }) => {
  const fetchNews = () => {
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

  useEffect(() => {
    const check = localStorage.getItem("newsSearch")
    console.log("Check:")
    console.log(check)
    const defaultNews = "cybersecurity"
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
      <h2 className="mb-3 flex justify-center gap-3">
        <span className="underline decoration-pink-500 decoration-2 mb-5">
          {newsSearch}
        </span>{" "}
        News
      </h2>
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
