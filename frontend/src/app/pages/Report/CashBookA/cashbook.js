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
import "./cashbook.css";
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
import { cashDepositServices } from "app/services/cashDepositServices";
import { parcelServices } from "app/services/parcelServices";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});


const CashBook = () => {


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
      name: "totalCash",
      label: "Total Cash(Y)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cashDeposite",
      label: "Cash Deposited in Bank(Y)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cashInHand",
      label: "Cash inHand(Y)",
      options: { filterOptions: { fullWidth: true } },
    },

    {
      name: "TotalMonthwiseCash",
      label: "Total Cash(M)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cashDepositeM",
      label: "Cash Deposited in Bank(M)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cashInHandM",
      label: "Cash inHand(M)",
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

  const liwComp = wComp?.data?.data ?? [];
  const comphandleChange = (event) => {
    setId(event.target.value);

  };

  const bhandleChange = (e) => {
    setbId(e.target.value);

  };

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  const liwBranch = cDetails?.data?.data.companyBranch ?? [];

  const attendance = useQuery(
    ["cashDeposite", { branchId, FirstDay, LastDay }],
    async () => cashDepositServices.list(branchId, FirstDay, LastDay)
  );

  const liwAttendance = attendance?.data?.data ?? [];
  const liwCash = attendance?.data ?? [];
  console.log("cashBookData", liwCash);

  const groupByUserId = liwAttendance.reduce(function (a, e) {
    let estKey = e["userId"];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const [userId, setUserId] = useState();

  const userDetails = useQuery(["Attendance", { userId }], async () =>
    userServices.details(userId)
  );

  const AttendaceData = Object.values(groupByUserId).map((item) => {

    console.log("item:=======>>>", item)
    const {
      userId,
      userRole,
      userPAN,
      userAccountNumber,
      userIFSC,
      userUPI,
      totalCash,
      cashDeposite,
      cashInHand,


    } = item[0];


    let totalCash1 = 0;
    let bankDeposit = 0;
    let cashInHand1 = 0;

    for (let i = 0; i < item.length; i++) {
      bankDeposit += Number(item[i]?.bankDeposit ?? 0);

    }

    console.log("bankDeposit:======>>>>", bankDeposit)

    for (let i = 0; i < item.length; i++) {
      totalCash1 += Number(item[i]?.cash ?? 0);

    }

    console.log("totalCash1:======>>>>", totalCash1)
    cashInHand1 = totalCash1 - bankDeposit;
    const data = {

      totalCash: liwCash.totalCash,
      cashDeposite: liwCash.totalDeposit,
      cashInHand: liwCash.cashInHand,
      TotalMonthwiseCash: totalCash1,
      cashDepositeM: bankDeposit,
      cashInHandM: cashInHand1,
    };
    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted = item.filter((e) => e.date === date);
      let cashdepositeData = 0;
      if (numberAlloted?.length) {
        for (let j = 0; j < numberAlloted?.length; j++) {
          cashdepositeData += numberAlloted[j]?.cash;
        }
      }
      data[bdate] = numberAlloted ? cashdepositeData : 0;

    }

    return data;
  });


  return (
    <>
      <React.Fragment>
        <Typography variant="h1" mb={3}></Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Typography component={"h2"} variant="h1" mb={3}>
                Cashbook Report
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
                title={"Cashbook Report"}
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

export default CashBook;
