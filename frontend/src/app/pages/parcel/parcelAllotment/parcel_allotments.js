import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Card,
  CardContent,
  InputAdornment,
  InputLabel,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { userServices } from "app/services/userservices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { parcelServices } from "../../../services/parcelServices";

let resetFormFunc = null;

const validationSchema = yup.object({
  userId: yup
    .string("Select Delivery Boy")
    .required("Select Delivery Boy is required"),
  totalParcel: yup
    .string("Enter Total Number of Parcel")
    .required("Total Number of Parcel is required"),
  totalAmmount: yup
    .string("Enter Tolal Amount of Parcel")
    .required("Tolal Amount of Parcel is required"),
});

const Parcel_allotment = () => {
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  console.log("severity", severity);

  const aparcelallotMutation = useMutation(parcelServices.allot, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setOpen(true);
      if (data.status === 200) {
        setSeverity("success");
        setMsg(data.message);
        console.log("first", data.message);
        resetFormFunc();
      } else {
        setSeverity("error");
        setMsg(data.message);
      }
    },
  });

  const onAdd = (userId, totalParcel, totalAmmount) => {
    aparcelallotMutation.mutate({
      userId,
      totalParcel,
      totalAmmount,
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const liuser = useQuery(["user-list"], userServices.alist);
  const aliuser = liuser.data?.data;
  const dboy = aliuser?.filter((item) => item.role === "deliveryBoy");


  console.log("dboy", dboy);

  const [userId, setUserId] = useState("");

  console.log("userId", userId);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}></Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Parcel Allotment
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                userId: "",
                totalParcel: "",
                totalAmmount: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting");
                await onAdd(data.userId, data.totalParcel, data.totalAmmount);
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
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Delivery Boy
                      </InputLabel>

                      <JumboSelectField
                        name="userId"
                        label="Select Delivery Boy"
                        onChange={handleChange}
                        value={userId}
                      >
                        {dboy?.map((user) => (
                          <MenuItem key={user.id} id={user.id} value={user.id}>
                            {user.name}{" "}
                          </MenuItem>
                        ))}
                      </JumboSelectField>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="totalParcel"
                        label="Total Number Of Parcel Alloted"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="totalAmmount"
                        label="Total Amount Of Parcel Alloted"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                          inputProps: { min: 0 },
                        }}
                        type="number"
                      />
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || aparcelallotMutation.isLoading}
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

export default Parcel_allotment;
