import { parcelServices } from 'app/services/parcelServices';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

let total = 0;
let total2 = 0;
let received_parcelDataC = [];

const DeliveredRejectedParcelChart = ({ activeChart, branchId }) => {

  const topChart = activeChart;
  const bottomChart = activeChart === "Parcel_Delivered" ? "Parcel_Received_Per" : "Parcel_Delivered";
  const lowerbottomChart = activeChart === "Parcel_Delivered" ? "Parcel_Rejected" : "Parcel_Rejected";
  const topChartColor = activeChart === "Parcel_Delivered" ? "#F43B86" : "#2D46B9";
  const bottomChartColor = activeChart === "Parcel_Delivered" ? "#2D46B9" : "#F43B86";
  const lowerbottomChartColor = activeChart === "Parcel_Rejected" ? "#ffa500" : "#ffa500";


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
  );

  const ParcelReceived = useQuery(["ReceivedParcel", { branchId, FirstDay, LastDay }], async () => parcelServices.receivedParcel(branchId, FirstDay, LastDay)
  );   //parcel Received API

  const liwParcelRec = ParcelReceived?.data?.data ?? []; //For parcel Received API


  const groupByUserIdRec = liwParcelRec.reduce(function (a, e) {  //parcel Received API
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});


  const ReceivedParcelData34 = Object.values(groupByUserIdRec).map((item) => {

    let item1 = 0;

    let attendance = 0;

    for (let i = 0; i < item.length; i++) {
      attendance += Number(item[i]?.noOfParcel ?? 0);
    }


    const data = {};

    let received_parcelData = [];


    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted33 = item.filter((e) => e.date === date);

      let parcelReceivedData = 0;

      if (numberAlloted33?.length) {
        for (let j = 0; j < numberAlloted33?.length; j++) { // [1,2,3] => sum
          parcelReceivedData += numberAlloted33[j]?.noOfParcel
        }

      }

      received_parcelData.push({ date: bdate, Parcel_Received: numberAlloted33 ? parcelReceivedData : 0 })
      data[bdate] = numberAlloted33 ? parcelReceivedData : 0;
    }

    received_parcelDataC = received_parcelData;
    return received_parcelData;
  });


  const liwParcel = receivedParcel?.data?.data ?? [];

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e[null];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});



  const ReceivedParcel = ReceivedParcelData34.flat();



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
      let Parcel_Received_Per = ReceivedParcel[i]?.Parcel_Received > 0 ? (((ReceivedParcel[i]?.Parcel_Received) / (ReceivedParcel[i]?.Parcel_Received)) * 100) : 0;
      let Parcel_Rejected_per = numberAlloted ? (Parcel_Received > 0 ? (parcelRejectData / Parcel_Received) * 100 : 0) : 0;
      let Parcel_Delivered_per = numberAlloted ? (Parcel_Received > 0 ? (parcelAllotData / Parcel_Received) * 100 : 0) : 0;

      checkData.push({ date: bdate, Parcel_Delivered: Parcel_Delivered_per, Parcel_Rejected: Parcel_Rejected_per, Parcel_Received_Per })
      data[bdate] = numberAlloted ? parcelAllotData : 0;
    }

    return checkData;
  });


  const ReceivedGraph = ReceivedParcelData.flat();


  return (
    <ResponsiveContainer height={152}>
      <AreaChart data={ReceivedGraph} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}> {/*  data={checkData} */}
        <Tooltip
          content={({ active, label, payload }) => {
            return active ? (
              <div style={{ color: "#fff" }}>
                {payload.map((row, index) => {
                  return (
                    <div key={index} className={"mb-1"}>
                      <div style={{
                        color: row.color,
                        fontSize: 8,
                        letterSpacing: 2,
                        textTransform: 'uppercase'
                      }}>
                        {(row.name)}
                      </div>
                      <div style={{
                        color: row.color
                      }}
                      >{row.value} %
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null;
          }}
          wrapperStyle={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
            padding: '5px 8px',
            fontWeight: 500,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
        />
        <XAxis tickLine={true} dataKey="date" axisLine={true} />  {/*  dataKey="date" */}
        <Area
          dataKey={bottomChart}
          stackId="3"
          stroke={bottomChartColor}
          fillOpacity={.5}
          strokeOpacity={.3}
          fill={bottomChartColor}
        />
        <Area
          dataKey={topChart}
          stackId="2"
          stroke={topChartColor}
          fillOpacity={.8}
          strokeOpacity={.3}
          fill={topChartColor}
        />
        <Area
          dataKey={lowerbottomChart}
          stackId="1"
          stroke={lowerbottomChartColor}
          fillOpacity={.8}
          strokeOpacity={.3}
          fill={lowerbottomChartColor}
        />
      </AreaChart>

    </ResponsiveContainer>
  );
};

export default DeliveredRejectedParcelChart;




