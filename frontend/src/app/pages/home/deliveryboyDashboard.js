import React from "react";
import { Grid } from "@mui/material";

import DeliveryBoyA from "./DeliveryBoyA";


const DeliveryboyDashboard = () => {
  return (


    <div>
      <Grid container spacing={3.75}>

        <Grid item xs={12} md={5} lg={4}>
          <DeliveryBoyA />
        </Grid>
      </Grid>

    </div>
  );
};

export default DeliveryboyDashboard;
