import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import {
  Card,
  CardContent,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useQuery } from "react-query";
import "./fuel.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";

import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { companyServices } from "app/services/companyservices";
import moment from "moment";
import { userServices } from "app/services/userservices";
import { array } from "prop-types";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const FuelReport = () => {

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const [cId, setId] = useState();
  console.log("cId", cId);

  const [branchId, setbId] = useState();
  console.log("bId", branchId);

  const [Display, setDisplay] = useState();

  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  console.log("month", month);
  console.log("year", year);

  const handleMonthChange = (event) => {
    setMonth(moment(event.target.value).format("MM"));
    setYear(moment(event.target.value).format("YYYY"));
  };

  const date = moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD");

  const FirstDay = moment(date).startOf("month").format("YYYY-MM-DD");

  const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");

  console.log("FirstDay", FirstDay);


  console.log("LastDay", LastDay);

  const monthDates = moment(LastDay).diff(moment(FirstDay), "days");

  console.log("monthDates", monthDates);

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

  const columns = [
    {
      name: "SNo",
      label: "SNo.",

      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "Name",
      label: "Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Role",
      label: "Role",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "MobileNo",
      label: "Mobile No.",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "PANNumber",
      label: "PAN Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "AccountNumberr",
      label: "Account Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "ifscCode",
      label: "IFSC Code",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "upiId",
      label: "UPI ID",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "travellingAllowance",
      label: "Travelling Allowance Per KM",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "totalKilometerTravelled",
      label: "Total KM Travelled",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "totaltravellingAllowancePayable",
      label: "Total Travelling Allowance",
      options: { filterOptions: { fullWidth: true } },
    },
  ];

  for (let i = 0; i < AcutalDays; i++) {
    const date = moment(FirstDay)
      .date(i + 1)
      .format("YYYY-MM-DD");
    const ddate = moment(FirstDay)
      .date(i + 1)
      .format("DD");
    columns.push({
      name: ddate,
      label: ddate,
      options: { filterOptions: { fullWidth: true } },
    });
  }

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,

    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  const wComp = useQuery(["company-list"], companyServices.wList);

  console.log("result of wComp: ", wComp);

  const liwComp = wComp?.data?.data ?? [];

  const comphandleChange = (event) => {
    setId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const bhandleChange = (e) => {
    setbId(e.target.value);

  };

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  const liwBranch = cDetails?.data?.data?.companyBranch ?? [];

  const attendance = useQuery(
    ["Attendance", { branchId, FirstDay, LastDay }],
    async () => userServices.attendance(branchId, FirstDay, LastDay)
  );

  const liwAttendance = attendance?.data?.data ?? [];
  console.log("liwAttendance", liwAttendance);

  const groupByUserId = liwAttendance.reduce(function (a, e) {
    let estKey = e["userId"];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const [userId, setUserId] = useState();
  console.log("userId", userId);

  const userDetails = useQuery(["Attendance", { userId }], async () =>
    userServices.details(userId)
  );

  const AttendaceData = Object.values(groupByUserId).map((item) => {
    const {
      userName,
      userRole,
      userMobile,
      usertravellingAllowance
    } = item[0];
    let kmTravelled = 0;
    for (let i = 0; i < item.length; i++) {
      kmTravelled += Number(item[i]?.dailyFuel ?? 0);
    }

    const salary = item[0].userSalary;
    const totaltravellingAllowancePayable = usertravellingAllowance * kmTravelled;
    const userPANNumber = item[0].userPanNumber;
    const userAccountNumber = item[0]?.BankDetails?.AccountNumber;
    const userIFSC = item[0]?.BankDetails?.ifscCode;
    const userUPI = item[0]?.BankDetails?.upiId;


    const data = {
      Name: userName,
      Role: userRole,
      MobileNo: userMobile,
      PANNumber: userPANNumber,
      AccountNumberr: userAccountNumber,
      ifscCode: userIFSC,
      upiId: userUPI,
      salary: salary,
      totaltravellingAllowancePayable: totaltravellingAllowancePayable,
      travellingAllowance: usertravellingAllowance,
      totalKilometerTravelled: kmTravelled
    };
    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const present = item.find((e) => e.date === date);
      const dailyFuelData = present?.dailyFuel;
      data[bdate] = present ? dailyFuelData : 0;


    }
    console.log("item", item);
    console.log("data", data);
    return data;
  });
  console.log("AttendaceData", AttendaceData);

  return (
    <>
      <React.Fragment>
        <Typography variant="h1" mb={3}></Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Typography component={"h2"} variant="h1" mb={3}>
                Fuel Report
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
                    <InputLabel>Select Company</InputLabel>
                    <Select
                      name="companyName"
                      onChange={comphandleChange}
                      value={cId}
                    >
                      {liwComp?.map((comp) => (
                        <MenuItem id={comp.id} value={comp.id} key={comp.id}>
                          {comp.companyName}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className="MuiFormControl-fluid">
                    <InputLabel>Select Branch</InputLabel>
                    <Select
                      name="branchId"
                      onChange={bhandleChange}
                      value={branchId}
                    >
                      {liwBranch?.map((branch) => (
                        <MenuItem
                          id={branch.id}
                          value={branch.id}
                          key={branch.id}
                        >
                          {branch.branchName}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
        <Div>
          <CacheProvider value={muiCache}>
            {wComp.isLoading ? (
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: (theme) => theme.spacing(3),
                  m: "auto",
                }}
              >
                <CircularProgress />
                <Typography variant={"h6"} color={"text.secondary"} mt={2}>
                  Loading...
                </Typography>
              </Div>
            ) : (
              <MUIDataTable
                title={"Fuel Report"}

                data={AttendaceData}
                columns={columns}
                options={options}
              />
            )}
          </CacheProvider>
        </Div>
      </React.Fragment>
    </>
  );
};

export default FuelReport;
