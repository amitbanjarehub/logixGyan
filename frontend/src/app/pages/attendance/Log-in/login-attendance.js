import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Card,
  CardContent,
  Grid,
  IconButton, Snackbar,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import { attendanceService } from "app/services/attendanceServices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import Resizer from "react-image-file-resizer";
import { useMutation } from "react-query";
import * as yup from "yup";

let resetFormFunc = null;

const validationSchema = yup.object({

  vehicleNo: yup
    .string("Please Enter your Vehicles Number Reading")
    .required("Please Enter your Vehicles Number Reading"),
  meterStartNumber: yup
    .string("Please Enter your Vehicles Milometer Reading")
    .required("Please Enter your Vehicles Milometer Reading"),

});

const Login_attendance = () => {

  const aCheckInMutation = useMutation(attendanceService.checkIn, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setOpen(true);
      if (data.status === 200) {
        setSeverity("success");
        setMsg(data.message);
        resetFormFunc();
      } else {
        setSeverity("error");
        setMsg(data.message);
      }
    },
  });


  const onAdd = (lat, long, checkInselfie, meterStart, meterStartNumber, vehicleNo) => {
    aCheckInMutation.mutate({
      lat,
      long,
      checkInselfie,
      meterStart,
      meterStartNumber,
      vehicleNo,
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  console.log("lat", latitude);
  console.log("long", longitude);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },

    input: {
      display: "none",
    },
  }));

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const [source, setSource] = useState("");
  const [source1, setSource1] = useState("");

  const handleCapture = async (target, name, setMethod) => {
    console.log(name);
    if (target.files) {
      if (target.files.length !== 0) {
        try {
          const file = target.files[0];
          const image = await resizeFile(file);
          console.log("image", image);
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);

            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
          }


          const file1 = dataURLtoFile(image, name ?? "hello.jpeg");
          console.log("file1", file1);
          setMethod(file1);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Attendance
            </Typography>

            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                lat: "",
                long: "",
                checkInselfie: "",
                meterStart: "",
                meterStartNumber: "",
                vehicleNo: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);

                await onAdd(
                  data.lat = latitude,
                  data.long = longitude,
                  data.checkInselfie = source,
                  data.meterStart = source1,
                  data.meterStartNumber,
                  data.vehicleNo,
                );

                console.log("submittingWWE", data);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                  <Box
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
                  >
                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        {!isGeolocationAvailable ? (
                          <div>Your browser does not support Geolocation</div>
                        ) : !isGeolocationEnabled ? (
                          <div>Geolocation is not enabled</div>
                        ) : coords ? (
                          setLatitude(coords.latitude) ||
                          setLongitude(coords.longitude) || (
                            <JumboDemoCard
                              title={"In time Selfie"}
                              wrapperSx={{
                                backgroundColor: "background.paper",
                                pt: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  "& > :not(style)": { m: 1, width: "24ch" },
                                }}
                              >
                                <Div className={classes.root}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <input
                                        name="checkInselfie"
                                        accept="image/*"
                                        className={classes.input}
                                        id="icon-button-file"
                                        type="file"
                                        capture="environment"
                                        onChange={(e) => {
                                          handleCapture(
                                            e.target,
                                            "checkInselfie",
                                            setSource
                                          );
                                          setFieldValue(
                                            "checkInselfie",
                                            source
                                          );
                                        }}
                                      />

                                      <label htmlFor="icon-button-file">
                                        <IconButton
                                          color="primary"
                                          aria-label="upload picture"
                                          component="span"
                                        >
                                          <PhotoCameraRoundedIcon
                                            fontSize="large"
                                            color="primary"
                                          />
                                        </IconButton>
                                      </label>

                                    </Grid>
                                  </Grid>
                                </Div>
                              </Box>
                            </JumboDemoCard>
                          )
                        ) : (
                          <div>Getting the location data&hellip; </div>
                        )}
                      </Div>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboDemoCard
                          title={"Add Milometer Reading image"}
                          wrapperSx={{
                            backgroundColor: "background.paper",
                            pt: 0,
                          }}
                        >
                          <Box
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                          >
                            <Div className={classes.root}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <input
                                    name="meterStart"
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-file1"
                                    type="file"
                                    capture="environment"
                                    onChange={(e) => {
                                      handleCapture(
                                        e.target,
                                        "meterStart",
                                        setSource1
                                      );
                                      setFieldValue("meterStart", source1);
                                    }}
                                  />

                                  <label htmlFor="icon-button-file1">
                                    <IconButton
                                      color="primary"
                                      aria-label="upload picture"
                                      component="span"
                                    >
                                      <PhotoCameraRoundedIcon
                                        fontSize="large"
                                        color="primary"
                                      />
                                    </IconButton>
                                  </label>

                                </Grid>
                              </Grid>
                            </Div>
                          </Box>
                        </JumboDemoCard>
                      </Div>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        required
                        id="meterStartNumber"
                        name="meterStartNumber"
                        type="number"
                        label="Add Milometer Reading"

                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        required
                        id="vehicleNo"
                        name="vehicleNo"
                        type="text"
                        label="Vehicle No"

                      />
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || aCheckInMutation.isLoading}

                      >
                        Check In
                      </LoadingButton>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Alert
                          variant="filled"
                          onClose={handleClose}
                          severity={severity}
                          sx={{ width: "100%" }}
                        >
                          {msg}
                        </Alert>
                      </Snackbar>
                    </Div>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Div>
      </Card>
    </React.Fragment>
  );
};

export default Login_attendance;
