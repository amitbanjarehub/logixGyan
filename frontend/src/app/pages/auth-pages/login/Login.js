import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Typography
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginServices } from "../../../services/login-services";
import { ASSET_IMAGES } from "../../../utils/constants/paths";


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});


const Login1 = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const loginMutation = useMutation(loginServices.login, {
    onError(error) {
      console.log("error", error);

    },
    onSuccess: (response) => {
      if (response.status === 200) {
        if (response.data.token) {

          setAuthToken(response?.data?.token);
          navigate("/dashboard", { replace: true });
        }

      }
      if (response.data.status === 409) {
        setOpen(true);
        setSeverity("error");
        setMsg(response.data.message);

      }


    },
  });




  const onSignIn = (email, password) => {
    loginMutation.mutate({ email, password });
  };

  useEffect(() => {

  }, [loginMutation]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
      }}
    >
    
      <Div sx={{ mb: 3, display: "inline-flex" }}>
        <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
          <img src={`${ASSET_IMAGES}/logixhunt.png`} alt="Jumbo React" style={{height: "100px", width: "200px"}}/>
        </Link>
      </Div>
      <Card sx={{ maxWidth: "100%", width: 360, mb: 4 }}>
        <Div sx={{ position: "relative", height: "100px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image={`${ASSET_IMAGES}/dbService1.png`}
          />
          <Div
            sx={{
              flex: 1,
              inset: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              backgroundColor: (theme) =>
                alpha(theme.palette.common.black, 0.5),
              p: (theme) => theme.spacing(3),
            }}
          >
            <Typography
              variant={"h2"}
              sx={{
                color: "common.white",
                fontSize: "1.5rem",
                mb: 0,
              }}
            >
              Sign In
            </Typography>
          </Div>
        </Div>
        <CardContent sx={{ pt: 0, paddingTop: '50px', }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(response, { setSubmitting }) => {
              setSubmitting(true);
              onSignIn(response.email, response.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">

                {loginMutation.isError && <p>{loginMutation.error.message}</p>}
                <Div sx={{ mb: 3, mt: 1 }}>
                  <JumboTextField fullWidth name="email" label="Email" />
                </Div>
                <Div sx={{ mb: 2, mt: 1 }}>
                  <JumboTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Div>
                <Typography textAlign={"right"} variant={"body1"}>
                  <Link underline="none" href="/logixgyan/forgot-password">
                    Forgot your password?
                  </Link>
                </Typography>
                <Div sx={{ mb: 1 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                    value="lsRememberMe"
                    id="rememberMe"
                  />
                </Div>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isSubmitting || loginMutation.isLoading}
                >
                  Login
                </LoadingButton>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                >
                  <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                  </Alert>
                </Snackbar>
                <Typography textAlign={"center"} variant={"body1"} mb={1}>
                  Not Applied Yet?
                  {/* <Link underline="none" href="/deliveryboy/apply-for-job">
                    Apply for Job
                  </Link> */}

                  <Link underline="none" href="/logixgyan/apply-for-job">
                    Apply for Job
                  </Link>

                </Typography>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login1;
