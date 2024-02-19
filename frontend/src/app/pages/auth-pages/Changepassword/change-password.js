import { Alert, Dialog, Snackbar } from "@mui/material";
import React from "react";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Div from "@jumbo/shared/Div";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  IconButton,
  InputAdornment
} from "@mui/material";
import { userServices } from "app/services/userservices";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";

let resetFormFunc = null;
const validationSchema = yup.object({
  password: yup
    .string("Enter New Password")
    .required("New Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .min(8, "Password must be at least 8 characters"),
  passwordConfirmation: yup
    .string("Please Re-Enter New Password")
    .required("Please Re-Enter New Password")
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

});

const ChangePassword = ({ open, onClose }) => {

  const { authUser } = useAuth();

  console.log("authUser", authUser.id)

  const userId = authUser.id

  console.log("userId", userId)



  const acompMutation = useMutation(userServices.update, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setDopen(true);
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

  const onAdd = (userId, password) => {
    acompMutation.mutate({ userId, password });
  };
  const [dopen, setDopen] = useState(false);
  const handleClose = () => {
    setDopen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [values1, setValues1] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChangeNewPassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  const handleChangecNewPassword = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };


  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const handleClickShowCNewPassword = () => {
    setValues1({
      ...values,
      showPassword: !values1.showPassword,
    });
  };


  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };


  const handleMouseDowncNewPassword = (event1) => {
    event1.preventDefault();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      style={{
        height: "400px",
        marginTop: "60px",

      }}
    >
      <Div p={5} style={{ height: "500px", width: "300px" }}>
        <Formik
          validateOnChange={true}
          validationSchema={validationSchema}
          initialValues={{
            userId: "",
            password: "",
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            resetFormFunc = resetForm;
            setSubmitting(true);
            console.log("submitting", data);
            await onAdd(
              data.userId = userId,
              data.passwordConfirmation
            );

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form noValidate autoComplete="off">
              <Div
                style={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h2 style={{ color: "black" }}>Change Password</h2>
              </Div>
              <Div>
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  style={{
                    marginTop: "30px",
                    marginLeft: "20px",
                    width: "260px",
                  }}
                >

                  <JumboTextField
                    id="outlined-adornment-password"
                    label="Enter New Password"
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChangeNewPassword("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  style={{
                    marginTop: "30px",
                    marginLeft: "20px",
                    width: "260px",
                  }}
                >


                  <JumboTextField
                    id="outlined-adornment-password"
                    label="Confirm New Password"
                    name="passwordConfirmation"
                    type={values1.showPassword ? "text" : "password"}
                    value={values1.password}
                    onChange={handleChangecNewPassword("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCNewPassword}
                          onMouseDown={handleMouseDowncNewPassword}
                          edge="end"
                        >
                          {values1.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Div
                  sx={{ mx: 1 }}
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoadingButton
                    halfWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mb: 3 }}
                    loading={isSubmitting || acompMutation.isLoading}
                  >
                    Change Password
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
            </Form>
          )}
        </Formik>
      </Div>
    </Dialog>
  );
};

export default ChangePassword;
