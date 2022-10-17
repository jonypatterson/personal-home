export const getNews = async (searchCriteria) => {
  const url = `https://newsapi.org/v2/everything?q=${searchCriteria}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
  const newsArticles = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.articles) {
        return data.articles
      } else return ["No news"]
    })

  return await newsArticles
}
