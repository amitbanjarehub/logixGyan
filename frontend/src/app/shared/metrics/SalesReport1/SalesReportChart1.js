import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { salesHistoryWithPast } from "./data";
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";
import moment from "moment";
import { useQuery } from "react-query";
import { parcelServices } from "app/services/parcelServices";
import { cashDepositServices } from "app/services/cashDepositServices";

const SalesReportChart1 = ({ branchId }) => {
  console.log("admin_branchId:-------->>>", branchId)
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
    ["cashListData", { branchId, FirstDay, LastDay }],
    async () => cashDepositServices.list(branchId, FirstDay, LastDay)
  );

  //   console.log("DeliveredParcelAPI:",ParcelDelivered);
  const liwParcel = ParcelDelivered?.data?.data ?? [];
  console.log("cashListData:------>>>", liwParcel)

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const ReceivedParcelData = Object.values(groupByUserId).map((item) => {

    // console.log("Item555:",item);


    for (let i = 0; i < item.length; i++) {
      total += Number(item[i]?.cash ?? 0);

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
          parcelAllotData += numberAlloted[j]?.cash
        }
      }
      checkData.push({ date: bdate, Cash: numberAlloted ? parcelAllotData : 0 })

      data[bdate] = numberAlloted ? parcelAllotData : 0;
    }
    // console.log("checkData_For_nextDayParcel:", checkData);
    // console.log("item", item);
    // console.log("data", data);
    return checkData;
  });
  // console.log("ReceivedParcelData:", ReceivedParcelData.flat());

  const NextDayParcelData = ReceivedParcelData.flat();
  console.log("For_nextDayParcel_data>>>>>>>>>>>>>>>>>>>>>>", NextDayParcelData)


  return (
    <ResponsiveContainer height={210}>
      <BarChart data={NextDayParcelData}>
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({ active, label, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                {payload.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className={index !== payload.length - 1 ? "mb-1" : ""}
                    >
                      <div
                        style={{
                          color: row.color,
                          fontSize: 8,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {capitalizeFLetter(row.name)}
                      </div>
                      <div
                        style={{
                          color: row.color,
                        }}
                      >
                        {row.value} ₹
                      </div>
                    </div>
                  );
                })}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: "rgba(0,0,0,0.8)",
            borderRadius: 4,
            padding: "5px 8px",
            fontWeight: 500,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          cursor={false}
        />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <Bar
          dataKey="Cash"
          fill="#3EC3D0"
          stackId={"a"}
          // maxBarSize={10}
          barSize={8}
        />

      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesReportChart1;
