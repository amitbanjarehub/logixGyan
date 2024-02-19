import Div from "@jumbo/shared/Div";
import EditIcon from "@mui/icons-material/Edit";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import useAuth from "@jumbo/hooks/useJumboAuth";
import CashDepositEdit from "./CashDepositEdit";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { branchServices } from "app/services/branchservices";
import { cashDepositServices } from "app/services/cashDepositServices";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";

const CashdepositList = () => {
    const { authUser } = useAuth();

    const [cId, setcId] = useState();

    const [branchId, setbId] = useState();

    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const [open, setOpen] = useState(false);
    const [image, setImage] = React.useState();
    const [open1, setOpen1] = useState(false);
    const [image1, setImage1] = React.useState();
    const [open2, setOpen2] = useState(false);
    const [image2, setImage2] = React.useState();


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

    const parcelColumns = [
        {
            field: "date",
            headerName: "Date",
            width: 150,
        },
        {
            field: "bankDeposit",
            headerName: "BankDeposit",
            width: 200,
        },
        {
            field: "cmsboyImage",
            headerName: "CMS Boy Image",
            sortable: false,
            width: 150,

            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const thisRow = e.target.closest(".MuiDataGrid-row");
                    const thisRowId = thisRow.getAttribute("data-rowid");
                    // console.log("thisRowId: ", thisRowId);
                    setImage2(params.row.cmsboyImage);
                    setOpen2(true);

                };


                return <VisibilityIcon onClick={onClick} />;
            },
        },
        {
            field: "depositeSlipImage",
            headerName: "Deposite Slip Image",
            sortable: false,
            width: 150,

            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const thisRow = e.target.closest(".MuiDataGrid-row");
                    const thisRowId = thisRow.getAttribute("data-rowid");
                    // console.log("thisRowId: ", thisRowId);
                    setImage1(params.row.depositeSlipImage);
                    setOpen1(true);

                };


                return <VisibilityIcon onClick={onClick} />;
            },
        },
        {
            field: "supportDocImage",
            headerName: "Supported Document",
            sortable: false,
            width: 150,

            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const thisRow = e.target.closest(".MuiDataGrid-row");
                    const thisRowId = thisRow.getAttribute("data-rowid");
                    // console.log("thisRowId: ", thisRowId);
                    setImage(params.row.supportDocImage);
                    console.log("image111: ", params.row.supportDocImage);
                    setOpen(true);

                };


                return <VisibilityIcon onClick={onClick} />;
            },
        },


        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 100,

            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const thisRow = e.target.closest(".MuiDataGrid-row");
                    const thisRowId = thisRow.getAttribute("data-rowid");

                    setId(params.row.id);


                };
                return <EditIcon onClick={onClick} />;
            },
        },
    ];

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);




    const query = useQuery(["CashDepositList", { date, branchId }], () =>
        cashDepositServices.list(branchId, startDate, LastDay)
    );

    console.log("result of query:-------->>> ", query);

    const fdata = query?.data?.data ?? [];

    console.log("fdata----------->>>>", fdata);

    const totalrows = query.data?.count;

    const [rowCountState, setRowCountState] = React.useState(totalrows || 0);
    React.useEffect(() => {
        setRowCountState((prevRowCountState) =>
            totalrows !== undefined ? totalrows : prevRowCountState
        );
    }, [totalrows, setRowCountState]);



    const [cashId, setId] = React.useState();



    const handleDialogClose = React.useCallback(() => {
        setId(null);
    }, []);

    const ODD_OPACITY = 0.2;

    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                "@media (hover: none)": {
                    backgroundColor: "transparent",
                },
            },
            "&.Mui-selected": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity
                ),
                "&:hover, &.Mui-hovered": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity
                    ),
                    // Reset on touch devices, it doesn't add specificity
                    "@media (hover: none)": {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity
                        ),
                    },
                },
            },
        },
    }));
    const wComp = useQuery(["company-list"], companyServices.wList);



    const liwComp = wComp?.data?.data ?? [];
    const comphandleChange = (event) => {
        setcId(event.target.value);

    };

    const bhandleChange = (e) => {
        setbId(e.target.value);

    };

    const cDetails = useQuery(["companyDetails", { cId }], async () =>
        companyServices.details(cId)
    );

    const liwBranch = cDetails?.data?.data.companyBranch ?? [];
    const CustomLoadingOverlay = () => {
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress color="inherit" />
            </div>
        );
    };

    return (
        <React.Fragment>
            <Card sx={{ display: "flex", mb: 3.5 }}>
                <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <CardContent>
                        <Typography component={"h2"} variant="h1" mb={3}>
                            Cash Deposit List
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
                                <FormControl sx={{ minWidth: 80 }}>
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

                                <FormControl sx={{ minWidth: 80 }}>
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
                <Box sx={{ height: 675, width: "100%", backgroundColor: "White" }}>
                    <StripedDataGrid

                        rows={fdata}
                        columns={parcelColumns}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{
                            LoadingOverlay: CustomLoadingOverlay,
                            Toolbar: GridToolbar,
                        }}

                        loading={query.isLoading}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: "primary.light",
                            "& .MuiDataGrid-cell:hover": {
                                color: "primary.main",
                            },
                        }}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                        }
                    />
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <Div

                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: "auto",
                                width: "fit-content",
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <Avatar
                                    a
                                    alt="Remy Sharp"
                                    src={SERVER_IMAGE_PATH + image}
                                    sx={{ width: 500, height: 500 }}
                                />
                            </FormControl>
                        </Div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open1} onClose={() => setOpen1(false)}>
                    <DialogContent>
                        <Div

                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: "auto",
                                width: "fit-content",
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <Avatar
                                    a
                                    alt="Remy Sharp"
                                    src={SERVER_IMAGE_PATH + image1}
                                    sx={{ width: 500, height: 500 }}
                                />
                            </FormControl>
                        </Div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen1(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open2} onClose={() => setOpen2(false)}>
                    <DialogContent>
                        <Div

                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: "auto",
                                width: "fit-content",
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <Avatar
                                    a
                                    alt="Remy Sharp"
                                    src={SERVER_IMAGE_PATH + image2}
                                    sx={{ width: 500, height: 500 }}
                                />
                            </FormControl>
                        </Div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen2(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
                {cashId && (
                    <CashDepositEdit
                        cashId={cashId}
                        open={!!cashId}
                        onClose={handleDialogClose}
                    />
                )}
            </Div>
        </React.Fragment>
    );
};

export default CashdepositList;
