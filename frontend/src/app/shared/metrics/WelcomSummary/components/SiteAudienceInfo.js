import React from 'react';
// import { siteAudiences } from "../data";
import { LinearProgress, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import styled from "@mui/material/styles/styled";
import moment from "moment";
import { useQuery } from 'react-query';
import { parcelServices } from 'app/services/parcelServices';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    flex: 1
}));

let total = 0;
let total2 = 0;
let Sum = 0;
let cashPer = 0;
let onlinePer = 0;
let percentageData = [];
let percentageDataCopy = [];

const SiteAudienceInfo = ({ bID }) => {

    const branchId = bID;
    // console.log("branchId_22April:", branchId);

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

        // console.log("totalCashAmmount:------------->>>", total)

        for (let i = 0; i < item.length; i++) {
            total2 += Number(item[i]?.totalOnlineAmmount ?? 0);//total of rejected parcel = totalOnlineAmmount 

        }

        // console.log("totalOnlineAmmount:----------------->>>", total2)

        Sum = total + total2;

        // console.log("Sum: ------------------------>>>", Sum)
        // const fixedNum = Math.round(number*100)/100;
        cashPer = ((total / Sum) * 100);
        cashPer = Math.round(cashPer * 100) / 100;
        onlinePer = ((total2 / Sum) * 100);
        onlinePer = Math.round(onlinePer * 100) / 100;

        // console.log("cashPer:------------>>>", cashPer)
        // console.log("onlinePer:------------>>>", onlinePer)

        percentageData.push(
            { label: 'Online', value: onlinePer, color: 'warning' },
            { label: 'Cash', value: cashPer, color: 'secondary' }
        )

        for (let i = 0; i < 2; i++) {
            percentageDataCopy[i] = percentageData[i];
        }

        // console.log("percentageData------->>>", percentageData)
        // console.log("percentageDataCopy------->>>", percentageDataCopy)








        return percentageDataCopy;
    });

    const ReceivedGraph = ReceivedParcelData.flat();

    // console.log("ReceivedGraph: ---------))))))", ReceivedGraph)




    return (
        <React.Fragment>
            <Typography variant={"h5"}>Payment Mode</Typography>
            {
                ReceivedGraph.map((item, index) => (
                    <React.Fragment key={index}>
                        <Typography variant={'body1'} color={'text.secondary'}>{item.label}</Typography>
                        <Div
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: .5
                            }}
                        >
                            <StyledLinearProgress
                                variant={"determinate"}
                                value={item.value}
                                color={item.color}
                            />
                            <Typography
                                variant={'body1'}
                                color={'text.secondary'}
                                ml={1}
                            >{`${item.value}%`}</Typography>
                        </Div>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    );
};

export default SiteAudienceInfo;
