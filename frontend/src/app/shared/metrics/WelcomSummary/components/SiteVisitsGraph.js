import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
// import { siteVisits } from "../data";
import { Typography } from "@mui/material";
import moment from 'moment';
import { useQuery } from 'react-query';
import { parcelServices } from 'app/services/parcelServices';

let total = 0;
let total2 = 0;

const SiteVisitsGraph = ({ bID }) => {

    const branchId = bID;
    // console.log("branchId_22April>>>>>>>>>>>>:", branchId);

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

    const liwParcel = receivedParcel?.data?.data ?? [];

    // console.log("liwParcel>>>>>>>>>>>>>>>>>>>", liwParcel)
    const groupByUserId = liwParcel.reduce(function (a, e) {
        let estKey = e[null];

        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
        return a;
    }, {});

    const ReceivedParcelData = Object.values(groupByUserId).map((item) => {


        for (let i = 0; i < item.length; i++) {
            total += Number(item[i]?.totalCashAmmount ?? 0);//total of delivered parcel  = totalCashAmmount

        }

        for (let i = 0; i < item.length; i++) {
            total2 += Number(item[i]?.totalOnlineAmmount ?? 0);//total of rejected parcel = totalOnlineAmmount 

        }

        const data = {};

        let checkData = [];

        for (let i = 0; i < AcutalDays; i++) {
            const date = moment(FirstDay)
                .date(i + 1)
                .format("YYYY-MM-DD");
            const bdate = moment(date).format("DD");
            const numberAlloted = item.filter((e) => e.date === date);
            let parcelAllotData = 0;   // parcelAllotData
            let parcelRejectData = 0;  // parcelRejectData
            if (numberAlloted?.length) {
                for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
                    parcelAllotData += numberAlloted[j]?.totalCashAmmount  // delivered parcel  = totalCashAmmount
                }

                for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
                    parcelRejectData += numberAlloted[j]?.totalOnlineAmmount  // rejected parcel = totalOnlineAmmount
                }
            }

            let Parcel_Delivered_per = numberAlloted ? (parcelAllotData) : 0;
            let Parcel_Rejected_per = numberAlloted ? (parcelRejectData) : 0;

            checkData.push({ date: bdate, Cash: Parcel_Delivered_per, Online: Parcel_Rejected_per })
            // checkData.push({date:bdate, Parcel_Delivered: ((numberAlloted ? parcelAllotData : 0)/(numberAlloted35 ? parcelReceivedData35 : 0))*100, Parcel_Rejected: ((numberAlloted ? parcelRejectData : 0)/(numberAlloted35 ? parcelReceivedData35 : 0))*100, parcelReceived: numberAlloted35 ? parcelReceivedData35 : 0})
            data[bdate] = numberAlloted ? parcelAllotData : 0;
        }
        // console.log("checkData_24_April:>>>>>>>>>>>>>>>>>>", checkData);

        return checkData;
    });

    const ReceivedGraph = ReceivedParcelData.flat();

    // console.log("ReceivedGraph--------------------------->>>>>>>>>", ReceivedGraph)
    return (
        <React.Fragment>

            <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={ReceivedGraph} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Tooltip
                        labelStyle={{ color: 'black' }}
                        labelFormatter={function (value) {
                            return `date: ${value}`;
                        }}
                        cursor={false}
                    />
                    {/* #FF69B4 */}
                    <XAxis dataKey="date" />
                    <Area type="monotone" dataKey="Online" stackId="1" stroke="#FFA500" fillOpacity={1} fill="#FFA500" />
                    <Area type="monotone" dataKey="Cash" stackId="1" stroke="#FF69B4" fillOpacity={1} fill="#FF69B4" />
                </AreaChart>
            </ResponsiveContainer>
        </React.Fragment>

    );
};

export default SiteVisitsGraph;
