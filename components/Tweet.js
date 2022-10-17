import React from "react"
import Image from "next/image"

const Tweet = ({ tweet }) => {
  return (
    <div className="mb-5 font-light text-sm p-5 rounded-md snap-center">
      <div className="flex items-center mb-3">
        <Image
          src={tweet.profile_image_url}
          alt="profile pic"
          className=" rounded-full mr-4"
          width="40px"
          height="40px"
        />
        <div className="ml-3">
          <div className="text-pink-500 text-xs">{tweet.created_at}</div>
          <div className="text-xs font-bold">{tweet.username}</div>
        </div>
      </div>

      <div className="leading-loose font-light text-lg font-body ">
        <a
          className="hover:underline hover:decoration-pink-500 hover:decoration-2"
          target="__blank"
          href={tweet.tweet_url}
        >
          {tweet.text}{" "}
        </a>
      </div>
    </div>
  )
}

export default Tweet
