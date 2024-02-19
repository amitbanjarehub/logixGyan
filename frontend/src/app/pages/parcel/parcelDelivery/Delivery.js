import Div from "@jumbo/shared/Div";
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  InputLabel,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { userServices } from "app/services/userservices";
import React from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { parcelServices } from "../../../services/parcelServices";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import useAuth from "@jumbo/hooks/useJumboAuth";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboAppTextField from "@jumbo/components/JumboAppTextField";

let resetFormFunc = null;
const validationSchema = yup.object({

});

const ParcelDelivery = () => {

  const { authUser } = useAuth();


  console.log("authUser-------->>>>>>>>", authUser);

  const aparcelallotMutation = useMutation(parcelServices.update, {
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
    parcelId,
    totalParcel,
    totalAmmount,
    deliverdParcel,
    totalOnlineAmmount,
    rejectParcel,
    rejectAmmount,
    nextDayParcel,
    nextDayAmmount,
    totalCashAmmount,
  ) => {
    aparcelallotMutation.mutate({
      parcelId,
      totalParcel,
      totalAmmount,
      deliverdParcel,
      totalOnlineAmmount,
      rejectParcel,
      rejectAmmount,
      nextDayParcel,
      nextDayAmmount,
      totalCashAmmount,
    });
  };

  const [userId, setUserId] = useState(0);
  const [allotedId, setAllotedId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");

  const [severity, setSeverity] = useState("");

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const liuser = useQuery(["user-list"], userServices.alist);
  const aliuser = liuser.data?.data;
  const dboy = aliuser?.filter((item) => item.role === "deliveryBoy");

  console.log("dboy_data:", dboy);


  const allotedParcel = useQuery(["Alloted-Parcel-List", { userId, date }], () => parcelServices.dlist(userId, date));


  const ParcelAlloted = allotedParcel.data?.data[0];
  const parcelMultiData = allotedParcel.data?.data ?? [];
  console.log("ParcelAlloted_25_march;", ParcelAlloted)
  console.log("parcelMultiData_25_march_multidata;", parcelMultiData)
  console.log("allotedId:", allotedId)

  const detailAltParcel = useQuery(["Details-Alloted-Parcel", { allotedId }], () => parcelServices.pIdAllotlist(allotedId));
  console.log("detailAltParcel:", detailAltParcel);

  const detailsOfParcel = detailAltParcel.data?.data ?? [];

  console.log("detailsOfParcel_III:", detailsOfParcel)

  const [onlineAmt, setOnlineamt] = useState('');
  const handleChange1 = (event) => {
    setOnlineamt(event.target.value);
  };

  const [Amtrejectedparcel, setAmtrejectedparcel] = useState('');

  const handleChange2 = (event) => {
    setAmtrejectedparcel(event.target.value);
  };


  const [Amtparcelattemptnextday, setAmtparcelattemptnextday] = useState('');
  const handleChange3 = (event) => {
    setAmtparcelattemptnextday(event.target.value);

  };

  const [noDeliverdParcel, setnoDeliverdParcel] = useState('');
  const handleChange4 = (event) => {
    setnoDeliverdParcel(event.target.value);

  };



  const [noRejectParcel, setnoRejectParcel] = useState('');
  const handleChange5 = (event) => {
    setnoRejectParcel(event.target.value);

  };

  const totalParcel = detailsOfParcel?.totalParcel;
  const totalAmmount = detailsOfParcel?.totalAmmount;

  const NoNextDayParcel = ((totalParcel) - (noDeliverdParcel) - (noRejectParcel));
  const Cashreceived = ((totalAmmount) - (onlineAmt) - (Amtrejectedparcel) - (Amtparcelattemptnextday));

  console.log("parcle_id:-------->>>", detailsOfParcel?.id)

  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Parcel Delivery
            </Typography>

            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                parcelId: "",
                totalParcel: "",
                totalAmmount: "",
                deliverdParcel: "",
                totalOnlineAmmount: "",
                rejectParcel: "",
                rejectAmmount: "",
                nextDayParcel: "",
                nextDayAmmount: "",
                totalCashAmmount: "",
              }}

              onSubmit={async (data, { setSubmitting, resetForm }) => {

                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting123:", data);
                await onAdd(
                  data.parcelId = detailsOfParcel?.id,
                  data.totalParcel = totalParcel,
                  data.totalAmmount = totalAmmount,
                  data.deliverdParcel = noDeliverdParcel,
                  data.totalOnlineAmmount = onlineAmt,
                  data.rejectParcel = noRejectParcel,
                  data.rejectAmmount = Amtrejectedparcel,
                  data.nextDayParcel = NoNextDayParcel,
                  data.nextDayAmmount = Amtparcelattemptnextday,
                  data.totalCashAmmount = Cashreceived,
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
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Delivery Boy
                      </InputLabel>
                      <Select
                        id="select_Applicant"
                        name="select_Applicant"
                        onChange={(event) => setUserId(event.target.value)}
                      >
                        {dboy?.map((user) => (
                          <MenuItem id={user.id} value={user.id}>
                            {user.name}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">

                      <InputLabel id="demo-simple-select-standard-label">
                        Select Alloted Parcel
                      </InputLabel>
                      <Select
                        id="select_allotedParcel"
                        name="select_allotedParcel"
                        onChange={(event) => setAllotedId(event.target.value)}
                      >
                        {parcelMultiData?.map((user) => (
                          <MenuItem id={user.id} value={user.id}>
                            {user.noOfparcelAlloted}{" "}
                          </MenuItem>
                        ))}
                      </Select>

                    </FormControl>


                    {
                      allotedParcel.isLoading ? (
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
                        <Div>


                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="totalAmmount"
                              type="text"
                              label="Total Amount Of Allotted Parcel"
                              value={detailsOfParcel?.totalAmmount}
                              defaultValue={detailsOfParcel?.totalAmmount}
                              inputProps={{
                                readOnly: true,
                              }}
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="deliverdParcel"
                              onChange={handleChange4}
                              value={noDeliverdParcel}
                              type="number"
                              label="Total No. Of Parcel Delivered"
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              id="totalOnlineAmmount"
                              name="totalOnlineAmmount"
                              type="number"
                              label="Online Payment Received"
                              onChange={handleChange1}
                              value={onlineAmt}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="rejectParcel"
                              onChange={handleChange5}
                              value={noRejectParcel}
                              type="number"
                              label="No. Of Rejected Parcel"
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="rejectAmmount"
                              type="number"
                              label="Amount Of Rejected Parcel"
                              onChange={handleChange2}
                              value={Amtrejectedparcel}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="nextDayParcel"

                              value={NoNextDayParcel}
                              type="number"
                              label="No.of Parcel Attempt For Next Day"
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="nextDayAmmount"
                              type="number"
                              label="Amount Of Parcel Attempt for  Next Day"
                              onChange={handleChange3}
                              value={Amtparcelattemptnextday}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),

                              }}
                              required
                            />
                          </FormControl>

                          <FormControl className="MuiFormControl-fluid">
                            <TextField
                              fullWidth
                              name="totalCashAmmount"
                              type="number"
                              label="Cash Received"
                              value={((detailsOfParcel?.totalAmmount) - (onlineAmt) - (Amtrejectedparcel) - (Amtparcelattemptnextday))}
                              defaultValue={((detailsOfParcel?.totalAmmount) - (onlineAmt) - (Amtrejectedparcel) - (Amtparcelattemptnextday))}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                              required
                            />
                          </FormControl>
                        </Div>
                      )}
                    <Div
                      sx={{ mx: 1 }}
                    >

                      <LoadingButton
                        // halfWidth
                        fullWidth
                        type="submit"
                        variant="contained"
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

export default ParcelDelivery;
