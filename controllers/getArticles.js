const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

module.exports = (req, res, next) => {
    const { q } = req.query;

    axios.get('https://newsapi.org/v2/everything', {
        params: {
            q,
            apiKey: NEWS_API_KEY,
            language: 'en',
        },
    }).then((response) => {
        const articles = response.data.articles
            .filter((article) => article.urlToImage && article.author)
            .map((article) => ({
                title: article.title,
                author: article.author,
                description: article.description,
                imageUrl: article.urlToImage,
                url: article.url,
                date: article.publishedAt,
                keyword: q.charAt(0).toUpperCase() + q.slice(1),
                isSaved: false,
            }));
        res.send({ articles });
    }).catch(next)
};