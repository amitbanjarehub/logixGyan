import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import {dashboardServices} from "../../../services/dashboardServices";
import { useQuery } from "react-query";
import { getAssetPath } from "app/utils/appHelpers";
import { ASSET_IMAGES } from "app/utils/constants/paths";

const QueriesStatistics = () => {
  const { t } = useTranslation();
 
  const CompanyCount = useQuery("companyCount", dashboardServices.count);
  console.log("CompanyCount_30March:", CompanyCount);
  const tCount = CompanyCount?.data?.data ?? 0;
  const cCount = CompanyCount?.data?.data.totalCompany ?? 0;
  const bCount = CompanyCount?.data?.data.totalBranch ?? 0;
  console.log("tCount.pendingUserCount:", tCount.pendingUserCount)
  return (
    <>
     <JumboCardQuick bgColor={'#00FF00'} style={{height: "120px", width: "280px", marginTop: "10px", marginLeft: "10px"}}>
                <Div >
                    <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px"}}/>
                    <Div sx={{ ml: 2, flex: 1 }}>

                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px"}}>Total no. of pending user</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px"}}>{tCount.pendingUserCount}</Typography>

                    </Div>
                </Div>


            </JumboCardQuick>
  
    </>
    
  );
};

export default QueriesStatistics;
