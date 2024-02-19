import Div from "@jumbo/shared/Div";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { parcelServices } from "app/services/parcelServices";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ParcelReceivedEdit from "./parcelReceivedEditM";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import useAuth from "@jumbo/hooks/useJumboAuth";

const ParcelReceivedListM = () => {

    const User = useAuth();
    const authUser1 = User?.authUser ?? [];
    const branchId = authUser1?.branchId;
    console.log("branchId:", branchId)
    const { authUser } = useAuth();

    const parcelColumns = [
        {
            field: "noOfParcel",
            headerName: "Number of Received Parcel",
            width: 250,
        },
        { field: "ammount", headerName: "Amount of Received Parcel", width: 250 },
        { field: "remark", headerName: "Remark", width: 250 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 100,

            renderCell: (params) => {
                console.log("params.row.id", params.row.id)
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
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    console.log("date:", date)

    const dateChange = (e) => {
        setDate(e.target.value);
    };

    const query = useQuery(["receivedparcelList", { date, branchId }], () =>
        parcelServices.rlist(date, branchId)
    );

    console.log("query12:", query)

    const fdata = query?.data?.data ?? [];

    const totalrows = query.data?.count;


    const [rowCountState, setRowCountState] = React.useState(totalrows || 0);
    React.useEffect(() => {
        setRowCountState((prevRowCountState) =>
            totalrows !== undefined ? totalrows : prevRowCountState
        );
    }, [totalrows, setRowCountState]);



    const [pId, setId] = React.useState();


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

    if (!authUser) return null;

    return (
        <React.Fragment>

            <Card sx={{ display: "flex", mb: 3.5 }}>
                <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <CardContent>
                        <Typography component={"h2"} variant="h1" mb={3}>
                            Parcel Received List
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                mx: -1,

                                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                                    p: 1,
                                    mb: 2,
                                    width: { xs: "50%", sm: "50%" },
                                },

                                "& .MuiFormControl-root.MuiFormControl-fluid": {
                                    width: "100%",
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
                                            name="date"
                                            label="Date"
                                            type="date"
                                            value={date}
                                            onChange={dateChange}
                                            defaultValue={moment().format("YYYY-MM-DD")}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            style={{ position: "relative", left: "300px" }}
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
                {pId && (
                    <ParcelReceivedEdit
                        pId={pId}
                        open={!!pId}
                        onClose={handleDialogClose}
                    />
                )}
            </Div>
        </React.Fragment>
    );
};

export default ParcelReceivedListM;
