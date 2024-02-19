import React from "react";
import { Alert, Card, CardContent, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Form, Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "react-query";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { branchServices } from "app/services/branchservices";
import { companyServices } from "app/services/companyservices";
import { useState } from "react";



const validationSchema = yup.object({
  branchName: yup.string("Enter Company Name").required("Branch Name is required"),
  companyId: yup.string("Select Company Name").required("Please Select Company Name"),
  lat: yup.string("Enter Latitude").matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/, "Please Enter Valid Latitude").required("Latitude is required"),
  long: yup.string("Enter Latitude").matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/, "Please Enter Valid Latitude").required("Latitude is required"),
  address: yup.string("Enter Address").required("Address is required"),
});

const Add_Branch = () => {
  const abranchMutation = useMutation(branchServices.add, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setOpen(true);
      if (data.status === 200) {
        setSeverity("success");
        setMsg(data.message);
      } else {
        setSeverity("error");
        setMsg(data.message);
      }

    },
  });

  const onAdd = (
    branchName,
    companyId,
    lat,
    long,
    address
  ) => {
    abranchMutation.mutate({
      branchName,
      companyId,
      lat,
      long,
      address
    });
  };



  const [setCompany,] = React.useState("");

  const query = useQuery(['company-list'], companyServices.wList);

  console.log("result of query: ", query);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");


  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Typography component={"h2"} variant="h1" mb={3}>
              Add Branch
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                name: "",
                selectCompany: "",
                lat: "",
                long: "",
                address: ""
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting")
                onAdd(
                  data.branchName,
                  data.companyId,
                  data.lat,
                  data.long,
                  data.address
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
                        id="name"
                        name="branchName"
                        label="Branch Name"

                      />
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        select
                        id="companyId"
                        name="companyId"
                        label="Select Company"
                        onChange={(event) => setCompany(event.target.value)}
                      >
                        {query?.data?.data.map((company) => (
                          <MenuItem key={company.id} value={company.id}>{company.companyName} </MenuItem>
                        ))}
                      </JumboTextField>
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboDemoCard
                          title={"Geo Location"}

                          wrapperSx={{
                            backgroundColor: "background.paper", pt: 0,
                          }}
                        >
                          <Box

                            sx={{
                              "& > :not(style)": { m: 1, width: "24ch" },
                            }}

                          >
                            <JumboTextField
                              id="lat"
                              name="lat"
                              label="Latitude"
                              variant="outlined"

                            />
                            <JumboTextField

                              id="long"
                              name="long"
                              label="Longitude"
                              variant="outlined"

                            />

                          </Box>
                        </JumboDemoCard>
                      </Div>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <Div sx={{ mt: 1, mb: 2 }}>
                        <JumboTextField
                          fullWidth
                          multiline
                          id="address"
                          name="address"
                          label="Address"
                          rows={4}

                        />
                      </Div>
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || abranchMutation.isLoading}
                      >
                        Add
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

export default Add_Branch;
