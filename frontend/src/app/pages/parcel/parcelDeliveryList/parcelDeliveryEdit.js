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
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { companyServices } from "app/services/companyservices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { userServices } from "app/services/userservices";
import { parcelServices } from "app/services/parcelServices";
import { ReactSmartScroller } from "react-smart-scroller";

let resetFormFunc = null;
const validationSchema = yup.object({
  selectDeliveryBoy: yup
    .string("Select Delivery Boy")
    .required("Select Delivery Boy is required"),
  totalParcel: yup
    .string("Enter Total No. Of Parcel")
    .required("Total No. Of Parcel is required"),

  totalAmmount: yup
    .string("Enter Total Amount Of Parcel")
    .required("Total Amount Of Parcel is required"),



});

const ParcelAllotmentEdit = ({ pId, onClose, open, deliveryBoyName }) => {

  console.log("pId18", pId)

  const parcelDetails = useQuery(["ParcelAllotmentList", { pId }], async () =>
    parcelServices.pIdAllotlist(pId)
  );

  console.log("parcelDetails_27_march", parcelDetails);

  const parcelListData = parcelDetails?.data?.data ?? [];

  console.log("parcelDetails_27_march123", parcelListData);


  console.log("parcelListData_parcelAlloted:", parcelListData?.totalParcel)
  console.log("parcelListData_parcelAmount:", parcelListData?.totalAmmount)
  console.log("userId:", parcelListData?.userId)
  const userId = parcelListData?.userId;

  //userServices.details
  const userDetails = useQuery(["DeliveryBoy", { userId }], async () =>
    userServices.details(userId)
  );

  console.log("DeliveryBoyDetails:", userDetails);
  const userData = userDetails?.data?.data ?? [];

  console.log("userData:", userData?.name)
  const liuser = useQuery(["user-list"], userServices.alist);
  const aliuser = liuser.data?.data ?? [];

  const dboy = aliuser?.filter((item) => item.id === parcelListData?.userId);

  const cDetails = useQuery(["ParcelAllotmentList", { pId }], async () =>
    companyServices.details(pId)
  );

  const ciData = cDetails?.data?.data ?? [];
  const ciBData = cDetails?.data?.data?.bankDetails ?? [];

  const [fullWidth, setFullWidth] = React.useState(true);


  const eparcelMutation = useMutation(parcelServices.update, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setdOpen(true);
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
  const onAdd = (parcelId, totalParcel, totalAmmount, deliverdParcel, rejectParcel, rejectAmmount, nextDayParcel, nextDayAmmount, totalCashAmmount, totalOnlineAmmount, selectDeliveryBoy) => {
    eparcelMutation.mutate({
      parcelId,
      totalParcel,
      totalAmmount,
      deliverdParcel,
      rejectParcel,
      rejectAmmount,
      nextDayParcel,
      nextDayAmmount,
      totalCashAmmount,
      totalOnlineAmmount,
      selectDeliveryBoy,
    });
  };
  const [dopen, setdOpen] = useState(false);
  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const userName = userData?.name

  console.log("userName:", userName);



  return (
    <Div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={false}
        open={open}
        onClose={onClose}
      >
        {
          cDetails.isLoading ? (
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
                <Div
                  sx={{ display: "flex", flexDirection: "column", flex: "1" }}
                >
                  <CardContent>

                    <Formik
                      validateOnChange={true}
                      validationSchema={validationSchema}
                      initialValues={{
                        parcelId: "",
                        totalParcel: parcelListData?.totalParcel,
                        totalAmmount: parcelListData?.totalAmmount,
                        deliverdParcel: parcelListData?.deliverdParcel,
                        rejectParcel: parcelListData?.rejectParcel,
                        rejectAmmount: parcelListData?.rejectAmmount,
                        nextDayParcel: parcelListData?.nextDayParcel,
                        nextDayAmmount: parcelListData?.nextDayAmmount,
                        totalCashAmmount: parcelListData?.totalCashAmmount,
                        totalOnlineAmmount: parcelListData?.totalOnlineAmmount,
                        selectDeliveryBoy: deliveryBoyName,
                      }}

                      onSubmit={async (data, { setSubmitting, resetForm }) => {
                        resetFormFunc = resetForm;
                        setSubmitting(true);
                        console.log("submitting", data);
                        await onAdd(
                          data.parcelId = pId,
                          data.totalParcel,
                          data.totalAmmount,
                          data.deliverdParcel,
                          data.rejectParcel,
                          data.rejectAmmount,
                          data.nextDayParcel,
                          data.nextDayAmmount,
                          data.totalCashAmmount,
                          data.totalOnlineAmmount,
                          data.selectDeliveryBoy
                        );

                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Dialog

                          fullWidth={fullWidth}
                          maxWidth={false}
                          open={open}
                          onClose={onClose}

                        >
                          <CardContent>
                            <Form noValidate autoComplete="off">
                              <Box
                                sx={{
                                  mx: -1,

                                  "& .MuiFormControl-root:not(.MuiTextField-root)":
                                  {
                                    p: 1,
                                    mb: 2,
                                    width: { xs: "100%", sm: "50%" },
                                  },

                                  "& .MuiFormControl-root.MuiFormControl-fluid": {
                                    width: "100%",
                                  },
                                }}

                              >

                                <Typography component={"h2"} variant="h1" mb={3}>
                                  Edit Parcel Delivery List
                                </Typography>
                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="selectDeliveryBoy"
                                    label="Delivery boy Name"
                                    defaultValue={deliveryBoyName}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="totalParcel"
                                    label="Total Number Of Parcel Alloted"
                                    type="number"
                                    defaultValue={parcelListData?.totalParcel}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="totalAmmount"
                                    label="Total Amount Of Parcel Alloted"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          ₹
                                        </InputAdornment>
                                      ),
                                    }}
                                    type="number"
                                    defaultValue={parcelListData?.totalAmmount}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth

                                    name="deliverdParcel"
                                    label="Total Number Of Deliverd Parcel"
                                    type="number"
                                    defaultValue={parcelListData?.deliverdParcel}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth

                                    name="rejectParcel"
                                    label="Total Number Of Rejected Parcel"
                                    type="number"
                                    defaultValue={parcelListData?.rejectParcel}
                                  />
                                </FormControl>
                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth

                                    name="rejectAmmount"
                                    label="Total Number Of Rejected Ammount"
                                    type="number"
                                    defaultValue={parcelListData?.rejectAmmount}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth

                                    name="nextDayParcel"
                                    label="Next Day Parcel"
                                    type="number"
                                    defaultValue={parcelListData?.nextDayParcel}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth

                                    name="nextDayAmmount"
                                    label="Next Day Ammount"
                                    type="number"
                                    defaultValue={parcelListData?.nextDayAmmount}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="totalCashAmmount"
                                    label="Total Cash Ammount"
                                    type="number"
                                    defaultValue={parcelListData?.totalCashAmmount}
                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="totalOnlineAmmount"
                                    label="Total Online Ammount"
                                    type="number"
                                    defaultValue={parcelListData?.totalOnlineAmmount}
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
                                  {console.log("isSubmitting", isSubmitting)}
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
                          </CardContent>
                        </Dialog>
                      )}
                    </Formik>
                  </CardContent>
                </Div>
              </Card>
            </React.Fragment>
          )

        }

      </Dialog>
    </Div >
  );
};

export default ParcelAllotmentEdit;
