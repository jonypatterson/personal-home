import { getNews } from "../../utils/newsApi"

export default async function newsHandler(req, res) {
  const news = await getNews(req.query["search"])
  //   console.log("Data stage 2:")
  //   console.log(news)
  res.status(200).json(news)
}
