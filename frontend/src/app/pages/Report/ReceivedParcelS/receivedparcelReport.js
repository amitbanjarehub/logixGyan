import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useMutation, useQuery } from "react-query";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./received.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from "mui-datatables";
import { companyServices } from "app/services/companyservices";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});


const arrayA = [];

const ReportReceivedParcel = () => {


  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const { authUser } = useAuth();
  const branchId = authUser?.branchId;
  console.log("branchId123:", branchId);

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
      name: "TotalReceivedParcel",
      label: "Total Received Parcel",
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

  const receivedParcel = useQuery(
    ["ReceivedParcel", { branchId, FirstDay, LastDay }],
    async () => parcelServices.receivedParcel(branchId, FirstDay, LastDay)
  );

  const liwParcel = receivedParcel?.data?.data ?? [];
  console.log("liwAttendance", liwParcel);

  const groupByUserId = liwParcel.reduce(function (a, e) {
    let estKey = e["userId"];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const [userId, setUserId] = useState();
  console.log("userId", userId);

  const ReceivedParcelData = Object.values(groupByUserId).map((item) => {
    const {
      userName,
      userMobile,
    } = item[0];

    let attendance = 0;

    for (let i = 0; i < item.length; i++) {
      attendance += Number(item[i]?.noOfParcel ?? 0);

    }

    console.log("item.length: ", item.length)
    for (let i = 0; i < item.length; i++) {
      console.log("check321:", item[i]);

    }

    console.log("List12:", item);

    const data = {
      Name: userName,
      MobileNo: userMobile,
      TotalReceivedParcel: attendance,
    };

    console.log("data12:", data);

    for (let i = 0; i < AcutalDays; i++) { // 18
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberAlloted = item.filter((e) => e.date === date); // 18 === 18 [1,2,3]
      let parcelAllotData = 0;
      if (numberAlloted?.length) {
        for (let j = 0; j < numberAlloted?.length; j++) { // [1,2,3] => sum
          parcelAllotData += numberAlloted[j]?.noOfParcel
        }
      }


      data[bdate] = numberAlloted ? parcelAllotData : 0;

    }
    console.log("NUMBER OF ALLOTED PARCEL", data)




    return data;
  });
  console.log("ReceivedParcelData444:", ReceivedParcelData);



  return (
    <>
      <React.Fragment>
        <Typography variant="h1" mb={3}></Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Typography component={"h2"} variant="h1" mb={3}>
                Received Parcel Report
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
        <Div>
          <CacheProvider value={muiCache}>
            {receivedParcel.isLoading ? (
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
                title={"Received Parcel Report"}
                data={ReceivedParcelData}
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

export default ReportReceivedParcel;
