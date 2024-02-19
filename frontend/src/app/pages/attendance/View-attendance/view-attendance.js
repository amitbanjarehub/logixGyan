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
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import { userServices } from "app/services/userservices";
import { useMutation } from "react-query";
import { position } from "stylis";
import { attendanceService } from "app/services/attendanceServices";

const validationSchema = yup.object({});

const View_attendance = () => {
  const comphandleChange = (event) => {
    setId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const [cId, setId] = useState();


  const wComp = useQuery(["company-list"], companyServices.wList);


  const liwComp = wComp?.data?.data ?? [];

  const bhandleChange = (e) => {
    setbId(e.target.value);
  };
  const [branchId, setbId] = useState();

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );
  const liwBranch = cDetails?.data?.data.companyBranch ?? [];

  const [date, setDate] = useState();


  const handleDateChange = (event) => {
    setDate(moment(event.target.value).format("YYYY-MM-DD"));
  };

  const uDetails = useQuery(["companyDetails", {}], async () =>
    userServices.details()
  );

  const vUserList = useQuery(["UserList", { branchId }], async () =>
    userServices.vblist(branchId)
  );
  const liUserList = vUserList?.data?.data ?? [];


  const [userId, setUserId] = useState();
  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  const viewAttendance = useQuery(["User Attendance", { userId, date }], () =>
    attendanceService.list(userId, date)
  );
  const uAttendance = viewAttendance?.data?.data ?? [];

  const userAttendance = uAttendance[0];

  console.log("image", SERVER_IMAGE_PATH + userAttendance?.checkInselfie);


  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              View Attendance
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
                  <InputLabel>Select User</InputLabel>
                  <Select
                    name="userId"
                    onChange={handleUserChange}
                    value={userId}
                  >
                    {liUserList?.map((user) => (
                      <MenuItem id={user.id} value={user.id} key={user.id}>
                        {user.name}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="MuiFormControl-fluid">
                  <Stack component="form" noValidate spacing={3}>
                    <TextField
                      id="date"
                      label="Select Date"
                      type="date"
                      defaultValue={moment().format("YYYY-MM-DD")}
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
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                mx: -1,

                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                  p: 1,
                  mb: 2,
                  width: { xs: "100%", sm: "50%" },
                },

                "& .MuiFormControl-root.MuiFormControl-fluid": {
                  width: "100%",
                },
              }}
              autoComplete="off"
            >
              <Typography component={"h2"} variant="h1" mb={3}>
                Attendance
              </Typography>

              <FormControl className="MuiFormControl-fluid">
                {viewAttendance.isLoading ? (
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
                  <Div sx={{ mt: 1, mb: 2 }}>
                    <JumboDemoCard
                      title={"Check In Time"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <TextField
                        name="InTime"
                        label="In Time"
                        variant="outlined"
                        defaultValue={userAttendance?.checkInTime}
                        InputProps={{ readOnly: true }}
                      />
                    </JumboDemoCard>
                    <br />

                    <JumboDemoCard
                      title={"Check In Milometer Reading"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <TextField
                        name="InTimeMilometerReading"
                        label="In Time Milometer Reading"
                        variant="outlined"
                        defaultValue={userAttendance?.meterStartNumber}
                        InputProps={{ readOnly: true }}
                      />
                    </JumboDemoCard>
                    <br />

                    <JumboDemoCard
                      title={"In Time Selfie"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <img
                        src={SERVER_IMAGE_PATH + userAttendance?.checkInselfie}
                        height="150px"
                        width="150px"
                      />
                    </JumboDemoCard>
                    <br />
                    <JumboDemoCard
                      title={" In time Milometer Reading Image"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <img
                        src={SERVER_IMAGE_PATH + userAttendance?.meterStart}
                        height="150px"
                        width="150px"
                        className="raj"
                      />
                    </JumboDemoCard>
                    <br />
                    <JumboDemoCard
                      title={"Check Out Time"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <TextField
                        name="InTime"
                        label="Out Time"
                        variant="outlined"
                        defaultValue={userAttendance?.checkOutTime}
                        InputProps={{ readOnly: true }}
                      />
                    </JumboDemoCard>
                    <br />

                    <JumboDemoCard
                      title={"Check Out Milometer Reading"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <TextField
                        name="OutTimeMilometerReading"
                        label="Out Time Milometer Reading"
                        variant="outlined"
                        defaultValue={userAttendance?.meterEndNumber}
                        InputProps={{ readOnly: true }}
                      />
                    </JumboDemoCard>
                    <br />


                    <JumboDemoCard
                      title={"Out Time Selfie"}
                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <img
                        src={SERVER_IMAGE_PATH + userAttendance?.checkOutselfie}
                        height="150px"
                        width="150px"
                      />

                      {console.log(
                        "check user Selfie: ",
                        userAttendance?.checkInselfie
                      )}
                    </JumboDemoCard>
                    <br />


                    <JumboDemoCard
                      title={" Out time Milometer Reading Image"}

                      wrapperSx={{
                        backgroundColor: "background.paper",
                        pt: 0,
                      }}
                    >
                      <img
                        src={SERVER_IMAGE_PATH + userAttendance?.meterEnd}
                        height="150px"
                        width="150px"
                      />
                    </JumboDemoCard>
                  </Div>
                )}
              </FormControl>
            </Box>
          </CardContent>
        </Div>
      </Card>
    </React.Fragment>
  );
};

export default View_attendance;
