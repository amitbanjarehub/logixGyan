import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Grid, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GrowthGraph from "./GrowthGraph";
import { useTranslation } from "react-i18next";
import Div from "@jumbo/shared/Div";
import {dashboardServices} from "../../../services/dashboardServices";
import { useQuery } from 'react-query';

const Growth = () => {
  const { t } = useTranslation();
  
  const CompanyCount = useQuery("companyCount", dashboardServices.count);
  const tDileverdParcel = CompanyCount?.data?.data ?? 0;
  // console.log("tDileveredParcel:", tDileverdParcel);
  const tDP = tDileverdParcel?.totalDeliverdParcel?.totalDeliverdParcel ;
  // console.log("tt123:",tDP);
  return (
    <JumboCardQuick
       title={"Parcel Delivered"} 
       
       style={{marginTop: "10px", height: "180px"}}
    >
      <Grid container spacing={3.75}>
        <Grid item xs={4}>
          <Typography
            variant={"h3"}
            sx={{ color: "success.main", whiteSpace: "nowrap" }}
            mb={0}
          >
            {tDP}
          </Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            Month
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Div sx={{ m: -3, mt: -4 }}>
            <GrowthGraph />
          </Div>
        </Grid>
      </Grid>
    </JumboCardQuick>
  );
};

export default Growth;
