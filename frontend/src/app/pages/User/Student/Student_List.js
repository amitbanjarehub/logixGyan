// import React from 'react'

// const Student_List = () => {
//   return (
//     <div>
//       <h1>Student List</h1>
//     </div>
//   )
// }

// export default Student_List



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
import { Stack } from "@mui/system";
import { companyServices } from "app/services/companyservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { branchServices } from "app/services/branchservices";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import WarningIcon from "@mui/icons-material/Warning";
import Edit_Student from "./Edit_Student";

const Student_List = () => {
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
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 200,
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 200,
    },
    {
      field: "language",
      headerName: "Language",
      width: 200,
    },
    {
      field: "profile_image",
      headerName: "Profile Image",
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
      name: 'Name_1',
      email: 'Email_1',
      mobile: 'Mobile_1',
      gender: 'Gender_1', 
      dob: 'Dob_1',
      language: 'Language_1',
      profile_image: 'profile_image_1',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Name_2',
      email: 'Email_2',
      mobile: 'Mobile_2',
      gender: 'Gender_2', 
      dob: 'Dob_2',
      language: 'Language_2',
      profile_image: 'profile_image_2',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Name_3',
      email: 'Email_3',
      mobile: 'Mobile_3',
      gender: 'Gender_3', 
      dob: 'Dob_3',
      language: 'Language_3',
      profile_image: 'profile_image_3',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Name_4',
      email: 'Email_4',
      mobile: 'Mobile_4',
      gender: 'Gender_4', 
      dob: 'Dob_4',
      language: 'Language_4',
      profile_image: 'profile_image_4',
      status: 'Active'
    },
    {
      id: '5',
      name: 'Name_5',
      email: 'Email_5',
      mobile: 'Mobile_5',
      gender: 'Gender_5', 
      dob: 'Dob_5',
      language: 'Language_5',
      profile_image: 'profile_image_5',
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
              Student List
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
          <Edit_Student
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

export default Student_List;



