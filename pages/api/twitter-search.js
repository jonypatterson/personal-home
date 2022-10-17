import { getTweets } from "../../utils/twitterApi"

export default async function twitterHandler(req, res) {
  const tweets = await getTweets(req.query["search"])
  res.status(200).json({ tweets: tweets })
}
