import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Card, CardContent, Grid, IconButton, InputLabel, Link, MenuItem, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from '@mui/styles';
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import { userServices } from "../../../services/userservices";
import Resizer from "react-image-file-resizer";


let resetFormFunc = null;
const validationSchema = yup.object({
  name: yup.string("Enter your Full Name").required("Please Enter your Full Name"),
  address: yup.string("Enter Address").required("Please Enter your Address is required"),
  dob: yup.string("Select Date of Birth").required("Please Select your Date of Birth"),
  bloodGroup: yup.string("Select your Blood Group").required("Please Select Blood Group"),
  mobileNumber: yup.string("Enter your Mobile Number").required("Please Enter your Mobile Number"),
  email: yup.string("Enter your Email Address").required("Please Enter your Email Address").matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Enter a valid email"),
  aadharNumber: yup.string("Enter your Aadhar Number").required("Please Enter your Aadhar Number").matches(/^[0-9]+$/, "Must be only digits").min(12, "Must be exactly 12 digits").max(12, "Must be exactly 12 digits"),
  panNumber: yup.string("Enter your PAN Number").required("Please Enter your PAN Number").matches(/^[a-zA-Z0-9]+$/, "Must be only digits and alphabets").min(10, "Must be exactly 10 digits and alphabets").max(10, "Must be exactly 10 digits and alphabets"),
  BankName: yup.string("Enter Bank Name").required("Bank Name is required"),
  AccountNumber: yup.string("Enter Account Number").required("Account Number is required").matches(/^[0-9]+$/, "Must be only digits"),
  ifscCode: yup.string("Enter IFSC Code").required("IFSC Code is required").matches(/^[a-zA-Z0-9]+$/, "Must be only digits and alphabets").min(11, "Must be exactly 11 digits and alphabets").max(11, "Must be exactly 11 digits and alphabets"),
  upiId: yup.string("Enter UPI ID").min(4, "Please Enter Proper UPI ID").max(20, "Please Enter Proper UPI ID, Max 20 Characters").matches(/^[a-z0-9]*@[a-z]*$/, "Must be only digits and alphabets"),

});

const Applyforjob = () => {
  const acompMutation = useMutation(userServices.add, {
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

  const onAdd = (
    name,
    address,
    dob,
    bloodGroup,
    mobileNumber,
    email,
    aadharNumber,
    panNumber,
    BankName,
    AccountNumber,
    ifscCode,
    upiId,
    userImage
  ) => {
    acompMutation.mutate({
      name,
      address,
      dob,
      bloodGroup,
      mobileNumber,
      email,
      aadharNumber,
      panNumber,
      BankName,
      AccountNumber,
      ifscCode,
      upiId,
      userImage
    });
  };
  const [bGroup, setBloodGroup] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
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
  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        try {
          const file = target.files[0];
          const image = await resizeFile(file);
          console.log("image", image);
          function dataURLtoFile(dataurl, filename) {

            var arr = dataurl.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);

            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
          }

          const file1 = dataURLtoFile(image, 'hello.jpeg');
          console.log("file1", file1);
          setSource(file1);
        } catch (err) {
          console.log(err);
        }

      }
    }
  }



  console.log("source", source);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Typography component={"h2"} variant="h1" mb={3}>
              Apply For Job
            </Typography>
            <Typography variant="h6" color={"text.secondary"}>
              Already Applied?{" "}
              <Link
                href={"/deliveryboy/login"}
                color={"inherit"}
                underline={"none"}
              >
                Sign in
              </Link>
            </Typography>

            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                name: "",
                address: "",
                dob: "",
                bloodGroup: "",
                mobileNumber: "",
                email: "",
                aadharNumber: "",
                panNumber: "",
                BankName: "",
                AccountNumber: "",
                ifscCode: "",
                upiId: "",
                userImage: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting", data);
                await onAdd(
                  data.name,
                  data.address,
                  data.dob,
                  data.bloodGroup,
                  data.mobileNumber,
                  data.email,
                  data.aadharNumber,
                  data.panNumber,
                  data.BankName,
                  data.AccountNumber,
                  data.ifscCode,
                  data.upiId,
                  data.userImage = source,
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
                    <FormControl className="MuiFormControl-fluid" >
                      <JumboTextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Full Name"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="address"
                        name="address"
                        multiline
                        rows={4}
                        label="Address"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="dob"
                        name="dob"
                        type="date"
                        label="Date of Birth"
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <InputLabel>Blood Group</InputLabel>
                      <JumboSelectField
                        fullWidth
                        id="bloodGroup"
                        name="bloodGroup"
                        label="Blood Group"

                        onChange={(event) => setBloodGroup(event.target.value)}
                        value={bGroup}
                      >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                      </JumboSelectField>

                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="mobileNumber"
                        name="mobileNumber"

                        label="Mobile Number"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="aadharNumber"
                        name="aadharNumber"
                        type="number"
                        label="Aadhar Number"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="panNumber"
                        name="panNumber"
                        label="PAN Number"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        id="bankName"
                        name="BankName"
                        label="Bank Name"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        id="accountNsumber"
                        name="AccountNumber"
                        label="Account Number"
                        variant="outlined"
                        type="number"
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        id="ifscCode"
                        name="ifscCode"
                        label="IFSC Code"
                        variant="outlined"
                        inputProps=
                        {{ style: { textTransform: 'uppercase' } }}
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        id="upiId"
                        name="upiId"
                        label="UPI ID"
                        variant="outlined"
                        inputProps=
                        {{ style: { textTransform: 'lowercase' } }}
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboDemoCard
                          title={"Upload Selfie"}
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
                                    name="userImage"
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-file"
                                    type="file"
                                    capture="environment"
                                    onChange={(e) => {
                                      handleCapture(e.target)
                                      setFieldValue("userImage", source);
                                    }
                                    }
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
                      </Div>
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || acompMutation.isLoading}
                        onClick={console.log("ready")}
                      >
                        Apply
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
                        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
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

export default Applyforjob;
