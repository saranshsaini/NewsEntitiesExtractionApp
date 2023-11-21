import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ArticlesDisplay from "./ArticlesDisplay";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import "../App.css";

const NewsDisplay = () => {
  const [formData, setFormData] = useState({
    query: "",
    sortBy: "publishedAt",
  });

  // State to show message when a search has no results
  const [showAlert, setShowAlert] = useState(false);

  const [newsData, setNewsData] = useState([]);

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const response = await fetch(
        `http://localhost:5050/get_news?query=${formData.query}&sortBy=${formData.sortBy}`
      );
      const result = await response.json();

      // If search yielded no articles, tell user to use some other keywords
      if (result.length === 0) {
        setShowAlert(true);
      } else {
        setNewsData(result);
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  return (
    <Grid
      justifyContent="center"
      wrap="wrap-reverse"
      container
      spacing={3}
      columns={30}
    >
      <Grid md={20} xs={28}>
        <ArticlesDisplay newsData={newsData} />
      </Grid>
      <Grid md={7} xs={28}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h4">Article Options</Typography>
          <form onSubmit={handleSubmit}>
            <Stack className="options-paper" spacing={1}>
              <TextField
                name="query"
                placeholder="eg. NFL, covid..."
                value={formData.query}
                onChange={handleChange}
                label="Input Search Keyword"
                variant="filled"
              />
              <Select
                labelId="Sort articles by"
                name="sortBy"
                value={formData.sortBy}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"publishedAt"}>Latest published</MenuItem>
                <MenuItem value={"popularity"}>Most Popular</MenuItem>
                <MenuItem value={"relevancy"}>Most Relavent</MenuItem>
              </Select>
              <Button
                disabled={formData.query.length === 0}
                type="submit"
                variant="contained"
                color="primary"
              >
                Get Articles
              </Button>
              <Snackbar
                open={showAlert}
                autoHideDuration={2500}
                onClose={handleClose}
              >
                <Alert
                  severity="warning"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  No articles found, search something else!
                </Alert>
              </Snackbar>
              {error && <Alert severity="error">Error getting news</Alert>}
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewsDisplay;
