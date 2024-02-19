import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  Alert,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Resizer from "react-image-file-resizer";
import { cashDepositServices } from "app/services/cashDepositServices";
import { useGeolocated } from "react-geolocated";
let resetFormFunc = null;


const validationSchema = yup.object({

});

const CashDeposit = () => {
  const { authUser } = useAuth();

  const aCash_depMutation = useMutation(cashDepositServices.addCash, {
    onError(error) {
      console.log("mutation error", error);
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


  const onAdd = (
    bankDeposit,
    cmsboyImage,
    depositeSlipImage,
    supportDocImage,
    branchId,
  ) => {
    aCash_depMutation.mutate({
      bankDeposit,
      cmsboyImage,
      depositeSlipImage,
      supportDocImage,
      branchId,
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
  const [source2, setSource2] = useState("");

  const handleCapture = async (target, name, setMethod) => {
    console.log("name", name);
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

  const [input1, setInput1] = React.useState("");
  const [output1, setOutput1] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [output2, setOutput2] = React.useState("");
  const [input3, setInput3] = React.useState("");
  const [output3, setOutput3] = React.useState("");
  const [input4, setInput4] = React.useState("");
  const [output4, setOutput4] = React.useState("");
  const [input5, setInput5] = React.useState("");
  const [output5, setOutput5] = React.useState("");
  const [input6, setInput6] = React.useState("");
  const [output6, setOutput6] = React.useState("");
  const [input7, setInput7] = React.useState("");
  const [output7, setOutput7] = React.useState("");
  const [input8, setInput8] = React.useState("");

  const [output8, setOutput8] = React.useState("");
  const [input9, setInput9] = React.useState("");
  const [output9, setOutput9] = React.useState("");
  const [input10, setInput10] = React.useState("");
  const [output10, setOutput10] = React.useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(input1);
  console.log("Total Amount", totalAmount);
  useEffect(() => {
    setOutput1(input1 * 2000);
    setOutput2(input2 * 500);
    setOutput3(input3 * 200);
    setOutput4(input4 * 100);
    setOutput5(input5 * 50);
    setOutput6(input6 * 20);
    setOutput7(input7 * 10);
    setOutput8(input8 * 5);
    setOutput9(input9 * 2);
    setOutput10(input10 * 1);
  }, [
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
    input8,
    input9,
    input10,
  ]);

  useEffect(() => {
    setTotalAmount(
      output1 +
      output2 +
      output3 +
      output4 +
      output5 +
      output6 +
      output7 +
      output8 +
      output9 +
      output10
    );
  }, [
    output1,
    output2,
    output3,
    output4,
    output5,
    output6,
    output7,
    output8,
    output9,
    output10,
  ]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Cash Deposites
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                bankDeposit: "",
                cmsboyImage: "",
                depositeSlipImage: "",
                supportDocImage: "",
                branchId: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting", data);
                await onAdd(
                  (data.bankDeposit = totalAmount),
                  (data.cmsboyImage = source),
                  (data.depositeSlipImage = source1),
                  (data.supportDocImage = source2),
                  (data.branchId = authUser.branchId)
                );
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
                        <h4>Description Notes</h4>

                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="2000"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                              defaultValue="2000 X "
                            />
                            <TextField
                              name="input1"
                              label="Number of Notes"
                              defaultValue="0"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput1(e.target.value)}
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total2000"
                              label="Total Amount"
                              value={output1 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="500"
                              defaultValue=" 500 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="500inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput2(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total500"
                              label="Total Amount"
                              value={output2 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="200"
                              defaultValue=" 200 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              required
                              id="accountnumber"
                              name="200inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput3(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total200"
                              label="Total Amount"
                              value={output3 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="100"
                              defaultValue=" 100 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              required
                              id="accountnumber"
                              name="100inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput4(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total100"
                              label="Total Amount"
                              value={output4 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="50"
                              defaultValue=" 50 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="50inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput5(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total50"
                              label="Total Amount"
                              value={output5 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="20"
                              defaultValue=" 20 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="20inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput6(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total20"
                              label="Total Amount"
                              value={output6 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="10"
                              defaultValue=" 10 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="10inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput7(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total10"
                              label="Total Amount"
                              value={output7 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="05"
                              defaultValue=" 05 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="05inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput8(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total05"
                              label="Total Amount"
                              value={output8 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="02"
                              defaultValue=" 02 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="02inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput9(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total02"
                              label="Total Amount"
                              value={output9 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                        <Div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-read-only-input"
                              name="01"
                              defaultValue=" 01 X "
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name="01inp"
                              label="Number of Notes"
                              variant="outlined"
                              type="number"
                              onChange={(e) => setInput10(e.target.value)}
                              defaultValue="0"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                            <TextField
                              id="outlined-read-only-input"
                              name="total01"
                              label="Total Amount"
                              value={output10 || ""}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Div>
                      </Div>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <TextField
                        name="totalCash"
                        label="Total amount of cash deposited"
                        type="number"
                        value={totalAmount || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                      />
                      <label htmlFor="contained-button-file">
                        <JumboDemoCard
                          title={"Photos with CMS Boy"}
                          wrapperSx={{
                            backgroundColor: "background.paper",
                            pt: 0,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {!isGeolocationAvailable ? (
                              <div>
                                Your browser does not support Geolocation
                              </div>
                            ) : !isGeolocationEnabled ? (
                              <div>Geolocation is not enabled</div>
                            ) : coords ? (
                              setLatitude(coords.latitude) ||
                              setLongitude(coords.longitude) || (
                                <div className={classes.root}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <input
                                        name="PhotosWithCMSBoy"
                                        accept="image/*"
                                        className={classes.input}
                                        id="icon-button-file"
                                        type="file"
                                        capture="environment"
                                        onChange={(e) => {
                                          handleCapture(
                                            e.target,
                                            "Photos with CMS Boy",
                                            setSource
                                          );
                                          setFieldValue(
                                            "PhotosWithCMSBoy",
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
                                </div>
                              )
                            ) : (
                              <div>Getting the location data&hellip; </div>
                            )}
                          </Stack>
                        </JumboDemoCard>
                      </label>
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                      />
                      <label htmlFor="contained-button-file">
                        <JumboDemoCard
                          title={"Image of Deposit slip"}
                          wrapperSx={{
                            backgroundColor: "background.paper",
                            pt: 0,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {!isGeolocationAvailable ? (
                              <div>
                                Your browser does not support Geolocation
                              </div>
                            ) : !isGeolocationEnabled ? (
                              <div>Geolocation is not enabled</div>
                            ) : coords ? (
                              <div className={classes.root}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <input
                                      name="ImageOfDepositSlip"
                                      accept="image/*"
                                      className={classes.input}
                                      id="icon-button-file1"
                                      type="file"
                                      capture="environment"
                                      onChange={(e) => {
                                        handleCapture(
                                          e.target,
                                          "Image of Deposit slip",
                                          setSource1
                                        );

                                        setFieldValue(
                                          "ImageOfDepositSlip",
                                          source1
                                        );
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
                              </div>
                            ) : (
                              <div>Getting the location data&hellip; </div>
                            )}
                          </Stack>
                        </JumboDemoCard>
                      </label>
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                      />
                      <label htmlFor="contained-button-file">
                        <JumboDemoCard
                          title={"Supporting Documents"}
                          wrapperSx={{
                            backgroundColor: "background.paper",
                            pt: 0,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {!isGeolocationAvailable ? (
                              <div>
                                Your browser does not support Geolocation
                              </div>
                            ) : !isGeolocationEnabled ? (
                              <div>Geolocation is not enabled</div>
                            ) : coords ? (
                              <div className={classes.root}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <input
                                      name="SupportingDocuments"
                                      accept="image/*"
                                      className={classes.input}
                                      id="icon-button-file2"
                                      type="file"
                                      capture="environment"
                                      onChange={(e) => {
                                        handleCapture(
                                          e.target,
                                          "Supporting Documents",
                                          setSource2
                                        );
                                        setFieldValue(
                                          "SupportingDocuments",
                                          source2
                                        );
                                      }}
                                    />

                                    <label htmlFor="icon-button-file2">
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
                              </div>
                            ) : (
                              <div>Getting the location data&hellip; </div>
                            )}
                          </Stack>
                        </JumboDemoCard>
                      </label>
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || aCash_depMutation.isLoading}

                      >
                        Submit
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

export default CashDeposit;
