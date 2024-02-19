import React, { useState } from 'react';
import ChartSalesOverviewS from './ChartSalesOverviewS';
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
// import { SalesChartDataS } from './salesChartDataS';
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { useQuery } from 'react-query';
import { parcelServices } from 'app/services/parcelServices';
import moment from 'moment';


let total = 0;
let total2 = 0;
let received_parcelDataC = [];
const SalesOverviewS = ({ branchId }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState();

  // console.log("branchId_29March:",branchId)


  const month = new Date(), curMonth = month.getMonth() + 1;//current Month
  const findYear = new Date(), year = findYear.getFullYear();//current year
  const date = moment(new Date(year, curMonth - 1, 1)).format("YYYY-MM-DD");
  const FirstDay = moment(date).startOf("month").format("YYYY-MM-DD");
  const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");
  const monthDates = moment(LastDay).diff(moment(FirstDay), "days");
  const AcutalDays = monthDates + 1;

  function getDates(FirstDay, LastDay) {
    const dates = [];
    let currentDate = FirstDay;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= LastDay) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  const dates = getDates(new Date(FirstDay), new Date(LastDay));
  dates.forEach(function (date) {

  });

  const receivedParcel = useQuery(
    ["ParcelAlloted", { branchId, FirstDay, LastDay }],
    async () => parcelServices.report(branchId, FirstDay, LastDay)
  );//For Parcel Alloted Data -->API

  const ParcelReceived = useQuery(["ReceivedParcel", { branchId, FirstDay, LastDay }], async () => parcelServices.receivedParcel(branchId, FirstDay, LastDay)
  );//For Parcel Received Data -->API

  const liwParcelRec = ParcelReceived?.data?.data ?? []; //For parcel Received API

  //   console.log("REceived_Parcel_Data_29_March:", liwParcelRec);

  const groupByUserIdRec = liwParcelRec.reduce(function (a, e) {  //parcel Received API
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const ReceivedParcelData34 = Object.values(groupByUserIdRec).map((item) => {

    let item1 = 0;



    // console.log("doubled12", listItems)

    let attendance = 0;

    for (let i = 0; i < item.length; i++) {
      attendance += Number(item[i]?.noOfParcel ?? 0);
    }
    // console.log("Tot_Received_parcel9080:", attendance)

    const data = {};

    let received_parcelData = [];


    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted33 = item.filter((e) => e.date === date);
      // console.log("numberAlloted33:",numberAlloted33)
      // numberAlloted35 = numberAlloted33;
      // console.log("numberAlloted35:",numberAlloted35)
      let parcelReceivedData = 0;

      if (numberAlloted33?.length) {
        for (let j = 0; j < numberAlloted33?.length; j++) { // [1,2,3] => sum
          parcelReceivedData += numberAlloted33[j]?.noOfParcel
        }
        // parcelReceivedData35 = parcelReceivedData;
        // setparcelReceivedData35(parcelReceivedData)
      }
      // console.log("parcelReceivedData", parcelReceivedData)
      // console.log("parcelReceivedData35", parcelReceivedData35)
      received_parcelData.push({ date: bdate, Parcel_Received: numberAlloted33 ? parcelReceivedData : 0 })
      data[bdate] = numberAlloted33 ? parcelReceivedData : 0;
    }
    // setAlloted35(numberAlloted33);

    // console.log("Array_received_parcelData_29March", received_parcelData);
    received_parcelDataC = received_parcelData;
    return received_parcelData;
  });

  // console.log("received_parcelDataColon", received_parcelDataC)
  // console.log("numberAlloted33 ? parcelReceivedData : 0", numberAlloted33 ? parcelReceivedData : 0)
  //""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

  const liwParcel = receivedParcel?.data?.data ?? [];

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});



  const ReceivedParcel = ReceivedParcelData34.flat();
  //   console.log("ReceivedParcel:",ReceivedParcel)


  // console.log("groupByUserId_RejectedDeliveredParcel:",groupByUserId)
  const ReceivedParcelData = Object.values(groupByUserId, groupByUserIdRec).map((item) => {


    for (let i = 0; i < item.length; i++) {
      total += Number(item[i]?.deliverdParcel ?? 0);//total of delivered parcel  

    }

    for (let i = 0; i < item.length; i++) {
      total2 += Number(item[i]?.rejectParcel ?? 0);//total of rejected parcel  

    }

    const data = {};

    let checkData = [];

    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted = item.filter((e) => e.date === date);
      let parcelAllotData = 0;
      let parcelRejectData = 0;
      if (numberAlloted?.length) {
        for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
          parcelAllotData += numberAlloted[j]?.deliverdParcel
        }

        for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
          parcelRejectData += numberAlloted[j]?.rejectParcel
        }
      }
      let Parcel_Received = ReceivedParcel[i]?.Parcel_Received ?? 0;
      let Parcel_Rejected_per = numberAlloted ? (Parcel_Received > 0 ? (parcelRejectData) : 0) : 0;
      let Parcel_Delivered_per = numberAlloted ? (Parcel_Received > 0 ? (parcelAllotData) : 0) : 0;

      checkData.push({ date: bdate, Parcel_Delivered: Parcel_Delivered_per, Parcel_Rejected: Parcel_Rejected_per, Parcel_Received })
      // checkData.push({date:bdate, Parcel_Delivered: ((numberAlloted ? parcelAllotData : 0)/(numberAlloted35 ? parcelReceivedData35 : 0))*100, Parcel_Rejected: ((numberAlloted ? parcelRejectData : 0)/(numberAlloted35 ? parcelReceivedData35 : 0))*100, parcelReceived: numberAlloted35 ? parcelReceivedData35 : 0})
      data[bdate] = numberAlloted ? parcelAllotData : 0;
    }
    // console.log("checkData_29_March:", checkData);

    return checkData;
  });

  const ReceivedGraph = ReceivedParcelData.flat();
  //   console.log("ReceivedGraph_29_March:",ReceivedGraph)

  return (
    <JumboCardQuick
      noWrapper
      title={<Typography variant={"h4"}>{t('Parcel Delivered Received & Rejected')}</Typography>}

      action={
        <Stack direction={"row"} spacing={1}>
          <Button
            size={"small"}
            variant={"contained"}
            // onClick={() => setChartData(SalesChartDataS.monthly)}
            onClick={() => setChartData(ReceivedGraph)}
          >
            Monthly
          </Button>
          {/* <Button
            size={"small"}
            variant={"contained"}
            // onClick={() => setChartData(SalesChartDataS.yearly)}
            onClick={() => setChartData(ReceivedGraph)}
          >
            Yearly
          </Button> */}
        </Stack>
      }

      style={{ marginTop: "50px", height: "340px" }}
    >
      <ChartSalesOverviewS data={chartData} />
    </JumboCardQuick>
  );
}

export default SalesOverviewS
