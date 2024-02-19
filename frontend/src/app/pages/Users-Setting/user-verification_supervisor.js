import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "react-query";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { companyServices } from "app/services/companyservices";
import { userServices } from "app/services/userservices";
import { useState } from "react";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";

const validationSchema = yup.object({
  defineRole: yup.string("Select Role Name").required("Role is required"),
  salaryType: yup
    .string("Select Salary Type")
    .required("Salary Type is required"),
  salaryDefine: yup
    .string("Enter Salary Define")
    .required("Define Salary or Rate is required"),
  selectCompany: yup
    .string("Enter Select Company")
    .required("Company Name is required"),
  formVerification: yup
    .string("Enter Verification")
    .required("Verification is required"),
});

const User_Verification_Supervisor = () => {
  const acompMutation = useMutation(userServices.verify, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
    },
  });

  const [open, setOpen] = React.useState(false);

  const onAdd = (
    roleDefine,
    salaryType,
    salaryDefine,
    selectCompany,
    formVerification
  ) => {
    acompMutation.mutate({
      roleDefine,
      salaryType,
      salaryDefine,
      formVerification,
      selectCompany,
    });
  };

  const [role, setRole] = React.useState("");
  const [companyName, setCompany] = React.useState("");
  const [name, setUser] = React.useState("");
  const [salarytype, setSalaryType] = React.useState("");

  const licompany = useQuery(["company-list"], companyServices.list);

  console.log("result of li company: ", licompany);

  const liuser = useQuery(["user-list"], userServices.alist);


  console.log("result of liuser: ", liuser);

  const lisusers = liuser?.data?.data.filter(
    (item) => item.isApproved === null
  );

  console.log("result of lisusers: ", lisusers);

  const [userId, setUserId] = useState(0);

  console.log("result of UserId: ", userId);

  const [cId, setId] = useState(0);

  const [bId, setbId] = useState(0);

  const userhandleChange = (event) => {
    setUserId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const uDetails = useQuery(["companyDetails", { userId }], async () =>
    userServices.details(userId)
  );

  console.log("result of cDetails: ", uDetails);

  const liuDetails = uDetails?.data?.data ?? [];

  console.log("result of Dob", liuDetails.dob);

  console.log("result of liuDetails: ", liuDetails);

  const wComp = useQuery(["company-list"], companyServices.wList);



  const liwComp = wComp?.data?.data ?? [];



  const comphandleChange = (event) => {
    console.log(event);
    setId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  const licDetails = cDetails?.data?.data ?? [];



  const bhandleChange = (e) => {
    setbId(e.target.value);

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
                roleDefine: "",
                salaryType: "",
                selectCompany: "",
                formVerification: "",
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting");
                onAdd(
                  data.roleDefine,
                  data.salaryType,
                  data.salaryDefine,
                  data.selectCompany,
                  data.formVerification
                );
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
                        width: { xs: "100%", sm: "50%" },
                      },

                      "& .MuiFormControl-root.MuiFormControl-fluid": {
                        width: "100%",
                      },
                    }}
                  >
                    <FormControl
                      sx={{ m: 1, minWidth: 80 }}
                      style={{ width: "950px", paddingLeft: "0px" }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Applicant
                      </InputLabel>
                      <Select
                        fullWidth
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
                                src="/static/images/avatar/1.jpg"
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
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Date of Birth"
                            defaultValue={liuDetails.dob}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Mobile Number"
                            defaultValue={liuDetails.mobileNumber}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Blood Group"
                            defaultValue={liuDetails.bloodGroup}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Aadhar Card No."
                            defaultValue={liuDetails.aadharNumber}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Pan Card Number"
                            defaultValue={liuDetails.panNumber}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Bank Name"
                            defaultValue={liuDetails?.bankDetails?.BankName}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Account Number"
                            defaultValue={
                              liuDetails?.bankDetails?.AccountNumber
                            }
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="IFSC Code"
                            defaultValue={liuDetails?.bankDetails?.ifscCode}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="UPI ID"
                            defaultValue={liuDetails?.bankDetails?.upiId}
                            style={{ width: "950px", marginRight: "1.5rem" }}
                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      </Div>
                    )}
                    <Div>
                      <FormControl
                        className="MuiFormControl-fluid"
                        style={{ width: "950px" }}
                      >
                        <JumboTextField
                          select

                          id="formVerification"
                          name="formVerification"
                          label="User Verified"
                        >
                          <MenuItem value={1}>Pending</MenuItem>
                          <MenuItem value={2}>Basic Details Verified</MenuItem>
                        </JumboTextField>
                      </FormControl>

                      <Div sx={{ mx: 1 }}>
                        <LoadingButton

                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{ mb: 3 }}
                          loading={isSubmitting || acompMutation.isLoading}
                          style={{ width: "950px" }}
                        >
                          Submit
                        </LoadingButton>
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
