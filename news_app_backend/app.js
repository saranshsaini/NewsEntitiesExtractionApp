const express = require("express");
var cors = require("cors");
var dotenv = require("dotenv").config();
var OpenAI = require("openai");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;

// Set default number of articles to be returned
const pageSize = 3;

app.listen(PORT, () => console.log("News Entities App Backend started up"));

app.get("/get_news", async (req, res) => {
  try {
    const q = req.query.query;
    const sortBy = req.query.sortBy;
    // Set default number of articles to be returned
    const pageSize = 3;

    const newsApiEndpoint = `https://newsapi.org/v2/everything?pageSize=${pageSize}&language=en&q=${q}&sortBy=${sortBy}`;

    const response = await fetch(newsApiEndpoint, {
      headers: {
        "X-Api-Key": process.env.NEWSAPI_KEY,
      },
    });

    const responseData = await response.json();

    const articles = responseData.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      // the last 13 letters of the NewsAPI are something like [+1000 chars]
      // which is not necessary so removing that
      content: article.content.slice(0, -13),
    }));

    res.json(articles);
  } catch (error) {
    console.error("Error querying News API:", error.message);
    res.status(500).send("Error 500: Internal Server Error");
  }
});

app.get("/get_entities", async (req, res) => {
  try {
    const content = req.query.content;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    // Prompt has been written to be explicit about returning JSON only so that it can be parsed.
    // Still, the model will return non JSON results (extra text at the beginning or end)
    // In that case, the frontend will tell the user that there is an error in Entity Extraction

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `The goal is to extract entities from the text. Entities can be names, locations, organizations,  concepts, and dates from a piece of text.\nThe output should be a JSON object where the first element has key “names” and the value is a list of names, the second element has key “locations” and the value is a list of locations, the third element has key “organizations” and the value is a list of organizations, the fourth element has key “concepts” and the value is a list of concepts, and the fifth element has key “dates” and the value is a list of dates. \n The output should only be that JSON object, do not put anything before it.\nHere is an example output: {"names":["Packers", "Justin Herbert", "Keenan Allen"],"locations”:[“”New Jersey] "organizations”:[“NFL”], "concepts”:[“turnovers”], "dates”:[“November”]}
      \nHere is the text to perform entity extraction on: ${content}`,

      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(response.choices[0].text);
  } catch (error) {
    console.error("Error querying OpenAI API:", error.message);
    res.status(500).send("Error 500: Internal Server Error");
  }
});
