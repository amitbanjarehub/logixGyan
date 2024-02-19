import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Form, Formik } from "formik";
import { companyServices } from "../../../services/companyservices";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "react-query";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import { userServices } from "app/services/userservices";
import { InputAdornment } from "@mui/material";

const validationSchema = yup.object({
  selectDeliveryBoy: yup
    .string("Select Delivery Boy")
    .required("Select Delivery Boy is required"),
  parcelId: yup
    .string("Enter Total Number of Parcel")
    .required("Total Number of Parcel is required"),
  parcelAmountId: yup
    .string("Enter Tolal Amount of Parcel")
    .required("Tolal Amount of Parcel"),
});

const Parcel_allotment = () => {
  const acompMutation = useMutation(companyServices.add, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
    },
  });

  const onAdd = (selectDeliveryBoy, parcelId, parcelAmountId) => {
    acompMutation.mutate({
      selectDeliveryBoy,
      parcelId,
      parcelAmountId,
    });
  };
  // const { t } = UseTranslation();
  const liuser = useQuery(["user-list"], userServices.alist);

  const dboy = liuser?.data?.data.filter((item) => item.role === "deliveryBoy");

  console.log("dboy", dboy);

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        {/* {t("pages.title.contactUs")} */}
      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            {/* <Typography variant="h6" color={"text.secondary"}>
              Send Message
            </Typography> */}
            <Typography component={"h2"} variant="h1" mb={3}>
              Parcel Allotment
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                selectDeliveryBoy: "",
                parcelId: "",
                parcelAmountId: "",
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting");
                onAdd(
                  data.selectDeliveryBoy,
                  data.parcelId,
                  data.parcelAmountId
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
                        id="demo-simple-select-label"
                        name="selectApplicant"
                        // onChange={userhandleChange}
                        // value={userId}
                      >
                        {dboy?.map((user) => (
                          <MenuItem id={user.id} value={user.id}>
                            {user.name}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                      ihdc<janlsnlhoiwk lnllc>w</janlsnlhoiwk>
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        id="parcelId"
                        name="parcelId"
                        label="Total Number of Parcel"
                        type="number"
                      ></JumboTextField>
                    </FormControl>
                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        id="parcelAmountId"
                        name="parcelAmountId"
                        label="Tolal Amount of Parcel"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                      ></JumboTextField>
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || acompMutation.isLoading}
                      >
                        Submit
                      </LoadingButton>
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
