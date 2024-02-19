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
import "./attendance.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { companyServices } from "app/services/companyservices";
import { userServices } from "app/services/userservices";
import moment from "moment";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});


const ReportAttendance = () => {


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

  const startDate = moment(date).startOf("month").format("YYYY-MM-DD");

  const endDate = moment(date).endOf("month").format("YYYY-MM-DD");

  const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");

  console.log("startDate", startDate);

  console.log("endDate", endDate);

  const monthDates = moment(endDate).diff(moment(startDate), "days");

  console.log("monthDates", monthDates);

  const AcutalDays = monthDates + 1;

  console.log("AcutalDays:", AcutalDays);

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }


  const dates = getDates(new Date(startDate), new Date(endDate));
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
      name: "AccountNumber",
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
      name: "salary",
      label: "Salary",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Total_Present_Days",
      label: "Total Present Days",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Total_Absent_Days",
      label: "Total Abesent Days",
      options: { filterOptions: { fullWidth: true } },
    },

    {
      name: "totalSalaryPayable",
      label: "Total Salary Payable",
      options: { filterOptions: { fullWidth: true } },
    },
  ];

  for (let i = 0; i < AcutalDays; i++) {
    const date = moment(startDate)
      .date(i + 1)
      .format("YYYY-MM-DD");
    const ddate = moment(startDate)
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

  const liwBranch = cDetails?.data?.data.companyBranch ?? [];
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);
  const attendance = useQuery(
    ["Attendance", { branchId, startDate, endDate }],
    async () => userServices.attendance(branchId, startDate, endDate)
  );

  const liwAttendance = attendance?.data?.data ?? [];
  console.log("this is....liwAttendance", liwAttendance);


  const groupByUserId = liwAttendance.reduce(function (a, e) {
    let estKey = e["userId"];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  console.log("groupByUserId", groupByUserId)

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
    } = item[0];

    console.log("item[0]?.BankDetails?.AccountNumber:-------->>>>>>", item[0]?.BankDetails?.AccountNumber)


    const salary = item[0].userSalary;
    const salaryPerDay = salary / AcutalDays;
    const totalSalaryPayable = salaryPerDay * item.length;
    const userPANNumber = item[0].userPanNumber;
    const userAccountNumber = item[0]?.BankDetails?.AccountNumber;
    const userIFSC = item[0]?.BankDetails?.ifscCode;
    const userUPI = item[0]?.BankDetails?.upiId;

    const data = {
      Name: userName,
      Role: userRole,
      MobileNo: userMobile,
      PANNumber: userPANNumber,
      AccountNumber: userAccountNumber,
      ifscCode: userIFSC,
      upiId: userUPI,
      salary: salary,
      Total_Present_Days: item.length,
      Total_Absent_Days: (AcutalDays - item.length),
      totalSalaryPayable: totalSalaryPayable,
    };
    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(startDate)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const present = item.find((e) => e.date === date);
      data[bdate] = present ? "P" : "A";
    }
    console.log("item", item);
    console.log("data", data);
    return data;
  });
  console.log("AttendaceData123:--->>>>>>>>>>>", AttendaceData);

  return (
    <>
      <React.Fragment>
        <Typography variant="h1" mb={3}></Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Typography component={"h2"} variant="h1" mb={3}>
                Attendance Report
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
                title={"Attendance Report"}
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

export default ReportAttendance;
