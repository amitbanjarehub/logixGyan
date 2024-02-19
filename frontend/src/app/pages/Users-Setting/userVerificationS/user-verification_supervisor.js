import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { userServices } from "app/services/userservices";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

const validationSchema = yup.object({
  formVerification: yup
    .string("Enter Verification")
    .required("Verification is required"),
});

let resetFormFunc = null;
const User_Verification_Supervisor = () => {
  const [userId, setUserId] = useState(0);
  const [verify, setVerify] = useState("pending");

  const sverifyMutation = useMutation(userServices.bverify, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setdOpen(true);
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

  const [dopen, setdOpen] = useState(false);

  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [open, setOpen] = React.useState(false);

  const onAdd = (userId, formVerification) => {
    sverifyMutation.mutate({
      userId,
      formVerification,
    });
  };


  const liuser = useQuery(["user-list"], userServices.alist);

  const lisusers = liuser?.data?.data.filter(
    (item) => item.isApproved === "pending"
  );

  const userhandleChange = (event) => {
    setUserId(event.target.value);
  };
  const uDetails = useQuery(["userDetails", { userId }], async () =>
    userServices.details(userId)
  );
  const liuDetails = uDetails?.data?.data ?? [];

  console.log("liuDetails", liuDetails);

  const verifyhandleChange = (event) => {
    setVerify(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Typography component={"h2"} variant="h1" mb={3}>
              User Verification
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                userId: "",
                formVerification: "",
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting");
                onAdd((data.userId = userId), data.formVerification);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete="off">
                  <Box
                    sx={{
                      mx: -1,

                      "& .MuiFormControl-root:not(.MuiTextField-root)": {
                        p: 1,
                        mb: 2,
                        width: { xs: "100%", sm: "100%" },
                      },

                      "& .MuiFormControl-root.MuiFormControl-fluid": {
                        width: "100%",
                      },
                    }}
                  >
                    <FormControl
                      sx={{ minWidth: 80 }}

                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Applicant
                      </InputLabel>
                      <Select
                        id="demo-simple-select-label"
                        name="selectApplicant"
                        onChange={userhandleChange}
                        value={userId}
                      >
                        {lisusers?.map((user) => (
                          <MenuItem id={user.id} value={user.id}>
                            {user.name}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="outlined" onClick={() => setOpen(true)}>
                        View Image
                      </Button>
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
                                src={SERVER_IMAGE_PATH + liuDetails.userImage}
                                sx={{ width: 500, height: 500 }}
                              />
                            </FormControl>
                          </Div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpen(false)}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </Div>
                    {uDetails.isLoading ? (
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
                        <Typography
                          variant={"h6"}
                          color={"text.secondary"}
                          mt={2}
                        >
                          Loading...
                        </Typography>
                      </Div>
                    ) : (
                      <Div>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Address"
                            defaultValue={liuDetails.address}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Date of Birth"
                            defaultValue={liuDetails.dob}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Mobile Number"
                            defaultValue={liuDetails.mobileNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Blood Group"
                            defaultValue={liuDetails.bloodGroup}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Aadhar Card No."
                            defaultValue={liuDetails.aadharNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Pan Card Number"
                            defaultValue={liuDetails.panNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Bank Name"
                            defaultValue={liuDetails?.bankDetails?.BankName}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Account Number"
                            defaultValue={
                              liuDetails?.bankDetails?.AccountNumber
                            }

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="IFSC Code"
                            defaultValue={liuDetails?.bankDetails?.ifscCode}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="UPI ID"
                            defaultValue={liuDetails?.bankDetails?.upiId}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      </Div>
                    )}
                    <Div>
                      <FormControl
                        className="MuiFormControl-fluid"

                      >
                        <InputLabel>User Verified</InputLabel>
                        <JumboSelectField
                          // fullWidth
                          id="formVerification"
                          name="formVerification"
                          label="User Verified"
                          defaultValue={liuDetails?.isApproved}
                          onChange={verifyhandleChange}
                          value={verify}
                        >
                          <MenuItem value={"pending"}>Pending</MenuItem>
                          <MenuItem value={"basic-verify"}>
                            Basic Details Verified
                          </MenuItem>
                        </JumboSelectField>
                      </FormControl>

                      <Div sx={{ mx: 1 }}>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{ mb: 3 }}
                          loading={isSubmitting || sverifyMutation.isLoading}
                        >
                          Submit
                        </LoadingButton>
                        <Snackbar
                          open={dopen}
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

export default User_Verification_Supervisor;
