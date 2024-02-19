
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";
import { useQuery } from 'react-query';

import ParcelDeliveredChart from "./ParcelDeliveredChart";

const ParcelDeliveredGraph = ({ branchId }) => {
  let total = 0;

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
 
  const ParcelDelivered = useQuery(
    ["ParcelDelivered", { branchId, FirstDay, LastDay }],
    async () => parcelServices.report(branchId, FirstDay, LastDay)
  );
 
  const liwParcel = ParcelDelivered?.data?.data ?? [];

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {}); 

  const ReceivedParcelData = Object.values(groupByUserId).map((item) => { 


    for (let i = 0; i < item.length; i++) {
      total += Number(item[i]?.deliverdParcel ?? 0);

    }

    const data = {

    };

    let checkData = [];

    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted = item.filter((e) => e.date === date);
      let parcelAllotData = 0;
      if (numberAlloted?.length) {
        for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
          parcelAllotData += numberAlloted[j]?.deliverdParcel
        }
      }
      checkData.push({ date: bdate, Parcel_Delivered: numberAlloted ? parcelAllotData : 0 })

      data[bdate] = numberAlloted ? parcelAllotData : 0;
    }
   
    return checkData;
  });  

  const ReceivedGraph = ReceivedParcelData.flat();

  return (
    <JumboCardQuick
      noWrapper
      title={
        <Typography variant={"h5"} mb={0.5}>
          {"Parcel Delivered "}
        </Typography>
      }
      subheader={
        <Typography variant={"h6"} color={"text.secondary"} mb={0} style={{ marginTop: "20px" }}>
          {total}
        </Typography>
      }
      headerSx={{ pb: 0 }}
      style={{ marginTop: "10px", height: "180px" }}

    >
      <Div sx={{ mt: -2.5 }} style={{ marginTop: "20px" }}>
        <ParcelDeliveredChart chartData={ReceivedGraph} />
      </Div>
    </JumboCardQuick>
  );
};


export default ParcelDeliveredGraph;





