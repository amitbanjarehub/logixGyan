// import React from 'react'

// const State_List = () => {
//   return (
//     <div>
//       <h1>State_List</h1>
//     </div>
//   )
// }

// export default State_List


import Div from "@jumbo/shared/Div";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
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
  DialogTitle,
  FormControl,
  Grid,
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
// import ExpenseEdit from "./ExpenseEdit";
// import Edit_City from "./Edit_City";
import Edit_State from "./Edit_State";
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { branchServices } from "app/services/branchservices";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import WarningIcon from "@mui/icons-material/Warning";

const State_List = () => {
  const { authUser } = useAuth();

  const [cId, setcId] = useState();


  const [branchId, setbId] = useState();
  const [open, setOpen] = useState(false);
  const [image, setImage] = React.useState();

  // console.log("image", image);

  const handleDeleteAgree = () => {
    // userServices.delete(user.id);
    alert("Data Deleted ...!");
    setOpendelete(false);
    window.location.reload(false);
  };


  const parcelColumns = [
    
    {
      field: "state",
      headerName: "State",
      width: 200,
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
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

        // return <EditIcon onClick={onClick} />;
        return (
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


  const [opendelete, setOpendelete] = React.useState(false);

  console.log("opendelete:------>>", opendelete);

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

  console.log("fdata:------>>>", fdata);

  const fdata1 = [
    {
      id: '1',
      // city: 'Bhilai',
      state: 'Chhattisgarh',
      country: 'India',
      status: 'Active'
    },
    {
      id: '2',
      // city: 'Bastar',
      state: 'Chhattisgarh',
      country: 'India',
      status: 'Active'
    },
    {
      id: '3',
      // city: 'Kanker',
      state: 'Chhattisgarh',
      country: 'India',
      status: 'Active'
    },
    {
      id: '4',
      // city: 'Balod',
      state: 'Chhattisgarh',
      country: 'India',
      status: 'Active'
    },
    {
      id: '5',
      // city: 'Shriram Pur',
      state: 'Chhattisgarh',
      country: 'India',
      status: 'Active'
    }

  ];

  const totalrows = query.data?.count;

  const [rowCountState, setRowCountState] = React.useState(totalrows || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalrows !== undefined ? totalrows : prevRowCountState
    );
  }, [totalrows, setRowCountState]);



  const [pId, setId] = React.useState();
  const [pId1, setId1] = React.useState();
  console.log("pId: ----->>", pId);
  console.log("pId1: ----->>", pId1);


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
            <Typography component={"h2"} variant="h1" style={{textAlign: "center"}} mb={3}>
              State List
            </Typography>
            
          </CardContent>
        </Div>
      </Card>

      <Div>
        <Box sx={{ height: 675, width: "100%", backgroundColor: "White" }}>
          <StripedDataGrid

            // rows={fdata}
            rows={fdata1}
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
          <Edit_State
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

export default State_List;



