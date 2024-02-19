import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Card, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { dashboardServices } from "../../../services/dashboardServices";
import { useQuery } from 'react-query';



const TeamsCounterCard = () => {
    const CompanyCount = useQuery("companyCount", dashboardServices.count);
    // console.log("CompanyCount---------->>>>:", CompanyCount);
    const tCount = CompanyCount?.data?.data ?? 0;
    const cCount = CompanyCount?.data?.data.totalCompany ?? 0;
    const bCount = CompanyCount?.data?.data.totalBranch ?? 0;
    return (
        <Div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            <JumboCardQuick bgColor={'#E73145'} style={{ height: "120px", width: "280px", marginTop: "10px" }}>
                <Div >
                    <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
                    <Div sx={{ ml: 2, flex: 1 }}>

                        {/* <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "1px" }}>Total no. of basic verified user</Typography> */}
                        {/* <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "1px" }}>{tCount.basicVerifyUserCount}</Typography> */}
                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "1px" }}>Total No. Of Trainer</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "1px" }}>10</Typography>
                       

                    </Div>
                </Div>
            </JumboCardQuick>

            <JumboCardQuick bgColor={'#00FF00'} style={{ height: "120px", width: "280px", marginTop: "10px", marginLeft: "10px" }}>
                <Div >
                    <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
                    <Div sx={{ ml: 2, flex: 1 }}>

                        {/* <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total no. of pending user</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>{tCount.pendingUserCount}</Typography> */}

                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total No. Of Students</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>45</Typography>

                    </Div>
                </Div>


            </JumboCardQuick>

            <JumboCardQuick bgColor={'#808080'} style={{ height: "120px", width: "280px", marginTop: "10px", marginLeft: "10px" }}>
                <Div >
                    <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
                    <Div sx={{ ml: 2, flex: 1 }}>

                        {/* <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total no. of verified user</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>{tCount.verifyUserCount}</Typography> */}

                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total No. Of Category</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>3</Typography>

                    </Div>
                </Div>


            </JumboCardQuick>
            <JumboCardQuick
                bgColor={'#E44A77'}
                style={{
                    marginTop: "10px",
                    height: "120px",
                    width: "260px",
                    marginLeft: "10px"
                }}
            >
                <Div sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
                    <img alt={"Task Icon"} src={getAssetPath(`${ASSET_IMAGES}/dashboard/tasksIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
                    <Div sx={{ ml: 2, flex: 1 }}>

                        {/* <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total no. of company</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>{cCount}</Typography> */}

                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total No. Of Courses</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>15</Typography>

                    </Div>
                </Div>
            </JumboCardQuick>
            <JumboCardQuick
                bgColor={'#23BCBA'}
                style={{
                    marginTop: "10px",
                    height: "120px",
                    width: "260px",
                    marginLeft: "10px"
                }}
            >
                <Div sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
                    <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/filesIcon.svg`, "46x46")} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
                    <Div sx={{ ml: 2, flex: 1 }}>

                        <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}> Total no. of branch</Typography>
                        <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>{bCount}</Typography>

                    </Div>
                </Div>
            </JumboCardQuick>
        </Div>


    );
};

export default TeamsCounterCard;


