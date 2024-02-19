import Div from "@jumbo/shared/Div";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { Stack } from "@mui/system";

import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { userServices } from "app/services/userservices";
import JumboCardQuick from "@jumbo/components/JumboCardQuick/JumboCardQuick";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";


const ListItemInline = styled(ListItem)(({ theme }) => ({
    width: "auto",
    display: "inline-flex",
    padding: theme.spacing(0, 0.5),
}));

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <List disablePadding>
            {payload.map((entry, index) => {
                return (
                    <ListItemInline key={`item-${index}`}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                            <FiberManualRecordIcon
                                fontSize={"10px"}
                                sx={{ color: entry.color }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant={"body1"} fontSize={"12px"}>
                                    {entry.value}
                                </Typography>
                            }
                        />
                    </ListItemInline>
                );
            })}
        </List>
    );
};

const DeliveryBoyA = () => {

    const User = useAuth();
    const authUser = User?.authUser ?? [];
    console.log("authUser:------->>>", authUser)
    const userId = authUser?.id;
    console.log("userId:--------->>>", userId)
    const branchId = authUser?.branchId;

    console.log("branchId_Manager:---------->>>>", branchId)
    const [cId, setcId] = useState();
    console.log("cId", cId);

    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    console.log("month", month);
    console.log("year", year);

    const handleMonthChange = (event) => {
        setMonth(moment(event.target.value).format("MM"));
        setYear(moment(event.target.value).format("YYYY"));
    };

    const date = moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD");

    const StartDate = moment(date).startOf("month").format("YYYY-MM-DD");

    const endDate = moment(date).endOf("month").format("YYYY-MM-DD");

    const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");

    const monthDates = moment(endDate).diff(moment(StartDate), "days");

    console.log("Month:------>>>", month);
    console.log("StartDate:------>>>", StartDate);
    console.log("LastDay:------>>>", LastDay);

    const AcutalDays = monthDates + 1;


    var tempDate = new Date();
    var date1 = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const currDate = date1;


    const particularAttendance = useQuery(
        ["particularAttendance", { userId, StartDate, LastDay }],
        async () => userServices.Pattendance(userId, StartDate, LastDay)
    );

    const Toatal_present_Days = particularAttendance?.data?.data ?? [];
    const presentDays = Toatal_present_Days.length;
    const absentDays = AcutalDays - presentDays;

    console.log("particularAttendance:------>>>", particularAttendance)
    console.log("Toatal_present_Days:-------->>>", Toatal_present_Days)
    console.log("presentDays:-------->>>", presentDays)
    console.log("absentDays:------------>>>", absentDays)



    const attendance = useQuery(
        ["Attendance", { branchId, currDate }],
        async () => userServices.attendancedashboard(branchId, currDate)
    );
    const todayPresentUser = attendance.data?.count;
    console.log("today Present User:------->>>", todayPresentUser)// how many absent data

    const liuser = useQuery(["user-list"], userServices.alist);
    const totalUser = liuser.data?.count;

    const aliuser = liuser.data?.data;

    const todayAbsentUser = totalUser - todayPresentUser;
    console.log("today Absent User:----------->>>", todayAbsentUser)//  how many user Absent data

    const AttendanceStatus = [
        { name: "Present", value: presentDays, color: "#0000FF" },
        { name: "Absent", value: absentDays, color: "#FF0000" },


    ];

    return (
        <React.Fragment>
            <Card sx={{ display: "flex", mb: 3.5, width: "1000px" }}>
                <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <CardContent>
                        <Typography component={"h2"} variant="h1" mb={3}>
                            Attendance List
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                mx: -1,

                                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                                    p: 1,
                                    mb: 2,
                                    width: { xs: "30%", sm: "50%" },
                                },

                                "& .MuiFormControl-root.MuiFormControl-fluid": {
                                    width: "30%",
                                },
                            }}
                            autoComplete="off"
                        >
                            <JumboDemoCard
                                title={""}
                                wrapperSx={{ backgroundColor: "background.paper", pt: 0 }}
                            >
                                <FormControl className="MuiFormControl-fluid">
                                    <Stack component="form" noValidate spacing={3}>
                                        <TextField
                                            name="Month"
                                            label="Select Month"
                                            type="month"
                                            sx={{ width: 220 }}
                                            onChange={handleMonthChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </JumboDemoCard>
                        </Box>
                    </CardContent>
                </Div>
            </Card>

            <JumboCardQuick
                title={"Attendance Report"}
                sx={{ textAlign: "center" }}
                wrapperSx={{
                    pt: 2,
                    "&:last-child": {
                        pb: 6.5,
                    },
                }}
            >
                <br />
                <ResponsiveContainer width="100%" height={185}>
                    <PieChart>
                        <text
                            x="50%"
                            className="h1"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        />
                        <Pie
                            data={AttendanceStatus}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={80}
                            fill="#8884d8"
                        >
                            {AttendanceStatus.map((item, index) => (
                                <Cell key={index} fill={item.color} />
                            ))}
                        </Pie>
                        <Legend
                            content={renderLegend}
                            wrapperStyle={{ position: "absolute", bottom: -24 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <br />
                <Div>
                    <h5>PresentDay: {presentDays}</h5>
                    <h5>AbsentDay: {absentDays}</h5>
                </Div>
            </JumboCardQuick>


        </React.Fragment>
    );
};

export default DeliveryBoyA;


