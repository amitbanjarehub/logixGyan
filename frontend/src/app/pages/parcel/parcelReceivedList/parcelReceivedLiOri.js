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
import ParcelReceivedEdit from "./parcelReceivedEdit";
// import useAuth from "@jumbo/hooks/useJumboAuth";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import useAuth from "@jumbo/hooks/useJumboAuth";

const ParcelReceivedList = () => {

  const User = useAuth();
  const authUser1 = User?.authUser ?? [];
  const branchId1 = authUser1?.branchId;
  // console.log("authUser_30March1234:",User)
  // console.log("branchId_Manager1234:", branchId1);




  const { authUser } = useAuth();

  // console.log("authUser.branchId2002", authUser?.branchId)
  // console.log("authuser_30_March", authUser);
  // console.log("authuser_322_March", authUser?.role);

  const [cId, setcId] = useState();
  // console.log("cId_30_March", cId);

  const [branchId, setbId] = useState();
  // console.log("branch_Id_30_March_line_no_47:", branchId);
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
          // console.log("thisRowId: ", thisRowId);
          setId(params.row.id);

          // console.log("setRowId: ", setId);

        };
        return <EditIcon onClick={onClick} />;
      },
    },
  ];

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // const query = useQuery(['companyList', {page}], () => companyServices.list(page), {
  //   useCursorPagination: false,
  //
  //
  // });
  // console.log("result of query: ",query)

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  // console.log("branchId_30_March: ", branchId);

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const query = useQuery(["receivedparcelList", { date, branchId }], () =>
    parcelServices.rlist(date, branchId)
  );

  // console.log("receivedparcelList:",query );

  const fdata = query?.data?.data ?? [];

  const totalrows = query.data?.count;
  // const compData =query?.data?.data ?? [];nlmv.  s;m;
  // mko oo ojdu90  lojlp lm
  // console.log("result of compData: ",compData)

  const [rowCountState, setRowCountState] = React.useState(totalrows || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalrows !== undefined ? totalrows : prevRowCountState
    );
  }, [totalrows, setRowCountState]);

  // console.log("result of rowCountState: ", rowCountState);
  // console.log("result of compData: ",compData?.count)

  const [pId, setId] = React.useState();

  console.log("result of pId: ", pId);

  // const handleRowClick = (e) => {
  //   // console.log("clicked")
  //   setId(e.row.id);
  // }

  // console.log("e.row.id: ",e.row.id)
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

  // console.log("result of wComp: ", wComp);

  const liwComp = wComp?.data?.data ?? [];

  const comphandleChange = (event) => {
    setcId(event.target.value);
    // console.log("result of handleChange: ", event);
  };

  const bhandleChange = (e) => {
    setbId(e.target.value);
    // console.log("result of handleChange: ", e);
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

  if (!authUser) return null;

  return (
    <React.Fragment>
      {authUser.role === "admin" ? (
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
      ) : (

        // setbId(authUser?.branchId)
        console.log("branchId1_4444", branchId1)
        // setbId(branchId1.isLoading ) 
      )}

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

export default ParcelReceivedList;
