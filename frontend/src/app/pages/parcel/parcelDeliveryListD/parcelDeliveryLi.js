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
import useAuth from "@jumbo/hooks/useJumboAuth";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";


const ParcelDeliveryLi = () => {

  const User = useAuth();
  const authUser1 = User?.authUser ?? [];
  const userId = authUser1?.id;
  console.log("User_Id", userId)
  const branchId = authUser1?.branchId;
  console.log("branchId:", branchId)
  const { authUser } = useAuth();
  const [cId, setcId] = useState();
  console.log("cId", cId);



  const parcelColumns = [
    {
      field: "userName",
      headerName: "Delivery Boy Name",
      width: 300,
    },
    {
      field: "noOfparcelAlloted",
      headerName: "Total No Parcel Allotted",
      width: 250,
    },
    {
      field: "totalAmountofParcelAlloted",
      headerName: "Alloted Parcel Amount",
      width: 250,
    },
    {
      field: "deliverdParcel",
      headerName: "Total No Parcel Delivered",
      width: 250,
    },
    {
      field: "totalOnlineAmmount",
      headerName: "Online Payment Received",
      width: 250,
    },
    {
      field: "rejectParcel",
      headerName: "Total No Rejected Parcel",
      width: 250,
    },
    {
      field: "rejectAmmount",
      headerName: "Rejected Parcel Amount",
      width: 250,
    },

    {
      field: "nextDayParcel",
      headerName: "Total No Parcel For Next Day",
      width: 250,
    },
    {
      field: "nextDayAmmount",
      headerName: "Amount Parcel For Next Day",
      width: 250,
    },
    {
      field: "totalCashAmmount",
      headerName: "Cash Received",
      width: 250,
    },

  ];

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);


  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));




  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const query = useQuery(["companyList", { userId, date }], () =>
    parcelServices.dlist(userId, date)
  );

  console.log("result_of_query", query);



  const fdata = query?.data?.data ?? [];

  console.log("fdata", fdata);


  const totalrows = query.data?.count;


  const [rowCountState, setRowCountState] = React.useState(totalrows || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalrows !== undefined ? totalrows : prevRowCountState
    );
  }, [totalrows, setRowCountState]);

  console.log("result of rowCountState: ", rowCountState);


  const [pId, setId] = React.useState();

  console.log("result of pId: ", pId);


  console.log("result of pId: ", pId);

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
              Parcel Delivery List
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
            // autoPageSize = {true}
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

      </Div>
    </React.Fragment>
  );
};

export default ParcelDeliveryLi;


