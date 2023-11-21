import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EntitiesDisplay = (props) => {
  const entities = JSON.parse(props.entities);
  const entitiesDisplay = [
    "names",
    "locations",
    "concepts",
    "organizations",
    "dates",
  ].map((entity) => {
    if (entities[entity].length > 0) {
      return (
        <div key={entity}>
          <Divider>{entity}</Divider>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{entity}</Typography>
            </AccordionSummary>
            {entities[entity].map((ent) => {
              return (
                <div key={ent}>
                  <AccordionDetails>
                    <Typography>{ent}</Typography>
                  </AccordionDetails>
                </div>
              );
            })}
          </Accordion>
        </div>
      );
    }
  });

  return <>{entitiesDisplay}</>;
};
export default EntitiesDisplay;
