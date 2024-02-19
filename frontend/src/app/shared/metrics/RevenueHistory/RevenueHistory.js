import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Grid, ListItemText, Typography } from "@mui/material";
import RevenueGraph from "./RevenueGraph";
import { useTranslation } from "react-i18next";

const RevenueHistory = () => {
  const { t } = useTranslation();
  return (
    <JumboCardQuick
      title={"Total No. Of User"} wrapperSx={{ pt: 1 }}
      style={{marginTop: "10px",  height: "180px"}}
    >
      <Grid container spacing={3.75}>
        <Grid item xs={6}>
          <ListItemText
            primary={
              <Typography variant={"h3"} mb={0.5}>
                216
              </Typography>
            }
            secondary={
              <Typography variant={"body1"} color={"text.secondary"}>
                YTD Revenue
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <RevenueGraph />
        </Grid>
      </Grid>
    </JumboCardQuick>
  );
};
export default RevenueHistory;
