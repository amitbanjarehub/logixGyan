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
  Grid,
  IconButton,
  DialogContent,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { companyServices } from "app/services/companyservices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { userServices } from "app/services/userservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Resizer from "react-image-file-resizer";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { makeStyles } from "@mui/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { branchServices } from "app/services/branchservices";
import { cashDepositServices } from "app/services/cashDepositServices";
import { useGeolocated } from "react-geolocated";

let resetFormFunc = null;
const validationSchema = yup.object({
  bankDeposit: yup.string("Enter Bank Deposit").required("Bank Deposit is required"),

});

const CashDepositeEdit = ({ cashId, onClose, open }) => {

  console.log("expenses_Id:", cashId);
  const eId = cashId;
  console.log("expenses_eId:", cashId);

  const { authUser } = useAuth();

  const expDetails = useQuery(["Expensesdata", { cashId }], async () =>
    cashDepositServices.Idlist(cashId)
  );

  const expData = expDetails?.data?.data ?? [];

  const expData1 = expData.flat();

  const expensesData = expData1[0];

  const [fullWidth, setFullWidth] = React.useState(true);

  const expensesMutation = useMutation(cashDepositServices.updateCashDeposit, {
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

  const onAdd = (

    bankDeposit,
    cmsboyImage,
    depositeSlipImage,
    supportDocImage,
    eId,
  ) => {
    expensesMutation.mutate({


      bankDeposit,
      cmsboyImage,
      depositeSlipImage,
      supportDocImage,
      eId,
    });
  };
  const [dopen, setdOpen] = useState(false);
  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const liuser = useQuery(["user-list"], userServices.alist);
  const aliuser = liuser.data?.data;
  const dboy = aliuser?.filter((item) => item.role === "deliveryBoy");

  const [source, setSource] = useState("");
  const [source1, setSource1] = useState("");
  const [source2, setSource2] = useState("");

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

  const handleCapture = async (target, name, setMethod) => {
    console.log("name", name);
    if (target.files) {
      if (target.files.length !== 0) {
        try {
          const file = target.files[0];
          const image = await resizeFile(file);

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

          //Usage example:
          const file1 = dataURLtoFile(image, name ?? "hello.jpeg");
          console.log("file1", file1);
          setMethod(file1);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },

    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  return (
    <JumboDemoCard title={"Scroll Dialog"} wrapperSx={{ backgroundColor: 'background.paper', pt: 0 }}>
      <Div>
        <Dialog
          open={open}
          onClose={onClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent dividers={'paper'}>

            {
              expDetails.isLoading ? (
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

                  <Div

                  >


                    <Formik
                      validateOnChange={true}
                      validationSchema={validationSchema}
                      initialValues={{


                        bankDeposit: expensesData?.bankDeposit,
                        cmsboyImage: "",
                        depositeSlipImage: "",
                        supportDocImage: "",
                        eId: "",
                      }}
                      onSubmit={async (data, { setSubmitting, resetForm }) => {
                        resetFormFunc = resetForm;
                        setSubmitting(true);


                        await onAdd(

                          data.bankDeposit,
                          data.cmsboyImage = source,
                          data.depositeSlipImage = source1,
                          data.supportDocImage = source2,
                          data.eId = eId,
                        );
                        console.log("Hello......!")
                        console.log("submitting_wwe", data);
                        setSubmitting(false);
                      }}
                    >

                      {({ isSubmitting, handleSubmit, setFieldValue }) => (


                        <Form noValidate autoComplete="off"

                        >


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
                            <Typography component={"h2"} variant="h1" mb={3}>  Edit Expense List </Typography>


                            <FormControl className="MuiFormControl-fluid">
                              <JumboTextField
                                fullWidth
                                id="bankDeposit"
                                name="bankDeposit"
                                label="bankDeposit"
                                defaultValue={expensesData?.bankDeposit}

                              />
                            </FormControl>





                            <FormControl className="MuiFormControl-fluid">
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="contained-button-file"
                              />
                              <label htmlFor="contained-button-file">
                                <JumboDemoCard
                                  title={"Photos with CMS Boy"}
                                  wrapperSx={{
                                    backgroundColor: "background.paper",
                                    pt: 0,
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    {!isGeolocationAvailable ? (
                                      <div>
                                        Your browser does not support Geolocation
                                      </div>
                                    ) : !isGeolocationEnabled ? (
                                      <div>Geolocation is not enabled</div>
                                    ) : coords ? (
                                      setLatitude(coords.latitude) ||
                                      setLongitude(coords.longitude) || (
                                        <div className={classes.root}>
                                          <Grid container>
                                            <Grid item xs={12}>
                                              <input
                                                name="cmsboyImage"
                                                accept="image/*"
                                                className={classes.input}
                                                id="icon-button-file"
                                                type="file"
                                                capture="environment"
                                                onChange={(e) => {
                                                  handleCapture(
                                                    e.target,
                                                    "cmsboyImage",
                                                    setSource
                                                  );
                                                  setFieldValue(
                                                    "cmsboyImage",
                                                    source
                                                  );
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
                                        </div>
                                      )
                                    ) : (
                                      <div>Getting the location data&hellip; </div>
                                    )}
                                  </Stack>
                                </JumboDemoCard>
                              </label>
                            </FormControl>

                            <FormControl className="MuiFormControl-fluid">
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="contained-button-file"
                              />
                              <label htmlFor="contained-button-file">
                                <JumboDemoCard
                                  title={"Image of Deposit slip"}
                                  wrapperSx={{
                                    backgroundColor: "background.paper",
                                    pt: 0,
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    {!isGeolocationAvailable ? (
                                      <div>
                                        Your browser does not support Geolocation
                                      </div>
                                    ) : !isGeolocationEnabled ? (
                                      <div>Geolocation is not enabled</div>
                                    ) : coords ? (
                                      <div className={classes.root}>
                                        <Grid container>
                                          <Grid item xs={12}>
                                            <input
                                              name="depositeSlipImage"
                                              accept="image/*"
                                              className={classes.input}
                                              id="icon-button-file1"
                                              type="file"
                                              capture="environment"
                                              onChange={(e) => {
                                                handleCapture(
                                                  e.target,
                                                  "depositeSlipImage",
                                                  setSource1
                                                );

                                                setFieldValue(
                                                  "depositeSlipImage",
                                                  source1
                                                );
                                              }}
                                            />

                                            <label htmlFor="icon-button-file1">
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
                                      </div>
                                    ) : (
                                      <div>Getting the location data&hellip; </div>
                                    )}
                                  </Stack>
                                </JumboDemoCard>
                              </label>
                            </FormControl>

                            <FormControl className="MuiFormControl-fluid">
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="contained-button-file"
                              />
                              <label htmlFor="contained-button-file">
                                <JumboDemoCard
                                  title={"Supporting Documents"}
                                  wrapperSx={{
                                    backgroundColor: "background.paper",
                                    pt: 0,
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    {!isGeolocationAvailable ? (
                                      <div>
                                        Your browser does not support Geolocation
                                      </div>
                                    ) : !isGeolocationEnabled ? (
                                      <div>Geolocation is not enabled</div>
                                    ) : coords ? (
                                      <div className={classes.root}>
                                        <Grid container>
                                          <Grid item xs={12}>
                                            <input
                                              name="supportDocImage"
                                              accept="image/*"
                                              className={classes.input}
                                              id="icon-button-file2"
                                              type="file"
                                              capture="environment"
                                              onChange={(e) => {
                                                handleCapture(
                                                  e.target,
                                                  "supportDocImage",
                                                  setSource2
                                                );
                                                setFieldValue(
                                                  "supportDocImage",
                                                  source2
                                                );
                                              }}
                                            />

                                            <label htmlFor="icon-button-file2">
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
                                      </div>
                                    ) : (
                                      <div>Getting the location data&hellip; </div>
                                    )}
                                  </Stack>
                                </JumboDemoCard>
                              </label>
                            </FormControl>


                            <Div sx={{ mx: 1 }}>
                              <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mb: 3 }}
                                loading={
                                  isSubmitting || expensesMutation.isLoading
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


                      )}
                    </Formik>

                  </Div>


                </React.Fragment>
              )

            }
            <DialogActions>
              <Button onClick={onClose}>Close</Button>
            </DialogActions>



          </DialogContent>
        </Dialog>

      </Div >
    </JumboDemoCard >
  );
};

export default CashDepositeEdit;

