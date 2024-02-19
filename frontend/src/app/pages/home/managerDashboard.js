import React from "react";
import { Grid } from "@mui/material";
import useAuth from "@jumbo/hooks/useJumboAuth";
import DeliveryBoy from "./DeliveryBoy";

const ManagerDashboard = () => {
  const User = useAuth();
  const authUser = User?.authUser ?? [];
  const branchId = authUser?.branchId;
  console.log("authUser_30March:", User)
  console.log("branchId_Manager:", branchId)

  return (
    <Grid container spacing={3.75}>

      <Grid item xs={8} sm={6} lg={12}>
        <DeliveryBoy branchId={branchId} />
      </Grid>

    </Grid>
  );
};

export default ManagerDashboard;
