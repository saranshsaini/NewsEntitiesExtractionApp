import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import EntitiesDisplay from "./EntitiesDisplay";

const Article = (props) => {
  const [entities, setEntities] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      // Extract entities from the article description and the first bit of the article returned by the NewsAPI
      const prompt = props.description.concat(" ", props.content);
      const response = await fetch(
        `http://localhost:5050/get_entities?content=${prompt}`
      );
      var result = await response.json();
      result = result.trim();

      //Sometimes, OpenAI will return something that isn't JSON. Parse the result into JSON so that it errors out
      // and we can display the appropriate error message
      JSON.parse(result);
      setEntities(result);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  var displayEntities = null;

  // Three possibilities for Entities extraction: Errored while extracting, Extracted successfully, Extraction not started yet
  if (error) {
    displayEntities = (
      <>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body1">
            Encountered an Error extracting Entities
          </Typography>
          <Button onClick={handleClick} size="small">
            Try extracting again
          </Button>
        </CardContent>
      </>
    );
  } else if (entities.length > 0) {
    displayEntities = (
      <>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body1">Extracted Entities:</Typography>
          <EntitiesDisplay entities={entities} />
        </CardContent>
      </>
    );
  } else {
    displayEntities = (
      <CardActions>
        <Button onClick={handleClick} size="small">
          Extract Entities!
        </Button>
      </CardActions>
    );
  }

  return (
    <Card
      raised
      sx={{ minWidth: 275 }}
      style={{
        backgroundColor: "#B3B7EE",
        margin: 10,
      }}
    >
      <CardContent>
        <Typography
          component="a"
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="h5"
        >
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
      {loading && <CircularProgress />}

      {displayEntities}
    </Card>
  );
};

export default Article;
