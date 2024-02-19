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


const VehicleReport = () => {


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

    const [Display, setDisplay] = useState();

    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const handleMonthChange = (event) => {
        setMonth(moment(event.target.value).format("MM"));
        setYear(moment(event.target.value).format("YYYY"));
    };

    const date = moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD");

    const startDate = moment(date).startOf("month").format("YYYY-MM-DD");

    const endDate = moment(date).endOf("month").format("YYYY-MM-DD");

    const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");

    const monthDates = moment(endDate).diff(moment(startDate), "days");

    const AcutalDays = monthDates + 1;


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
            name: "Date",
            label: "Date",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "VehicleNo",
            label: "VehicleNo",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "DeliveryBoy",
            label: "DeliveryBoy",
            options: { filterOptions: { fullWidth: true } },
        },

        {
            name: "CheckinTime",
            label: "CheckinTime",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "CheckoutTime",
            label: "CheckoutTime",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "MeterStart",
            label: "MeterStart",
            options: { filterOptions: { fullWidth: true } },
        },

        {
            name: "MeterEnd",
            label: "MeterEnd",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "MeterReading",
            label: "MeterReading",
            options: { filterOptions: { fullWidth: true } },
        },

    ];



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
        ["Attendance", { branchId, startDate, endDate }],
        async () => userServices.attendance(branchId, startDate, endDate)
    );

    const liwAttendance = attendance?.data?.data ?? [];
    console.log("this is....liwAttendance------->>>", liwAttendance);


    const groupByUserId = liwAttendance.reduce(function (a, e) {
        let estKey = e[null];

        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
        return a;
    }, {});



    const [userId, setUserId] = useState();

    const userDetails = useQuery(["Attendance", { userId }], async () =>
        userServices.details(userId)
    );
    let vehicalAllowance = [];
    const AttendaceData = Object.values(groupByUserId).map((item) => {

        console.log("Item:--------->>>", item);

        for (let i = 0; i < item.length; i++) {
            const userName = item[i].userName;
            const VehicleNo = item[i].vehicleNo;
            const Date1 = item[i].date;
            const CheckinTime = item[i].checkInTime;
            const CheckoutTime = item[i].checkOutTime;
            const MeterStartNo = item[i].meterStartNumber;
            const MeterEndNo = item[i].meterEndNumber;
            const MeterReading = (MeterEndNo - MeterStartNo);
            console.log("VehicleNo:-------->>>", VehicleNo);



            const data = {
                Date: Date1,
                VehicleNo: VehicleNo,
                DeliveryBoy: userName,
                CheckinTime: CheckinTime,
                CheckoutTime: CheckoutTime,
                MeterStart: MeterStartNo,
                MeterEnd: MeterEndNo,
                MeterReading: MeterReading,

            }

            vehicalAllowance[i] = data;
        }

        console.log("vehicalAllowance:----------->>>", vehicalAllowance);

        return vehicalAllowance;
    });
    console.log("AttendaceData_8_May:--->>>>>>>>>>>", AttendaceData[0]);

    return (
        <>
            <React.Fragment>
                <Typography variant="h1" mb={3}></Typography>
                <Card sx={{ display: "flex", mb: 3.5 }}>
                    <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                        <CardContent>
                            <Typography component={"h2"} variant="h1" mb={3}>
                                Vehicle Report
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
                                title={"Vehicle Report"}
                                data={AttendaceData[0]}
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

export default VehicleReport;
