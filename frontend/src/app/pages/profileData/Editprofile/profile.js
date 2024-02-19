import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Div from "@jumbo/shared/Div";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import {
  Alert, Avatar, Badge, Button,
  Card,
  CardContent, Grid, IconButton,
  InputLabel,
  MenuItem, Select, Snackbar, TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { userServices } from "app/services/userservices";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import { Form, Formik } from "formik";
import moment from "moment/moment";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { useMutation } from "react-query";
import * as yup from "yup";

const validationSchema = yup.object({
  BankName: yup.string("Enter Bank Name"),
  AccountNumber: yup.string("Enter Account Number"),
  ifscCode: yup.string("Enter IFSC Code")
    .matches(/^[a-zA-Z0-9]+$/, "Must be only digits and alphabets")
    .min(11, "Must be exactly 11 digits and alphabets")
    .max(11, "Must be exactly 11 digits and alphabets"),
  upiId: yup
    .string("Enter UPI ID")
    .min(4, "Please Enter Proper UPI ID")
    .max(20, "Please Enter Proper UPI ID, Max 20 Characters")
    .matches(/^[a-zA-Z0-9]*$/, "Must be only digits and alphabets"),
});

let resetFormFunc = null;
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },

  input: {
    display: "none",
  },
}));

const Profile = () => {
  const { authUser } = useAuth();

  console.log("authUser", authUser);

  const uuserMutation = useMutation(userServices.update, {
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
    userId,
    name,
    email,
    address,
    mobileNumber,
    dob,
    bloodGroup,
    aadharNumber,
    panNumber,
    BankName,
    AccountNumber,
    ifscCode,
    upiId,
    userImage
  ) => {
    uuserMutation.mutate({
      userId,
      name,
      email,
      address,
      mobileNumber,
      dob,
      bloodGroup,
      aadharNumber,
      panNumber,
      BankName,
      AccountNumber,
      ifscCode,
      upiId,
      userImage,
    });
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [dob, setDob] = useState("");
  const [bGroup, setbGroup] = useState(authUser?.bloodGroup);
  console.log("bGroup", bGroup);

  const classes = useStyles();

  const [source, setSource] = useState("");

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

  const handleCapture = async (target) => {
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

          const file1 = dataURLtoFile(image, "hello.jpeg");
          console.log("file1", file1);
          setSource(file1);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  if (!authUser) return null;

  console.log("authUser", authUser)


  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Edit Profile
            </Typography>

            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                userId: "",
                name: authUser.name,
                email: authUser.email,
                address: authUser.address,
                mobileNumber: authUser.mobileNumber,
                dob: authUser.dob,
                bloodGroup: authUser.bloodGroup,
                aadharNumber: authUser.aadharNumber,
                panNumber: authUser.panNumber,
                companyName: authUser.companyName,
                branchName: authUser.branchName,
                BankName: authUser?.bankDetails?.BankName,
                AccountNumber: authUser?.bankDetails?.AccountNumber,
                ifscCode: authUser?.bankDetails?.ifscCode,
                upiId: authUser?.bankDetails?.upiId,
                userImage: authUser.userImage,
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting:---------->>>>", data);
                await onAdd(
                  (data.userId = authUser.id),
                  data.name,
                  data.email,
                  data.address,
                  data.mobileNumber,
                  data.dob,
                  data.bloodGroup = bGroup,
                  data.aadharNumber,
                  data.panNumber,
                  data.BankName,
                  data.AccountNumber,
                  data.ifscCode,
                  data.upiId,
                  data.userImage = source
                );

                setSubmitting(false);
                { console.log("submitting:---------->>>>", data) }
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
                    <br />
                    {!readOnly ? (
                      <FormControl className="MuiFormControl-fluid">
                        <Div
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
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
                                        handleCapture(e.target);
                                        setFieldValue("userImage", source);
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
                            }
                          >
                            <Avatar
                              sx={{
                                width: 90,
                                height: 90,
                                boxShadow: 2,
                                m: "0 auto 20px",
                              }}
                              src={source}
                            />
                          </Badge>
                        </Div>
                        <Typography
                          variant={"h6"}
                          color="text.secondary"
                          mb={2}
                          object
                          align="center"
                        >
                          {authUser?.publicId}
                        </Typography>
                        <JumboTextField
                          fullWidth
                          name="name"
                          type="text"
                          label="Name"
                          defaultValue={authUser?.name}
                          inputProps={{
                            readOnly: readOnly,
                          }}
                        />
                      </FormControl>
                    ) : (
                      <Div>
                        <Avatar
                          sx={{
                            width: 90,
                            height: 90,
                            boxShadow: 2,
                            m: "0 auto 20px",
                          }}
                          src={SERVER_IMAGE_PATH + authUser?.userImage}

                        />
                        <Typography variant={"h5"} object align="center">
                          {authUser?.name}
                        </Typography>

                        <Typography
                          variant={"h6"}
                          color="text.secondary"
                          mb={2}
                          object
                          align="center"
                        >
                          {authUser?.role}
                        </Typography>
                        <Typography
                          variant={"h6"}
                          color="text.secondary"
                          mb={2}
                          object
                          align="center"
                        >
                          {authUser?.publicId}
                        </Typography>
                      </Div>
                    )}

                    <br />
                    <br />
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="email"
                        type="text"
                        label="Email Address"
                        defaultValue={authUser?.email}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="mobileNumber"
                        type="number"
                        label="Mobile No."
                        defaultValue={authUser?.mobileNumber}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        type="text"
                        label="Address"
                        name="address"
                        defaultValue={authUser?.address}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      />
                    </FormControl>


                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="date"
                        name="dob"
                        type="date"
                        label="Date Of Birth"
                        value={dob}

                        defaultValue={moment(authUser?.dob).format("YYYY-MM-DD")}

                        onChange={(event, newValue) => setDob(newValue)}
                        inputFormat="YYYY-MM-DD"
                        InputLabelProps={{
                          shrink: true,
                          readOnly: readOnly,
                        }}
                      />
                      {console.log("dd-mm-yyyy: ", dob)}
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <InputLabel id="demo-simple-select-label" required>
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="blood_Group_Id"
                        id="bloodGroup"
                        name="bloodGroup"
                        label="Blood Group"
                        value={bGroup}
                        defaultValue={bGroup}
                        onChange={(event) => setbGroup(event.target.value)}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                      </Select>

                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="aadharNumber"
                        type="number"
                        label="Aadhar Card"
                        defaultValue={authUser?.aadharNumber}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="panNumber"
                        type="text"
                        label="Pan Card"
                        defaultValue={authUser?.panNumber}
                        inputProps={{
                          readOnly: readOnly,
                        }}
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <TextField
                        fullWidth
                        name="companyName"
                        type="text"
                        label="Company Name"
                        defaultValue={authUser?.companyName.companyName}
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <TextField
                        fullWidth
                        name="branchName"
                        type="text"
                        label="Branch Name"
                        defaultValue={authUser?.branchName?.branchName}
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboDemoCard
                          title={"Bank Details"}
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
                            <JumboTextField
                              id="bankName"
                              name="BankName"
                              label="Bank Name"
                              defaultValue={authUser?.bankDetails?.BankName}
                              variant="outlined"
                              inputProps={{
                                readOnly: readOnly,
                              }}
                            />
                            <JumboTextField
                              id="accountNsumber"
                              name="AccountNumber"
                              label="Account Number"
                              variant="outlined"
                              defaultValue={
                                authUser?.bankDetails?.AccountNumber
                              }
                              type="number"
                              inputProps={{
                                readOnly: readOnly,
                              }}
                            />
                            <JumboTextField
                              id="ifscCode"
                              name="ifscCode"
                              label="IFSC Code"
                              variant="outlined"
                              defaultValue={authUser?.bankDetails?.ifscCode}
                              inputProps={{
                                style: { textTransform: "uppercase" },
                                readOnly: readOnly,
                              }}
                            />
                            <JumboTextField
                              id="upiId"
                              name="upiId"
                              label="UPI"
                              variant="outlined"
                              defaultValue={authUser?.bankDetails?.upiId}
                              inputProps={{
                                style: { textTransform: "lowercase" },
                                readOnly: readOnly,
                              }}
                            />
                          </Box>
                        </JumboDemoCard>
                      </Div>
                    </FormControl>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant={"contained"}
                        onClick={() => setReadOnly(false)}
                      >
                        Edit

                      </Button>{" "}
                      &nbsp; &nbsp;
                      <Button
                        halfWidth
                        type="submit"
                        variant="contained"
                        loading={isSubmitting || uuserMutation.isLoading}
                      >
                        Update
                      </Button>
                    </div>
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

export default Profile;
