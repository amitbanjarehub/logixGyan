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
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import useAuth from "@jumbo/hooks/useJumboAuth";
import ExpenseEdit from "./ExpenseEdit";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { branchServices } from "app/services/branchservices";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from "@mui/icons-material/Warning";
import { userServices } from "app/services/userservices";
// import { branchServices } from "app/services/branchservices";

const ExpenseList = () => {
  const { authUser } = useAuth();

  const [cId, setcId] = useState();


  const [branchId, setbId] = useState();
  const [open, setOpen] = useState(false);
  const [image, setImage] = React.useState();


  const [opendelete, setOpendelete] = React.useState(false);
  const [pId1, setId1] = React.useState();
  console.log("delete_row_id: ------>>", pId1);

  console.log("image", image);

  const handleDeleteAgree = () => {
    branchServices.deleteExpense(pId1);
    // alert(pId1);
    setOpendelete(false);
    window.location.reload(false);
  };

  const parcelColumns = [
    {
      field: "particular",
      headerName: "Particular",
      width: 200,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "ammount",
      headerName: "Ammount",
      width: 150,
    },

    {
      field: "supportingDocument",
      headerName: "Supported Document",
      sortable: false,
      width: 100,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const thisRow = e.target.closest(".MuiDataGrid-row");
          const thisRowId = thisRow.getAttribute("data-rowid");

          setImage(params.row.supportingDocument);
          console.log("image111: ", params.row.supportingDocument);
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

        const onClick1 = (e) => {
          // e.stopPropagation(); // don't select this row after clicking
          // const thisRow = e.target.closest(".MuiDataGrid-row");
          // const thisRowId = thisRow.getAttribute("data-rowid");

          setId1(params.row.id);
         
          setOpendelete(true);


        };


        return(
          <>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <EditIcon onClick={onClick} />
            <DeleteIcon onClick={onClick1} />
          </div>
           
          </>
       
        );
      },
    },
  ];

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);


  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const query = useQuery(["ExpenseList", { date, branchId }], () =>
    branchServices.elist(date, branchId)
  );


  const fdata = query?.data?.data ?? [];

  console.log("fdata", fdata);

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
              Expense List
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
        {pId && (
          <ExpenseEdit
            pId={pId}
            open={!!pId}
            onClose={handleDialogClose}
          />
        )}
      </Div>

      <Div>
          <Dialog
            open={opendelete}
            onClose={() => setOpendelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <WarningIcon color="error" fontSize="large" />
              </Grid>
              {"Are you sure you want to Delete Data ?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpendelete(false)}>Disagree</Button>
              <Button color="error" onClick={handleDeleteAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Div>
    </React.Fragment>
  );
};

export default ExpenseList;
