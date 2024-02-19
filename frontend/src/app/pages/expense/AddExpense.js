import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import Resizer from "react-image-file-resizer";
import { userServices } from "app/services/userservices";
import { branchServices } from "app/services/branchservices";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { Hail } from "@mui/icons-material";

let resetFormFunc = null;
const validationSchema = yup.object({
  particular: yup.string("Enter Particular").required("Particular is required"),
  description: yup
    .string("Enter Description")
    .required("Description is required"),
  ammount: yup
    .string("Enter Amount")
    .required("Amount is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(1, "Must be exactly 1 digits")
    .max(10, "Must be exactly 10 digits"),

  remark: yup.string("Enter Remark").required("Remark is required"),
});

const Add_Expense = () => {
  const { authUser } = useAuth();

  const aExpensesMutation = useMutation(branchServices.addBranchExpenses, {
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
    particular,
    remark,
    ammount,
    description,
    filename,
    branchId,
    userId
  ) => {
    aExpensesMutation.mutate({
      particular,
      remark,
      ammount,
      description,
      filename,
      branchId,
      userId
    });
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },

    input: {
      display: "none",
    },
  }));

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

  const [source, setSource] = useState("");
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

  console.log("source", source);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              Add Expences
            </Typography>

            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                particular: "",
                remark: "",
                ammount: "",
                description: "",
                filename: "",
                branchId: "",
                userId: "",
              }}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                resetFormFunc = resetForm;
                setSubmitting(true);
                console.log("submitting", data);
                await onAdd(
                  data.particular,
                  data.remark,
                  data.ammount,
                  data.description,
                  (data.filename = source),
                  (data.branchId = authUser.branchId),
                  (data.userId = authUser.id)
                );
                setSubmitting(false);
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
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="particular"
                        name="particular"
                        label="Particular"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="description"
                        name="description"
                        multiline
                        rows={4}
                        label="Description"

                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboDemoCard
                          title={"Supporting Documents"}
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
                            <Div className={classes.root}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <input
                                    name="filename"
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-file"
                                    type="file"
                                    capture="environment"
                                    onChange={(e) => {
                                      handleCapture(e.target);
                                      setFieldValue("filename", source);
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
                          </Box>
                        </JumboDemoCard>
                      </Div>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="remark"
                        name="remark"
                        multiline
                        rows={4}
                        label="Remark"

                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="ammount"
                        label="Amount"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}

                      />
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || aExpensesMutation.isLoading}

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

export default Add_Expense;
