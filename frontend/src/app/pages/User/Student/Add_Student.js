
import React from "react";
import {
  Alert,
  Card,
  CardContent,
  Collapse,
  IconButton,
  InputLabel,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import Div from "@jumbo/shared/Div";

import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Form, Formik } from "formik";
import { companyServices } from "../../../services/companyservices";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "react-query";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { from } from "stylis";
import { useState } from "react";
import { data } from "app/shared/metrics/SalesStatistics/data";
import CloseIcon from "@mui/icons-material/Close";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";

let resetFormFunc = null;
const validationSchema = yup.object({
  companyName: yup
    .string("Enter Company Name")
    .required("Company Name is required"),
  address: yup.string("Enter Address").required("Address is required"),
  gstNo: yup
    .string("Enter GST Number Name")
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Please Enter Valid GST Number"
    )
    .required("GST Number is required"),
  bankName: yup.string("Enter Bank Name").required("Bank Name is required"),
  accountNumber: yup
    .string("Enter Account Number")
    .required("Account Number is required"),
  ifscCode: yup
    .string("Enter IFSC Code")
    .required("IFSC Code is required")
    .matches(/^[a-zA-Z0-9]+$/, "Must be only digits and alphabets")
    .min(11, "Must be exactly 11 digits and alphabets")
    .max(11, "Must be exactly 11 digits and alphabets"),
  upiId: yup
    .string("Enter UPI ID")
    .required("UPI ID is required")
    .min(4, "Please Enter Proper UPI ID")
    .max(20, "Please Enter Proper UPI ID, Max 20 Characters")
    .matches(/^[a-zA-Z0-9]+$/, "Must be only digits and alphabets"),
});

const Add_Student = () => {
  const acompMutation = useMutation(companyServices.add, {
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
    companyName,
    address,
    gstNo,
    bankName,
    accountNumber,
    ifscCode,
    upiId
  ) => {
    acompMutation.mutate({
      companyName,
      address,
      gstNo,
      bankName,
      accountNumber,
      ifscCode,
      upiId,
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [bGroup, setBloodGroup] = useState();
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Typography component={"h2"} variant="h1" mb={3}>
              Add Student
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                companyName: "",
                address: "",
                gstNo: "",
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                upiId: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting");
                await onAdd(
                  data.companyName,
                  data.address,
                  data.gstNo,
                  data.bankName,
                  data.accountNumber,
                  data.ifscCode,
                  data.upiId
                );

                setSubmitting(false);
              }}

              mb={3}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete="off" mb={3}>
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
                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                      <FormControl className="MuiFormControl-fluid">
                        <JumboTextField
                          fullWidth                       
                          name="name"
                          label="Name"

                        />
                      </FormControl>

                      <FormControl className="MuiFormControl-fluid">
                        <JumboTextField
                          fullWidth                       
                          name="mobile"
                          label="Mobile"
  
                        />
                      </FormControl>

                      <FormControl className="MuiFormControl-fluid">
                        <JumboTextField
                          fullWidth                       
                          name="dob"
                          type="date"
                          label="DOB"

                        />
                        </FormControl>
                    </Div>

                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                       <FormControl className="MuiFormControl-fluid">
                         <JumboTextField
                           fullWidth                       
                           name="email"
                           label="Email Id"

                         />
                       </FormControl>

                       <FormControl className="MuiFormControl-fluid">
                         <JumboTextField
                           fullWidth                       
                           name="password"
                           label="Password"

                         />
                       </FormControl>


                       <FormControl className="MuiFormControl-fluid">
                      <InputLabel>Gender</InputLabel>
                      <JumboSelectField
                        fullWidth                       
                        name="gender"
                        label="Gender"

                        onChange={(event) => setBloodGroup(event.target.value)}
                        value={bGroup}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"another"}>Another</MenuItem>
                       
                      </JumboSelectField>

                    </FormControl>
                    </Div>

               
                    <Div style={{display: "flex", justifyContent: "space-between"}}>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth                       
                        name="image"
                        label="Profile Image"
                        type="file"
                      />
                    </FormControl>                

                     <FormControl className="MuiFormControl-fluid">
                      <InputLabel>Language</InputLabel>
                      <JumboSelectField
                        fullWidth                       
                        name="language"
                        label="Language"

                        onChange={(event) => setBloodGroup(event.target.value)}
                        value={bGroup}
                      >
                        <MenuItem value={"english"}>English</MenuItem>
                        <MenuItem value={"hindi"}>Hindi</MenuItem>
                        <MenuItem value={"another"}>Another</MenuItem>
                       
                      </JumboSelectField>

                    </FormControl>                    

                       <FormControl className="MuiFormControl-fluid">
                         <JumboTextField
                           fullWidth                       
                           name="address"
                           label="Address"

                         />
                       </FormControl>
                    </Div>
                   

                    

                    <Div sx={{ mx: 1 }} style={{marginTop: "20px"}}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || acompMutation.isLoading}
                      >
                        Add
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

export default Add_Student;
