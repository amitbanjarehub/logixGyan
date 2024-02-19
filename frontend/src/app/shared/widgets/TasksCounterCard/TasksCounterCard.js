import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import {dashboardServices} from "../../../services/dashboardServices";
import { useQuery } from 'react-query';


const TasksCounterCard = () => {

    const CompanyCount = useQuery("companyCount", dashboardServices.count);
    const cCount = CompanyCount?.data?.data.totalCompany ?? 0;
    

    return (
        <JumboCardQuick
            bgColor={'#E44A77'}
            style={{
                     marginTop: "10px",
                     height: "120px", 
                     width: "260px"
                    }}    
        >
            <Div sx={{display: "flex", flexDirection: "column", justifyContent: 'space-between'}}>
                <img alt={"Task Icon"} src={getAssetPath(`${ASSET_IMAGES}/dashboard/tasksIcon.svg`)} style={{height: "20px", width: "20px", marginLeft: "15px"}}/>
                <Div sx={{ml: 2, flex: 1}}>
                   
                    <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "5px"}}>Total no. of company</Typography>
                    <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "5px"}}>{cCount}</Typography>
                
                </Div>
            </Div>
        </JumboCardQuick>
    );
};

export default TasksCounterCard;
