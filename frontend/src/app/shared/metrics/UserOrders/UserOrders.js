import React, { useState } from "react";
import ChartOrders from "./ChartOrders";
import { Typography } from "@mui/material";
import { orders } from "./data";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import { parcelServices } from "app/services/parcelServices";
import { useQuery } from 'react-query';
import useAuth from "@jumbo/hooks/useJumboAuth";
import AdminDashboard from "app/pages/home/adminDashboard";
import { MenuRounded } from "@mui/icons-material";
import moment from "moment";


const UserOrders = () => {
  const { t } = useTranslation();

  // const { authUser } = useAuth();
  // console.log("authuserUserOrder:", authUser);
  // const branchId = authUser?.branchId;
  // console.log("branchId:", branchId);//branchId
  
  const month = new Date(),curMonth = month.getMonth()+1;//current Month

  console.log("CurrentMonth:", curMonth);

  const findYear = new Date(),year = findYear.getFullYear();//current year
    console.log("CurrentYear:", year);
    
    
    

  // const receivedParcel = useQuery(
  //   ["ReceivedParcel", { branchId, FirstDay, LastDay }],
  //   async () => parcelServices.recReport(branchId, FirstDay, LastDay)
  // );

  

 
  const tAllotedParcel1 = useQuery("totalAllotedParcel", parcelServices.rlist);
  // console.log("Amitparcelreceived23_rlist:", tAllotedParcel1);
  const   orders = [
    {month: 'Jan', orders: 100},
    {month: 'Feb', orders: 150},
    {month: 'Mar', orders: 350},
    {month: 'Apr', orders: 300},
    {month: 'May', orders: 400},
    {month: 'Jun', orders: 250},
    {month: 'Jul', orders: 520},
    {month: 'Aug', orders: 350},
    {month: 'Sep', orders: 400},
    {month: 'Oct', orders: 250},
];

  return (
    <JumboCardQuick
      noWrapper
      title={
        <Typography variant={"h5"} mb={0.5}>
          {"Parcel Received "}
        </Typography>
      }
      subheader={
        <Typography variant={"h6"} color={"text.secondary"} mb={0}  style={{ marginTop: "20px"}}>
          293
        </Typography>
      }
      headerSx={{ pb: 0 }}
      style={{marginTop: "10px",  height: "180px"}}
      
    >
      <Div sx={{ mt: -2.5 }} style={{ marginTop: "20px"}}>
        <ChartOrders chartData={orders} />
      </Div>
    </JumboCardQuick>
  );
};


export default UserOrders;
