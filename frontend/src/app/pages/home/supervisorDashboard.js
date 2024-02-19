import React from 'react';
import { Grid } from "@mui/material";
import SalesOverview from 'app/shared/metrics/SalesOverview';

import DealsAnalytics from "app/shared/metrics/DealsAnalytics";
import AppUsers from "app/shared/metrics/AppUsers";
import WelcomeSummary from "app/shared/metrics/WelcomSummary";
import ProjectCounterCard from "app/shared/widgets/ProjectCounterCard";
import EarningExpenses from "app/shared/metrics/EarningExpenses";
import useAuth from "@jumbo/hooks/useJumboAuth";
import DeliveredRejectedParcelS from './DeliveredRejectedParcelS';
import SalesOverviewS from './SalesOverviewS';
import DealsAnalyticsS from './DealsAnalyticsS';


const SupervisorDashboard = () => {

  const User = useAuth();
  console.log("authUser_28March:", User)

  const authUser = User?.authUser ?? [];
  console.log("branchId:", authUser?.branchId);

  const branchId = authUser?.branchId;
  console.log("branchId_Supervisor:", branchId)
  const branch_Id = branchId;

  const branchID = branchId;

  return (
    <Grid container spacing={3.75}>



      <Grid item xs={12} md={4} lg={5}>
        <AppUsers />
      </Grid>

      <Grid item xs={12} lg={7} >
        <WelcomeSummary branchId={branchId} />
      </Grid>

      <Grid item xs={12} md={4} lg={5}>
        <SalesOverviewS branchId={branchId} />
      </Grid>

      <Grid item xs={15} lg={7} style={{ position: "relative", top: "35px" }}>
        <DeliveredRejectedParcelS branchId={branchId} />
      </Grid>

      <Grid item xs={12} md={4} lg={5}>
        <ProjectCounterCard branchId={branch_Id} />

      </Grid>


      <Grid item xs={12} lg={7}>
        <DealsAnalyticsS branchID={branchID} />
      </Grid>



    </Grid>
  );
};


export default SupervisorDashboard;
