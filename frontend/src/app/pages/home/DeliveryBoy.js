import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { userServices } from "app/services/userservices";
import { useQuery } from "react-query";
import { colorForBgColor } from "@jumbo/utils";
import useAuth from "@jumbo/hooks/useJumboAuth";

import { getAssetPath } from "app/utils/appHelpers";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import Div from "@jumbo/shared/Div";
import { dashboardServices } from "app/services/dashboardServices";


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

const DeliveryBoy = ({ branchId }) => {


  const { t } = useTranslation();

  const current = new Date();
  const date1 = `${current.getDate()}`;


  var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
  const currDate = date;


  const attendance = useQuery(
    ["Attendance", { branchId, currDate }],
    async () => userServices.attendancedashboard(branchId, currDate)
  );
  const todayPresentUser = attendance.data?.count;


  const liuser = useQuery(["user-list"], userServices.alist);
  const totalUser = liuser.data?.count;

  const aliuser = liuser.data?.data;

  const todayAbsentUser = totalUser - todayPresentUser;


  const AttendanceStatus = [
    { name: "Present", value: todayPresentUser, color: "#0000FF" },
    { name: "Absent", value: todayAbsentUser, color: "#FF0000" },
  ];


  const CompanyCount = useQuery("companyCount", dashboardServices.count);
  const tCount = CompanyCount?.data?.data ?? 0;
  const cCount = CompanyCount?.data?.data.totalCompany ?? 0;
  const bCount = CompanyCount?.data?.data.totalBranch ?? 0;




  return (
    <Div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

      <JumboCardQuick bgColor={'#E73145'} style={{ height: "120px", width: "280px", marginTop: "10px" }}>
        <Div >
          <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
          <Div sx={{ ml: 2, flex: 1 }}>

            <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "1px" }}>Total no. of basic verified user</Typography>
            <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "1px" }}>{tCount.basicVerifyUserCount}</Typography>

          </Div>
        </Div>
      </JumboCardQuick>

      <JumboCardQuick bgColor={'#00FF00'} style={{ height: "120px", width: "280px", marginTop: "10px", marginLeft: "10px" }}>
        <Div >
          <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`)} style={{ height: "20px", width: "20px", marginLeft: "15px" }} />
          <Div sx={{ ml: 2, flex: 1 }}>

            <Typography color={'common.white'} variant={"h5"} mb={0} style={{ marginTop: "3px" }}>Total no. of pending user</Typography>
            <Typography color={'common.white'} variant={"h2"} mb={.5} style={{ marginTop: "3px" }}>{tCount.pendingUserCount}</Typography>

          </Div>
        </Div>


      </JumboCardQuick>

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

        <ResponsiveContainer width={185} height={185}>
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

      </JumboCardQuick>
    </Div>
  );
}

export default DeliveryBoy
