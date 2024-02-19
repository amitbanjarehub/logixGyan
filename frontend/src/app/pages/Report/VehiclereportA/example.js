import React from "react";
import {
    Card,
    CardContent,
    TextField,
    Typography,
    InputLabel,
    Select,
    Dialog,
    DialogContent,
    Avatar,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import Button from "@mui/material/Button";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useQuery } from "react-query";
import { companyServices } from "app/services/companyservices";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import createCache from "@emotion/cache";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import { userServices } from "app/services/userservices";
import { useMutation } from "react-query";
import { position } from "stylis";
import { attendanceService } from "app/services/attendanceServices";

const validationSchema = yup.object({});

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});

const vehicleReport = () => {

    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);



    const comphandleChange = (event) => {
        setId(event.target.value);
        console.log("result of handleChange: ", event);
    };

    const [cId, setId] = useState();
    // console.log("cId", cId);


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
        // tableBodyWidth,
        // tableBodyMaxWidth,

        onTableChange: (action, state) => {
            console.log(action);
            console.dir(state);
        },
    };

    const wComp = useQuery(["company-list"], companyServices.wList);

    // console.log("result of wComp: ", wComp);

    const liwComp = wComp?.data?.data ?? [];

    const bhandleChange = (e) => {
        setbId(e.target.value);
        // console.log("result of handleChange: ", e);
    };
    const [branchId, setbId] = useState();
    console.log("branchId:>>>>>>>", branchId)

    const cDetails = useQuery(["companyDetails", { cId }], async () =>
        companyServices.details(cId)
    );
    const liwBranch = cDetails?.data?.data.companyBranch ?? [];




    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    console.log("month>>>>>>>>>>>", month);
    console.log("year>>>>>>>>>>>>>>>", year);
    const handleDateChange = (event) => {
        setMonth(moment(event.target.value).format("MM"));
        setYear(moment(event.target.value).format("YYYY"));
    };


    const date = moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD");
    const FirstDay = moment(date).startOf("month").format("YYYY-MM-DD");

    const LastDay = moment(date).endOf("month").format("YYYY-MM-DD");

    const monthDates = moment(LastDay).diff(moment(FirstDay), "days");

    console.log("FirstDay:>>>>>>>", FirstDay)
    console.log("LastDay:>>>>>>>>", LastDay)

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


    const columns = [
        {
            name: "SNo",
            label: "SNo.",
            // options: { filterOptions: { fullWidth: true } },
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex) + 1;
                    return <span>{rowIndex}</span>;
                },
            },
        },
        {
            name: "date",
            label: "date",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "vehicleNo",
            label: "vehicleNo",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "deliveryBoy",
            label: "deliveryBoy",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "checkInTime",
            label: "checkInTime",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "checkOutTime",
            label: "checkOutTime",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "meterStart",
            label: "meterStart",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: "meterEnd",
            label: "meterEnd",
            options: { filterOptions: { fullWidth: true } },
        },

        {
            name: "totalMeterReading",
            label: "totalMeterReading",
            options: { filterOptions: { fullWidth: true } },
        },

    ];


    const dates = getDates(new Date(FirstDay), new Date(LastDay));
    dates.forEach(function (date) {

    });

    const uDetails = useQuery(["companyDetails", {}], async () =>
        userServices.details()
    );

    const vUserList = useQuery(["UserList", { branchId }], async () =>
        userServices.vblist(branchId)
    );
    const liUserList = vUserList?.data?.data ?? [];

    // console.log("result of liUserList: ", liUserList);

    const [userId, setUserId] = useState();
    const handleUserChange = (event) => {
        setUserId(event.target.value);
        // console.log("result of handleChange: ", event);
    };
    const VehicleData = useQuery(["vehicle data", { branchId, FirstDay, LastDay }], () => attendanceService.vlist(branchId, FirstDay, LastDay));
    console.log("VehicleData:----->>>", VehicleData);

    const VehicalData123 = VehicleData?.data?.data ?? [];
    console.log("VehicalData321:----->>>", VehicalData);

    const groupByUserId = VehicalData123.reduce(function (a, e) {
        let estKey = e["userId"];

        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
        return a;
    }, {});

    // const AttendaceData = Object.values(groupByUserId).map((item) => {
    //     const {
    //         userName,
    //         userRole,
    //         userMobile,
    //     } = item[0];



    //     const data = {
    //         date: date,
    //         vehicleNo: vehicleNo,
    //         MobileNo: userMobile,
    //         PANNumber: userPANNumber,
    //         AccountNumberr: userAccountNumber,
    //         ifscCode: userIFSC,
    //         upiId: userUPI,
    //         salary: salary,
    //         Total_Present_Days: item.length,
    //         Total_Absent_Days: (AcutalDays - item.length),
    //         totalSalaryPayable: totalSalaryPayable,
    //     };
    //     for (let i = 0; i < AcutalDays; i++) {
    //         const date = moment(startDate)
    //             .date(i + 1)
    //             .format("YYYY-MM-DD");
    //         const bdate = moment(date).format("DD");
    //         const present = item.find((e) => e.date === date);
    //         data[bdate] = present ? "P" : "A";
    //     }
    //     console.log("item", item);
    //     console.log("data", data);
    //     return data;
    // });
    // console.log("AttendaceData123:", AttendaceData);



    return (
        <React.Fragment>
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
                                            id="date"
                                            label="Select Date"
                                            type="month"
                                            // defaultValue={moment().format("YYYY-MM-DD")}
                                            onChange={handleDateChange}
                                            sx={{ width: 220 }}
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
                            // data={wComp?.data?.data ?? []}
                            data={VehicalData}
                            columns={columns}
                            options={options}
                        />
                    )}
                </CacheProvider>
            </Div>
        </React.Fragment>
    );
};

export default vehicleReport;
