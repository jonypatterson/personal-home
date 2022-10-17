var myHeaders = new Headers()
myHeaders.append(
  "Authorization",
  `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`
)

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
}

const enrichTweetData = async (tweetData) => {
  if (!tweetData.data) {
    return []
  }
  tweetData.data.map((t) => {
    const matchingIndex = tweetData.includes.users.findIndex(
      (x) => x.id === t.author_id
    )
    t.profile_image_url =
      tweetData.includes.users[matchingIndex].profile_image_url
    t.username = tweetData.includes.users[matchingIndex].username
    t.name = tweetData.includes.users[matchingIndex].name
    t.url = tweetData.includes.users[matchingIndex].url
    t.tweet_url = `https://twitter.com/twitter/status/${t.id}`
  })
  return tweetData
}

export const getTweets = async (searchCriteria) => {
  if (searchCriteria === "") {
    searchCriteria = "sample search"
  }
  const response = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?tweet.fields=entities,geo,created_at&expansions=author_id,geo.place_id&media.fields=&place.fields=&poll.fields=&query=lang%3Aen%20-is%3Aretweet%20-is%3Areply%20${encodeURIComponent(
      searchCriteria
    )}&user.fields=created_at,name,url,username,profile_image_url`,
    requestOptions
  )

  var newData = await response.json()
  if (!newData.status === 200) {
    return {}
  }
  if (newData.data) {
    newData = enrichTweetData(newData)
    return await newData
  } else {
    return {}
  }
}
