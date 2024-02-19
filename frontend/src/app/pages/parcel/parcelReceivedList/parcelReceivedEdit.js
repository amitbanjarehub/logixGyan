import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  Snackbar,
  Typography,
  InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { companyServices } from "app/services/companyservices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { parcelServices } from "app/services/parcelServices";

let resetFormFunc = null;
const validationSchema = yup.object({
  noOfParcel: yup
    .string("Number Of Received Parcel")
    .required("number of received parcel is required"),
  ammount: yup
    .string("Amount Of Received Parcel")
    .required("amount of received parcel is required"),

  remark: yup.string("Enter Remark").required("Remark is required"),
});

const ParcelReceivedEdit = ({ pId, onClose, open }) => {

  console.log("Received_Parcel_pId_31March", pId);

  const dparcel = useQuery(["ParcelReceivedList", { pId }], async () =>
    parcelServices.ilist(pId)
  );

  const piData = dparcel?.data?.data ?? [];
  const piData1 = piData[0];

  const [fullWidth, setFullWidth] = React.useState(true);


  const eparcelMutation = useMutation(parcelServices.recUpdate, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {

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

  const onAdd = (noOfParcel, ammount, remark, pId) => {
    eparcelMutation.mutate({
      noOfParcel,
      ammount,
      remark,
      pId,
    });
  };
  const [dopen, setdOpen] = useState(false);
  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <Div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={false}
        open={open}
        onClose={onClose}
      >
        {dparcel.isLoading ? (
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

          <React.Fragment>
            <Typography variant="h1" mb={3}>

            </Typography>
            <Card sx={{ display: "flex", mb: 3.5 }}>
              <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
                <CardContent>
                  <Typography component={"h2"} variant="h1" mb={3}>
                    Edit Parcel Received List
                  </Typography>
                  <Formik
                    validateOnChange={true}
                    validationSchema={validationSchema}
                    initialValues={{
                      noOfParcel: piData1?.noOfParcel,
                      ammount: piData1?.ammount,
                      remark: piData1?.remark,
                      pId: "",

                    }}
                    onSubmit={async (data, { setSubmitting, resetForm }) => {
                      resetFormFunc = resetForm;
                      setSubmitting(true);
                      console.log("submitting", data);
                      await onAdd(
                        data.noOfParcel,
                        data.ammount,
                        data.remark,
                        data.pId = pId,
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
                          <FormControl className="MuiFormControl-fluid">
                            <JumboTextField
                              fullWidth
                              name="noOfParcel"
                              label="Number Of Received Parcel"
                              type="number"
                              defaultValue={piData1?.noOfParcel}
                            />
                          </FormControl>
                          <FormControl className="MuiFormControl-fluid">
                            <JumboTextField
                              fullWidth
                              name="ammount"
                              label="Amount Of Received Parcel"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}

                              defaultValue={piData1?.ammount}

                            />
                          </FormControl>
                          <FormControl className="MuiFormControl-fluid">
                            <JumboTextField
                              fullWidth
                              name="remark"
                              multiline
                              rows={4}
                              label="Remark"
                              defaultValue={piData1?.remark}

                            />
                          </FormControl>

                          <Div sx={{ mx: 1 }}>
                            <LoadingButton
                              fullWidth
                              type="submit"
                              variant="contained"
                              size="large"
                              sx={{ mb: 3 }}
                              loading={
                                isSubmitting || eparcelMutation.isLoading
                              }
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
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Div>
            </Card>
          </React.Fragment>
        )}

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default ParcelReceivedEdit;
