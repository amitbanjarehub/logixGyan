import React from "react";
import Grid from "@mui/material/Grid";
import Contacts from "./components/Contacts";
import Photos from "./components/bankDetails";

const UserProfileSidebar = () => {
  return (
    <Grid container spacing={3.75}>
      <Grid item xs={12} md={6} lg={12}>
        <Contacts />
      </Grid>

      <Grid item xs={12} sm={6} lg={12}>
        <Photos />
      </Grid>
    </Grid>
  );
};

export default UserProfileSidebar;
