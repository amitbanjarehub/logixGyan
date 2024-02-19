// import React from "react";
// import JumboCardQuick from "@jumbo/components/JumboCardQuick";
// import {
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
// import List from "@mui/material/List";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import styled from "@emotion/styled";
// import { useTranslation } from "react-i18next";
// import { userServices } from "app/services/userservices";
// import { useQuery } from "react-query";
// import { colorForBgColor } from "@jumbo/utils";


// const ListItemInline = styled(ListItem)(({ theme }) => ({
//   width: "auto",
//   display: "inline-flex",
//   padding: theme.spacing(0, 0.5),
// }));

// const renderLegend = (props) => {
//   const { payload } = props;
//   return (
//     <List disablePadding>
//       {payload.map((entry, index) => {
//         return (
//           <ListItemInline key={`item-${index}`}>
//             <ListItemIcon sx={{ minWidth: 20 }}>
//               <FiberManualRecordIcon
//                 fontSize={"10px"}
//                 sx={{ color: entry.color }}
//               />
//             </ListItemIcon>
//             <ListItemText
//               primary={
//                 <Typography variant={"body1"} fontSize={"12px"}>
//                   {entry.value}
//                 </Typography>
//               }
//             />
//           </ListItemInline>
//         );
//       })}
//     </List>
//   );
// };

// const deliveryBoyAttendance = () => {

//   const { t } = useTranslation();
//   // console.log("Ticket_Branch_Id:",branchId );
//   const current = new Date();
//   const date1 = `${current.getDate()}`;


//   var tempDate = new Date();
//   var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
//   const currDate = date;
//   //  console.log("Ticket_Today_Date:", currDate);

//   const attendance = useQuery(
//     ["Attendance", { branchId, currDate }],
//     async () => userServices.attendancedashboard(branchId, currDate)
//   );
//   const todayPresentUser = attendance.data?.count;
//   // console.log("today Present User",todayPresentUser)

//   const liuser = useQuery(["user-list"], userServices.alist);
//   const totalUser = liuser.data?.count;
//   // console.log("TotalUserCount:", totalUser);
//   const aliuser = liuser.data?.data;

//   const todayAbsentUser = totalUser - todayPresentUser;
//   // console.log("today Absent User", todayAbsentUser)

//   const AttendanceStatus = [
//     { name: "Present", value: todayPresentUser, color: "#0000FF" },
//     { name: "Absent", value: todayAbsentUser, color: "#FF0000" },
//   ];

//   return (
//     <JumboCardQuick
//       title={"Attendance Report"}
//       sx={{ textAlign: "center" }}
//       wrapperSx={{
//         pt: 2,
//         "&:last-child": {
//           pb: 6.5,
//         },
//       }}
//     >
//       <ResponsiveContainer width="100%" height={185}>
//         <PieChart>
//           <text
//             x="50%"
//             className="h1"
//             y="50%"
//             textAnchor="middle"
//             dominantBaseline="middle"
//           />
//           <Pie
//             data={AttendanceStatus}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             innerRadius={45}
//             outerRadius={80}
//             fill="#8884d8"
//           >
//             {AttendanceStatus.map((item, index) => (
//               <Cell key={index} fill={item.color} />
//             ))}
//           </Pie>
//           <Legend
//             content={renderLegend}
//             wrapperStyle={{ position: "absolute", bottom: -24 }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </JumboCardQuick>
//   );
// };

// export default deliveryBoyAttendance;
