import React from "react";
import ChartYearlyProfit from "./ChartYearlyProfit";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { parcelServices } from "app/services/parcelServices";
import { useQuery } from 'react-query';
import useAuth from "@jumbo/hooks/useJumboAuth";

// parcelServices.recReport

const YearlyProfileReport = () => {
  const { t } = useTranslation();
 const { authUser } = useAuth();
 const ids =  authUser.id;
//  console.log("authuserIDS", authUser.id);

    const query = useQuery(["totalAllotedParcel", { ids }], () =>
    parcelServices.rlist(ids)
  );
 
  // const tAllotedParcel1 = useQuery("totalAllotedParcel",  parcelServices.ilist);
  // console.log("tryparcelAlloted23_alloted7979:", query);

  return (
    <JumboCardQuick
      title={
        <Typography variant={"h4"} mb={0}>
          {"Parcel Allotted"}
        </Typography>
      }
      wrapperSx={{ pt: 0 }}
      style={{marginTop: "10px", height: "231px"}}

    >
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          <ChartYearlyProfit />
        </Grid>
        <Grid item xs={4} alignSelf={"center"}>
          <Typography variant={"h2"}>68+{/* AdminAllotedParcel.js of totalallotedParcelD */}</Typography>
          
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            Past 9 months
          </Typography>
        </Grid>
      </Grid>
    </JumboCardQuick>
  );
};

export default YearlyProfileReport;
