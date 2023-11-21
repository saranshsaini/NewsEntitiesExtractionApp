# News Entities App

Fetch articles using the NewsAPI, and use OpenAI models to extract entities from the text (names, locations, concepts, organizations, dates)

## Running the App

1. Clone this repo. It contains the frontend and backend.
2. Get OpenAI and NewsAPI API keys. Create a .env file in the news_app_backend directory that looks like this:

```text
OPENAI_KEY=<your OpenAI key here>
NEWSAPI_KEY=<your NewsAPI key here>
```

3. In both the news_app_backend and news_app_frontend directories, run the following commands:

```bash
npm i
npm start
```

4. The site will be running at http://localhost:3000/

## Approach

There was not much specification on requirements for this app beyond the core functionalities, so I first had to think about layout and the features I would implement. Coming up with a UI was tricky because I haven't spent too much time learning about UI/UX principles, so in the short period I had for this project I just came up with a simple side-by-side display of articles and article options.

I then looked at the NewsAPI endpoints to see what options I could expose to the user. I chose to allow the user to pick articles using keywords and their sorting preference, and return the top 3 articles from that.

It was open ended how the Entity Extraction should happen and look, so I made it so that the user could choose which of the articles they want to extract entities from, and then displayed them using an Accordian from MUI.

## Challenges

The biggest challenge was using the OpenAI completion AI to extract the entities in a usable format. The model isn't guaranteed to give you a nice JSON response even if you are very explicit with it in your prompt, so I had to spend some time crafting a good prompt to feed it to perform the entity extraction. Even then, it isn't guaranteed to provide clean JSON so I had to do some error handling to tell the user that the entity extraction failed. If extraction fails on some articles, just try another article. This is something I would priortiize spending time on to fix if this were a real production app by looking into fine-tuning models for Entity Extraction.
