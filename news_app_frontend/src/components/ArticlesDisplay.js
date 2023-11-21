import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Article from "./Article";
import "../App.css";

const ArticlesDisplay = (props) => {
  const articles = props.newsData.map((article) => (
    <Article
      key={article.title}
      title={article.title}
      description={article.description}
      content={article.content}
      url={article.url}
    />
  ));

  return (
    <Paper
      className="paperholder"
      style={{
        backgroundColor: "#9395D3",
      }}
    >
      <div className="entities-header">
        <Typography className="entities-headername" variant="h3">
          News Articles
        </Typography>
      </div>
      <div className="news-cards-holder">
        {props.newsData.length > 0 ? (
          articles
        ) : (
          <p>Fetch some articles first!</p>
        )}
      </div>
    </Paper>
  );
};

export default ArticlesDisplay;
