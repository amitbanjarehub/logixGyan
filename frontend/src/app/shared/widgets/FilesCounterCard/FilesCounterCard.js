import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import {dashboardServices} from "../../../services/dashboardServices";
import { useQuery } from 'react-query';

const FilesCounterCard = () => {
    const Count = useQuery("companyCount", dashboardServices.count);
    const bCount = Count?.data?.data.totalBranch ?? 0;
    return (
        <JumboCardQuick 
             bgColor={'#23BCBA'} 
             style={{ marginTop: "10px",
                      height: "120px", 
                      width: "260px",
                      marginLeft: '6.8rem'
                    }} 
        >
            <Div sx={{display: "flex", flexDirection: "column", justifyContent: 'space-between'}}>
                <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/filesIcon.svg`,"46x46")} style={{height: "20px", width: "20px", marginLeft: "15px"}}/>
                <Div sx={{ml: 2, flex: 1}}>
                   
                    <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "5px"}}> Total no. of branch</Typography>
                    <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "5px"}}>{bCount}</Typography>
                    
                </Div>
            </Div>
        </JumboCardQuick>
    );
};

export default FilesCounterCard;
