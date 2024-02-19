import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { userServices } from 'app/services/userservices';
import { useQuery } from 'react-query';



const Count = [];

const ProjectCounterCard = ({branchId}) => {
    // userServices.alist
    // console.log("Branch_Id_top:",branchId)
 
    const userD = useQuery(["user-list"], userServices.alist);
    // console.log("userDetails:",userD);
    const  allUser = userD?.data?.data ?? [];//allUser --> It contains how many User?
    const  alluser12  = userD?.data?.data ?? [];//alluser12 --> It contains how many User?
    // console.log("userDetails_data:",allUser);
    // console.log("object",alluser12)
    // console.log("allUser_length:",allUser.length);
    
    const deliveryBoyCount = allUser?.filter((item) => item.role === "deliveryBoy" );
    const deliveryBoyCount12 = deliveryBoyCount?.filter((item) =>item.branchId === branchId);
    const  deliveryBoy = deliveryBoyCount12.length;

    // console.log("deliveryBoyCount:",deliveryBoyCount.length);
    // console.log("deliveryBoy", deliveryBoy)

   
   

    
 
    
    //  console.log("deliveryBoyCount", deliveryBoy)
    //  console.log("deliveryBoyCount12", deliveryBoyCount12)
   
    

    return (

        <JumboCardQuick bgColor={'#6f42c1'} style={{ height: "240px", marginTop: "50px" }}>

            <Div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                <Div style={{ display: "flex", flexDirection: "column" }}>




                    <Div  >


                        <Div sx={{ ml: 2, flex: 1 }} style ={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

                            <img alt={"Properties Icon"} src={getAssetPath(`${ASSET_IMAGES}/dashboard/projectIcon.svg`)} style ={{height: "50px", weight: "50px"}} />
                            
                            <Typography color={'common.white'} variant={"h5"} mb={0}  style ={{marginTop: "30px", textAlign: "center"}}>Total Delivery boy present in branch</Typography>
                            <Typography color={'common.white'} variant={"h2"} mb={.5} style ={{marginTop: "30px", textAlign: "center"}}>{deliveryBoy}</Typography>

                        </Div>

                    </Div>


                </Div>

            </Div>
           

        </JumboCardQuick>
    );
};

export default ProjectCounterCard;
