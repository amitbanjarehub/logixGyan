import {Mail, MessageOutlined} from "@mui/icons-material";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import React from "react";

export const siteVisits = [
    {name: '', visits: 0, queries: 0},
    {name: 'Jan', Online: 4000, Cash: 3000},
    {name: 'Feb', Online: 2000, Cash: 1000},
    {name: 'Mar', Online: 4400, Cash: 4000},
    {name: 'Apr', Online: 9000, Cash: 3800},
    {name: 'May', Online: 3500, Cash: 2000},
    {name: 'Jun', Online: 1750, Cash: 1000},
    {name: 'Jul', Online: 100, Cash: 100},
];

export const siteAudiences = [
    {label: 'Online', value: 89, color: 'warning'},
    {label: 'Cash', value: 89, color: 'secondary'},
   
];

export const generalInfo = [
    {
        id: 1,
        title: "5 Unread Messages",
        icon: <MessageOutlined fontSize={'small'}/>
    },
    {
        id: 2,
        title: "2 Pending Invitations",
        icon: <Mail fontSize={'small'}/>
    },
    {
        id: 3,
        title: "7 Due Tasks",
        icon: <TaskAltOutlinedIcon fontSize={'small'}/>
    },
    {
        id: 4,
        title: "3 Other notifications",
        icon: <NotificationsActiveRoundedIcon fontSize={'small'}/>
    },
];
