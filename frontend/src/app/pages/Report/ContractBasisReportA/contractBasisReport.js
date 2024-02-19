import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import {
  Card,
  CardContent,
  InputLabel,
  Select,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { companyServices } from "app/services/companyservices";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { useQuery } from "react-query";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});


const ContractBasisReport = () => {

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const [cId, setId] = useState();


  const [branchId, setbId] = useState();
  console.log("bId", branchId);

  const [Display, setDisplay] = useState();

  const [month, setMonth] = useState();
  const [year, setYear] = useState();



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
      name: "Name",
      label: "Name",
      options: { filterOptions: { fullWidth: true } },
    },

    {
      name: "MobileNo",
      label: "Mobile No.",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "AccountNumber",
      label: "Account Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "ifscCode",
      label: "Ifsc Code",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "upiId",
      label: "UPI Id",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "userPanNumber",
      label: "Pan Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "PerParcelCharge",
      label: "Per Parcel Charge",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "totalAmountPayble",
      label: "Total Amount Parcel",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "totalParcelDelivered",
      label: "Total Delivered Parcel",
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

  const DeliveredParcelData = useQuery(
    ["DeliveredParcelData", { branchId, FirstDay, LastDay }],
    async () => parcelServices.report(branchId, FirstDay, LastDay)
  );

  const liwDeliveredParcelData = DeliveredParcelData?.data?.data ?? [];
  console.log("liwDeliveredParcelData:--------------->>>>", liwDeliveredParcelData);

  const contractBasisDB = liwDeliveredParcelData?.filter((item) => item.userEmployementType === "contractBasis");
  console.log("contractBasisDB:----->>>", contractBasisDB)
  // const accountNo = 

  const groupByUserId = contractBasisDB.reduce(function (a, e) {
    let estKey = e["userId"];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});

  const [userId, setUserId] = useState();

  const AttendaceData = Object.values(groupByUserId).map((item) => {
    const {
      userName,
      userMobile,
      userSalary,
      userBankAccountNumber,
      AccountNumber,
      ifscCode,
      upiId,
      userPanNumber,

    } = item[0];




    let attendance = 0;

    for (let i = 0; i < item.length; i++) {
      attendance += Number(item[i]?.deliverdParcel ?? 0);
    }

    const totalPaybleAmount = attendance * item[0]?.userSalary;


    const data = {
      Name: userName,
      MobileNo: userMobile,
      PerParcelCharge: userSalary,
      totalAmountPayble: totalPaybleAmount,
      totalParcelDelivered: attendance,
      AccountNumber: userBankAccountNumber.AccountNumber,
      ifscCode: userBankAccountNumber.ifscCode,
      upiId: userBankAccountNumber.upiId,
      userPanNumber: userPanNumber,

    };


    for (let i = 0; i < AcutalDays; i++) {
      const date = moment(FirstDay)
        .date(i + 1)
        .format("YYYY-MM-DD");
      const bdate = moment(date).format("DD");
      const numberDelivered = item.filter((e) => e.date === date);
      let parcelDeliverdData = 0;
      if (numberDelivered?.length) {
        for (let j = 0; j < numberDelivered?.length; j++) {
          parcelDeliverdData += numberDelivered[j]?.deliverdParcel;
        }
      }

      data[bdate] = numberDelivered ? parcelDeliverdData : 0;

    }
    console.log("item", item);
    console.log("data", data);
    return data;
  });
  console.log("AttendaceData123:------->>>", AttendaceData);

  return (
    <>
      <React.Fragment>
        <Typography variant="h1" mb={3}></Typography>
        <Card sx={{ display: "flex", mb: 3.5 }}>
          <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent>
              <Typography component={"h2"} variant="h1" mb={3}>
                Contract Basis Report
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
                title={"Contract Basis Report"}
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

export default ContractBasisReport;
