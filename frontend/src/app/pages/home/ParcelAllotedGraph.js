import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";
import { useQuery } from 'react-query';
// import ChartOrders from "./ChartOrders";
import ChartParcelAlloted from "./ChartParcelAlloted";


const ParcelAllotedGraph = ({ branchId }) => {
  let total = 0;



  // console.log("Parcel_Alloted_Graph:", branchId);//branchId

  const month = new Date(), curMonth = month.getMonth() + 1;//current Month

  // console.log("CurrentMonth:", curMonth);

  const findYear = new Date(), year = findYear.getFullYear();//current year
  // console.log("CurrentYear:", year);/

  const date = moment(new Date(year, curMonth - 1, 1)).format("YYYY-MM-DD");
  // console.log("date444:",date);
  const FirstDay = moment(date).startOf("month").format("YYYY-MM-DD");

  const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");
  // console.log("FirstDay", FirstDay);  
  // console.log("LastDay", LastDay);

  const monthDates = moment(LastDay).diff(moment(FirstDay), "days");

  // console.log("monthDates", monthDates);
  const AcutalDays = monthDates + 1;

  // console.log("AcutalDays", AcutalDays);

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

  // Usage
  const dates = getDates(new Date(FirstDay), new Date(LastDay));
  dates.forEach(function (date) {
    // console.log(date)
  });



  const receivedParcel = useQuery(
    ["ParcelAlloted", { branchId, FirstDay, LastDay }],
    async () => parcelServices.report(branchId, FirstDay, LastDay)
  );

  // console.log("parcelServices.report:", receivedParcel);
  const liwParcel = receivedParcel?.data?.data ?? [];
  // console.log("liwAttendance", liwParcel);

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  // console.log("groupByUserId Received",groupByUserId)

  const ReceivedParcelData = Object.values(groupByUserId).map((item) => {

    // console.log("Item555:",item);


    for (let i = 0; i < item.length; i++) {
      total += Number(item[i]?.noOfparcelAlloted ?? 0);

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
          parcelAllotData += numberAlloted[j]?.noOfparcelAlloted
        }
      }
      checkData.push({ date: bdate, Parcel_Alloted: numberAlloted ? parcelAllotData : 0 })

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
          {"Parcel Alloted "}
        </Typography>
      }
      subheader={
        <Typography variant={"h6"} color={"text.secondary"} mb={0} style={{ marginTop: "20px" }}>
          {total}
        </Typography>
      }
      headerSx={{ pb: 0 }}
      style={{ marginTop: "10px", height: "180px", height: "230px" }}

    >
      <Div sx={{ mt: -2.5 }} style={{ marginTop: "20px" }}>
        <ChartParcelAlloted chartData={ReceivedGraph} />
      </Div>
    </JumboCardQuick>
  );
};


export default ParcelAllotedGraph;







