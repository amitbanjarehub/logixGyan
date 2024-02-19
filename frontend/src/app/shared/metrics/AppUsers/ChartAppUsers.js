import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import styled from "@emotion/styled";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import useAuth from "@jumbo/hooks/useJumboAuth";
import { useTranslation } from 'react-i18next';
import { userServices } from 'app/services/userservices';
import { useQuery } from 'react-query';




const data = [
    { name: 'Present', value: 400 },
    { name: 'Absent', value: 300 },

];
const COLORS = ['#0000FF', '#FF0000'];

const ListItemInline = styled(ListItem)(({ theme }) => ({
    width: 'auto',
    display: 'inline-flex',
    padding: theme.spacing(0, .5),
}));

const ChartAppUsers = () => {

    const { authUser } = useAuth();
    // console.log("authuser", authUser);
    // console.log("authuser_branchId", authUser?.branchId);

    const branchId = authUser?.branchId;

    const { t } = useTranslation();
    // console.log("ChartAppUsers:",branchId );
    const current = new Date();
    const date1 = `${current.getDate()}`;


    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const currDate = date;
    //    console.log("ChartAppUsers_Today_Date:", currDate);

    const attendance = useQuery(
        ["Attendance", { branchId, currDate }],
        async () => userServices.attendancedashboard(branchId, currDate)
    );
    const todayPresentUser = attendance.data?.count;
    //   console.log("today Present User",todayPresentUser) 

    const liuser = useQuery(["user-list"], userServices.alist);
    const totalUser = liuser.data?.count;
    //   console.log("TotalUserCount:", totalUser);
    const aliuser = liuser.data?.data;

    const todayAbsentUser = totalUser - todayPresentUser;
    //   console.log("today Absent User", todayAbsentUser)

    const AttendanceStatus = [
        { name: "Present", value: todayPresentUser, color: "#0000FF" },
        { name: "Absent", value: todayAbsentUser, color: "#FF0000" },
    ];



    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                    <Pie
                        data={AttendanceStatus}
                        cx={"50%"}
                        cy={"50%"}
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    mt: 1
                }}
            >
                <ListItemInline>
                    <ListItemIcon sx={{ minWidth: 16 }}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{ color: COLORS[0] }} />
                    </ListItemIcon>
                    <ListItemText primary="Present" />
                </ListItemInline>
                <ListItemInline>
                    <ListItemIcon sx={{ minWidth: 16 }}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{ color: COLORS[1] }} />
                    </ListItemIcon>
                    <ListItemText primary="Absent" />
                </ListItemInline>

            </List>
        </React.Fragment>
    );
};

export default ChartAppUsers;
