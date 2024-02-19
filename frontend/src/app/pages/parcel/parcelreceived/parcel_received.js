import Div from "@jumbo/shared/Div";
import {
  Alert,
  Card,
  CardContent,
  InputAdornment,
  Snackbar,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import React from "react";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { parcelServices } from "app/services/parcelServices";
import { userServices } from "app/services/userservices";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import useAuth from "@jumbo/hooks/useJumboAuth";

let resetFormFunc = null;
const validationSchema = yup.object({
  noOfParcel: yup
    .string("Number Of Received Parcel")
    .required("number of received parcel is required"),
  ammount: yup
    .string("Amount Of Received Parcel")
    .required("amount of received parcel is required"),
});


const Parcel_Received = () => {
  const { authUser } = useAuth();

  const aparcelMutation = useMutation(parcelServices.add, {
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

  console.log(aparcelMutation);


  const onAdd = (noOfParcel, ammount, remark, branchId) => {
    aparcelMutation.mutate({
      noOfParcel,
      ammount,
      remark,
      branchId,
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  if (!authUser) return null;

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Typography component={"h2"} variant="h1" mb={3}>
              Parcel Received
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                noOfParcel: "",
                ammount: "",
                remark: "",

              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting");
                await onAdd(data.noOfParcel, data.ammount, data.remark);

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
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="companyName"
                        name="noOfParcel"
                        label="Number Of Received Parcel"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0 },
                        }}

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="ammount"
                        name="ammount"
                        label="Amount Of Received Parcel"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>


                          ),
                          inputProps: { min: 0 },
                        }}

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="address"
                        name="remark"
                        multiline
                        rows={4}
                        label="Remark"

                      />
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || aparcelMutation.isLoading}
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

export default Parcel_Received;
