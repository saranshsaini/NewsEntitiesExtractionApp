import React from "react";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <div>
      <Typography variant="h1">News Entities App</Typography>
      <Typography variant="overline" display="block" gutterBottom>
        Highlight important facts from news articles
      </Typography>
    </div>
  );
};

export default Header;
