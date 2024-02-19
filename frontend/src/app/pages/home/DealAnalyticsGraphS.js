import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";
import moment from 'moment';
import { parcelServices } from 'app/services/parcelServices';
import { useQuery } from 'react-query';

const DealAnalyticsGraphS = ({ bId }) => {


  const branchId = bId;
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
      total += Number(item[i]?.nextDayParcel ?? 0);

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
          parcelAllotData += numberAlloted[j]?.nextDayParcel
        }
      }
      checkData.push({ date: bdate, Parcel_ForNextDay: numberAlloted ? parcelAllotData : 0 })

      data[bdate] = numberAlloted ? parcelAllotData : 0;
    }

    return checkData;
  });


  const NextDayParcelData = ReceivedParcelData.flat();
  console.log("For_nextDayParcel_data>>>>>>>>>>>>>>>>>>>>>>", NextDayParcelData)

  return (
    <ResponsiveContainer width="100%" height={134}>
      <BarChart data={NextDayParcelData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({ active, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                {payload.map((row, index) => {
                  return (
                    <div key={index} className={index !== payload.length - 1 ? "mb-1" : ""}>
                      <div style={{
                        color: row.color,
                        fontSize: 8,
                        letterSpacing: 2,
                        textTransform: 'uppercase'
                      }}>
                        {capitalizeFLetter(row.name)}
                      </div>
                      <div style={{
                        color: row.color
                      }}
                      >{row.value}
                      </div>
                    </div>
                  )
                })}
              </Div>
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

        <XAxis dataKey="date" />  {/*date ko hide krne ke liye <XAxis dataKey="date" hide/> krna hai */}
        <Bar dataKey="Parcel_ForNextDay" stackId="a" fill="#1E88E5" barSize={8} />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default DealAnalyticsGraphS
