import React, { useEffect } from "react"

const newsArticle = ({ article }) => {
  return (
    <div className="flex w-full flex-col p-5">
      <h2 className="font-medium text-xs text-gray-400 flex flex-col gap-1 mb-3">
        <span className="  text-xs"> {article.publishedAt}</span>
        <span className="font-bold text-pink-500">{article.source?.Name}</span>
      </h2>
      <div>
        <a
          className="hover:underline hover:decoration-pink-500 hover:decoration-2 font-body leading-loose"
          href={article.url}
          target="__blank"
        >
          {article.title}
        </a>
      </div>
    </div>
  )
}

export default newsArticle
